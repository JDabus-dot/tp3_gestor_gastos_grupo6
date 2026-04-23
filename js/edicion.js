import { cargoJSON, obtenerCategorias, guardarCategoria, eliminarCategoria, 
    actualizarCategoria, guardarValor, obtenerValor, guardarGasto, obtenerGastos, editarGasto} from "./funciones.js";
import { renderizarGastos } from "./render.js";

$(document).ready(function () { //ejecuta código cuando el DOM esté listo
    let idGasto; // variable para almacenar el id del gasto a editar
    $(".btn-editar").click(function () {
        $(".popup-editar").show();
        idGasto = $(this).closest("li").attr("id"); // obtiene el id del gasto a editar
        console.log(idGasto);
    });
    $("#btn-cerrar-edicion").click(function () {
        $(".popup-editar").hide();
    });

    $("#formulario-gasto").submit(function (e) {
        e.preventDefault();

        const gastoEditado = {
            id: idGasto,
            nombre: $("#nombre").val(),
            monto: $("#monto").val(),
            categoria: $("#edicion-categoria").val(),
            fecha: $("#fecha").val()
        };

        editarGasto(gastoEditado);

        $(".popup-editar").hide();
        renderizarGastos();
    })});

