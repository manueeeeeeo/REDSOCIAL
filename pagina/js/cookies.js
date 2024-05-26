// Función para verificar si se ha dado clic en el botón de aceptar cookies
function aceptarCookies() {
    // Almacenamos la decisión del usuario en el almacenamiento local
    localStorage.setItem('cookiesAceptadas', 'true');
    // Ocultamos el mensaje de cookies
    document.getElementById('mensajeCookies').style.display = 'none';
}

// Función para comprobar si el usuario ya aceptó las cookies previamente
function verificarCookiesAceptadas() {
    if (!localStorage.getItem('cookiesAceptadas')) {
        // Si el usuario no ha aceptado las cookies, mostramos el mensaje
        document.getElementById('mensajeCookies').style.display = 'block';
    }
}

// Evento que se ejecuta al cargar la página
window.onload = function() {
    verificarCookiesAceptadas();
};
