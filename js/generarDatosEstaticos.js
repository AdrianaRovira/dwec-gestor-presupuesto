

// Función	¿Qué hace?
// mostrarPresupuesto()	  Prepara el texto con el presupuesto.
// mostrarDatoEnId()	  Introduce ese texto en un elemento del HTML.


import * as gesPres from "./gestionPresupuesto.js";
import * as manipulaDom from "./gestionPresupuestoWeb.js";


let gasto1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gesPres.anyadirGasto(gasto1);
let gasto2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gesPres.anyadirGasto(gasto2);
let gasto3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gesPres.anyadirGasto(gasto3);
let gasto4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gesPres.anyadirGasto(gasto4);
let gasto5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gesPres.anyadirGasto(gasto5);
let gasto6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gesPres.anyadirGasto(gasto6);

gesPres.actualizarPresupuesto(1500);



manipulaDom.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

manipulaDom.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

manipulaDom.mostrarDatoEnId("balance-total", gesPres.calcularBalance());



// manipulaDom.mostrarGastoWeb("listado-gastos-completo", gesPres.listarGastos());


 for(let gasto of gesPres.listarGastos() ){
    manipulaDom.mostrarGastoWeb("listado-gastos-completo", gasto);
 }



 for (let gasto of gesPres.filtrarGastos({
            fechaDesde:"2021-09-01", 
            fechaHasta:"2021-09-30"
        })){

        manipulaDom.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);

        }




  for (let gasto of gesPres.filtrarGastos({valorMinimo:50})){
        manipulaDom.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
 }

  for (let gasto of gesPres.filtrarGastos({valorMinimo:200, etiquetasTiene:["seguros"]})){
        manipulaDom.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
 }

  for (let gasto of gesPres.filtrarGastos({valorMaximo:50, etiquetasTiene:["comida", "transporte"]})){
        manipulaDom.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
 }


manipulaDom.mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), "dia");
manipulaDom.mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), "mes");
manipulaDom.mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), "anyo");











//-----------------------------------------------------------


// ¿Qué estamos haciendo?
// - "listado-gastos-completo" indica en qué contenedor del HTML queremos mostrarlo.
// - gasto1 es el objeto que acabamos de crear.
// - mostrarGastoWeb() se encarga de construir todos los div y span que has programado.




