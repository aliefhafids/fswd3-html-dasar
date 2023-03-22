const baseUrl = "https://crudcrud.com/api/";

// API
const apiKey = "94a82e1151b843d0bd235bc00003b0a5";
const url = baseUrl + apiKey;
const endpointTasks = `${url}/tasks`;

const input = document.querySelector('.input-btn input');
const listTasks = document.querySelector('.list-tasks ul');
const message = document.querySelector('.list-tasks');
let tasks = [];


const handleError = (error) => console.log(error);
const handleSuccess = (result) => console.log(result);

// GET semua data
const getTasks = () => {
    fetch(endpointTasks).then(handleSuccess).catch(handleError);
};

// GET detail data
const detailTasks = (task) => {
    fetch(`${endpointTasks}/${task}`).then(handleSuccess).catch(handleError);
};

function addTasks() {
    const task = input.value;
    if (task === '') {
        showError('Please enter a task');
    }

    const taskObj = {
        task,
        isChecked: false,
    };

    fetch(endpointTasks, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskObj)
        })
        .then(handleSuccess)
        .catch(handleError);

    tasks = [...tasks, taskObj];

    createHTML();
    input.value = '';
}

function createHTML() {
    clearHTML();
    if (tasks.length > 0) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            li.innerText = task.task;
            li.innerHTML = `${task.task} <span task-id="${task.id}">X</span>`;
            listTasks.appendChild(li);
        });
    }
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearHTML() {
    listTasks.innerHTML = '';
}

eventListeners();

  function eventListeners() {
      fetch(endpointTasks)
          .then(response => response.json())
          .then(data => {
              tasks = data;
              tasks.forEach(task => {
                  createHTML(task);
              });
          })
          .catch(error => console.log(error));
      listTasks.addEventListener('click', deleteTask);
  }

  function deleteTask(id) {
        const deleteId = parseInt(id.target.getAttribute('task-id'));
        tasks = tasks.filter(task => task.id !== deleteId);
        fetch(`${endpointTasks}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
              },
          })
            .then(handleSuccess)
            .catch(handleError);
        };


console.log(endpointTasks);