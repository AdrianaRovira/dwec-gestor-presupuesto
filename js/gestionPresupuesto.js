// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;


//Función Actualizar presupuesto
function actualizarPresupuesto(valor) {
    // TODO

    if(valor < 0 || typeof valor != "number"){
    
        console.log("Error, el número es menor de 0");
        return -1;

    }else{

        console.log("Es un número correcto");
        presupuesto = valor;
        return presupuesto;
    }
    
}

//Funcion mostrar presupuesto
function mostrarPresupuesto() {
// TODO
    let texto;

        texto = "Tu presupuesto actual es de " + presupuesto + " €";

    return texto;
    
}

//CREAR OBJETO 

//constructor objeto.
//Creo las funciones dentro del constructor del objeto rn vrz de con prototype
function CrearGasto(descripcionIntro, valorIntro) {
    // TODO
    this.descripcion = descripcionIntro;
    this.valor = valorIntro;
    

    if( typeof valorIntro == "number" && valorIntro >= 0){
       this.valor = valorIntro;

    }else{
            this.valor = 0;
        }

        
       //funcion mostrar descripcion y gasto
        this.mostrarGasto = function(){

            let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €" ;

            return texto;
            
        
        }

        //funcion actualizar descripcion
        this.actualizarDescripcion = function(nuevaDescripcion){
            
            this.descripcion = nuevaDescripcion;
        }

        //funcion actualizar valor
        this.actualizarValor = function(nuevoValor){

            if(typeof nuevoValor == "number" && nuevoValor >= 0){

               this.valor = nuevoValor;

            }
        }

    }








// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
