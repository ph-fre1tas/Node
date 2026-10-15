import db from "./database.js";

const inserir = db.prepare(
    "INSERT INTO produtos (nome, preco) VALUES (?, ?)"
);

const resultado = inserir.run("Mouse", 150)

console.log("ID criado:", resultado.lastInsertRowid)

const produtos = db.prepare(
    "SELECT * FROM produtos"
).all();

console.log(produtos);