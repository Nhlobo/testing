<script>
        const toggleButton = document.querySelector("#toggleButton");
        const mainMenu = document.querySelector("#mainMenu");
        const closeMenuButton = document.querySelector("#closeMenuButton");

        toggleButton.addEventListener('click', function () {
            mainMenu.classList.toggle('active');
            toggleButton.innerHTML = mainMenu.classList.contains("active") ? "&#215;" : "&#9776;";
        });

        closeMenuButton.addEventListener('click', function () {
            mainMenu.classList.remove('active');
            toggleButton.innerHTML = "&#9776;";
        });

        document.addEventListener('click', function(event) {
            if (!mainMenu.contains(event.target) && !toggleButton.contains(event.target)) {
                mainMenu.classList.remove('active');
                toggleButton.innerHTML = "&#9776;";
            }
        });

        function closeMenuAndNavigate(target) {
            mainMenu.classList.remove('active');
            toggleButton.innerHTML = "&#9776;";
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        }
    </script>
