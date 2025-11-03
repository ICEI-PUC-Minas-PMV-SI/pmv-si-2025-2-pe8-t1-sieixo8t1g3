# ⚖️ Juris Fácil Back-End

Este projeto é uma API backend desenvolvida em Node.js com TypeScript, utilizando o framework Fastify e o Drizzle ORM para interação com o banco de dados PostgreSQL.
O projeto roda em ambiente Docker e utiliza migrations automáticas e o Drizzle Studio para visualização e manipulação do banco.

## 🧰 Tecnologias utilizadas

Node.js

TypeScript

Fastify

Drizzle ORM

PostgreSQL

Docker Desktop

Zod (validação de dados)

JWT (autenticação)

Drizzle Kit Studio (interface para o banco)

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

Docker Desktop

Node.js (v18+)

npm

Git

## 🐳 Passos para rodar o projeto

Abra o Docker Desktop.

Certifique-se de que o serviço do Docker está em execução.

Execute o container da aplicação

```bash
docker-compose up -d
```

Verifique os containers ativos (opcional)

```bash
docker ps
```


Instale as dependências

```bash
npm install
```

Gere o schema do banco de dados

```bash
npm run db:generate
```

Execute as migrations

```bash
npm run db:migrate
```

Popule o banco com dados iniciais (seed)

```bash
npm run db:seed
```

Abra o Drizzle Studio - Interface visual para o banco de dados (opcional)

```bash
npx drizzle-kit studio
```

Inicie o servidor

```bash
npm run dev
```

## 🧱 Criando novas tabelas

Sempre que criar ou modificar tabelas, rode os seguintes comandos:

```bash
npm run db:generate
```

```bash
npm run db:migrate
```

```bash
npm run dev
```

```bash
npx drizzle-kit studio
```

## 📂 Estrutura do projeto

```bash
src/
 ├── db/
 │   ├── connection.ts          # Conexão com o banco (Drizzle + Postgres)
 │   ├── schema/
 │   │   ├── users.ts
 │   │   ├── procedure-stage.ts
 │   │   └── index.ts
 ├── routes/
 │   ├── court.controller.ts
 │   ├── procedureStage.controller.ts
 │   └── index.ts
 ├── server.ts                  # Inicialização do servidor Fastify
 ├── types/                     # Tipos globais TypeScript
```

## 🧠 Comandos úteis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run db:generate` | Gera os arquivos de migração do Drizzle |
| `npm run db:migrate` | Executa as migrações no banco de dados |
| `npm run db:seed` | Popula o banco com dados iniciais |
| `npx drizzle-kit studio` | Abre o painel visual do Drizzle ORM |


## 🔐 Autenticação

O projeto utiliza JWT para autenticação.
Certifique-se de definir a variável de ambiente JWT_SECRET em um arquivo .env:

```bash
DATABASE_URL=postgres://user:password@localhost:5434/database_name
JWT_SECRET=sua_chave_secreta
```

## 💻 Exemplo de execução

```bash
# 1️⃣ Instalar dependências

npm install

# 2️⃣ Gerar e migrar banco
npm run db:generate
npm run db:migrate
npm run db:seed

# 3️⃣ Iniciar servidor e abrir o Drizzle Studio
npm run dev
npx drizzle-kit studio
```


Servidor rodando em:
👉 http://localhost:4000
