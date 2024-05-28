import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "...........................",
    authDomain: "...........................",
    databaseURL: "...............................",
    projectId: "...........................",
    storageBucket: "......................................",
    messagingSenderId: "..............................",
    appId: "............................",
    measurementId: ".........................."
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Obtén la instancia de Firestore
const perfilCollection = collection(db, "perfiles");

// Función para mostrar los eventos
function mostrarPerfiles() {
  const perfilContainer = document.getElementById("perfiles");

  // Consulta para obtener todos los eventos de Firestore
  getDocs(perfilCollection).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // Obtener datos del documento
          const perfil = doc.data();
          // Renderizar datos en la interfaz de usuario
          if (perfil.UserId === "q28Rx1vJKrXWbvl43jwrnwdgFC82") {
            // Renderizar datos en la interfaz de usuario
            const perfilHTML = `
                <div class="perfil">
                    <h2>${perfil.Username}</h2>
                    <img src="../img/icons8-verificado-48.png" alt="Icono verificado"></img>
                    <p>Años: ${perfil.Edad}</p>
                    <p>Nº Vehiculos: ${perfil.Vehiculos}</p>
                    <p>Nº de Eventos Creados: ${perfil.Eventos_Creados}</p><br>
                    <button class="ver-entero-btn" data-evento-id="${doc.id}">Ver Perfil</button>
                    <!-- Agregar más detalles según sea necesario -->
                </div>
            `;
            perfilContainer.innerHTML += perfilHTML;
        }else{
          const perfilHTML = `
              <div class="perfil">
                  <h2>${perfil.Username}</h2>
                  <p>Años: ${perfil.Edad}</p>
                  <p>Nº Vehiculos: ${perfil.Vehiculos}</p>
                  <p>Nº de Eventos Creados: ${perfil.Eventos_Creados}</p><br>
                  <button class="ver-entero-btn" data-evento-id="${doc.id}">Ver Perfil</button>
                  <!-- Agregar más detalles según sea necesario -->
              </div>
          `;
          perfilContainer.innerHTML += perfilHTML;
        }
      });
      // Agregar evento de clic a todos los botones "Ver Entero"
        const verEnteroButtons = document.querySelectorAll(".ver-entero-btn");
        verEnteroButtons.forEach(button => {
                button.addEventListener("click", () => {
                const perId = button.getAttribute("data-evento-id");
                verDetalles(perId);
        });
    });
  }).then(() => {
      // Agregar eventos simulados
      const perfilesSimulados = [
        
      ];

      perfilesSimulados.forEach(perfil => {
          const perfilElement = document.createElement("div");
          perfilElement.textContent = perfil;
          perfilContainer.appendChild(perfilElement);
      });
  });
}

// Función para redirigir a la página de detalles
function verDetalles(perId) {
    window.location.href = "otroPerfil.html?id=" + perId;
}

// Llamar a la función mostrarEventos una vez que el contenido de la página esté cargado
document.addEventListener("DOMContentLoaded", function() {
    mostrarPerfiles();
});
