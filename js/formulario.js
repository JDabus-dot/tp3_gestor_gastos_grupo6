import { renderizarGastos } from "./render.js";
import { cargarCategoriasEnSelect, obtenerGastos, guardarGasto, calcularTotalGastos } from "./funciones.js";

$(document).ready(function() {
    //Se traen los elementos del HTML y se guardan en variables
    const form= $("#formulario-gasto");
    const totalEL= $("#total");
    const cantidadEl= $("#cantidad");

renderizarGastos();
actualizarResumen();
cargarCategoriasEnSelect(); 

//detecta cuando el usuario hace un submit y evita que la página se recargue
form.on("submit", (e) => {
    e.preventDefault(); //evita  que se recargue la página

    const nombre= $("#nombre");
    const monto= $("#monto");
    const categoria= $("#categoria");
    const fecha= $("#fecha");

    let valido= true;

    nombre.removeClass("error");
    monto.removeClass("error");
    categoria.removeClass("error");
    fecha.removeClass("error");

    //validaciones
    if (nombre.val().trim() === ""){
        nombre.addClass("error");
        valido=false;
    }
    if (monto.val() === "" || Number(monto.val()) <= 0) { 
        monto.addClass("error");
        valido = false; } 

    if (categoria.val() === "") {
        categoria.addClass("error"); 
        valido = false; } 

    if (fecha.val() === "") {
        fecha.addClass("error");
        valido = false; } 
    

    if (!valido) return;
    
    //crea un nuevo gasto
    const nuevoGasto= {
        id: Date.now(),
        nombre: nombre.val(),
        monto: Number(monto.val()),
        categoria: categoria.val(),
        fecha: fecha.val()  
    }
    guardarGasto(nuevoGasto);

    form[0].reset();//limpia el formulario

    renderizarGastos();//actualiza la pantalla
    actualizarResumen();
}); 

function actualizarResumen(){
    const gastos=obtenerGastos();
    totalEL.text(`$${calcularTotalGastos(gastos)}`);
    cantidadEl.text(gastos.length);
}
});

