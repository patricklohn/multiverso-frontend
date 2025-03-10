// Seleção de elementos 
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;


// Funções 

// Adicionar todo ->
const saveTodo = (text, done = 0, save = 1) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtnn = document.createElement("button")
    deleteBtnn.classList.add("remove-todo")
    deleteBtnn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtnn);

    // Utilizando dados da localStorage
    if(done){
        todo.classList.add("done")
    }

    if(save){
        saveTodoLocalStorage({text, done})
    }

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};
 
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

cancelEditBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    toggleForms();
})

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo)=>{

        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;

            updateTodoLocalStorage(oldInputValue , text);
        }

    })
};

const getSearchTodos = (search) =>{
        const todos = document.querySelectorAll(".todo");
    
        todos.forEach((todo)=>{
    
            let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

            const normalizedSearch = search.toLowerCase();
            
            if(!todoTitle.includes(search)){
                todo.style.display = "none";
            }
        })
}

// Filter

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch(filterValue){
        case "all":
         todos.forEach((todo) => todo.style.display = "flex")
         break

         case "done":
            todos.forEach((todo) => todo.classList.contains("done")? todo.style.display = "flex": todo.style.display = "none")
            break

            case "todo":
                todos.forEach((todo) => !todo.classList.contains("done")? todo.style.display = "flex": todo.style.display = "none")
                break

            default:
                break;
    }
}

// Eventos 

// Adicionar todo ->
todoForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const inputValue = todoInput.value 

    if(inputValue){
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e)=>{

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle; 

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    // Finalizar todo ->
    if(targetEl.classList.contains("finish-todo")){
        // parentEl.classList.add("done");
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle)
    }

    // Remover todo
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();

        removeTodoLocalStorage(todoTitle);
    }    

    // Editar o todo
    if(targetEl.classList.contains("edit-todo")){
        toggleForms()

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

editForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const editInputValue = editInput.value
    if(editInputValue){
        // Atualizar
        updateTodo(editInputValue);
    }

    toggleForms();
})

searchInput.addEventListener("keyup", (e) =>{

    const search = e.target.value;

    getSearchTodos(search);

})

eraseBtn.addEventListener("click",(e)=>{
    e.preventDefault;

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
})

filterBtn.addEventListener("change",(e)=>{

    const filterValue = e.target.value;

    filterTodos(filterValue);
})

// Local Storage 

const getTodosLocalStorage = () =>{
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0)
    })
}

const saveTodoLocalStorage = (todo) =>{
    //todos os todos da ls 
    const todos = getTodosLocalStorage();

    // add o novo todo no arr
    todos.push(todo) 

    // salvar tudo na ls
    localStorage.setItem("todos", JSON.stringify(todos))

}

const removeTodoLocalStorage = (todoText) =>{

    const todos = getTodosLocalStorage();

    const filterTodos = todos.filter((todo) => todo.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(filterTodos));

};

const updateTodoStatusLocalStorage = (todoText) =>{

    const todos = getTodosLocalStorage();

    todos.map((todo) => todo.text === todoText ? todo.done = !todo.done : null);

    localStorage.setItem("todos", JSON.stringify(todos));

}

const updateTodoLocalStorage = (todoOldText, todoNewText) =>{

    const todos = getTodosLocalStorage();

    todos.map((todo) => todo.text === todoOldText ? (todo.text = todoNewText) : null);

    localStorage.setItem("todos", JSON.stringify(todos));

}

loadTodos();