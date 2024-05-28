import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "..............................",
    authDomain: ".......................",
    databaseURL: "..................",
    projectId: ".......................",
    storageBucket: "................................",
    messagingSenderId: "........................",
    appId: ".........................",
    measurementId: "................................."
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener el id del Perfil de la URL
const urlParams = new URLSearchParams(window.location.search);
const perfilId = urlParams.get('id');

// Función para cargar los detalles del evento
async function cargarDetallesPerfil() {
    try {
        // Obtener el documento del evento usando el id
        const docSnap = await getDoc(doc(db, "perfiles", perfilId));
        if (docSnap.exists()) {
            const perf = docSnap.data();
            // Renderizar los detalles del evento en la interfaz de usuario
            document.getElementById("Username").textContent = "@"+perf.Username;
            // Crear y agregar imagen verificada si el UID coincide
            if (perf.UserId === "CUENTA REAL") {
                const verifiedIcon = document.createElement("img");
                verifiedIcon.src = "../img/icons8-verificado-48.png";
                verifiedIcon.alt = "Icono verificado";
                document.getElementById("Username").appendChild(verifiedIcon);
            }
            document.getElementById("Nombre").textContent = "Nombre: " + perf.Nombre;
            document.getElementById("Ape").textContent = "Apellidos: " + perf.Apellidos;
            document.getElementById("años").textContent = "Edad: " + perf.Edad;
            document.getElementById("Vehiculos").textContent = "Nº de Vehiculos: " + perf.Vehiculos;
            document.getElementById("Descripción").textContent = "Descripción: " + perf.Descripción;
            // Agregar más detalles según sea necesario
        } else {
            console.log("No se encontró el perfil.");
        }
    } catch (error) {
        console.error("Error al cargar los detalles del perfil:", error);
    }
}

// Llamar a la función cargarDetallesPerfil una vez que el contenido de la página esté cargado
document.addEventListener("DOMContentLoaded", function() {
    cargarDetallesPerfil();
});
