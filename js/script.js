document.getElementById('form-task').addEventListener('submit', saveTask);

function saveTask(e){
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title, // title: title
        description // description: description
    };

    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else{
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();
    document.getElementById('form-task').reset();
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i=0; i<tasks.length; i++){
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class="item">
            <div class="contenido-item">
                <p><b>Título:</b> ${title} <br><b>Descripción:</b> ${description}</p>
                <div class="eliminar">
                    <a class="btn btn-eliminar" onclick="deleteTasks('${title}')">Eliminar</a>
                </div>
            </div>
        </div>`
    }
}

function deleteTasks(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for(let i=0; i<tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();