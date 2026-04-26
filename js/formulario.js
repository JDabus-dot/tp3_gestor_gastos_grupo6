import { actualizarVista } from "./render.js";
import { cargarCategoriasEnSelect, obtenerGastos, guardarGasto, validarFecha } from "./funciones.js";


$(document).ready(function () {
  //Se traen los elementos del HTML y se guardan en variables
  const form = $("#formulario-gasto");

  actualizarVista();
  cargarCategoriasEnSelect();

  //detecta cuando el usuario hace un submit y evita que la página se recargue
  const nombre = $("#nombre");
  const monto = $("#monto");
  const categoria = $("#categoria");
  const fecha = $("#fecha");

  form.on("submit", (e) => {
    e.preventDefault(); //evita  que se recargue la página

    nombre.removeClass("error");
    monto.removeClass("error");
    categoria.removeClass("error");
    fecha.removeClass("error");

    let valido = true;
    //validaciones
    if (nombre.val().trim() === "") {
      nombre.addClass("error");
      valido = false;
    }
    if (monto.val() === "" || Number(monto.val()) <= 0) {
      monto.addClass("error");
      valido = false;
    }

    if (categoria.val().trim() === "") {
      categoria.addClass("error");
      valido = false;
    }

    if (!validarFecha(fecha.val().trim())) {
      fecha.addClass("error");
      valido = false;
    }

    if (!valido) return;

    //crea un nuevo gasto
    const nuevoGasto = {
      id: Date.now(),
      nombre: nombre.val().trim(),
      monto: Number(monto.val()),
      categoria: categoria.val().trim(),
      fecha: fecha.val().trim(),
    };
    guardarGasto(nuevoGasto);
    form[0].reset(); //limpia el formulario
    actualizarVista();
  });
});
