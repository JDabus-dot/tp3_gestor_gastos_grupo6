import { cargoJSON, obtenerCategorias, guardarCategoria, eliminarCategoria, actualizarCategoria, guardarValor, obtenerValor } from "./funciones.js";


let categoriasJSON = [];
let contadorCategorias = 0; // Contador de Categorias Cargadas

//Este bloque de codigo se ejecuta cuando el HTML esta cargado y captura el submit del formulario y
//el enter del input de nueva categoria
$(document).ready(function() {
    categoriasJSON = obtenerCategorias();
    if ( categoriasJSON.length === 0 && !obtenerValor("inicializado") ) {
           cargoJSON("../data/categorias.json").then(datos => {
              categoriasJSON = datos;
              if ( categoriasJSON.length != 0 ) {
                categoriasJSON.forEach(categoria => {
                creoItem(categoria.color, categoria.icono, categoria.nombre, categoria.id);
                guardarCategoria(categoria);
               }); 
             }
           });
          guardarValor("inicializado", 1);
        }
        else {
            categoriasJSON.forEach(categoria => {
            creoItem(categoria.color, categoria.icono, categoria.nombre, categoria.id);
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

    //Creo categoria al hacer click en el boton
    $('#btn-crear').on('click', function() {
        agregarCategoria();
    });

    // actualizo el nombre de la categoria
    $(document).on('keypress', '.input-lista', function (e) {
        if ( e.which === 13 || e.key === 'Enter' ) {
            e.preventDefault();
            $(this).blur();
        }
    });
    
    // actualizo el nombre de la categoria cuando pierdo el foco para evitar bug ;-)
    $(document).on('blur', '.input-lista', function() {
        actualizarElemento($(this));
    })

    //Elimino de la categoria de la lista y el json
    $(document).on('click', '.btn-flat', function() {
        const id = $(this).attr('identificador'); 
        
        categoriasJSON = categoriasJSON.filter(categoria => categoria.id != id);
        eliminarCategoria(id);
        contadorCategorias -= 1; // decremento la cantidad de categorias y cambio el label que visualiza la cantidad
        $('#cantidad-categorias').text(`${contadorCategorias} categorias cargadas`);  
        $(this).closest('li.item-lista').remove();
        console.log(categoriasJSON);
    });
});

function actualizarElemento(elemento) {
    let idJson = elemento.closest('.item-lista').find('.btn-flat').attr('identificador');
    let indice = categoriasJSON.findIndex(categoria => categoria.id == idJson);
    if ( indice !== -1 ) {
        categoriasJSON[indice].nombre = elemento.val();
        actualizarCategoria(indice, elemento.val());
    }
    else {
             alert('Categoria no encontrada, por favor refresque la pantalla!');
         } 
}

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
    let item;
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
            item = creoCategoriaJSON(color, icono.text(), categoriaGasto.val(), Date.now());
            guardarCategoria(item);
            categoriasJSON.push(item);
            creoItem(item.color, item.icono, item.nombre, item.id);
            categoriaGasto.val('');
            categoriaGasto.focus();
        }
    } else {
        alert('El nombre de la categoria debe tener al menos 4 caracteres');
        categoriaGasto.focus();
    }
}

function creoCategoriaJSON (color, icono, nombre, idBD) {
    let categoria = {};

    categoria.id = idBD;
    categoria.nombre = nombre;
    categoria.icono = icono;
    categoria.color = color;

    return categoria;
}
function creoItem(color, icono, nombre, idBD) {
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
