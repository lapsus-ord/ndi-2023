# Chat noir - NDI 2023

Bienvenue sur le projet Nuit de l'info 2023 développé par l'équipe Chat Noir. Notre objectif est de sensibiliser de manière ludique et interactive à l'écologie en proposant un quiz innovant alimenté par une intelligence artificielle. Cette readme fournit des informations essentielles sur notre application, son architecture et les choix technologiques effectués pour garantir un impact environnemental réduit.

## Présentation du Projet

### Objectif
Notre application vise à démystifier les idées reçues sur l'écologie grâce à un quiz généré par intelligence artificielle. Nous avons choisi une approche ludique pour rendre l'apprentissage environnemental accessible à tous.

### Architecture

#### Backend
- **Langage de Développement :** Typescript (Serverless)
- **Hébergement :** Microsoft Azure, Auth0 (login), Mongo Atlas (DB)

#### Frontend
- **Framework :** SvelteKit 

#### Intelligence Artificielle
- **Modèle :** Azure OpenAI

## Lancer en mode développement

Nous avons utilisé auth0 pour l'authentification mais nous n'avons pas besoin pour jouer au jeu.

Pour lancer le site web :

```bash
cd front/
npm run dev
```

Pour lancer le serveur :

```bash
cd back/
npm run start
```

> ℹ️ Note : Pour lancer le serveur en mode développement vous avez besoin de l'Azure CLI,
> puisque nous utilisons une fonction serverless de chez Azure (donc leur librairie).

Et ajouter l'url de l'api dans le [`.env`](front/.env.example) du dossier front : `VITE_API_BASE=""`
