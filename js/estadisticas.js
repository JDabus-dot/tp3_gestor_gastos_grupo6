import { obtenerCategorias} from "./funciones.js";
//leer gastos del localStorage 
function obtenerGastos() {
  const datos = localStorage.getItem("gastos");
  return datos ? JSON.parse(datos) : [];
}

// calcular estadísticas
function calcularEstadisticas(gastos) {
  if (gastos.length === 0) {
    return {
      total: 0, cantidad: 0, promedio: 0,
      desglose: {}, masAlto: null, masReciente: null
    };
  }
  const categorias = obtenerCategorias();
  const total    = gastos.reduce((acc, g) => acc + g.monto, 0);
  const promedio = total / gastos.length;

  const desglose = {};
  gastos.forEach(g => {

    const categoriaObjetivo = categorias.find(cat => String(cat.id) === String(g.categoria));
    const nombreCategoria = categoriaObjetivo ? categoriaObjetivo.nombre : g.categoria;
    if (!desglose[nombreCategoria]) {
      desglose[nombreCategoria] = { monto: 0, cantidad: 0 };
    }
    desglose[nombreCategoria].monto    += g.monto;
    desglose[nombreCategoria].cantidad += 1;
  });

  const masAlto    = gastos.reduce((max, g) => g.monto > max.monto ? g : max, gastos[0]);
  const masReciente = gastos.reduce((rec, g) => g.fecha > rec.fecha ? g : rec, gastos[0]);

  return { total, cantidad: gastos.length, promedio, desglose, masAlto, masReciente };
}

//mostrar en el HTML con jQuery
function mostrarEstadisticas(stats) {
  $("#est-total").text("$" + stats.total.toLocaleString("es-AR"));
  $("#est-cantidad").text(stats.cantidad);
  $("#est-promedio").text("$" + Math.round(stats.promedio).toLocaleString("es-AR"));
  $("#est-categorias").text(Object.keys(stats.desglose).length);

  $("#est-desglose").empty();
  Object.entries(stats.desglose).forEach(([cat, datos]) => {
    const porcentaje = Math.round((datos.monto / stats.total) * 100);
    $("#est-desglose").append(`
      <div class="categoria-item">
        <div class="categoria-header">
          <span class="categoria-nombre">${cat}</span>
          <span>$${datos.monto.toLocaleString("es-AR")} · ${datos.cantidad} gasto${datos.cantidad > 1 ? "s" : ""}</span>
        </div>
        <div class="barra-fondo">
          <div class="barra-relleno" style="width: ${porcentaje}%"></div>
        </div>
      </div>
    `);
  });

  $("#est-max-nombre").text(
    stats.masAlto ? `${stats.masAlto.nombre} — $${stats.masAlto.monto.toLocaleString("es-AR")}` : "—"
  );
  $("#est-reciente").text(
    stats.masReciente ? `${stats.masReciente.nombre} · ${stats.masReciente.fecha}` : "—"
  );
}

// función principal (exportada para Mar) 
export function recalcularEstadisticas(gastosRecibidos) {
  const gastos = Array.isArray(gastosRecibidos)
    ? gastosRecibidos
    : obtenerGastos();

  const stats = calcularEstadisticas(gastos);
  mostrarEstadisticas(stats);
}

//Arrancar al cargar la página 
$(document).ready(function () {
  recalcularEstadisticas();
});

// Escuchar cambios de otros módulos 
window.addEventListener("storage", () => recalcularEstadisticas());