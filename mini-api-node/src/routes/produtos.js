import { Router } from "express";
import { listarProdutos, buscarProdutoPorId, criarProduto, atualizarProduto, deletarProduto } from "../repositories/produtosRepository.js";

const router = Router();

router.get("/", (req, res) => {
  const produtos = listarProdutos();
  res.json(produtos)
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const produto = buscarProdutoPorId(id);

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

  const novoProduto = criarProduto(nome, preco);
  res.status(201).json(novoProduto)
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
  
  const produto = atualizarProduto(id, nome, preco);
  
  if (produto === undefined) {
    return res.status(404).json ({
      erro: "Produto não encontrado"
    });
  }
  
  res.status(200).json(produto);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const produto = deletarProduto(id);

  if (!produto) {
    return res.status(404).json( {
      erro: "Produto não encontrado"
    });
  }

  res.sendStatus(204);
});

export default router;