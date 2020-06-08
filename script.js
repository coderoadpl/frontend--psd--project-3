let mainContainer = null

let filter = 'ALL' // one of ALL, DONE, NOT-DONE
let sort = 'ASCENDING' // ASCENDING or DESCENDING

let searchPhrase = ''
let searchInputIsFocused = false
let newToDoName = ''
let newToDoInputIsFocused = false

let tasks = [
    {
        name: 'Wynieś śmieci',
        isCompleted: true,
    },
    {
        name: 'Zmyj naczynia',
        isCompleted: false,
    }
]

const appendArray = function (array, container) {
    array.forEach(function (element) {
        container.appendChild(element)
    })
}

const renderTask = function(task){
    const container  = document.createElement('li')
    container.className = 'todo-list__list-item'

    if(task.isCompleted){
        container.className = container.className + ' todo-list__list-item--completed'
    }

    container.innerText = task.name

    return container
}

const renderTasksList = function(tasks){
    const container  = document.createElement('ol')
    container.className = 'todo-list__list'

    const tasksElements = tasks.map((task) => {
        return renderTask(task)
    })

    appendArray(tasksElements, container)

    return container
}

const renderNewTaskInput = function(){
    const input = document.createElement('input')
    input.className = 'todo-list__input'
    
    return input
}

const renderNewTaskButton = function(label){
    const button = document.createElement('button')
    button.className = 'todo-list__button'

    button.innerText = label

    return button
}

const renderNewTaskForm = function(){
    const container  = document.createElement('form')
    container.className = 'todo-list__form'

    const inputElement = renderNewTaskInput()
    const buttonElement = renderNewTaskButton('ADD')

    container.appendChild(inputElement)
    container.appendChild(buttonElement)

    return container
}

const render = function() {
    const container  = document.createElement('div')
    container.className = 'todo-list'

    const newTaskFormElement = renderNewTaskForm()
    const taskListElement = renderTasksList(tasks)

    container.appendChild(newTaskFormElement)
    container.appendChild(taskListElement)

    return container
}

const init = function(selector){

    const container = document.querySelector(selector)

    if(!container) {
        console.log('Container do not exist!')
        return
    }

    mainContainer = container
    
    const app = render()

    mainContainer.appendChild(app)

}

init('.root')