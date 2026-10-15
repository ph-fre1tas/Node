import db from "../database.js";

export default function listarProdutos() {
  const produtos = db.prepare(
    "SELECT * FROM produtos"
  ).all();

  return produtos;
}