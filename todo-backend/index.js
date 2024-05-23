const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const mongoURI = "mongodb+srv://pz47_user:Tu8i@cluster0.rxkuh4u.mongodb.net/banco-p1?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => console.log(err));

// Definir o schema e o modelo
const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// Rotas
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        completed: req.body.completed
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

app.put('/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

