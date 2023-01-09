const createForm = document.getElementById("create-form");
const select = document.getElementById("sort-select");
const todoList = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

createForm.addEventListener("submit", handleSumbit);
select.addEventListener("change", handleChange);

function handleSumbit(e) {
  e.preventDefault();
  const todoInput = this.value;
  const newTodo = {
    id: new Date().getTime(),
    title: todoInput.value,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateList();
  createForm.reset();
}

function handleChange() {
  const order = this.value === "ascending" ? 1 : -1;
  todos = todos.sort(
    (a, b) => order * (new Date(a.createdAt) - new Date(b.createdAt))
  );
  updateList();
}

function updateTodo(e) {
  e.preventDefault();
  const todo = this.parentNode;
  const id = parseInt(todo.id);
  const content = `
    <form class="update-form">
      <input class="update-input" name="title" value="${todo.dataset.title}"/>
      <button type="submit" >완료</button>
    </form>
  `;
  todo.innerHTML = content;
  const updateForm = todo.querySelector("form");
  updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newTitle = e.target.title.value;
    console.log(newTitle);
    todos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, title: newTitle, updatedAt: new Date() }
        : todo
    );
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
      <li id="${todo.id}" data-title="${todo.title}">
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
