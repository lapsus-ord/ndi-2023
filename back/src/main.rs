use std::{collections::HashMap, env};
use std::net::Ipv4Addr;
use mongodb::{options::{ClientOptions, ResolverConfig}, sync::Client};
use serde::{Serialize, Deserialize};
use warp::{http::Response as WarpResponse, Filter};

#[derive(Serialize, Deserialize, Debug)]
struct OpenAIMessage {
    role: String,
    content: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct OpenAIRequest {
    model: String,
    messages: Vec<OpenAIMessage>,
}

#[derive(Serialize, Deserialize, Debug)]
struct OpenAIChoice {
    message: OpenAIMessage,
}

#[derive(Serialize, Deserialize, Debug)]
struct OpenAIResponse {
    choices: Vec<OpenAIChoice>,
}

#[derive(Serialize, Deserialize, Debug)]
struct GeneratedFact {
    fact: String,
    truth: bool,
    explanation: String,
}

#[tokio::main]
async fn main() -> Result<(), String> {
    let mongodb_client_uri = env::var("MONGODB_URI").expect("You must set the MONGODB_URI environment var!");

    let options =
      ClientOptions::parse_with_resolver_config(&mongodb_client_uri, ResolverConfig::cloudflare())
         .map_err(|e| e.to_string())?;

    let mongo_client = Client::with_options(options).map_err(|e| e.to_string())?;
    let mongo_client1 = mongo_client.clone();

    let retrieve_facts = warp::post()
        .and(warp::path("RetrieveFacts"))
        .map(move || {
            let client = reqwest::blocking::Client::new();
            let openai_uri = env::var("OPENAI_URI").expect("You must set the OPENAI_URI environment var!");
            let openai_api_key = env::var("OPENAI_API_KEY").expect("You must set the OPENAI_API_KEY environment var!");
            let openai_model = env::var("OPENAI_MODEL").expect("You must set the OPENAI_MODEL environment var!");

            let res = client.post(openai_uri)
                .header("api-key", openai_api_key)
                .json(&OpenAIRequest {
                    model: openai_model,
                    messages: Vec::from([
                                        OpenAIMessage {
                                            role: "user".to_owned(),
                                            content: "Donne moi des faits vrais ou faux sur le réchauffement climatique. Ne me dis rien d'autre.\n\nMets les sous forme d'une liste JSON contenant un objet JSON par fait :\n- le fait sera dans la clé `fact` et sera une chaine de caractère\n- sa véracité sera dans la clé `truth` et sera un booléen\n- une explication sera dans la clé `explanation` et sera une chaine de caractère\n\nIl y aura 50% de faits vrais et 50% de faits faux.".to_owned(),
                                        }
                    ]),
                })
                .send();

                let http_res = match res {
                    Ok(r) => r,
                    Err(e) => return WarpResponse::builder().status(500).body(e.to_string()),
                };

            let json_res: Result<OpenAIResponse, reqwest::Error> = http_res.json();
            let openai_res = match json_res {
                Ok(r) => r,
                Err(e) => return WarpResponse::builder().status(500).body(e.to_string()),
            };

            if openai_res.choices.len() < 1 {
                return WarpResponse::builder().status(500).body("There was no message in the received response from OpenAI".to_string());
            }

            let openai_message_content = &openai_res.choices[0].message.content.replace("\n", "");
            let parsed_facts_res: Result<Vec<GeneratedFact>, serde_json::Error> = serde_json::from_str(openai_message_content);
            let parsed_facts = match parsed_facts_res {
                Ok(r) => r,
                Err(e) => return WarpResponse::builder().status(500).body(e.to_string()),
            };

            let _ = mongo_client1.database("main").collection("facts").insert_many(parsed_facts, None);
            WarpResponse::builder().body("".to_string())
        });

    let get_facts = warp::get()
        .and(warp::path("api"))
        .and(warp::path("GetFact"))
        .and(warp::query::<HashMap<String, String>>())
        .map(|p: HashMap<String, String>| match p.get("name") {
            Some(name) => WarpResponse::builder().body(format!("Hello, {}. This HTTP triggered function executed successfully.", name)),
            None => WarpResponse::builder().body(String::from("This HTTP triggered function executed successfully. Pass a name in the query string for a personalized response.")),
        });

    let port_key = "FUNCTIONS_CUSTOMHANDLER_PORT";
    let port: u16 = match env::var(port_key) {
        Ok(val) => val.parse().expect("Custom Handler port is not a number!"),
        Err(_) => 3000,
    };

    let routes = retrieve_facts.or(get_facts);

    warp::serve(routes).run((Ipv4Addr::LOCALHOST, port)).await;
    Ok(())
}
