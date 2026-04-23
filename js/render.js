import { obtenerGastos } from "./funciones.js";

export function renderizarGastos() {
  const listaGastos = $("#lista-gastos");
  listaGastos.empty();

  const gastos = obtenerGastos();

  if (gastos.length === 0) {
    listaGastos.append("<li>No hay gastos registrados</li>");
    return;
  }

  gastos.forEach((gasto) => {
    const gastoItem = `
        <li id="${gasto.id}">
          <span>${gasto.nombre}</span>
          <span>${gasto.categoria}</span>
          <span>$${gasto.monto}</span>
          <span>${gasto.fecha}</span>
          <div class="acciones">
            <button class="btn btn-editar">✏️</button>
            <button class="btn btn-eliminar">❌</button>
          </div>
        </li>`;
    listaGastos.append(gastoItem);
  });
}
