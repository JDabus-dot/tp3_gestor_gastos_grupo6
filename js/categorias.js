/***************************************************************************************************
      Nombre: Categorias.js                                                                      
                                                                                                
  VERSION     AUTOR                           COMENTARIOS                                        
    1.0      ALEJANDRO L. BALDRES         PRIMERA VERSION                                         
    1.1      ALEJANDRO L. BALDRES         FIX LIMPIEZA DE INPUT AL PRESIONAR EL BOTON DE CREAR C 
    1.2      ALEJANDRO L. BALDRES         INICIALIZACION DE CATEGORIAS
/**************************************************************************************************/
import { cargoJSON } from "./funciones.js";

let categoriasJSON = [];
let contadorCategorias = 0; // Contador de Categorias Cargadas

//Este bloque de codigo se ejecuta cuando el HTML esta cargado y captura el submit del formulario y
//el enter del input de nueva categoria
$(document).ready(function() {
    if ( categoriasJSON.length === 0 ) {
       cargoJSON("../data/categorias.json").then(datos => {
          categoriasJSON = datos;
          if ( categoriasJSON.length != 0 ) {
            categoriasJSON.forEach(categoria => {
            creo_item(categoria.color, categoria.icono, categoria.nombre, categoria.id);
           }); 
         }
       });
    }

    $('#formulario-categoria').on('submit', function(e) { // Atrapo la señal del submit y agrego la categoria
            let categoriaGasto = $('#input-gasto');
            e.preventDefault();
            agregarCategoria();
            categoriaGasto.val('');
            categoriaGasto.focus();
    });

    $('input-gasto').on('keypress', function(e) {
        if ( e.which === 13 || e.key === 'Enter' ) {
            e.preventDefault();
            if ( validoInput($(this).val()) ) {
                $(this).blur();
            } else {
                alert('El nombre de la categoria debe tener al menos 4 caracteres');
            }
        }
    });

    $('#btn-crear').on('click', function() {
        agregarCategoria();
    });
});

//Funcion que valida que un texto tenga al menos 4 caracteres
function validoInput(texto) {   
    let resultado = 1;
    if ( (texto.length < 4) || !(texto) ) {
        resultado = 0;
    };
    return resultado;
}

//Funcion que agrega una categoria
function agregarCategoria(){
    let icono = $('#icono-t');
    let esUnico = 1;
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
        categoriasJSON.some(categoria => {
            if ( categoria.nombre.toUpperCase() === categoriaGasto.val().toUpperCase() ) {
                esUnico = 0;
                alert("Categoria Existente!");
                categoriaGasto.focus();
                return 1;
            }
            else {
                return 0;
            }
        });
        if ( esUnico ) {
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
            creo_item(color, icono.text(), categoriaGasto.val(), Date.now());
            categoriaGasto.val('');
            categoriaGasto.focus();
        }
    } else {
        alert('El nombre de la categoria debe tener al menos 4 caracteres');
        categoriaGasto.focus();
    }
}

function creo_item(color, icono, nombre, idBD) {
    $('.lista-categorias').append(`<li class="item-lista ${color}">
                            <div class="icono-lista">
                                ${icono}
                            </div>
                            <div class="nombre-categoria">
                                <input type="text" class="input-lista" value="${nombre}">        
                            </div>
                            <div>
                                <button class="btn-flat" identificador="${idBD}">❌</button>                
                            </div>
                        </li>`);
    contadorCategorias += 1; // incremento la cantidad de categorias y cambio el label que visualiza la cantidad
    $('#cantidad-categorias').text(`${contadorCategorias} categorias cargadas`);    
}
