const createForm = document.getElementById("create-form");
const todoList = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

createForm.addEventListener("submit", handleSumbit);

function handleSumbit(e) {
  e.preventDefault();
  const todoInput = this.value;
  const newTodo = {
    id: new Date().getTime(),
    title: todoInput.value,
  };
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateList();
  createForm.reset();
}

function updateTodo(e) {
  e.preventDefault();
  const todo = this.parentNode;
  const id = parseInt(todo.id);
  const content = `
    <form>
      <input name="title" value="${todo.dataset.title}"/>
      <button type="submit" class="complete-button">완료</button>
      </form>
  `;
  todo.innerHTML = content;
  const updateForm = todo.querySelector("form");
  updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newTitle = e.target.title.value;
    console.log(newTitle)
    todos.map(todo => {
      if (todo.id === id) {
        todo["title"] = newTitle
      }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
    updateList();
  });
}

function deleteTodo(e) {
  e.preventDefault();
  const id = parseInt(this.parentNode.id);
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateList();
}

function updateList() {
  const content = todos
    .map((todo) => {
      return `
      <li id="${todo.id}" class="todo-item" data-title="${todo.title}">
        <p class="todo-title">${todo.title}</p>
        <button class="update-todo">수정</button>
        <button class="delete-todo">삭제</button>
      </li>
    `;
    })
    .join("");
  todoList.innerHTML = content;

  const updateButtons = todoList.querySelectorAll("#todo-list .update-todo");
  updateButtons.forEach((button) =>
    button.addEventListener("click", updateTodo)
  );

  const deleteButtons = todoList.querySelectorAll("#todo-list .delete-todo");
  deleteButtons.forEach((button) =>
    button.addEventListener("click", deleteTodo)
  );
}

updateList();
