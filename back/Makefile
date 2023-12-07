.PHONY: clean build-local run-local build-azure run-azure

clean:
	cargo clean

build-local:
	cargo build --release
	cp target/release/handler .

run-local: build-local
	func start

build-azure:
	rustup target add x86_64-unknown-linux-musl
	cargo build --release --target=x86_64-unknown-linux-musl
	cp target/x86_64-unknown-linux-musl/release/handler .

run-azure: build-azure
	func azure functionapp publish blackcat-ndi
