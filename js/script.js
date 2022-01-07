/* 1. crear un array de 10 posiciones, llenarlo con números del 1-10 con un bucle. 
estos números no se pueden repetir. mostrar el resultado 

/* 2. Hacer un array de 40 posiciones y llenarlos 
con números del 1-10. Solo puede haber 4 unos, 4 doses, 
4 treses... */

/* 3. crear una función que desordene el array anterior y
 muestre el resultado */

/* 4. añadir un botón (con el texto sacar numero) q muestre el resultado del primer numero del array. 
ese numero no puede volver a salir en toda la partida. si se gastan los números, volver a llenar el array */

/*  5. En el ejercicio anterior, ir sumando los números que salen y mostrar en resultado el total. */

/* 6. En el ejercicio anterior, si se llega a 21 puntos, el jugador gana. Si se pasa de 21, pierde. 
Mostrar en resultado el resultado. Si vale menos de 21, puede seguir jugando o plantarse. 
Añadir un botón para poder plantarse.
 */

let total = 0;
let tipo = "";
let arrNum = [];
let arrPalos = ["picas", "treboles", "corazones", "diamantes"];
let arrFiguras = ["Sota", "Reina", "Rey"];
let arrJugada = [];

//usar forEach()

function crearBaraja() {
  arrPalos.forEach((p) => {
    for (let i = 1; i < 11; i++) {
      arrNum.push({
        palo: p,
        valor: i,
        //img: p + "_" + i + ".svg",
      });
    }
  });

  arrPalos.forEach((p) => {
    for (let i = 0; i <= 2; i++) {
      arrNum.push({
        palo: p,
        valor: arrFiguras[i],
        //img: p + "_" + valor.toLowerCase() + ".svg",
      });
    }
  });

  arrNum = arrNum.sort(function () {
    return Math.random() - 0.5;
  });
}
crearBaraja();

let texto = document.querySelector(".texto");
let resultado = document.querySelector(".resultado");
let jugadas = document.querySelector(".jugadas");

document.querySelector(".botoncito").onclick = () => {
  let carta = arrNum.shift();

  if (carta.valor == 1)
    confirm("Te ha salido un 1, quieres que valga 11?")
      ? (carta.valor = 11)
      : null;

  arrJugada.push(" " + carta.valor + " de " + carta.palo);

  if (typeof carta.valor === "string") {
    carta.valor = 10;
  }

  total += carta.valor;

  comprobarJugada(total);
  desmoralizarTropa();

  if (arrNum[0] == "") {
    crearBaraja();
  }
};

function comprobarJugada(total) {
  jugadas.innerHTML = "<p>Tus jugadas hasta ahora " + arrJugada + "</p>";
  if (total > 21) {
    resultado.innerHTML = total + " Qué pringao, has perdido";
    finalizarPartida();
  } else if (total == 21) {
    resultado.innerHTML = total + " La victoria es tuya";
    finalizarPartida();
  } else {
    resultado.innerHTML = "<p>Llevas " + total + " puntos acumulados</p>";
  }
}

document.querySelector(".plantarse").onclick = () => {
  resultado.innerHTML =
    total + " puntos; una retirada a tiempo también es una victoria...";
  finalizarPartida();
};

function finalizarPartida() {
  arrNum.splice(0);
  crearBaraja();
  total = 0;
  arrJugada.splice(0);
}

function desmoralizarTropa() {
  let arrMoral = [
    "Es inevitable",
    "Grown assnigga still living with his mama",
    "Me aburres",
    "necesitas un café",
    "kys",
    "ECHALE!",
  ];
  texto.innerHTML = arrMoral[Math.round(Math.random() * arrMoral.length - 0.5)];
}
