$(window).ready(function () { 
$('.radio-button').on('change',function() {
   let icono = $('input[name="radios"]:checked').closest('.label-radio').text(); 
   $('.icono-texto').text(icono);
});
});
