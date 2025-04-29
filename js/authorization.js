        // Предустановленные логин и пароль
        const correctUsername = 'admin';
        const correctPassword = '12345';

        // Показ модального окна при загрузке страницы
        window.onload = function() {
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('authModal').style.display = 'block';
        };

        // Функция проверки авторизации
        function authenticate() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === correctUsername && password === correctPassword) {
                alert('Успешная авторизация!');
                document.getElementById('overlay').style.display = 'none';
                document.getElementById('authModal').style.display = 'none';
            } else {
                alert('Неверный логин или пароль. Попробуйте еще раз.');
            }
        }
        // Подключение header
  fetch("./components/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
  });

// Подключение footer
fetch("./components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

