let todos = [];
let currentFilter = 'all';

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const itemCount = document.getElementById('item-count');

addBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text !== '') {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        todos.push(newTodo); 
        todoInput.value = '';
        renderTodos();
    }
});

function renderTodos() {
    todoList.innerHTML = '';
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => todo.completed === false); 
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed === true);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            renderTodos();
        });

        const span = document.createElement('span');
        span.textContent = todo.text;
        
        span.addEventListener('dblclick', () => {
            const newText = prompt('Edit your task:', span.textContent);
            if (newText !== null && newText.trim() !== '') {
                todo.text = newText.trim();
                renderTodos();
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.classList.add('delete-btn');
        
        deleteBtn.addEventListener('click', () => {
            // Keep everything except the one we clicked
            todos = todos.filter(t => t.id !== todo.id); 
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    const activeTodos = todos.filter(todo => todo.completed === false);
    itemCount.textContent = `${activeTodos.length} items left`;
}

document.getElementById('clear-completed').addEventListener('click', () => {
    todos = todos.filter(todo => todo.completed === false);
    renderTodos();
});


document.getElementById('clear-all').addEventListener('click', () => {
    todos = [];
    renderTodos();
});


document.getElementById('filter-all').addEventListener('click', () => {
    currentFilter = 'all';
    renderTodos();
});

document.getElementById('filter-active').addEventListener('click', () => {
    currentFilter = 'active';
    renderTodos();
});

document.getElementById('filter-completed').addEventListener('click', () => {
    currentFilter = 'completed';
    renderTodos();
});