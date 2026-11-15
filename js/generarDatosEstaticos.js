

// Función	¿Qué hace?
// mostrarPresupuesto()	  Prepara el texto con el presupuesto.
// mostrarDatoEnId()	  Introduce ese texto en un elemento del HTML.

import { mostrarDatoEnId,  mostrarGastoWeb } from "./gestionPresupuestoWeb.js";

import{
    mostrarPresupuesto,
    actualizarPresupuesto,
    calcularTotalGastos, 
    calcularBalance, 
    CrearGasto,
    anyadirGasto
} from "./gestionPresupuesto.js"

mostrarDatoEnId("presupuesto", mostrarPresupuesto());
mostrarDatoEnId("gastos-totales", calcularTotalGastos());
 mostrarDatoEnId("balance-total", calcularBalance());



let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", " comida");
actualizarPresupuesto(1500);

anyadirGasto(gasto1);

//-----------------------------------------------------------
mostrarGastoWeb("listado-gastos-completo", gasto1);

// ¿Qué estamos haciendo?
// - "listado-gastos-completo" indica en qué contenedor del HTML queremos mostrarlo.
// - gasto1 es el objeto que acabamos de crear.
// - mostrarGastoWeb() se encarga de construir todos los div y span que has programado.




