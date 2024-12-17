const express = require('express');
const app = express();

// Usar a porta fornecida pelo Replit ou 3000 por padrão
const port = process.env.PORT || 3000;

// "Banco de dados" em memória
let tasks = [];

// Middleware para tratar JSON
app.use(express.json());

// Rota para obter todas as tarefas (GET)
app.get('/tasks', (req, res) => res.json(tasks));

// Rota para criar uma nova tarefa (POST)
app.post('/tasks', (req, res) => {
  const { title, status } = req.body;
  if (!title || !status) {
    return res.status(400).send({ error: 'Título e status da tarefa são obrigatórios.' });
  }
  const newTask = { id: tasks.length + 1, title, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa existente (PUT)
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;

  if (!status) {
    return res.status(400).send({ error: 'O status da tarefa é obrigatório.' });
  }

  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).send({ error: 'Tarefa não encontrada.' });
  }

  task.status = status;
  res.status(200).json({ message: 'Tarefa atualizada com sucesso.', task });
});

// Rota para excluir uma tarefa (DELETE)
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).send({ error: 'Tarefa não encontrada.' });
  }

  res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
});

// Servindo os arquivos do frontend
app.use(express.static('public'));

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
