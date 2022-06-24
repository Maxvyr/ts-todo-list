import { v4 as uuidV4 } from 'uuid'

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const localStorageTasks = "TASKS"
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks : Task[] = loadTasks()

//start page load all task inside localStorage
tasks.forEach(addListItem)


form?.addEventListener("submit", e => {
  e.preventDefault()

  if(input?.value == "" || input?.value == null) return

  const task : Task = {
    id: uuidV4(),
    title: input.value,
    completed : false,
    createdAt : new Date()
  }

  tasks.push(task)
  saveTasks()

  addListItem(task)
  input.value = "" //remove text inside form
})


function addListItem(task : Task) : boolean {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
  return true
}

function saveTasks() {
  localStorage.setItem(localStorageTasks, JSON.stringify(tasks))
}

function loadTasks() : Task[] {
  const taskJSON = localStorage.getItem(localStorageTasks)
  if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}