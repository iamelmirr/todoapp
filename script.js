let inputText = document.getElementById('task-input')
let addBtn = document.querySelector('.add-button')
let taskList = document.querySelector('.tasks-list')



function addNewTask () {
    if (inputText.value.trim() === '') {
        alert('Please enter a valid task!')
    } else {
        let newTask = document.createElement('div')
        newTask.classList.add('task')
        newTask.innerHTML = `<p class="task-name unchecked">${inputText.value}</p>
                    <button class="delete-button"><i class="fa-solid fa-x"></i></button>`

        taskList.appendChild(newTask)
        
        
        let deleteButton = newTask.querySelector('.delete-button')

        function deleteTask () {
            newTask.remove()
        }

        deleteButton.addEventListener('click', deleteTask)


        let taskName = newTask.querySelector('.task-name')

        function checkUncheck () {
            if (taskName.classList.contains('unchecked')) {
                taskName.classList.remove('unchecked')
                taskName.classList.add('checked')
            } else {
                taskName.classList.remove('checked')
                taskName.classList.add('unchecked')
            }
        }

        taskName.addEventListener('click', checkUncheck)

        
    




        inputText.value = ''
    }
}



addBtn.addEventListener('click', addNewTask)

inputText.addEventListener('keydown' ,function(event) {
    if (event.key === 'Enter') {
        addNewTask()
    }
})


function SaveToLocalStorage() {
    
}