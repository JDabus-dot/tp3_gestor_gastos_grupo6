import { obtenerCategorias } from "./funciones.js";

export function calcularEstadisticas(gastos) {
  if (gastos.length === 0) {
    return {
      total: 0,
      cantidad: 0,
      promedio: 0,
      catActivas: 0,
      masAlto: null,
      masReciente: null,
    };
  }
  const categorias = obtenerCategorias();
  const total = gastos.reduce((acc, g) => acc + g.monto, 0);
  const promedio = total / gastos.length;
  const masAlto = gastos.reduce((max, g) => (g.monto > max.monto ? g : max), gastos[0]);
  const masReciente = gastos.reduce((rec, g) => (g.fecha > rec.fecha ? g : rec), gastos[0]);
  let catActivas = 0;
  categorias.forEach((c) => {
    if (gastos.some((g) => Number(g.categoria) === Number(c.id))) {
      catActivas += 1;
    }
  });
  return { total, cantidad: gastos.length, promedio, catActivas, masAlto, masReciente };
}
