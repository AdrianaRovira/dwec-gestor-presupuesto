


function mostrarDatoEnId(idElemento, valor){

    document.getElementById(idElemento).textContent = valor;

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
    divFecha.textContent = new Date(gasto.fecha).toISOString();
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
     spanEti.className = "span.gasto-etiquetas-etiqueta";
     spanEti.textContent = eti;
     divGastoEti.appendChild(spanEti);

     }
     
    }


    document.getElementById(idElemento).appendChild(divGasto)


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

       let titulo = document.createElement("H1");
       titulo.textContent = "Gastos agrupados por " +datoPeriodo;
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
    mostrarGastosAgrupadosWeb

};