import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "........................",
    authDomain: "......................................",
    databaseURL: ".....................................",
    projectId: "............................",
    storageBucket: ".........................",
    messagingSenderId: ".............................",
    appId: "................................",
    measurementId: "..........................."
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
const perfCollection  = collection(firestore, "perfiles");

console.log("Conexión a firebase establecida correctametne");

export class ManageAccount {
    register(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setPersistence(auth, browserSessionPersistence);
            localStorage.setItem('sessionPersistence', 'local');
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // Usuario autenticado, redirigir a la nueva página
                    window.location.href = "crearPerfil.html";
                } else {
                    // Usuario no autenticado, hacer algo (por ejemplo, mostrar un mensaje de error)
                    //console.log("El usuario no está autenticado");
                }
            });

            const user = userCredential.user;
            //console.log("Usuario autenticado:", user);
          // Mostrar alerta de inicio de sesión exitoso
            window.location.href = "../paginas/crearPerfil.html";
          // Mostrar alerta de registro exitoso
            alert("Registro exitoso. Serás redirigido a la página de crear perfil.");
        })
        .catch((error) => {
            console.error(error.message);
              // Mostrar alerta de error de registro
                MSJERROR(error);
        });
    }

    authenticate(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setPersistence(auth, browserSessionPersistence);
            localStorage.setItem('sessionPersistence', 'local');
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // Usuario autenticado, redirigir a la nueva página
                    window.location.href = "inicio.html";
                } else {
                    // Usuario no autenticado, hacer algo (por ejemplo, mostrar un mensaje de error)
                    //console.log("El usuario no está autenticado");
                }
            });

            const user = userCredential.user;
            //console.log("Usuario autenticado:", user);
          // Mostrar alerta de inicio de sesión exitoso
            alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
        })
        .catch((error) => {
            console.error(error.message);
                  // Mostrar alerta de error de inicio de sesión
                    alert("Error al iniciar sesión: " + error.message);
        });
    }
    signOut() {
        signOut(auth)
        .then((_) => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
}

// Mensaje dinamico para decir que se ha iniciar bien
const MSJQK =() =>{
    Swal.fire({
        title: "Datos subidos!!",
        text: "Se han subido correctamente, pulse borrar para borrar los campos",
        icon: "success"
    });
}

// Mensaje dinamico para decir que no se ha podido iniciar bien
const MSJERROR =() =>{
    Swal.fire({
        title: "REGISTRO NO REALIZADO!!",
        text: "No hemos podido registrarte, recuerda la contraseña ha de ser mayor de 6 caracteres",
        icon: "error"
    });
}
