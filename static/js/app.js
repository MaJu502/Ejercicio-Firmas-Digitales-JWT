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
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            login();
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            register();
        });
    }
});


function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const email = document.getElementById('registerEmail').value;

    fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username, password: password, email: email })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received data:', data);
        if (data.token) {
            sessionStorage.setItem('jwt', data.token);
            console.log('Token stored:', sessionStorage.getItem('jwt'));
            alert('Registration successful! You are now logged in.');
            window.location.href = `/display-protected?token=${data.token}`;
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed.');
    });
}

function accessProtected() {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        console.error("No token found, please login first.");
        window.location.href = '/login';  // Redirige al login si no hay token
        return;
    }

    fetch('/protected', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch protected data: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Protected data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch protected data');
    });
}

function redirectToLogin() {
    window.location.href = '/login';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received data:', data);
        if (data.token) {
            sessionStorage.setItem('jwt', data.token);
            console.log('Token stored:', sessionStorage.getItem('jwt'));
            alert('Logged in successfully!');
            window.location.href = `/display-protected?token=${data.token}`;
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed.');
    });
}

function redirectToRegister() {
    window.location.href = '/register';
}