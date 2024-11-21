document.addEventListener("DOMContentLoaded", () => {
    const todo_input = document.getElementsByClassName('input')[0]
    const btn = document.getElementsByClassName('submit')[0]
    const todo_lists = document.getElementsByClassName('lists')[0]

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    console.log(typeof tasks)
    tasks.forEach(task => {
        displayTasksOnScreen(task)
    });
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

    function displayTasksOnScreen(task){
        console.log(task);  
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        li.innerHTML = `<span>${task.text}</span>
                        <button class = 'delete-btn'>Delete</button>
                        `
        todo_lists.appendChild(li)

        li.addEventListener('click', (e)=>{
            if(e.target.value === 'BUTTON') return
            task.completed = !task.completed
            li.classList.toggle("completed")
        })

        li.classList.add('todo-item')

        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTasks()
        });
        
    }

    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})
