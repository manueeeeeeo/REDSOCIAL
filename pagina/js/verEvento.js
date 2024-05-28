import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "..........................",
    authDomain: "...............................",
    databaseURL: ".......................",
    projectId: "..................",
    storageBucket: "....................",
    messagingSenderId: "........................",
    appId: "..........................",
    measurementId: "........................."
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener el id del evento de la URL
const urlParams = new URLSearchParams(window.location.search);
const eventoId = urlParams.get('id');

// Función para cargar los detalles del evento
async function cargarDetallesEvento() {
    try {
        // Obtener el documento del evento usando el id
        const docSnap = await getDoc(doc(db, "eventos", eventoId));
        if (docSnap.exists()) {
            const evento = docSnap.data();
            const personasApuntadas = evento.Personas_apuntadas || [];
            const longitudArray = personasApuntadas.length;
            // Renderizar los detalles del evento en la interfaz de usuario
            document.getElementById("name").textContent = evento.Nombre;
            document.getElementById("tipo").textContent = "Tipo: " + evento.Tipo;
            document.getElementById("fech").textContent = "Fecha: " + evento.Fecha;
            document.getElementById("hora").textContent = "Hora de Inicio: " + evento.Hora;
            document.getElementById("dir").textContent = "Dirección: " + evento.Lugar;
            document.getElementById("ciu").textContent = "Ciudad de Inicio: " + evento.Ciudad;
            document.getElementById("per").textContent = "Nº de Personas Apuntadas: " + longitudArray;
            document.getElementById("pro").textContent = "Provincia: "+evento.Provincia;
            // Agregar más detalles según sea necesario
        } else {
            console.log("No se encontró el evento.");
        }
    } catch (error) {
        console.error("Error al cargar los detalles del evento:", error);
    }
}

// Llamar a la función cargarDetallesEvento una vez que el contenido de la página esté cargado
document.addEventListener("DOMContentLoaded", function() {
    cargarDetallesEvento();
});
