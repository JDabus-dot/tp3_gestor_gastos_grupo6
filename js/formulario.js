document.addEventListener("DOMContentLoaded", () => {
    //Se traen los elementos del HTML y se guardan en variables
    const form= document.getElementById("formulario-gasto");
    const lista= document.getElementById("lista-gastos");
    const totalEL= document.getElementById("total");
    const cantidadEl= document.getElementById("cantidad");

//Se leen datos guardados (si los hay)
let gastos=JSON.parse(localStorage.getItem("gastos")) || [];

render();//se muestran los gastos 

//detecta cuando el usuario hace un submit y evita que la página se recargue
form.addEventListener("submit", (e) => {
    e.preventDefault(); //evita  que se recargue la página

    const nombre= document.getElementById("nombre");
    const monto= document.getElementById("monto");
    const categoria= document.getElementById("categoria");
    const fecha= document.getElementById("fecha");

    let valido= true;

    nombre.classList.remove("error");
    monto.classList.remove("error");
    categoria.classList.remove("error");
    fecha.classList.remove("error");

    //validaciones
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
    
    //crea un nuevo gasto
    const nuevoGasto= {
        id: Date.now(),
        nombre: nombre.value,
        monto: Number (monto.value),
        categoria: categoria.value,
        fecha: fecha.value
    };

    gastos.push(nuevoGasto); //agrega gasto al array

    localStorage.setItem("gastos", JSON.stringify(gastos)); //se guarda en el navegador

    form.reset();//limpia el formulario

    render();//actualiza la pantalla
}); 

function render() { //se borra lo anterior y se inicializa el total
    lista.innerHTML= "";
    let total=0;

    gastos.forEach(gasto => { //se recorre cada gasto y suma el monto
        total +=gasto.monto;
        //crea una lista
        const li = document.createElement("li");
        li.innerHTML=`
            <strong>${gasto.nombre}</strong> - $${gasto.monto}
         <small>${gasto.categoria} | ${gasto.fecha}</small>
        `;

        lista.appendChild(li); //se muestran los elementos y se agregan a la lista
        
    })
    //en el resumen se muestra el total y la cant de gastos
    totalEL.textContent= `$${total}`;
    cantidadEl.textContent= gastos.length;
}
});

