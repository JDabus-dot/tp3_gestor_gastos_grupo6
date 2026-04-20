import { obtenerGastos, guardarGasto } from "./funciones.js";

const listaGastos = $("#lista-gastos");

$(document).ready(function () {
  const gastos = obtenerGastos();
  gastos.forEach((gasto) => {
    const gastoItem = `<li>
    <span>${gasto.nombre}</span>
    <span>${gasto.categoria}</span>
    <span>$${gasto.monto}</span>
    <span>${gasto.fecha}</span>
    </li>`;
    listaGastos.append(gastoItem);
  });
});
