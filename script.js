// App state

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

// Generic / helper functions

const focus = function (condition, element) {
    if (condition) {
        setTimeout(
            function () {
                element.focus()
            },
            0
        )
    }
}

const appendArray = function (array, container) {
    array.forEach(function (element) {
        container.appendChild(element)
    })
}

const renderInput = function (onChange, focusCondition, className) {
    const input = document.createElement('input')
    input.className = className

    input.value = newToDoName

    input.addEventListener('input', onChange)

    focus(focusCondition, input)

    return input
}

// State changing functions

const onNewToDoNameChange = function (event) {
    newToDoInputIsFocused = true
    newToDoName = event.target.value
    update()
}

const onNewToDoSubmit = function (event) {
    event.preventDefault()

    tasks = tasks.concat({
        name: newToDoName,
        isCompleted: false,
    })

    newToDoName = ''

    update()
}

const onTaskCompleteToggle = function (indexToToggle) {
    tasks = tasks.map(function (task, index) {
        if (index !== indexToToggle) return task

        return {
            name: task.name,
            isCompleted: !task.isCompleted,
        }
    })

    update()
}

// Rendering

const renderTask = function (task, onClick) {
    const container = document.createElement('li')
    container.className = 'todo-list__list-item'

    container.addEventListener(
        'click',
        onClick
    )

    if (task.isCompleted) {
        container.className = container.className + ' todo-list__list-item--completed'
    }

    container.innerText = task.name

    return container
}

const renderTasksList = function (tasks) {
    const container = document.createElement('ol')
    container.className = 'todo-list__list'

    const tasksElements = tasks.map(function (task, index) {
        return renderTask(task, function () { onTaskCompleteToggle(index) })
    })

    appendArray(tasksElements, container)

    return container
}

const renderNewTaskButton = function (label) {
    const button = document.createElement('button')
    button.className = 'todo-list__button'

    button.innerText = label

    return button
}

const renderNewTaskInput = function () {
    return renderInput(
        onNewToDoNameChange,
        newToDoInputIsFocused,
        'todo-list__input'
    )
}

const renderNewTaskForm = function () {
    const container = document.createElement('form')
    container.className = 'todo-list__form'

    container.addEventListener('submit', onNewToDoSubmit)

    const inputElement = renderNewTaskInput()
    const buttonElement = renderNewTaskButton('ADD')

    container.appendChild(inputElement)
    container.appendChild(buttonElement)

    return container
}

const render = function () {
    const container = document.createElement('div')
    container.className = 'todo-list'

    const newTaskFormElement = renderNewTaskForm()
    const taskListElement = renderTasksList(tasks)

    container.appendChild(newTaskFormElement)
    container.appendChild(taskListElement)

    return container
}

const update = function () {
    mainContainer.innerHTML = ''

    const app = render()

    mainContainer.appendChild(app)
}

const init = function (selector) {

    const container = document.querySelector(selector)

    if (!container) {
        console.log('Container do not exist!')
        return
    }

    mainContainer = container

    const app = render()

    mainContainer.appendChild(app)

}

init('.root')