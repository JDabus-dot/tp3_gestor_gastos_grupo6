import { obtenerGastos, guardarGasto } from "./funciones.js";

const listaGastos = $("#lista-gastos");

$(document).ready(function () {
  const gastos = obtenerGastos();
  gastos.forEach((gasto) => {
    const gastoItem = `<li>${gasto.nombre} - ${gasto.categoria} - $${gasto.monto} - ${gasto.fecha}</li>`;
    listaGastos.append(gastoItem);
  });
});
