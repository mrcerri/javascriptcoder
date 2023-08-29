//Funciones utilizadas:
//--------------------------------------------------------------
//FUNCIONES DE INGRESO DE DATOS
//Ingresos
function ingreseIngresos() {
  numIngresado = prompt(
    "Ingrese el monto de sus ingresos mensules demostrables:"
  )
  ingresoDeclarado = validarNumero(1, numIngresado)
}
//Monto de préstamo solicitado
function ingreseMontoSolicitado() {
  numIngresado = prompt("Ingrese el monto del préstamo a solicitar:")
  montoSolicitado = validarNumero(2, numIngresado)
  validarRelaInicialCuotaIngreso(ingresoDeclarado, montoSolicitado)
}
//Cantidad de cuotas
function ingreseCuotas() {
  numIngresado = prompt("Ingrese la cantidad de cuotas")
  let cuotas = validarNumero(3, numIngresado)
  validarCantDeCuotasPermitidas(cuotas)

  // Verifico antes de continuar, relacion cuota ingreso para esta cantidad de cuotas
  validarRelacionCuotaIngreso(ingresoDeclarado,montoSolicitado,cantidadDeCuotas)
}

//FIN FUNCIONES DE INGRESO DE DATOS
//--------------------------------------------------------------
// FUNCIONES DE VALIDACION
// Valido que el valor ingresado sea un número:

function validarNumero(caso, numIngresado) {
  let number = parseInt(numIngresado)
  if (!isNaN(number) && number > 0) {
    return numIngresado
  } else {
    //dependiendo de lo que me pide validar, le pido que lo vuelva a hacer
    switch (caso) {
      case 1: //ingreso declarado
        alert(
          "El valor ingresado no es un monto de ingreso mensual válido, intente nuevamente. "
        )
        ingreseIngresos() //le vuelvo a pedir que ingrese el dato
        break
      case 2: //monto solicitado
        alert(
          "El valor ingresado no es un monto préstamo a solicitar válido, intente nuevamente. "
        )

        ingreseMontoSolicitado() //le vuelvo a pedir que ingrese el dato
        break
      case 3: //cantidad de cuotas
        alert(
          "El valor ingresado no es un número de cuotas válido, intente nuevamente. "
        )
        ingreseCuotas() //le vuelvo a pedir que ingrese el dato
        break
      default:
        break
    }
  }
}
/* Valido que el valor de la cuota correspondiente al monto solicitado INICIALMENTE, en el mejor de 
   los casos (24 cuotas), no supere el 30 % de los ingresos mensuales declarados*/
let cuotaPosible = 0
let tasaTransitoria = 0

function validarRelaInicialCuotaIngreso(ingresoDeclarado, montoSolicitado) {
  tasaTransitoria = tnaTramo3 / 12
  cuotaPosible =
    (montoSolicitado * tasaTransitoria) /
    (1 - (1 + tasaTransitoria) ** -cantidadDeCuotas)

  if (cuotaPosible > ingresoDeclarado * relacionCuotaIngreso) {
    // Calculo el préstamo máximo posible en 24 cuotas para ese ingreso mensual declarado
    let P = Math.floor(
      (ingresoDeclarado *
        relacionCuotaIngreso *
        (1 - (1 + tasaTransitoria) ** -cantidadDeCuotas)) /
        tasaTransitoria
    )
    alert(
      "El monto del préstamo solicitado es superior al máximo establecido debido a que supera la relación cuota/ingreso del 30%. El monto máximo que puede solicitar es de:" +
        "\n" +
        "$ " +
        P +
        " (en 24 cuotas)" +
        "\n" +
        "Por favor, vuelva a indicar el monto solicitado"
    )
    ingreseMontoSolicitado()
  }
}

// Valido que la cantidad de cuotas esté entre los parámetros fijados

function validarCantDeCuotasPermitidas(cuotas) {
  if (cuotas < 3 || cuotas > 24) {
    alert("Recuerde que la cantidad mínima de cuotas es 3 y la máxima es 24.")
    ingreseCuotas()
  } else {
    cantidadDeCuotas = cuotas
    return cantidadDeCuotas
  }
}

// Valido la relación cuota/ingreso para las cuotas solicitadas.

function validarRelacionCuotaIngreso(
  ingresoDeclarado,
  montoSolicitado,
  cantidadDeCuotas
) {
  tasaTransitoria = obtenerTasaMensual(cantidadDeCuotas) / 12

  cuotaPosible =
    (montoSolicitado * tasaTransitoria) /
    (1 - (1 + tasaTransitoria) ** -cantidadDeCuotas)

  if (cuotaPosible > ingresoDeclarado * relacionCuotaIngreso) {

    let relaCuotaIngreso = (cuotaPosible / ingresoDeclarado) * 100

    alert(
      "El monto de la cuota resultante supera la relación cuota/ingreso del 30%." +
        "\n" +
        "La relación actual es del " +
        relaCuotaIngreso.toFixed(2) +
        " %." +
        "\n" +
        "Por favor, intente con más cuotas. Recuerde que el máximo es 24"
    )
    ingreseCuotas()
  }
}
// FIN FUNCIONES DE VALIDACION
//--------------------------------------------------------------
// FUNCIONES DEL SIMULADOR
//funcion calcular tasa mensual, me dice que tasa se aplica según la cantidad de cuotas indicadas

function obtenerTasaMensual(cantidadDeCuotas) {
  if (cantidadDeCuotas >= 3 && cantidadDeCuotas < 7) {
    return tnaTramo1
  } else {
    if (cantidadDeCuotas >= 7 && cantidadDeCuotas < 13) {
      return tnaTramo2
    } else {
      if (cantidadDeCuotas >= 13 && cantidadDeCuotas <= 24) {
        return tnaTramo3
      }
    }
  }
}

// funcion que calcula el préstamo y lo muestra en un alert (final del simulador)

function calcularPrestamo(montoSolicitado, cantidadDeCuotas) {
  tasaTransitoria = obtenerTasaMensual(cantidadDeCuotas) / 12
  cuotaPosible =
    (montoSolicitado * tasaTransitoria) /
    (1 - (1 + tasaTransitoria) ** -cantidadDeCuotas)

  let interes = 0
  let capital = 0
  let saldoPrestamo = montoSolicitado
  let cuotaN = 0

  for (let i = 0; i < cantidadDeCuotas; i++) {
    cuotaN = i + 1
    interes = saldoPrestamo * tasaTransitoria
    capital = cuotaPosible - interes
    saldoPrestamo = saldoPrestamo - capital
    alert(
      "A continuación, se muestra el desarrollo del préstamo solicitado:" +
        "\n" +
        "Monto del préstamo: $" +
        montoSolicitado +
        " en " +
        cantidadDeCuotas +
        " cuotas fijas." +
        "\n" +
        "Cuota N°" +
        cuotaN +
        ":" +
        "\n" +
        "                    Capital: $ " +
        capital.toFixed(2) +
        "\n" +
        "                    Interés: $ " +
        interes.toFixed(2) +
        "\n" +
        "                -----------------" +
        "\n" +
        "             Cuota Total: $ " +
        cuotaPosible.toFixed(2) +
        "\n" +
        "Saldo del Préstamo: $ " +
        saldoPrestamo.toFixed(2) +
        "\n"
    )
  }
}
// FIN FUNCIONES DEL SIMULADOR
//--------------------------------------------------------------
// Parámetros del simulador y declaracion de variables globales

let ingresoDeclarado = 0
let montoSolicitado = 0
let cantidadDeCuotas = 24
let numIngresado = 0
const relacionCuotaIngreso = 0.3

// valores de las tasas para los tres tramos posibles de cuotas

let tnaTramo1 = 0.08
let tnaTramo2 = 0.12
let tnaTramo3 = 0.16
//--------------------------------------------------------------

/* Mensajes de bienvenida al simulador de préstamos 
(en 2 partes para evitar la barra de desplazamiento del alert)*/

const mensajeBienvenida1 =
  "Bienvenido al Simulador de préstamos personales." +
  "\n" +
  "\n" +
  "A continuación, le solicitaremos que ingrese los siguientes datos:" +
  "\n" +
  "\n" +
  "1) Sus ingresos mensuales demostrables." +
  "\n" +
  "2) Monto del préstamo que va a solicitar." +
  "\n" +
  "3) La cantidad de cuotas en que realizará los pagos (mensuales). "

const mensajeBienvenida2 =
  "Tome en cuenta lo siguiente: " +
  "\n" +
  "\n" +
  "- El mínimo de cantidad de cuotas es 3 y el máximo 24." +
  "\n" +
  "- La cuota a pagar no podrá superar el 30% de sus ingresos mensuales." +
  "\n" +
  "- Las tasas a aplicar serán las siguientes:" +
  "\n" +
  "     De 3 a 6 cuotas: la TNA será del " +
  tnaTramo1 * 100 +
  "%." +
  "\n" +
  "     De 7 a 12 cuotas: la TNA será del " +
  tnaTramo2 * 100 +
  "%." +
  "\n" +
  "     De 13 a 24 cuotas: la TNA será del " +
  tnaTramo3 * 100 +
  "%."

alert(mensajeBienvenida1)
alert(mensajeBienvenida2)
//--------------------------------------------------------------

// Solicito que ingrese los datos
// Ingresos mensuales demostrables
ingreseIngresos()

// Ingreso de monto solicitado
ingreseMontoSolicitado()


// Ingreso de cantidad de cuotas
ingreseCuotas()

// Calculo el prestamo y muestro el desarrollo en un alert.
calcularPrestamo(montoSolicitado, cantidadDeCuotas)
