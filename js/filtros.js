import { obtenerGastos } from "./funciones.js";
//import renderde transacciones cuando este

// Abrir y cerrar modal
const btnAbrir = document.getElementById("btn-abrir-filtros");
const btnCerrar = document.getElementById("btn-cerrar-filtros");
const modal = document.getElementById("modal-filtros");

btnAbrir.addEventListener("click", () => {
    modal.style.display = "flex";
});

btnCerrar.addEventListener("click", () => {
    modal.style.display = "none";
});

// limpiar filtros 
const btnLimpiar = document.getElementById("btn-limpiar-filtro");
btnLimpiar.addEventListener("click", () => {
    document.getElementById("filtro-categoria").value = "";
    document.getElementById("filtro-desde").value = "";
    document.getElementById("filtro-hasta").value = "";
    document.getElementById("filtro-texto").value = "";

    const todos= obtenerGastos();
    renderTransacciones(todos);
    

});

//conectar logica con boton aplicar fltro
const btnAplicar= document.getElementById("btn-aplicar-filtro");
btnAplicar.addEventListener("click", () =>{
    const gastosFiltrados=filtrarGastos();
    console.log(gastosFiltrados); //solo para pruebas
    renderTransacciones(gastosFiltrados);
    modal.style.display = "none";
})


//funcion filtrado
function filtrarGastos(){
    const gastos= obtenerGastos();
    
    const cat= document.getElementById("filtro-categoria").value;
    const desde= document.getElementById("filtro-desde").value;
    const hasta= document.getElementById("filtro-hasta").value;
    const texto= document.getElementById("filtro-texto").value;
    
    return gastos.filter(g=>{
       
        const coincideCategoria= !cat||  g.categoria === cat;
        const coincideDesde = !desde || fechaGasto >= fechaDesde;
        const coincideHasta = !hasta || fechaGasto <= fechaHasta;
        const coincideTexto= !texto || g.nombre.toLowerCase().includes(texto.toLowerCase());
        return(
            coincideCategoria && coincideDesde && coincideHasta && coincideTexto
        )
    })
}



