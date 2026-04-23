import { guardarGasto, eliminarGasto } from "./funciones.js";
import { renderizarGastos } from "./render.js";

$(document).ready(function () {
  renderizarGastos();

  $("#lista-gastos").on("click", ".btn-eliminar", function () {
    if (confirm("¿Estas seguro de eliminar este gasto?")) {
      const idGasto = $(this).closest("li").attr("id");
      eliminarGasto(idGasto);
      renderizarGastos();
    }
  });
});
