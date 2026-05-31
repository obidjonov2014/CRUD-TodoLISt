const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

let OpenItemID

// check

let todos = JSON.parse(localStorage.getItem('list') || '[]')

if (todos.length) showTodos()

// settodos to localstorage

function settodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}

// time

function getTime() {
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)
    const year = now.getFullYear()
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()


    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const month_title = now.getMonth()
    fullDay.textContent = `${date} ${months[month_title]}, ${year}`

    hourEl.textContent = hour
    minuteEl.textContent = minutes
    secondEl.textContent = second

    setInterval(getTime, 1000)

    return `${hour}:${minutes}, ${date}.${month}.${year}`
}

getTime()


// show error

function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message

    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 2500)
}

// show todos

function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''
    todos.forEach((a, i) => {
        listGroupTodo.innerHTML += `
            <li class="list-group-item d-flex justify-content-between">
            ${a.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${a.time}</span>
            <img onclick = "editTodo(${i})" width="25px" height="25px" src="./img/edit.svg" alt="">
            <img onclick = "deleteTodo(${i})" width="25px" height="25px" src="./img/delete.svg" alt="">
          </div>
        </li>
    `
    })

}


// get todos

formCreate.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = formCreate['input-create'].value.trim()
    formCreate.reset()
    if (todoText.length) {
        todos.push({ text: todoText, time: getTime(), completed: false })
        settodos()
        showTodos()
    } else {
        showMessage('message-create', 'Please enter some text')
    }
})

// deleteTodo

function deleteTodo(id) {
    const deletedTodos = todos.filter((a, i) => {
        return i !== id
    })
    todos = deletedTodos
    settodos()
    showTodos()
}

// edit form

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if (todoText.length) {
        todos.splice(OpenItemID, 1, { text: todoText, time: getTime(), completed: false })
        settodos()
        showTodos()
        close()
    } else {
        showMessage('message-create', 'Please enter some text')
    }
})


// editTodo

function editTodo(id) {
    open()
    OpenItemID = id
}

function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)
document.addEventListener('keydown', (e) => {
    if (e.which == 27) {
        close()
    }
})
