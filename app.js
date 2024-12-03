function renderData() {
  var todos = getTodos();
  todoList.innerHTML = ""; 

  todos.forEach(function (todo, index) {
    var listItem = createTodoItem(todo, index, todos);
    todoList.appendChild(listItem); 
  });
}

function createTodoItem(todo, index, todos) {
  var listItem = document.createElement("li");
  listItem.className = todo.done ? "done" : ""; 

  var content = document.createElement("span");
  content.textContent = todo.text;

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = todo.text;
  editInput.style.display = "none";

  var editButton = createButton("Edit", function () {
    toggleEditMode(listItem, editInput, content, editButton, saveButton);
  });
  var saveButton = createButton("Save", function () {
    saveTodoEdit(editInput, todos, index);
  }, { hidden: true });
  var deleteButton = createButton("Delete", function () {
    deleteTodo(todos, index);
  });
  var doneButton = createButton("Done", function () {
    markAsDone(todos, index);
  }, { hidden: todo.done });

  listItem.append(content, editInput, saveButton, deleteButton);
  if (!todo.done) listItem.append(editButton, doneButton);

  return listItem;
}

function createButton(label, onClick, options) {
  var button = document.createElement("button");
  button.textContent = label;
  button.style.display = options && options.hidden ? "none" : "inline";
  button.onclick = onClick;
  return button;
}

function toggleEditMode(listItem, editInput, content, editButton, saveButton) {
  var isEditing = editInput.style.display === "inline";
  editInput.style.display = isEditing ? "none" : "inline";
  content.style.display = isEditing ? "inline" : "none";
  editButton.style.display = isEditing ? "inline" : "none";
  saveButton.style.display = isEditing ? "none" : "inline";
}

function saveTodoEdit(editInput, todos, index) {
  var updatedText = editInput.value.trim();
  if (updatedText) {
    todos[index].text = updatedText;
    saveTodos(todos);
    renderData();
  }
}

function deleteTodo(todos, index) {
  todos.splice(index, 1);
  saveTodos(todos);
  renderData();
}

function markAsDone(todos, index) {
  todos[index].done = true;
  saveTodos(todos);
  renderData();
}

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

todoForm.onsubmit = function (e) {
  e.preventDefault();
  var text = todoInput.value.trim();
  if (text) {
    var todos = getTodos();
    todos.push({ text: text, done: false });
    saveTodos(todos);
    renderData();
    todoInput.value = ""; 
  }
};

renderData();
