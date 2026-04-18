// Se pasa objeto gasto con los siguientes campos: { nombre, categoria, monto, fecha }
export function guardarGasto(gasto) {
  const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
  const esta = gastos.some(
    (g) =>
      g.nombre === gasto.nombre &&
      g.categoria === gasto.categoria &&
      g.monto === gasto.monto &&
      g.fecha === gasto.fecha,
  );
  if (!esta) {
    gastos.push(gasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }
}

export function obtenerGastos() {
  return JSON.parse(localStorage.getItem("gastos")) || [];
}

export function guardarCategoria(categoria) {
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  if (!categorias.includes(categoria)) {
    categorias.push(categoria);
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }
}

export function obtenerCategorias() {
  return JSON.parse(localStorage.getItem("categorias")) || [];
}

export function eliminarGasto(gasto) {
  const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
  const gastosFiltrados = gastos.filter(
    (g) =>
      g.nombre !== gasto.nombre ||
      g.categoria !== gasto.categoria ||
      g.monto !== gasto.monto ||
      g.fecha !== gasto.fecha,
  );
  localStorage.setItem("gastos", JSON.stringify(gastosFiltrados));
}

// Recibe un array de objetos gasto y devuelve el total de los montos
export function calcularTotalGastos(gastos) {
  return gastos.reduce((total, gasto) => (total += gasto.monto), 0);
}
