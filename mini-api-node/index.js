import express from 'express';

const produtos = [
  {
    id: 1,
    nome: "Mouse",
    preco: 150
  },
  {
    id: 2,
    nome: "Teclado",
    preco: 250
  }
];

const app = express();

app.use(express.json());

app.get("/produtos", (req,res) => {
  res.json(produtos);
});

app.get("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const produto = produtos.find((produto) => produto.id === Number(id));
  res.json(produto)
});

app.post("/produtos", (req, res) => {
  const novoProduto = {
    id: produtos.length + 1,
    nome: req.body.nome,
    preco: req.body.preco
  }

  if (typeof novoProduto.preco !== 'number' || novoProduto.preco <= 0 || typeof novoProduto.nome !== "string" || novoProduto.nome.trim() === "") {
    return res.status(400).json({
      erro: "Dado inválidos"
    })
  }
  produtos.push(novoProduto)

  res.status(201).json(novoProduto)
});

app.delete("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = produtos.findIndex((produto) => produto.id === id)
  if (indice === -1) {
    return res.status(404).json( {
      erro: "Produto não encontrado"
    })
  }

  produtos.splice(indice, 1)

  res.status(200).json(produtos)
});

app.put("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = produtos.findIndex((produto) => produto.id === id)

  if (indice === -1) {
    return res.status(404).json ({
      erro: "Produto não encontrado!"
    })
  }

  if (typeof req.body.preco !== 'number' || req.body.preco <= 0 || typeof req.body.nome !== "string" || req.body.nome.trim() === "") {
    return res.status(400).json({
      erro: "Dado inválidos"
    })
  }

  produtos[indice].nome = req.body.nome;
  produtos[indice].preco = req.body.preco;
  
  res.status(200).json(produtos[indice])
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
});
