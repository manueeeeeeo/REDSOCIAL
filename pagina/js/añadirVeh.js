document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("num_vehiculos");
    var inputContainer1 = document.getElementById("vehiculo1");
    var inputContainer2 = document.getElementById("vehiculo2");
    var inputContainer3 = document.getElementById("vehiculo3");
    var inputContainer4 = document.getElementById("vehiculo4");
    var inputContainer5 = document.getElementById("vehiculo5");

    select.addEventListener("change", function() {
    mostrarInput();
    });

    function mostrarInput() {
    var opcionSeleccionada = select.value;

      // Verificar qué opción se ha seleccionado
    if (opcionSeleccionada === "1") {
        // Mostrar el input
        inputContainer1.style.display = "block";
    } else {
        // Ocultar el input
        inputContainer1.style.display = "none";
    }
    if (opcionSeleccionada === "2") {
        // Mostrar el input
        inputContainer1.style.display = "block";
        inputContainer2.style.display = "block";
    } else {
        // Ocultar el input
        inputContainer2.style.display = "none";
    }
    if (opcionSeleccionada === "3") {
        // Mostrar el input
        inputContainer1.style.display = "block";
        inputContainer2.style.display = "block";
        inputContainer3.style.display = "block";
    } else {
        // Ocultar el input
        inputContainer3.style.display = "none";
    }
    if (opcionSeleccionada === "4") {
        // Mostrar el input
        inputContainer1.style.display = "block";
        inputContainer2.style.display = "block";
        inputContainer3.style.display = "block";
        inputContainer4.style.display = "block";
    } else {
        // Ocultar el input
        inputContainer4.style.display = "none";
    }
    if (opcionSeleccionada === "5") {
        // Mostrar el input
        inputContainer1.style.display = "block";
        inputContainer2.style.display = "block";
        inputContainer3.style.display = "block";
        inputContainer4.style.display = "block";
        inputContainer5.style.display = "block";
    } else {
        // Ocultar el input
        inputContainer5.style.display = "none";
    }
    }
});
