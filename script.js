let inputText = document.getElementById('task-input')
let addBtn = document.querySelector('.add-button')
let taskList = document.querySelector('.tasks-list')


document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage)




function addNewTask () {
    if (inputText.value.trim() === '') {
        alert('Please enter a valid task!')
    } else {
        createTaskElement(inputText.value)
        saveTaskToLocalStorage(inputText.value)
        inputText.value = ''
    }
}



addBtn.addEventListener('click', addNewTask)

inputText.addEventListener('keydown' ,function(event) {
    if (event.key === 'Enter') {
        addNewTask()
    }
})

console.log(localStorage)

function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
        createTaskElement(task.text)
        
        
        if (task.completed) {
            let lastTask = taskList.lastElementChild.querySelector('.task-name')
            lastTask.classList.remove('unchecked')
            lastTask.classList.add('checked')
        }
    })
}


function createTaskElement(taskText) {
    let newTask = document.createElement('div')
        newTask.classList.add('task')
        newTask.innerHTML = `<p class="task-name unchecked">${taskText}</p>
                    <button class="delete-button"><i class="fa-solid fa-x"></i></button>`

        taskList.appendChild(newTask)

    
        
        
        let deleteButton = newTask.querySelector('.delete-button')

        function deleteTask () {
            newTask.remove()
            deleteFromLocalStorage(taskText)
        }

        deleteButton.addEventListener('click', deleteTask)


        newTask.querySelector('.task-name').addEventListener('click', () => {
            toggleTaskStatus(newTask.querySelector('.task-name'))
        })
}


function toggleTaskStatus (taskName) {
    taskName.classList.toggle('checked')
    taskName.classList.toggle('unchecked')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks = tasks.map(task =>
        task.text === taskName.innerText ? { ...task, completed: taskName.classList.contains('checked')} : task
    )
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.push({ text: taskText, completed: false})
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function deleteFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks = tasks.filter(task => task.text !== taskText)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


