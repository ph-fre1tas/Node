# Mini API de Produtos — Node.js e Express

Projeto desenvolvido para praticar os fundamentos de **Node.js** e **Express**, com foco na criação de uma API REST simples.

## Tecnologias
- JavaScript
- Node.js
- Express
- Thunder Client (testes das requisições)

## Funcionalidades

A API utiliza um array em memória para armazenar produtos e praticar as operações básicas de CRUD.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produtos/:id` | Busca um produto pelo ID |
| POST | `/produtos` | Cadastra um novo produto |
| PUT | `/produtos/:id` | Atualiza um produto existente |
| DELETE | `/produtos/:id` | Remove um produto |

## Conceitos estudados
- Criação de servidores com Express
- Rotas e métodos HTTP
- Requisições e respostas (`req` e `res`)
- `req.params` e `req.body`
- Manipulação de arrays com `find()`, `findIndex()`, `push()` e `splice()`
- Respostas JSON e códigos de status HTTP
- Testes de requisições com Thunder Client

## Como executar

```bash
npm install
npm run dev
```

Servidor disponível em `http://localhost:3000`.

## Observações

Este é um projeto de estudos, o objetivo é consolidar os fundamentos de desenvolvimento backend antes de avançar para conceitos mais complexos.