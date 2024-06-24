# Crear una matriz de 3x3 inicializada con valores predeterminados
matriz = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
]

# Función para mostrar la matriz
def mostrar_matriz(matriz):
    print('  0 1 2')
    for i in range(len(matriz)):
        print(i, ' '.join(matriz[i]).replace(' ', '|'))
        if i < 2:
            print('  -----')

# Función para verificar si hay un ganador
def verificar_ganador(matriz):
    # Verificar filas y columnas
    for i in range(3):
        if matriz[i][0] == matriz[i][1] == matriz[i][2] != ' ':
            return matriz[i][0]
        if matriz[0][i] == matriz[1][i] == matriz[2][i] != ' ':
            return matriz[0][i]
    # Verificar diagonales
    if matriz[0][0] == matriz[1][1] == matriz[2][2] != ' ':
        return matriz[0][0]
    if matriz[0][2] == matriz[1][1] == matriz[2][0] != ' ':
        return matriz[0][2]
    return None

# Función para verificar si hay empate
def verificar_empate(matriz):
    for fila in matriz:
        if ' ' in fila:
            return False
    return True

# Función para pedir al usuario una entrada
def preguntar(pregunta):
    return input(pregunta)

# Función principal del juego
def jugar():
    turno = 'X'
    ganador = None

    while not ganador and not verificar_empate(matriz):
        mostrar_matriz(matriz)
        print(f"Turno de {turno}")

        fila = int(preguntar("Ingrese la fila (0, 1, 2): "))
        columna = int(preguntar("Ingrese la columna (0, 1, 2): "))

        if 0 <= fila < 3 and 0 <= columna < 3 and matriz[fila][columna] == ' ':
            matriz[fila][columna] = turno
            ganador = verificar_ganador(matriz)
            if ganador:
                mostrar_matriz(matriz)
                print(f"¡{ganador} ha ganado!")
            elif verificar_empate(matriz):
                mostrar_matriz(matriz)
                print("¡Es un empate!")
            else:
                turno = 'O' if turno == 'X' else 'X'
        else:
            print("Posición inválida o ya ocupada. Intente nuevamente.")

# Función para mostrar el menú y manejar la selección
def mostrar_menu():
    while True:
        print("---------TRIKI-------")
        print("1. Jugar (dos jugadores)")
        print("2. Salir")

        opcion = int(preguntar("Seleccione una opción: "))

        if opcion == 1:
            global matriz
            matriz = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]
            jugar()
        elif opcion == 2:
            print("Saliendo del juego...")
            break
        else:
            print("Opción inválida. Intente nuevamente.")

# Ejecutar el menú principal
mostrar_menu()
