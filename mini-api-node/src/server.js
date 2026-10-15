import express from "express";
import produtosRouter from "./routes/produtos.js";

const app = express();

app.use(express.json());
app.use("/produtos", produtosRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
});