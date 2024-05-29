// Importo las librerias necesarias
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, increment, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


// Configuro el proyecto con todos sus datos
const firebaseConfig = {
    apiKey: ".........................",
    authDomain: "...........................",
    databaseURL: ".......................",
    projectId: "..................................",
    storageBucket: "..........................",
    messagingSenderId: ".........................",
    appId: "..............................",
    measurementId: "..............................."
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Obtén la instancia de Firestore
const auth = getAuth();
const perfCollection  = collection(firestore, "perfiles");
const formulario = document.getElementById("for");

// Genero las variables de todos los inputs
const iputnombre = document.getElementById("nomb");
const inputservidor = document.getElementById("server");
const inputfecha = document.getElementById("day");
const inputhora = document.getElementById("hor");
const inputlugar = document.getElementById("lugar");
const inputciudad = document.getElementById("ciudad");
const inputdescrip = document.getElementById("descr");
const inputtipo = document.getElementById("tip");
const inputprov = document.getElementById("pro");
let inputuser = "";
let userId = "";
let profileId = "";

auth.onAuthStateChanged((user) => {
    if (user) {
        userId = user.uid;
        //console.log("Usuario autenticado con ID:", userId);
        
        getDocs(perfCollection).then((querySnapshot) => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    // Obtener datos del documento de perfil
                    const perfil = doc.data();
                    //console.log("Datos del perfil:", perfil);
                    
                    // Verificar si este perfil pertenece al usuario autenticado
                    if (perfil.UserId === userId) {
                        //console.log("Perfil encontrado para el usuario autenticado:", perfil);
                        // Obtenemos el username del usuario
                        inputuser = perfil.Username;
                        //console.log(inputuser);
                        profileId = perfil.UserId;
                        //console.log(profileId);
                    }
                });
            } else {
                //console.log("No hay documentos en la colección.");
            }
        });
    } else {
        //console.log("No hay usuario autenticado.");
    }
});

// Hacemos un evento que pase cuando damos a subir archivos
formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nom = iputnombre.value;
    const serve = inputservidor.value;
    const fecha = inputfecha.value;
    const hor = inputhora.value;
    const lug = inputlugar.value;
    const ciud = inputciudad.value;
    const des = inputdescrip.value;
    const tipo = inputtipo.value;
    const prov = inputprov.value;

    try {
        await addDoc(collection(firestore, "eventos"), {
        Nombre:nom,
        Servidor: serve,
        Fecha: fecha,
        Hora: hor,
        Provincia:prov,
        Lugar: lug,
        Ciudad: ciud,
        Descripción: des,
        Username_Creator: inputuser,
        Tipo: tipo
    });
    getDocs(perfCollection).then(async (querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                // Obtener datos del documento de perfil
                const perfil = doc.data();
                
                if (perfil.UserId === userId) {
                    //console.log("Perfil encontrado para el usuario autenticado:", perfil);
                    // Obtener el valor actual de Eventos_Creados o establecerlo en 0 si no existe
                    const eventosCreados = perfil.Eventos_Creados || 0;
                    
                    try {
                        // Actualizar el documento de perfil con el nuevo valor de Eventos_Creados
                        await updateDoc(doc.ref, { Eventos_Creados: eventosCreados + 1 });
                        //console.log("Documento de perfil actualizado exitosamente.");
                    } catch (error) {
                        console.error("Error al actualizar el documento de perfil:", error);
                    }
                }
            });
        } else {
            //console.log("No hay documentos en la colección.");
        }
    }).catch((error) => {
        console.error("Error al obtener documentos de la colección:", error);
    });
    
    /*
    // Incrementar el contador de eventos en el perfil del usuario
    const perfilDocRef = doc(firestore, "perfiles", profileId);
    await updateDoc(perfilDocRef, {
        Eventos_Creados: increment(1)
    });*/

    MSJQK(); // Mostramos el mensaje de que se han subido correctamente
    } catch (error) {
        //console.error("Error al agregar datos", error);
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
