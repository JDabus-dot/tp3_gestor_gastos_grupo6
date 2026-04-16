document.addEventListener("DOMContentLoaded"), () => {
    //Se traen los elementos del HTML
    const form= document.getElementById("formulario-gasto");
    const list= document.getElementById("lista-gastos");
    const totalEL= document.getElementById("total");
    const cantidadEl= document.getElementById("cantidad");

//Se leen datos guardados (si los hay)
let gastos=JSON.parse(localStorage.getItem("gastos")) || [];

render();

//submit del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); //evita recarga de la página

    const nombre= document.getElementById("nombre");
    const monto= document.getElementById("monto");
    const categoria= document.getElementById("categoria");
    const fecha= document.getElementById("fecha");

    let valido= true;

    [nombre, monto, categoria, fecha].forEach(input => {
    input.classList.remove("error");
    });

    //Validaciones
    if (nombre.value.trim() === ""){
        nombre.classList.add("error");
        valido=false;
    }
    if (monto.value === "" || Number(monto.value) <= 0) { 
        monto.classList.add("error");
        valido = false; } 

    if (categoria.value === "") {
        categoria.classList.add("error"); 
        valido = false; } 

    if (fecha.value === "") {
        fecha.classList.add("error");
        valido = false; } 
    
    if (!valido) return;

    const nuevoGasto= {
        id: Date.now(),
        nombre: nombre.value,
        monto: Number (monto.value),
        categoria: categoria.value,
        fecha: fecha.value
    };

    gastos.push(nuevoGasto);

    localStorage.setItem("gastos", JSON.stringify(gastos));

    form.reset();

    render();
}); 
}


