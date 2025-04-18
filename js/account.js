document.addEventListener("DOMContentLoaded", () => {
    // Подключение header
    fetch('./components/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      });
  
    // Подключение footer
    fetch('./components/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      });
  
    // === ToDo Liste===
    const form = document.querySelector('.todo__form');
    const input = document.querySelector('.todo__input');
    const list = document.querySelector('.todo__list');
  // ===

  // ===<li class="todo__item">===
  // ===<label class="todo__label">===
  // ===  <input type="checkbox" class="todo__checkbox" />===
   // === <span class="todo__text">задача</span>===
  // ===</label>===
 // === <button class="todo__delete" title="Удалить задачу">✖</button>===
// ===</li>

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const aufgabeText = input.value.trim();
      if (aufgabeText === '') return;
  
      const li = document.createElement('li');
      li.classList.add('todo__item');
  
      li.innerHTML = `
        <label class="todo__label">
          <input type="checkbox" class="todo__checkbox" />
          <span class="todo__text">${aufgabeText}</span>
        </label>
        <button class="todo__delete" title="Удалить задачу">✖</button>
      `;
  
      list.appendChild(li);
      input.value = '';
    });
  
    // === Обработка кликов по списку (чекбокс или удаление) ===
    list.addEventListener('click', function (e) {
      const clickedElement  = e.target;
  
      if (clickedElement .classList.contains('todo__delete')) {
        clickedElement .closest('.todo__item').remove();
      }
  
      if (clickedElement .classList.contains('todo__checkbox')) {
        const item = clickedElement .closest('.todo__item');
        item.classList.toggle('done', clickedElement .checked);
      }
    });


  });
  