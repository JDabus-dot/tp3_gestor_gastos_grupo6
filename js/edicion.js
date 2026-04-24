import { cargoJSON, obtenerCategorias, guardarCategoria, eliminarCategoria, 
    actualizarCategoria, guardarValor, obtenerValor, guardarGasto, obtenerGastos, editarGasto} from "./funciones.js";
import { renderizarGastos } from "./render.js";


$(document).ready(function () { //ejecuta código cuando el DOM esté listo
    let idGasto; // variable para almacenar el id del gasto a editar
    $(this).click(function (e) {
        if (!$(e.target).hasClass("btn-editar")) return; // si el elemento clickeado no tiene la clase btn-editar, no hace nada
        $("#popup-de-edicion").addClass("popup-activo"); // muestra el popup con flex luego de abrirlo
        idGasto = $(e.target).closest("li").attr("id"); // obtiene el id del gasto a editar
        console.log(idGasto);
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
            fecha: $("#fecha-edicion").val()
        };

        editarGasto(gastoEditado);

        $("#popup-de-edicion").removeClass("popup-activo"); // oculta el popup después de guardar los cambios
        renderizarGastos();
    })});

//  $('input-gasto').on('keypress', function(e) {
//         if ( e.which === 13 || e.key === 'Enter' ) {
//             e.preventDefault();
//             if ( validoInput($(this).val()) ) {
//                 $(this).blur();
//             } else {
//                 alert('El nombre de la categoria debe tener al menos 4 caracteres');
//             }
//         }
//     });
