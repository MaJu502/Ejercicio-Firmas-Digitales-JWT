document.addEventListener('DOMContentLoaded', () => {
    // Ejemplo de código: cambiar el color de fondo de un elemento al hacer clic
    const items = document.querySelectorAll('.data-container li');
    items.forEach(item => {
        item.addEventListener('click', () => {
            item.style.backgroundColor = '#f0f0f0';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('jwt');
        window.location.href = '/login';
    });
});
