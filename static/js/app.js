function sendRequest(url, method, data, callback) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        register();
    });
});

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                sessionStorage.setItem('jwt', data.token);
                alert('Registration successful! You are now logged in.');
                window.location.href = '/protected';
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed.');
        });
}

function redirectToLogin() {
    window.location.href = '/login';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    sendRequest('/login', 'POST', { username: username, password: password }, data => {
        localStorage.setItem('token', data.token);
        alert('Logged in successfully!');
    });
}

function accessProtected() {
    const token = sessionStorage.getItem('jwt');
    fetch('/protected', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(JSON.stringify(data));
    })
    .catch(error => console.error('Error:', error));
}


function redirectToRegister() {
    window.location.href = '/register';
}