


function mostrarDatoEnId(presupuesto, valor){
    document.getElementById(presupuesto).textContent = valor;
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
    divFecha.textContent = gasto.fecha;
    divGasto.appendChild(divFecha);

    let divValorG = document.createElement("div");
     divValorG.className = "gasto-valor";
     divValorG.textContent = gasto.valor;
     divGasto.appendChild(divValorG);

     let divGastoEti = document.createElement("div");
     divGastoEti.className = gasto.etiquetas;
     divGasto.appendChild(divGastoEti);

     for (let eti of gasto.etiquetas){

        let spanEti = document.createElement("span");
     spanEti.className = "gasto-etiquetas-etiqueta";
     spanEti.textContent = eti;
     divGastoEti.appendChild(spanEti);

     }
     



    document.getElementById("listado-gastos-completo").appendChild(divGasto)
}



export{
    mostrarDatoEnId,
    mostrarGastoWeb,

};