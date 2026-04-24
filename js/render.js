import { obtenerCategorias, obtenerGastos } from "./funciones.js";

function htmlGastos(gastos) {
  const listaGastos = $("#lista-gastos");
  listaGastos.empty();

  const categorias = obtenerCategorias();

  if (gastos.length === 0) {
    listaGastos.append("<li class='no-gastos'>No hay gastos registrados</li>");
    return;
  }

  gastos.forEach((gasto) => {
    const categoria = categorias.find((c) => c.id === Number(gasto.categoria));
    const gastoItem = `
        <li id="${gasto.id}">
          <span>${gasto.nombre}</span>
          <span>${categoria.nombre}</span>
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

export function renderizarGastos() {
  const gastos = obtenerGastos();
  htmlGastos(gastos);
}

export function renderizarGastosFiltrados(gastosFiltrados) {
  htmlGastos(gastosFiltrados);
}
