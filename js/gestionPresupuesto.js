// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(presupuestoIntroducido) {
    // TODO

    if(presupuestoIntroducido < 0 || typeof presupuestoIntroducido != "number"){
    
        console.log("Error, el número es menor de 0");
        return -1;

    }else{

        console.log("Es un número correcto");
        presupuesto = presupuestoIntroducido;
        return presupuesto;
    }
    
}

function mostrarPresupuesto() {
// TODO
let texto;
   texto = "Tu presupuesto actual es de " + presupuesto + " €";
   return texto;
    
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
