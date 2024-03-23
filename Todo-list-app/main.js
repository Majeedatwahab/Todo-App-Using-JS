import './style.css';
import './utils/bling';

function app() {
  // state
  let state = {id: 0, todos: []};
  // ui
  let ui = {
    input: $('input'),
    form: $('form'),
    todos: $('todos')
  }
  console.log(ui)
  alert("To edit, click on the task to be edited, after editing click anywhere on the page to save the new task")

  return mk('div', { id: 'app' }, [
    mk('h1', null, [
      'A Simple Todo App',
      mk('img', { src: 'assets/pngwing.com.png'})]),
    
     
    (ui.form = mk('form', { id: 'form' }, [
      (ui.input = mk('input', { className: 'todo' , type: 'text', id: 'todo', placeholder: 'Enter a task' })),
      mk('button', { type: 'submit', onclick: add , className: 'addBtn'}, [
        mk('img', {src:'assets/icons8-add-30.png'})]),

    ])),
    (ui.todos = mk('ul', { id: 'todos' }))
  ]);

  function createTodo(todo) {
    let item; 
    let text; 

    item = mk('li', { className: 'todo-item', 'data-id': todo.id }, [
      (text = mk('span', {}, [todo.text])),
    ]);
  
    text.contentEditable = true;

  
    const editButton = mk('button', {className: 'editBtn', onclick:()=>editTodoItem(todo.id, text)}, [
     ]);
    item.appendChild(editButton);
    

    const removeButton = mk('button', {className: 'delBtn' ,onclick:()=>removeTodoItem(item, todo.id)},[
      mk('img', {src: 'assets/icons8-delete-30.png'})]);
    item.appendChild(removeButton)


    return item;
  }

  function add(event) {
    event.preventDefault();

    const text = ui?.input.value;

    if (!text) return;
   state.id++;
    const todo = { text: text, completed: false, id: state.id};
    console.log(todo)

    ui.input.value = '';


    state.todos.push(todo);
   console.log(todo)
    console.log(state.todos)

    ui?.todos.prepend(createTodo(todo));
   
  }
  function editTodoItem(todoId, textElement) {
    const newText = textElement.textContent.trim();
    if (newText === '') {
        alert('Todo item cannot be empty!');
        return;
    }
    
    const todoIndex = state.todos.findIndex(todo => todo.id === todoId);
    
    if (todoIndex !== -1) {
      
        state.todos[todoIndex].text = newText;

      
        console.log('Updated state:', state.todos);
    } else {
        console.error('Todo item not found in state:', todoId);
    }
  
}


function removeTodoItem(item, todoId) {
  const todoIndex = state.todos.findIndex(todo => todo.id === todoId);
  
  if (todoIndex !== -1) {
      state.todos.splice(todoIndex, 1);
    
      console.log('Updated state:', state.todos);
  } else {
      console.error('Todo item not found in state:', todoId);
  }
  
  // Remove the todo item from the DOM
  item.remove();
}
}

function render() {
  document.body.prepend(app());
}

render();