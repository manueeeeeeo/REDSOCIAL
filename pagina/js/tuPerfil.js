import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "............................",
    authDomain: "............................",
    databaseURL: "..................................",
    projectId: ".........................",
    storageBucket: "...............................",
    messagingSenderId: ".............................",
    appId: "...........................",
    measurementId: "............................"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Obtén la instancia de Firestore
const auth = getAuth();

// Obtener el ID único del usuario activo
const user = auth.currentUser;
if (user) {
    const userId = user.uid;

    // Obtener el documento del perfil asociado al ID de usuario
    const perfilDocRef = doc(firestore, "perfiles", userId);
    const perfilDocSnapshot = await getDoc(perfilDocRef);

    if (perfilDocSnapshot.exists()) {
        // El documento del perfil existe, leer los datos
        const perfilData = perfilDocSnapshot.data();
        //console.log("Datos del perfil:", perfilData);

        // Mostrar los datos del perfil en la pantalla
        mostrarDatosPerfil(perfilData);
    } else {
        console.error("No se encontró el perfil asociado al usuario.");
    }
} else {
    console.error("No hay usuario autenticado.");
}
