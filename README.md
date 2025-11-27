# Equilíbrio Digital - Backend (minimal)

## O que este projeto contém
- Node.js + Express
- Mongoose (MongoDB)
- Rotas básicas: /auth, /events, /forum
- Modelos simples: Institution, Event, Topic

## Como usar (local)
1. Instale Node.js (v16+)
2. `npm install`
3. Copie `.env.example` para `.env` e configure `MONGO_URL`
4. `npm start`
5. API estará em http://localhost:4000

## Deploy
Você pode hospedar no Render/Heroku/Vercel (para Node). Lembre-se de configurar a variável de ambiente MONGO_URL.

## Endpoints principais
- `POST /auth/register` — criar instituição (body: name,email,phone,password)
- `POST /auth/login` — login (body: email,password)
- `GET  /events` — lista eventos
- `POST /events/create` — criar evento (body: event data)
- `GET  /forum` — lista tópicos
- `POST /forum/create` — criar tópico (body: title,content,author)

