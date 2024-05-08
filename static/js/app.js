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
    const email = document.getElementById('registerEmail').value;
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password, email: email })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                sessionStorage.setItem('jwt', data.token);
                alert('Registration successful! You are now logged in.');
                accessProtected();
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
    alert('se ejecuta accessProtected!!!!')
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        alert("No token found, please login first.");
        return;
    }

    fetch('/protected', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token  // Asegúrate de que esto está presente
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


function redirectToRegister() {
    window.location.href = '/register';
}