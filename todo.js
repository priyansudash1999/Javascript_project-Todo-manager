document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date')
    const todo_input = document.getElementsByClassName('input')[0]
    const btn = document.getElementsByClassName('submit')[0]
    const todo_lists = document.getElementsByClassName('lists')[0]

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(t => {
        showOnScreen(t)
    });

    btn.addEventListener('click', () => {
        const task = todo_input.value.trim()
        const date = dateInput.value.trim()
        if(task === "" || date === ""){
            return
        }
        const todo_task = {
            id: Date.now(),
            text: task,
            date: date,
            completed:false
        }
        tasks.push(todo_task) 
        saveTasks()
        showOnScreen(todo_task)
        todo_input.value = ""
    })

    function showOnScreen(task){
        const li = document.createElement('li')
        li.setAttribute('data_id', task.id)
        li.innerHTML = `<span>${task.date} => ${task.text}</span>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                       `
        todo_lists.appendChild(li)
        li.classList.add('todo-item')

        li.addEventListener('click', (e) => {
            if(e.target.value === 'BUTTON'){
                return
            }
            task.completed = !task.completed
            li.classList.toggle('completed')
        })

        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTasks()
        });

        li.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            todo_input.value = task.text;
            dateInput.value = task.date;
            btn.disabled = true;
            const saveEditButton = document.createElement('button');
            saveEditButton.textContent = 'Save Edit';
            saveEditButton.classList.add('save-edit-btn');
            li.appendChild(saveEditButton);
        
            saveEditButton.addEventListener('click', () => {
                const newText = todo_input.value.trim();
                const newDate = dateInput.value.trim();
        
                if (newText === '' || newDate === '') {
                    alert('Task and date cannot be empty!');
                    return;
                }
        
                task.text = newText;
                task.date = newDate;

                li.innerHTML = `<span>${task.date} => ${task.text}</span>
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>`;
                li.classList.add('todo-item');
                saveTasks();
        
                btn.disabled = false;

                li.querySelector('.delete-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    tasks = tasks.filter(t => t.id !== task.id);
                    li.remove();
                    saveTasks();
                });
        
                li.querySelector('.edit-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                });
                todo_input.value = '';
                dateInput.value = '';
            });
        
            const cancelEditButton = document.createElement('button');
            cancelEditButton.textContent = 'Cancel';
            cancelEditButton.classList.add('cancel-edit-btn');
            li.appendChild(cancelEditButton);
        
            cancelEditButton.addEventListener('click', () => {
                li.innerHTML = `<span>${task.date} => ${task.text}</span>
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>`;
                li.classList.add('todo-item');
        
                btn.disabled = false;

                li.querySelector('.delete-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    tasks = tasks.filter(t => t.id !== task.id);
                    li.remove();
                    saveTasks();
                });
        
                li.querySelector('.edit-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                });
                todo_input.value = '';
                dateInput.value = '';
            });
        });
        
        
    }



    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

})
