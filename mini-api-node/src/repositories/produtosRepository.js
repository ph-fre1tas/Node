import db from "../database.js";

export function listarProdutos() {
  const produtos = db.prepare(
    "SELECT * FROM produtos"
  ).all();

  return produtos;
}

export function buscarProdutoPorId(id) {
  const produto = db.prepare(
    "SELECT * FROM produtos WHERE id = ?"
  ).get(id);
  return produto;
}

export function criarProduto(nome, preco) {
  const produto = db.prepare(
    "INSERT INTO produtos (nome, preco) VALUES (?, ?)"
  ).run(nome, preco);

  const novoProduto = {
    id: produto.lastInsertRowid,
    nome,
    preco
  }
  
  return novoProduto;
}

export function atualizarProduto(id, nome, preco) {
  const produto = db.prepare(
    "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?"
  ).run(nome, preco, id)

  if (produto.changes === 0) {
    return undefined;
  }

  return buscarProdutoPorId(id);
}

export function deletarProduto(id) {
  const produto = db.prepare(
    "DELETE FROM produtos WHERE id = ?"
  ).run(id);

  if (produto.changes === 0) {
    return false;
  }

  return true;
}

export function listarProdutosMaisCaros(preco) {
  return db.prepare(
    "SELECT * FROM produtos WHERE preco > ?"
  ).all(preco);
}