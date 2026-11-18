
//import { createElement } from "react";
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

//funcion constructora, crea objetos "borrarHandle" -> let objetomanejador = new borrarHandle()
function borrarHandle(){

    //metodo que va dentro del objeto manejador
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

       //BOTON EDITAR DESDE FORMULARIO
       let manejadorEditarForm = new AbrirFormularioEdicionHandle();
       manejadorEditarForm.gasto = gasto;
       manejadorEditarForm.divGasto = divGasto; 
  

            let botonEditForm = document.createElement("button");
            botonEditForm.className = "gasto-editar-formulario";
            botonEditForm.type = "button";
            botonEditForm.textContent = "Editar (formulario)";
            divBotones.appendChild(botonEditForm);

          manejadorEditarForm.botonEditar = botonEditForm;
        
        botonEditForm.addEventListener("click", manejadorEditarForm);

       


     document.getElementById(idElemento).appendChild(divGasto)
     
    }

    //Pulsas el botón «Editar (formulario)».
    //Esta función responde al clic en el botón «Editar (formulario)».
    function AbrirFormularioEdicionHandle(){

        this.handleEvent = function(){

        // Deshabilitar el botón «Editar (formulario)»
        this.botonEditar.disabled = true;

            // 1. Clonar la plantilla
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
            var formulario = plantillaFormulario.querySelector("form");

            //En el campo descripción del formulario,"=" introduce la descripción del gasto que estoy editando
            formulario.elements.descripcion.value = this.gasto.descripcion;
            formulario.elements.valor.value = this.gasto.valor;
            formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().slice(0, 10);
            formulario.elements.etiquetas.value = this.gasto.etiquetas.join(",");

            //manejadorEditarForm.gasto: guarda el gasto que tiene que modificar.
            let manejadorSubmit = new GuardarEdicionGastoHandle();
            manejadorSubmit.gasto = this.gasto;

            //manejadorBotonCancelar.formulario: guarda el formulario que tiene que eliminar.
             let manejadorBotonCancelar =  new CancelarEdicionGastoHandle();
             manejadorBotonCancelar.formulario = formulario;
             manejadorBotonCancelar.botonEditar = this.botonEditar;
    
            

            formulario.addEventListener("submit", manejadorSubmit);

            let botonCancelar = formulario.querySelector("button.cancelar");
            botonCancelar.addEventListener("click", manejadorBotonCancelar);

            this.divGasto.appendChild(plantillaFormulario);
          
        }
    }

      

    //Rellenas el formulario y pulsas «Enviar».
    //Esta función responde al evento submit, cuando pulsas «Enviar».
    function GuardarEdicionGastoHandle(){

        this.handleEvent = function(event){

        event.preventDefault();

        let descripcion = event.currentTarget.elements.descripcion.value;
        let valor = Number(event.currentTarget.elements.valor.value);
        let fecha = event.currentTarget.elements.fecha.value;
        let etiquetas = event.currentTarget.elements.etiquetas.value.split(",");

        // Actualizar los datos del gasto existente
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        // Sustituir las etiquetas anteriores por las nuevas
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiquetas);

        // Actualizar la página
        repintar();
    };
}

//BOTON CANCELAR DE EDITAR FORMULARIO
function CancelarEdicionGastoHandle(){

        this.handleEvent = function(){

            this.formulario.remove();
            this.botonEditar.disabled = false;
          
        }
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


function nuevoGastoWebFormulario(){

// 1. Clonar la plantilla
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  var formulario = plantillaFormulario.querySelector("form");
    
  //desactiva el botón (no puedes pulsarlo).
  document.getElementById("anyadirgasto-formulario").disabled = true;

  // 3. Función que procesa el envío
    function enviarFormulario (event){

        event.preventDefault();

        let descripcionForm = event.currentTarget.elements.descripcion.value;
        let valorForm = event.currentTarget.elements.valor.value;
        let fechaForm = event.currentTarget.elements.fecha.value;
        let etiquetasForm = event.currentTarget.elements.etiquetas.value;

        let etiquetasArray = etiquetasForm.split(",");
        let valorNum = Number(valorForm);

        //crear nuevo gasto
        let gasto = new gesPres.CrearGasto(descripcionForm,valorNum, fechaForm, ...etiquetasArray);

        //añadir gasto a la lista de gastos
        gesPres.anyadirGasto(gasto);
        
        //actualizar navegador
        repintar();

        //activa el botón (puedes volver a pulsarlo).
        document.getElementById("anyadirgasto-formulario").disabled = false;

    }

       

    // 4. Asociar el evento submit
    formulario.addEventListener("submit", enviarFormulario);

    //creamos el objeto manejador, pero todavia no sabe que formulario tiene que eliminar (remove())
    let manejadorCancelar = new CancelarFormHandle();

    //buscar el botón Cancelar dentro del formulario y guardar una referencia a él.
    let botonCancelar = formulario.querySelector("button.cancelar");

    //Aquí le estamos dando esa información.
    //, estamos creando una propiedad llamada formulario dentro del objeto manejadorCancelar y 
    // guardando en ella el formulario que hemos creado anteriormente
    manejadorCancelar.formulario = formulario;

    //añadir el manejador y sus funciones al evento click de boton cancelar
    botonCancelar.addEventListener("click", manejadorCancelar);
    
document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
}


 function CancelarFormHandle (){

            this.handleEvent = function(event){
                
                this.formulario.remove();

                document.getElementById("anyadirgasto-formulario").disabled = false;
            }
        }

//asocio al boton de anyadirgasto(formulario) la funcion de arriba
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

    



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    nuevoGastoWebFormulario,


};