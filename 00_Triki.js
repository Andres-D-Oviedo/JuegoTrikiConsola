const readline = require('readline'); 
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise(resolve => rl.question(pregunta, answer => {
        resolve(answer);
    }));
}

// Paso 1: Crear una matriz de 3x3 inicializada con valores predeterminados
let matriz = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

// Función para mostrar la matriz
function mostrarMatriz(matriz) {
    console.log('  0 1 2');
    for (let i = 0; i < matriz.length; i++) {
        console.log(i + ' ' + matriz[i].join('|'));
        if (i < 2) console.log('  -----');
    }
}

// Función para verificar si hay un ganador
function verificarGanador(matriz) {
    for (let i = 0; i < 3; i++) {
        if (matriz[i][0] === matriz[i][1] && matriz[i][1] === matriz[i][2] && matriz[i][0] !== ' ') {
            return matriz[i][0];
        }
        if (matriz[0][i] === matriz[1][i] && matriz[1][i] === matriz[2][i] && matriz[0][i] !== ' ') {
            return matriz[0][i];
        }
    }
    if (matriz[0][0] === matriz[1][1] && matriz[1][1] === matriz[2][2] && matriz[0][0] !== ' ') {
        return matriz[0][0];
    }
    if (matriz[0][2] === matriz[1][1] && matriz[1][1] === matriz[2][0] && matriz[0][2] !== ' ') {
        return matriz[0][2];
    }
    return null;
}

// Función para verificar si hay empate
function verificarEmpate(matriz) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matriz[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

// Función principal del juego
async function jugar() {
    let turno = 'X';
    let ganador = null;

    while (!ganador && !verificarEmpate(matriz)) {
        mostrarMatriz(matriz);
        console.log(`Turno de ${turno}`);
        
        let fila = parseInt(await preguntar("Ingrese la fila (0, 1, 2): "));
        let columna = parseInt(await preguntar("Ingrese la columna (0, 1, 2): "));

        if (fila >= 0 && fila < 3 && columna >= 0 && columna < 3 && matriz[fila][columna] === ' ') {
            matriz[fila][columna] = turno;
            ganador = verificarGanador(matriz);
            if (ganador) {
                mostrarMatriz(matriz);
                console.log(`¡${ganador} ha ganado!`);
            } else if (verificarEmpate(matriz)) {
                mostrarMatriz(matriz);
                console.log("¡Es un empate!");
            } else {
                turno = turno === 'X' ? 'O' : 'X';
            }
        } else {
            console.log("Posición inválida o ya ocupada. Intente nuevamente.");
        }
    }
    rl.close();
}

// Función para mostrar el menú y manejar la selección
async function mostrarMenu() {
    console.log("---------TRIKI-------");
    console.log("1. Jugar (dos jugadores)");
    console.log("2. Salir");

    let opcion = parseInt(await preguntar("Seleccione una opción: "));

    switch(opcion) {
        case 1:
            matriz = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ];
            await jugar();
            break;
        case 2:
            console.log("Saliendo del juego...");
            rl.close();
            break;
        default:
            console.log("Opción inválida. Intente nuevamente.");
            await mostrarMenu();
            break;
    }
}

// Ejecutar el menú principal
mostrarMenu();