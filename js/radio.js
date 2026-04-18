/***************************************************************************************************/
/*      Nombre: radio.js                                                                          */
                                                                                                
/*  VERSION     AUTOR                           COMENTARIOS                                        */

/*    1.0      ALEJANDRO L. BALDRES        PRIMERA VERSION                                         */
/**************************************************************************************************/
//Funcion que le coloca el icono del radio seleccionado al icono del input de nueva categoria
$(document).ready(function () { 
    $('.radio-button').on('change',function() {
       let icono = $('input[name="radios"]:checked').closest('.label-radio').text(); 
       $('.icono-texto').text(icono);
    });
});
