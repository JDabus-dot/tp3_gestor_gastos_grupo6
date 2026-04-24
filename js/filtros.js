import { obtenerGastos } from "./funciones.js";
import { renderizarGastos, renderizarGastosFiltrados } from "./render.js";

// abrir y cerrar modal
const btnAbrir = $("#btn-abrir-filtros");
const btnCerrar = $("#btn-cerrar-filtros");
const modal = $("#modal-filtros");

btnAbrir.click( () => {
    modal.css("display","flex");
});

btnCerrar.click(() => {
    modal.css("display","none");
});

//cierra si haces clic fuera del modal
modal.click((e) => {
    if (e.target.id === "modal-filtros") {
        modal.css("display", "none");
    }
});

// limpiar filtros 
const btnLimpiar = $("#btn-limpiar-filtro");
btnLimpiar.click(() => {
    $("#filtro-categoria").val("");
    $("#filtro-desde").val("");
    $("#filtro-hasta").val("");
    $("#filtro-texto").val("");

    const todos= obtenerGastos();
    renderizarGastos(todos);
    

});

//conectar logica con boton aplicar fltro
const btnAplicar= $("#btn-aplicar-filtro");
btnAplicar.click(() =>{
    const gastosFiltrados=filtrarGastos();
    renderizarGastosFiltrados(gastosFiltrados);
    modal.css("display","none");
})

//funcion filtrado
function filtrarGastos(){
    const gastos= obtenerGastos();
    
    const cat= $("#filtro-categoria").val();
    const desde= $("#filtro-desde").val();
    const hasta= $("#filtro-hasta").val();
    const texto= $("#filtro-texto").val();
    
    return gastos.filter(g=>{
        const coincideCategoria= !cat||  g.categoria === cat;
        const coincideDesde = !desde || g.fecha >= desde;
        const coincideHasta = !hasta || g.fecha <= hasta;
        const coincideTexto= !texto || g.nombre.toLowerCase().includes(texto.toLowerCase());
        
        return(
            coincideCategoria && coincideDesde && coincideHasta && coincideTexto
        )
    })
}



