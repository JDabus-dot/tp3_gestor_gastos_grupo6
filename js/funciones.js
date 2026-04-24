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

export function obtenerValor(variable) {
  return localStorage.getItem(variable);
}

export function guardarValor(variable, contenido) {
  localStorage.setItem(variable, contenido);
}

export function eliminarCategoria(id) {
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  const categoriasFiltradas = categorias.filter((categoria) => categoria.id != id);
  localStorage.setItem("categorias", JSON.stringify(categoriasFiltradas));
}

export function actualizarCategoria(indice, nombreCategoria) {
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  categorias[indice].nombre = nombreCategoria;
  localStorage.setItem("categorias", JSON.stringify(categorias));
}

export function eliminarGasto(id) {
  const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
  const gastosFiltrados = gastos.filter((gasto) => gasto.id != id);
  localStorage.setItem("gastos", JSON.stringify(gastosFiltrados));
}

// Recibe un array de objetos gasto y devuelve el total de los montos
export function calcularTotalGastos(gastos) {
  return gastos.reduce((total, gasto) => (total += gasto.monto), 0);
}

//Cargo un json pasandole la uri puede ser local
export function cargoJSON(uri) {
  return $.ajax({
    url: uri,
    method: "GET",
    datatype: "json",
  })

    .done((datos) => {
      return datos;
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      return {};
    });
}

//Muestra las categorias en un select
export function cargarCategoriasEnSelect() {
    const select = $(".opciones-categorias");
    const categorias = obtenerCategorias();


    categorias.forEach(cat => {
        select.append(
            '<option value="' + cat.id + '">' + cat.nombre + '</option>'
        );
    });
}
