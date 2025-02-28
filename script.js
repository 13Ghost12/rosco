const preguntas = [
    { letra: "A", pregunta: "Empieza con A: Nombre que tuvo el cibulette", respuesta: "akamaru", estado: "pendiente" },
    { letra: "B", pregunta: "Empieza con B: Mamífero que vimos en Patago", respuesta: "ballena", estado: "pendiente" },
    { letra: "C", pregunta: "Contiene C: Veni, Vedi ...", respuesta: "vici", estado: "pendiente" },
    { letra: "D", pregunta: "Empieza con D: Serie koreana", respuesta: "dorama", estado: "pendiente" },
    { letra: "E", pregunta: "Contiene E: Nombre de mascota", respuesta: "reina", estado: "pendiente" },
    { letra: "F", pregunta: "Empieza con F: Diminituvo de tu amor", respuesta: "facu", estado: "pendiente" },
    { letra: "G", pregunta: "Empieza con G: Menta ...", respuesta: "granizada", estado: "pendiente" },
    { letra: "H", pregunta: "Contiene H: Compra para cocinar 'La ...'", respuesta: "plancheta", estado: "pendiente" },
    { letra: "I", pregunta: "Empieza con I: Como fue mi curso de ingreso?", respuesta: "intensivo", estado: "pendiente" },
    { letra: "J", pregunta: "Contiene J: Ingrediente que uso y me gusta su olor", respuesta: "ajo", estado: "pendiente" },
    { letra: "K", pregunta: "Empieza con K: Conductora de Algo de Musica", respuesta: "karina", estado: "pendiente" },
    { letra: "L", pregunta: "Empieza con L: Se fue ...", respuesta: "larga", estado: "pendiente" },
    { letra: "M", pregunta: "Empieza con M: Banda que vimos en la Fiesta de la Playa 2017", respuesta: "marama", estado: "pendiente" },
    { letra: "N", pregunta: "Empieza con N: Francesca", respuesta: "nuray", estado: "pendiente" },
    { letra: "Ñ", pregunta: "Contiene Ñ: Que tenia el calzón que nos dieron por error", respuesta: "champiñones", estado: "pendiente" },
    { letra: "O", pregunta: "Contiene O: Shipeo que quiero que sea real", respuesta: "chilledo", estado: "pendiente" },
    { letra: "P", pregunta: "Empieza con P: A Garabal le gusta la ...", respuesta: "pichi", estado: "pendiente" },
    { letra: "Q", pregunta: "Contiene Q: Antes que nadie", respuesta: "aqn", estado: "pendiente" },
    { letra: "R", pregunta: "Empieza con R: Hola! soy", respuesta: "resu", estado: "pendiente" },
    { letra: "S", pregunta: "Contiene S: D10S", respuesta: "messi", estado: "pendiente" },
    { letra: "T", pregunta: "Empieza con T: Chocolatada", respuesta: "totona", estado: "pendiente" },
    { letra: "U", pregunta: "Contiene U: Unas ... o que?", respuesta: "hamburguesa", estado: "pendiente" },
    { letra: "V", pregunta: "Contiene V: Fruta", respuesta: "uva", estado: "pendiente" },
    { letra: "W", pregunta: "Empieza con W: Equipo de F1 que corrio Franco", respuesta: "williams", estado: "pendiente" },
    { letra: "X", pregunta: "Contiene X: Lucas siempre quiere llamar al", respuesta: "ex", estado: "pendiente" },
    { letra: "Y", pregunta: "Empieza con Y: Franchela", respuesta: "yoyi", estado: "pendiente" },
    { letra: "Z", pregunta: "Contiene Z: Leuco en EL ENCARGADO", respuesta: "carranza", estado: "pendiente" }
];

const rosco = document.getElementById("rosco");
const preguntaText = document.getElementById("pregunta");
const respuestaInput = document.getElementById("respuesta");
const btnResponder = document.getElementById("btn-responder");
const btnPasapalabra = document.getElementById("btn-pasapalabra");
const tiempoElemento = document.getElementById("tiempo");

let indiceActual = 0;
let tiempo = 180;
let intervalo;

function iniciarRosco() {
    rosco.innerHTML = "";
    preguntas.forEach((item, index) => {
        const letraDiv = document.createElement("div");
        letraDiv.classList.add("letra");
        letraDiv.textContent = item.letra;
        letraDiv.setAttribute("data-index", index);
        rosco.appendChild(letraDiv);
    });
    mostrarPregunta();
    iniciarTiempo();
}

function mostrarPregunta() {
    if (indiceActual < preguntas.length) {
        preguntaText.textContent = preguntas[indiceActual].pregunta;
    } else {
        revisarPendientes();
    }
}

function validarRespuesta() {
    const respuestaUsuario = respuestaInput.value.toLowerCase().trim();
    const preguntaActual = preguntas[indiceActual];
    const letraElemento = document.querySelector(`.letra[data-index='${indiceActual}']`);

    if (respuestaUsuario === preguntaActual.respuesta) {
        preguntaActual.estado = "correcto";
        letraElemento.classList.remove("pasapalabra"); // Quita el amarillo
        letraElemento.classList.add("correcto"); // Pone verde
    } else {
        preguntaActual.estado = "incorrecto";
        letraElemento.classList.remove("pasapalabra"); // Quita el amarillo
        letraElemento.classList.add("incorrecto"); // Pone rojo
    }

    respuestaInput.value = "";
    siguientePregunta();
}

function pasarPalabra() {
    const preguntaActual = preguntas[indiceActual];
    const letraElemento = document.querySelector(`.letra[data-index='${indiceActual}']`);

    preguntaActual.estado = "pendiente"; // Mantiene la pregunta como pendiente
    letraElemento.classList.add("pasapalabra");

    siguientePregunta();
}

function siguientePregunta() {
    do {
        indiceActual++;
    } while (indiceActual < preguntas.length && preguntas[indiceActual].estado !== "pendiente");

    if (indiceActual < preguntas.length) {
        mostrarPregunta();
    } else {
        revisarPendientes();
    }
}

function revisarPendientes() {
    let quedanPendientes = preguntas.some(p => p.estado === "pendiente");

    if (quedanPendientes) {
        indiceActual = 0;
        while (indiceActual < preguntas.length && preguntas[indiceActual].estado !== "pendiente") {
            indiceActual++;
        }
        mostrarPregunta();
    } else {
        clearInterval(intervalo);
        alert("¡Juego terminado!");
    }
}

function iniciarTiempo() {
    intervalo = setInterval(() => {
        tiempo--;
        tiempoElemento.textContent = `${tiempo}s`;
        if (tiempo <= 0) {
            clearInterval(intervalo);
            alert("Tiempo agotado!");
        }
    }, 1000);
}

btnResponder.addEventListener("click", validarRespuesta);
btnPasapalabra.addEventListener("click", pasarPalabra);

document.addEventListener("DOMContentLoaded", iniciarRosco);
