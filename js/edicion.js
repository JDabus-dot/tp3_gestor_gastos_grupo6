import { cargoJSON, obtenerCategorias, guardarCategoria, eliminarCategoria, 
    actualizarCategoria, guardarValor, obtenerValor, guardarGasto, obtenerGastos, editarGasto} from "./funciones.js";
import { renderizarGastos } from "./render.js";


$(document).ready(function () { //ejecuta código cuando el DOM esté listo
    let idGasto; // variable para almacenar el id del gasto a editar
    let gastos=JSON.parse(localStorage.getItem("gastos")) || []; // importante traerme los datos
    $(this).click(function (e) {
        if (!$(e.target).hasClass("btn-editar")) return; // si el elemento clickeado no tiene la clase btn-editar, no hace nada
        $("#formulario-edicion")[0].reset(); // limpia el formulario
        $("#popup-de-edicion").addClass("popup-activo"); // muestra el popup con flex luego de abrirlo
        idGasto = $(e.target).closest("li").attr("id"); // obtiene el id del gasto a editar
        const gasto = gastos.find(g => g.id == idGasto);
        $("#concepto-edicion").val(gasto.nombre);
        $("#monto-edicion").val(gasto.monto);
        $("#edicion-categoria").val(gasto.categoria);
        $("#fecha-edicion").val(gasto.fecha);
    });

    $("#btn-cerrar-edicion").click(function () {
        $("#popup-de-edicion").removeClass("popup-activo"); // oculta el popup al hacer clic en el botón de cerrar
    });

    $("#formulario-edicion").submit(function (e) {
        e.preventDefault();
        const gastoEditado = {
            id: idGasto,
            nombre: $("#concepto-edicion").val(),
            monto: $("#monto-edicion").val(),
            categoria: $("#edicion-categoria").val(),
            fecha: $("#fecha-edicion").val(),
        };

        // Validaciones
        let montoGastoFLOAT = parseFloat(gastoEditado.monto);
        if(isNaN(montoGastoFLOAT) || montoGastoFLOAT <= 0 || gastoEditado.monto==="") {
            return alert("El monto no puede ser negativo");}

        if (gastoEditado.nombre.trim() === "") //si el nombre esta vacío, trim elimina espacios en blanco
            {return alert("El nombre del gasto no debe estar vacío");}
        
        let fechahoy = new Date().toISOString().split("T")[0]; // convierte la fecha de hoy en str el TOISOString
        // split("T") divide la fecha str en dos partes ej [24-04-2026, 12:15:33]
        // [0] tomo el primer elemento del arreglo 
        if (gastoEditado.fecha === "" || gastoEditado.fecha > fechahoy)
            {return alert("La fecha no puede ser futura ni estar vacía");}

        if(gastoEditado.categoria === "")
            {return alert("Debe seleccionar una categoría");}

        $("#popup-de-confirmacion").removeClass("popup-confirmacion-activo"); // reinicia la animación, quitando la clase
        setTimeout(() => $("#popup-de-confirmacion").addClass("popup-confirmacion-activo"), 10); // vuelve a agregar la clase 
        // para que se ejecute la animación luego de esperar 10ms
        
        editarGasto(gastoEditado);

        $("#popup-de-edicion").removeClass("popup-activo"); // oculta el popup después de guardar los cambios

        renderizarGastos();
    });
});