# 🍕 Pizza shop API

> This project aims to keep runtime agnostic, this means it should work on Bun, Node, Cloudflare Workers or any Web Standard API compatible runtime.

# Running

This project depends on Dockers to setup database. With Docker installed, clone this project, install dependencies, setup Docker containers and run the application.

### To install dependencies:
```bash
bun install
```

### Docker
Start database docker.
```bash
docker compose --env-file .env.local up -d
```

To disconnect, simply use the following command:
```bash
docker compose down
```
### Run the application
To run:
```bash
bun dev
```