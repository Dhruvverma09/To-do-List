const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    taskItem.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(taskItem);
    });

    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    taskInput.value = '';
  }
});

function saveTasks() {
  const tasks = [];
  const taskItems = taskList.getElementsByTagName('li');
  for (let task of taskItems) {
    tasks.push({
      text: task.textContent.replace('X', '').trim(),
      completed: task.classList.contains('completed')
    });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task.text;

      if (task.completed) {
        taskItem.classList.add('completed');
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
      });

      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);
    });
  }
}

loadTasks();

taskList.addEventListener('DOMSubtreeModified', saveTasks);
