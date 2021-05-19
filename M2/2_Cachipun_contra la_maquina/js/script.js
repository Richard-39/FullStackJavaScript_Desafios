var round = parseInt(prompt("Ingrese la cantidad de veces que quiere jugar"));

var played
var machine
var indexRound
for (i = 0; i < round; i++) {
    indexRound = i+1;
    played = parseInt(
        prompt("Ingrese su jugada \r\r" + 
            "1. Piedra \r" + 
            "2. Pepel \r" +
            "3. Tijeras\r"));
    machine = Math.floor(Math.random()*3) +1;
    showResult(compare(played, machine));
}

alert("Fin del juego, refresque la página para volver a jugar");

function numToName(value){
    if (value == 1) return "Piedra";
    if (value == 2) return "Papel";
    if (value == 3) return "Tijeras";
    return "jugada inválida"
}

function showResult (value){
    var msg;
    switch (value) {
        case -1:
            msg = "Has perdido";
            break;
        case 0:
            msg = "Empate";
            break;
        case 1:
            msg = "Ganaste"
            break;
        default:
            msg= "Ingrese valores válidos";
            break;
    }

    alert(`Ronda ${indexRound}: \r\r` +
        `${msg} \r\r` +
        `Jugador: ${numToName(played)} \r` + 
        `Maquina: ${numToName(machine)}\r`);
}

function compare (player, machine) {
    var result;
    if (player == machine) {
        result = 0;
        return result;
    }  

    switch (player) {
        case 1:
            if (machine == 2) result = -1
            if (machine == 3) result = 1 
            break;

        case 2:
            if (machine == 1) result = 1
            if (machine == 3) result = -1 
            break;
        
        case 3:
            if (machine == 1) result = -1
            if (machine == 2) result = 1 
            break;

        default:
            break;
    }
    return result;
}