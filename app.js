// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Event listener for "Add Task" button
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Create a new task list item
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Add "Complete" functionality (toggle class)
    taskItem.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
    });

    // Add "Delete" functionality
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(taskItem);
    });

    taskItem.appendChild(deleteBtn);

    // Append the new task to the task list
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = '';
  }
});

// Optional: Save to Local Storage (persist tasks across sessions)
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

// Load tasks from localStorage when page loads
loadTasks();

// Save tasks to localStorage every time the task list is updated
taskList.addEventListener('DOMSubtreeModified', saveTasks);
