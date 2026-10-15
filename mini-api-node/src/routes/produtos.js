import { Router } from "express";
import db from "../database.js";
import listarProdutos from "../repositories/produtosRepository.js";

const router = Router();

router.get("/", (req, res) => {
  const produtos = listarProdutos();

  res.json(produtos)
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const produto = db.prepare(
    `SELECT * FROM produtos WHERE id = ?` 
  ).get(id);
  
  if (produto === undefined) {
    return res.status(404).json({
      erro: "Produto não encontrado"
    })
  }

  res.json(produto)
});

router.post("/", (req, res) => {
  const nome = req.body.nome;
  const preco = req.body.preco;

  if (typeof preco !== 'number' || preco <= 0 || typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({
      erro: "Dado inválidos"
    });
  }
  
  const produto = db.prepare(
    "INSERT INTO produtos (nome, preco) VALUES (?, ?)"
  ).run(nome, preco);

  const novoProduto = {
    id: produto.lastInsertRowid,
    nome,
    preco
  }

  res.status(201).json(novoProduto)
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const deletarProduto = db.prepare(
    "DELETE FROM produtos WHERE id = ?"
  ).run(id);

  if (deletarProduto.changes === 0) {
    return res.status(404).json( {
      erro: "Produto não encontrado"
    });
  }

  const produtos = listarProdutos();

  res.status(200).json(produtos);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const nome = req.body.nome;
  const preco = req.body.preco;
  
  if (typeof preco !== 'number' || preco <= 0 || typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({
      erro: "Dado inválidos"
    });
  }
  
  const editarProduto = db.prepare(
    "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?"
  ).run(nome, preco, id)
  
  if (editarProduto.changes === 0) {
    return res.status(404).json ({
      erro: "Produto não encontrado"
    });
  }

  const produtoEditado = {
    id,
    nome,
    preco
  }
  
  res.status(200).json(produtoEditado);
});

export default router;