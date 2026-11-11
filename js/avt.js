var users = JSON.parse(localStorage.getItem("users")) || [];

var currentUser = JSON.parse(localStorage.getItem("currentUser"));


var registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        var name = document.getElementById("register-name").value;
        var email = document.getElementById("register-email").value;
        var password = document.getElementById("register-password").value;
        var confirmPassword = document.getElementById("confirm-password").value;

        var message = document.getElementById("register-message");


        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match!";
            message.style.color = "red";

            return;
        }


        var existingUser = users.find(function(user) {
            return user.email === email;
        });

        if (existingUser) {

            message.textContent = "This email is already registered!";
            message.style.color = "red";

            return;
        }


        var newUser = {
            name: name,
            email: email,
            password: password
        };


        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));


        currentUser = {
            name: name,
            email: email
        };

        localStorage.setItem("currentUser", JSON.stringify(currentUser));


        message.textContent = "Registration successful!";
        message.style.color = "lightgreen";


        setTimeout(function() {
            window.location.href = "index.html";
        }, 1000);

    });

}



var loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        var email = document.getElementById("login-email").value;
        var password = document.getElementById("login-password").value;

        var message = document.getElementById("login-message");


        var foundUser = users.find(function(user) {
            return user.email === email && user.password === password;
        });


        if (!foundUser) {

            message.textContent = "Incorrect email or password!";
            message.style.color = "red";

            return;
        }


        currentUser = {
            name: foundUser.name,
            email: foundUser.email
        };

        localStorage.setItem("currentUser", JSON.stringify(currentUser));


        message.textContent = "Login successful!";
        message.style.color = "lightgreen";


        setTimeout(function() {
            window.location.href = "index.html";
        }, 1000);

    });

}



function updateHeader() {

    var userArea = document.getElementById("user-area");

    if (!userArea) {
        return;
    }


    if (currentUser) {

        userArea.innerHTML = `
            <span class="profile-name">Hello, ${currentUser.name}</span>
            <button id="logout-button">Logout</button>
        `;


        document.getElementById("logout-button").addEventListener("click", function() {

            localStorage.removeItem("currentUser");

            window.location.href = "index.html";

        });

    }

}


updateHeader();