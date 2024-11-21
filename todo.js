document.addEventListener("DOMContentLoaded", () => {
    const todo_input = document.getElementsByClassName('input')[0]
    const btn = document.getElementsByClassName('submit')[0]
    const todo_lists = document.getElementsByClassName('lists')[0]

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    btn.addEventListener('click', () => {
    const task = todo_input.value.trim()
    if(task === ""){
        return
    }
    const todo_task = {
        id: Date.now(),
        text: task,
        completed:false
    }
    tasks.push(todo_task)
    console.log(tasks);  
    saveTasks()
    todo_input.value = ""
    })

    function displayTasksOnScreen(tasks){
        console.log(tasks);  
    }

    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})