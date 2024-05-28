import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: ".................................",
    authDomain: "................................",
    databaseURL: "...............................",
    projectId: "...................................",
    storageBucket: "...............................",
    messagingSenderId: "..............................",
    appId: "..................................",
    measurementId: "..............................."
};

//Initialize Firebase
/*
const app = initializeApp(firebaseConfig);
const firebase = getFirestore(app); // Obtén la instancia de Firestore
const firestore = firebase.firestore();
const auth = getAuth();
*/

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Obtener la instancia de Firestore
const auth = getAuth();
const perfCollection  = collection(firestore, "perfiles");



// Obtener el nombre de usuario del usuario autenticado
auth.onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;
        //console.log("Usuario autenticado con ID:", userId);
        
        getDocs(perfCollection).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // Obtener datos del documento de perfil
                const perfil = doc.data();
                //console.log("Datos del perfil:", perfil);
                
                // Verificar si este perfil pertenece al usuario autenticado
                if (perfil.UserId === userId) {
                    //console.log("Perfil encontrado para el usuario autenticado:", perfil);
                    
                    const nombreUsuarioH3 = document.getElementById("user1");
                    nombreUsuarioH3.textContent = perfil.Username; // Suponiendo que el campo del nombre de usuario se llama "Username"
                }
            });
        });
    } else {
        console.log("No hay usuario autenticado.");
    }
});


auth.onAuthStateChanged((user) => {
    if (user) {
        // Usuario autenticado, redirigir a la nueva página
        //console.log("Usuario",user);
    } else {
        // Usuario no autenticado, hacer algo (por ejemplo, mostrar un mensaje de error)
        console.log("El usuario no está autenticado");
    }
})
