// тест , пока не готов логин
if (!localStorage.getItem("loggedUser")) {
  localStorage.setItem("loggedUser", "anna");
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".page-wrapper")) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("page-wrapper");

    while (document.body.firstChild) {
      wrapper.appendChild(document.body.firstChild);
    }
    document.body.appendChild(wrapper);
  }

  // Подключение header
  fetch("./components/header.html")
    .then((response) => response.text())
    .then((data) => {
      const header = document.getElementById("header");
      if (header) header.innerHTML = data;
    });

  // Подключение footer
  fetch("./components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = data;
    });



  // Получение loggedUser
  const username = localStorage.getItem("loggedUser");

  // === Данные пользователя ===
  fetch("./users.json")
    .then((res) => res.json())
    .then((users) => {
      const user = users.find((u) => u.username === username);
      if (!user) return alert("Пользователь не найден");

      document.querySelector(".account__name").textContent = user.name;
      document.querySelector("#extraOptions").checked = user.extraOptions;

      const liste = document.querySelector(".todo__list");
      const storedTasks = localStorage.getItem("todoTasks");
      const tasks = storedTasks ? JSON.parse(storedTasks) : user.todo;

      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.classList.add("todo__item");
        if (task.done) li.classList.add("done");

        li.innerHTML = `
          <label class="todo__label">
            <input type="checkbox" class="todo__checkbox" ${
              task.done ? "checked" : ""
            } />
            <span class="todo__text">${task.text}</span>
          </label>
          <button class="todo__delete" title="Удалить задачу">✖</button>
        `;
        liste.appendChild(li);
      });

      const checkbox_extraOptions = document.querySelector("#extraOptions");
      const savedOption = localStorage.getItem("extraOptions");

      if (savedOption !== null) {
        checkbox_extraOptions.checked = savedOption === "true";
      }

      checkbox_extraOptions.addEventListener("change", () => {
        localStorage.setItem("extraOptions", checkbox_extraOptions.checked);
      });

      function saveTasksToStorage() {
        const allTasks = [];

        document.querySelectorAll(".todo__item").forEach((item) => {
          const text = item.querySelector(".todo__text").textContent;
          const done = item.querySelector(".todo__checkbox").checked;
          allTasks.push({ text, done });
        });

        localStorage.setItem("todoTasks", JSON.stringify(allTasks));
      }

      // === ToDo Liste===
      const form = document.querySelector(".todo__form");
      const input = document.querySelector(".todo__input");
      const list = document.querySelector(".todo__list");

      // ===<li class="todo__item">===
      // ===<label class="todo__label">===
      // ===  <input type="checkbox" class="todo__checkbox" />===
      // === <span class="todo__text">задача</span>===
      // ===</label>===
      // === <button class="todo__delete" title="Удалить задачу">✖</button>===
      // ===</li>

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const aufgabeText = input.value.trim();
        if (aufgabeText === "") return;

        const li = document.createElement("li");
        li.classList.add("todo__item");

        li.innerHTML = `
        <label class="todo__label">
          <input type="checkbox" class="todo__checkbox" />
          <span class="todo__text">${aufgabeText}</span>
        </label>
        <button class="todo__delete" title="Удалить задачу">✖</button>
      `;

        list.appendChild(li);
        input.value = "";
      });

      list.addEventListener("click", function (e) {
        const clickedElement = e.target;

        if (clickedElement.classList.contains("todo__delete")) {
          clickedElement.closest(".todo__item").remove();
          saveTasksToStorage();
        }

        if (clickedElement.classList.contains("todo__checkbox")) {
          const item = clickedElement.closest(".todo__item");
          item.classList.toggle("done", clickedElement.checked);
          saveTasksToStorage();
        }
      });
    }); //  закрытие fetch.then
}); // закрытие DOMContentLoaded
