$(document).ready(function() {
    //Se traen los elementos del HTML y se guardan en variables
    const form= $("#formulario-gasto");
    const lista= $("#lista-gastos");
    const totalEL= $("#total");
    const cantidadEl= $("#cantidad");

//Se leen datos guardados (si los hay)
let gastos=JSON.parse(localStorage.getItem("gastos")) || [];

render();//se muestran los gastos 

//detecta cuando el usuario hace un submit y evita que la página se recargue
form.on("submit", (e) => {
    e.preventDefault(); //evita  que se recargue la página

    const nombre= $("#nombre");
    const monto= $("#monto");
    const categoria= $("#categoria");
    const fecha= $("#fecha");

    let valido= true;

    nombre.removeClass("error");
    monto.removeClass("error");
    categoria.removeClass("error");
    fecha.removeClass("error");

    //validaciones
    if (nombre.val().trim() === ""){
        nombre.addClass("error");
        valido=false;
    }
    if (monto.val() === "" || Number(monto.val()) <= 0) { 
        monto.addClass("error");
        valido = false; } 

    if (categoria.val() === "") {
        categoria.addClass("error"); 
        valido = false; } 

    if (fecha.val() === "") {
        fecha.addClass("error");
        valido = false; } 
    

    if (!valido) return;
    
    //crea un nuevo gasto
    const nuevoGasto= {
        id: Date.now(),
        nombre: nombre.val(),
        monto: Number (monto.val()),
        categoria: categoria.val(),
        fecha: fecha.val()
    };

    gastos.push(nuevoGasto); //agrega gasto al array

    localStorage.setItem("gastos", JSON.stringify(gastos)); //se guarda en el navegador

    form[0].reset();//limpia el formulario

    render();//actualiza la pantalla
}); 

function render() { //se borra lo anterior y se inicializa el total
    lista.empty();
    let total=0;

    gastos.forEach(gasto => { //se recorre cada gasto y suma el monto
        total +=gasto.monto;
        //crea una lista
        const li = document.createElement("li");
        li.innerHTML=`
            <strong>${gasto.nombre}</strong> - $${gasto.monto}
         <small>${gasto.categoria} | ${gasto.fecha}</small>
        `;

        lista.append(li); //se muestran los elementos y se agregan a la lista
        
    })
    //en el resumen se muestra el total y la cant de gastos
    totalEL.text(`$${total}`);
    cantidadEl.text(gastos.length);
}
});

