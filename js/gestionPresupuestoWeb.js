
import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){

    document.getElementById(idElemento).textContent = valor;

}

function repintar(){
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());
    
    document.getElementById("listado-gastos-completo").innerHTML = "";

     for(let gasto of gesPres.listarGastos()){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }

}

function actualizarPresupuestoWeb(){

    let presu = prompt("Introduce el nuevo presupuesto: ");
    if(!Number.isNaN(Number(presu))){

        gesPres.actualizarPresupuesto(Number(presu)); 
        repintar();

    }
}
//botón actualizar presupuesto
    document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb );


// El orden es:
// 1. Recoger los datos.
// 2. Convertir el valor y las etiquetas.
// 3. Crear el gasto con gesPres.crearGasto().
// 4. Añadirlo con gesPres.anyadirGasto().
// 5. Llamar a repintar().

function nuevoGastoWeb(){

    let descri = prompt("di la descripcion: ");
    let valor = prompt("di precio: ");
    let fecha = prompt("di fecha (yyyy-mm-dd): ");
    let eti = prompt("di tus etiquetas, con comas ',': ");

    let etiquetas = eti.split(",");

    let valorNumero = Number(valor);

   let gasto = new gesPres.CrearGasto(descri,valorNumero,fecha,...etiquetas);

   gesPres.anyadirGasto(gasto);

   repintar();

}



//botón añadir gasto
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);


//MANEJADOR DE OBJETOS

//funcion constructora:
function EditarHandle(){

    this.handleEvent = function(){
    let descri = prompt("descripcion: ", this.gasto.descripcion);
    let valor = prompt("precio: ", this.gasto.valor);
    let fecha = prompt("fecha nueva yyyy-mm-dd: ", new Date(this.gasto.fecha).toISOString().slice(0, 10));
    let eti = prompt("etiquetas: ", this.gasto.etiquetas.join(","));

    let numvalor = Number(valor);
    let etiquetas = eti.split(",");

    this.gasto.actualizarValor(numvalor);
    this.gasto.actualizarDescripcion(descri);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();


    }
};

function borrarHandle(){

    this.handleEvent = function(){
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }

};

function BorrarEtiquetasHandle(){

    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta)

        repintar();
    };
}




function mostrarGastoWeb(idElemento, gasto){
   
    let divGasto = document.createElement("div");
    divGasto.className ="gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = gasto.descripcion;
    divGasto.appendChild(divDesc);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValorG = document.createElement("div");
     divValorG.className = "gasto-valor";
     divValorG.textContent = gasto.valor;
     divGasto.appendChild(divValorG);

     let divGastoEti = document.createElement("div");
     divGastoEti.className = "gasto-etiquetas";
     divGasto.appendChild(divGastoEti);

     for (let eti of gasto.etiquetas){

        let spanEti = document.createElement("span");

        let manejadorEti = new BorrarEtiquetasHandle();
        manejadorEti.gasto = gasto;
        manejadorEti.etiqueta = eti;
          

        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.textContent = eti;
        divGastoEti.appendChild(spanEti);

        spanEti.addEventListener("click", manejadorEti);
        
        
     }

     let divBotones = document.createElement("div");
        divGasto.appendChild(divBotones);
     
        let manejadorEdit = new EditarHandle();
        manejadorEdit.gasto = gasto;
     
            
            let botonEdit = document.createElement("button");
            botonEdit.className = "gasto-editar";
            botonEdit.type = "button";
            botonEdit.textContent = "Editar";
            divBotones.appendChild(botonEdit);

     botonEdit.addEventListener("click", manejadorEdit);


        let manejadorBorrar = new borrarHandle();
        manejadorBorrar.gasto = gasto;
 

            let botonBorrar = document.createElement("button");
            botonBorrar.className = "gasto-borrar";
            botonBorrar.type ="button";
            botonBorrar.textContent = "Borrar";
            divBotones.appendChild(botonBorrar);

       botonBorrar.addEventListener("click", manejadorBorrar);

     document.getElementById(idElemento).appendChild(divGasto)
     
    }


    


    function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

        let datoPeriodo = "";
        switch(periodo){
            
            case "anyo":
                datoPeriodo = "año"
                break;
            case "mes":
                datoPeriodo = "mes"
                break;
            case "dia":
                datoPeriodo = "día"
                break;

        }

       let divAgrup = document.createElement("div");
       divAgrup.className = "agrupacion";

       let titulo = document.createElement("h1");
       titulo.textContent = "Gastos agrupados por " + datoPeriodo;
         divAgrup.appendChild(titulo);

       for (let dato in agrup){

            let divAgrupDato = document.createElement("div");
            divAgrupDato.className = "agrupacion-dato";
             divAgrup.appendChild(divAgrupDato);

             let spanClave = document.createElement("span");
             spanClave.className = "agrupacion-dato-clave";
             spanClave.textContent = dato;
             divAgrupDato.appendChild(spanClave);


            let spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor"
            spanValor.textContent = agrup[dato];
            divAgrupDato.appendChild(spanValor);
             
       }

       document.getElementById(idElemento).appendChild(divAgrup);
     
    }

    


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,

};