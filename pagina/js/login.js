import { ManageAccount } from './firebaseconect.js';

document.getElementById("sign").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("correo1").value;
    const password = document.getElementById("login_password").value;

    const account = new ManageAccount();
    account.authenticate(email, password);
});

console.log('Formulario de Inicio de Sesión');
