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

        document.addEventListener("DOMContentLoaded", () => {
          if (!document.querySelector(".page-wrapper")) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("page-wrapper");
        
            while (document.body.firstChild) {
              wrapper.appendChild(document.body.firstChild);
            }
        
            document.body.appendChild(wrapper);
          }
        
          fetch("./components/header.html")
          .then((response) => response.text())
          .then((data) => {
            const header = document.getElementById("header");
            if (header) {
              header.innerHTML = data;
      
              // Подсветка
              const currentPage = window.location.pathname.split("/").pop() || "index.html";
      
              header.querySelectorAll("nav a").forEach((link) => {
                const href = link.getAttribute("href");
                if (href && href.endsWith(currentPage)) {
                  link.classList.add("active");
                }
              });
            }
          });
        
          fetch("./components/footer.html")
            .then((res) => res.text())
            .then((data) => {
              const footer = document.getElementById("footer");
              if (footer) footer.innerHTML = data;
            });
        });
        

        

