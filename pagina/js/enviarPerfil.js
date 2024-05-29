import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "...........................",
    authDomain: "........................",
    databaseURL: "...................................",
    projectId: "......................",
    storageBucket: "..........................",
    messagingSenderId: "...................................",
    appId: "..........................",
    measurementId: "..............................."
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Obtén la instancia de Firestore
const auth = getAuth();
const formulario = document.getElementById("fo2");

// Genero las variables de todos los inputs
const inputnombre = document.getElementById("nombre");
const inputapellidos = document.getElementById("apellidos");
const inputuser = document.getElementById("user");
const inputedad = document.getElementById("edad");
const inputnumVehi = document.getElementById("num_vehiculos");
const inputdescrip = document.getElementById("descripcion");
const inputimagen = document.getElementById("imagen");
const inputv1 = document.getElementById("veh1");
const inputv2 = document.getElementById("veh2");
const inputv3 = document.getElementById("veh3");
const inputv4 = document.getElementById("veh4");
const inputv5 = document.getElementById("veh5");

// Hacemos un evento que pase cuando damos a subir archivos
formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nom = inputnombre.value;
    const apes = inputapellidos.value;
    const us = inputuser.value;
    const edad = inputedad.value;
    const vehs = inputnumVehi.value;
    const des = inputdescrip.value;
    const img = inputimagen.value;
    const n_eventos = 0;
    const v1 = inputv1.value;
    const v2 = inputv2.value;
    const v3 = inputv3.value;
    const v4 = inputv4.value;
    const v5 = inputv5.value;

    try {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;

            // Agrega los datos del perfil a Firestore utilizando el ID del usuario como parte del documento
            await addDoc(collection(firestore, "perfiles"), {
                UserId: userId, // Asocia el ID único del usuario con el perfil
                Nombre: nom,
                Apellidos: apes,
                Username: us,
                Edad: edad,
                Vehiculos: vehs,
                Descripción: des,
                Eventos_Creados: n_eventos,
                Foto_Perfil: img,
                Vehiculo1: v1,
                Vehiculo2: v2,
                Vehiculo3: v3,
                Vechiuclo4: v4,
                Vehiculo5: v5
            });
            MSJQK(); // Muestra el mensaje de que se han subido correctamente
        } else {
            //console.error("No hay usuario autenticado.");
            // Aquí puedes manejar el caso en que no haya usuario autenticado
        }
    MSJQK(); // Mostramos el mensaje de que se han subido correctamente
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Usuario autenticado, redirigir a la nueva página
            window.location.href = "inicio.html";
        } else {
            // Usuario no autenticado, hacer algo (por ejemplo, mostrar un mensaje de error)
            //console.log("El usuario no está autenticado");
        }
    })
    } catch (error) {
        console.error("Error al agregar datos", error);
        MSJERROR(error); // Mostramos el mensaje de que ha habido un error
    }
});


// Mensaje dinamico para decir que se ha enviado bien
const MSJQK =() =>{
    Swal.fire({
        title: "Datos subidos!!",
        text: "Se han subido correctamente, pulse borrar para borrar los campos",
        icon: "success"
    });
}

// Mensaje dinamico para decir que no se ha podido enviar
const MSJERROR =() =>{
    Swal.fire({
        title: "Datos NO subidos!!",
        text: "No hemos podido subir los datos",
        icon: "error"
    });
}

// Mensaje dinamico para borrar 
const MSJBORRAR =() =>{
    Swal.fire({
        title: "Datos Borrados!!",
        text: "Gracias",
        icon: "success"
    });
}
