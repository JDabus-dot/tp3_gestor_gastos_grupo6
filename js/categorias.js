/***************************************************************************************************/
/*      Nombre: Categorias.js                                                                      */
                                                                                                
/*  VERSION     AUTOR                           COMENTARIOS                                        */

/*    1.0      ALEJANDRO L. BALDRES         PRIMERA VERSION                                         */
/*    1.1      ALEJANDRO L. BALDRES         FIX LIMPIEZA DE INPUT AL PRESIONAR EL BOTON DE CREAR C */
/**************************************************************************************************/

let contadorCategorias = 0; // Contador de Categorias Cargadas

//Este bloque de codigo se ejecuta cuando el HTML esta cargado y captura el submit del formulario y
//el enter del input de nueva categoria
$(document).ready(function() {
    $('#formulario-categoria').on('submit', function(e) { // Atrapo la señal del submit y agrego la categoria
            let categoriaGasto = $('#input-gasto');
            e.preventDefault();
            agregarCategoria();
            categoriaGasto.val('');
            categoriaGasto.focus();
    });

    $(document).on('keypress', '.input-lista', function(e) { // Si presiono enter saco el foco del elemento de la lista desordenada 
        if ( e.which === 13 || e.key === 'Enter' ) {
            e.preventDefault();
            if ( validoInput($(this).val()) ) {
                $(this).blur();
            } else {
                alert('El nombre de la categoria debe tener al menos 4 caracteres');
            }
        }
    });
});

//Funcion que valida que un texto tenga al menos 4 caracteres
function validoInput(texto) {   
    resultado = 1;
    if ( (texto.length < 4) || !(texto) ) {
        resultado = 0;
    };
    return resultado;
}

//Funcion que agrega una categoria
function agregarCategoria(){
    let listado = $('.lista-categorias');
    let icono = $('#icono-t');
    let colorSeleccionado = $('input[name="radio-color"]:checked').css('background-color'); // Tomo el color de fondo del boton radio seleccionado. Lo devuelve en formato rgb()
    let categoriaGasto = $('#input-gasto');
    let color = "";
    const colores = {                               //Genero un objeto que me almacene los colores de los botones radio
                        esmeralda: 'rgb(26, 122, 110)',
                        naranja: 'rgb(232, 93, 53)',
                        marron: 'rgb(201, 74, 36)',
                        verdeAzulado: 'rgb(42, 157, 143)',
                        naranjaSuave: 'rgb(244, 162, 97)',
                        azulGrisaceo: 'rgb(38, 70, 83)'
                    };

    if ( validoInput(categoriaGasto.val()) ) { // Si hay una categoria valida cargada procedo a: primero seleccionar la clase de color y luego al armado del elemento li
        switch (colorSeleccionado) {
            case colores.esmeralda:
                color = "esmeralda";
                break;
            case colores.naranja:
                color = "naranja";
                break;
            case colores.marron:
                color = "marron";
                break;
            case colores.verdeAzulado:
                color = "verde-azulado";
                break;
            case colores.naranjaSuave:
                color = "naranja-suave";
                break;
            case colores.azulGrisaceo:
                color = "azul-grisaceo";
                break;
        }
        listado.append(`<li class="item-lista ${color}">
                            <div class="icono-lista">
                                ${icono.text()}
                            </div>
                            <div class="nombre-categoria">
                                <input type="text" class="input-lista" value="${categoriaGasto.val()}">        
                            </div>
                            <div>
                                <button class="btn-flat">❌</button>                
                            </div>
                        </li>`);
        contadorCategorias += 1; // incremento la cantidad de categorias y cambio el label que visualiza la cantidad
        $('#cantidad-categorias').text(`${contadorCategorias} categorias cargadas`);
        categoriaGasto.val('');
        categoriaGasto.focus();
    } else {
        alert('El nombre de la categoria debe tener al menos 4 caracteres');
        categoriaGasto.focus();
    }
}
