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

//Inicializar el JSON de Categorias
export async function inicializarCategorias() {
  const categoriasJSON = obtenerCategorias();
  if (categoriasJSON.length === 0 && !obtenerValor("inicializado")) {
    const datos = await cargoJSON("data/categorias.json");
    localStorage.setItem("categorias", JSON.stringify(datos));
    guardarValor("inicializado", 1);
  }
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
    dataType: "json",
  })

    .done((datos) => {
      return datos;
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      return {};
    });
}

export function editarGasto(gasto) {
  const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
  const indice_id = gastos.findIndex(
    // indice_id tomará el valor del indice en el cual g = gasto.id
    (
      g, // g es una variable que recorre cada elemnto del array []
    ) => g.id == gasto.id,
  );
  if (indice_id !== -1) {
    // si el indice es distinto a -1, es xq lo encontró
    gastos[indice_id] = gasto; // cambbio los datos del arreglo
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }
}
//Muestra las categorias en un select la hizo Marianela y JuliR
export async function cargarCategoriasEnSelect() {
  await inicializarCategorias();
  const select = $(".opciones-categorias");
  select.empty();
  select.append('<option value="">Seleccionar</option>');
  const categorias = obtenerCategorias();
  categorias.forEach((cat) => {
    select.append('<option value="' + cat.id + '">' + cat.nombre + "</option>");
  });
}

// Validación de fecha: admite gastos futuros pero no anterior a 2000
export function validarFecha(fecha) {
  const fechaMinima = new Date("2000-01-01");
  const fechaGasto = new Date(fecha);
  return fechaGasto >= fechaMinima && fechaGasto != "Invalid Date";
}
