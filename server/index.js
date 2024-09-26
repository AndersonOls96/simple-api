const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

let produtos = [];

// Rota para criar um novo produto
app.post('/produtos', (req, res) => {
    const produto = req.body;
    produto.id = produtos.length + 1;
    produtos.push(produto);
    res.status(201).json(produto);
});

// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Rota para obter um produto por ID
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

// Rota para atualizar um produto por ID
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos[index] = { ...produtos[index], ...req.body };
        res.json(produtos[index]);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

// Rota para deletar um produto por ID
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});