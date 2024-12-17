const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Atualiza a lista de tarefas
async function loadTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  renderTasks(tasks);
}

// Renderiza as tarefas na página
function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.onclick = () => deleteTask(task.id);

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Adiciona uma nova tarefa
addTaskButton.onclick = async () => {
  const title = taskInput.value.trim();
  if (!title) {
    alert('Por favor, insira um título para a tarefa.');
    return;
  }
  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  taskInput.value = '';
  loadTasks();
};

// Remove uma tarefa
async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

// Carrega as tarefas ao iniciar
loadTasks();
