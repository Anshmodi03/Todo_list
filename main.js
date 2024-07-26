// selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// events LIsteners
// here addTodo is a function 
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


// functions
// added event because to specify the function when to execute the code inside it 
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault(); 
    // todo div creation
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);  
    // ADD TODO to Local storage 
    saveLocalTodos(todoInput.value);
    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; 
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value = "";

}

function deleteCheck(e){
    const item = e.target;
    console.log(item);
    // Delete MARK
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation

        todo.classList.add("fall");
        todo.addEventListener('transitionend ', function(){
        todo.remove();
    });    
    }

    // CHECK MARK
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

    function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
    switch(e.target.value){
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
        if(todo.classList.contains('completed')){
            todo.style.display = 'flex';
        }else{
            todo.style.display = 'none';
        }
        break;
    case "uncompleted":
        if(!todo.classList.contains('completed')){
            todo.style.display = 'flex';
            }else{
                todo.style.display = 'none';
                }
                break;
    }
    });
}

function saveLocalTodos(todo){
    // CHECK -- do i already have things in there ?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}
// not did the local storage part because not seem important for the first time doing js project using DOM
