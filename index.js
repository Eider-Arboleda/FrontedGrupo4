// fecha hoy
const fechahoy= new Date()
const opciones= {day: '2-digit', month: '2-digit',year: 'numeric'}
document.getElementById('fecha').textContent=fechahoy.toLocaleDateString('es-Es',opciones);
let carreras= JSON.parse(localStorage.getItem('carreras'))||[];

let carros= JSON.parse(localStorage.getItem('carros'))||[];



//Primero creamos todads las funciones para carrera
function guardarCarreras(){
    localStorage.setItem('carreras',JSON.stringify(carreras));
}
function mostrarCarreras(){
    const lista = document.getElementById("listaCarreras")
    lista.innerHTML="";
    // Dentro llamamos las variables con las que queremos trabajar
    carreras.forEach((carrera,index)=>{
        const div = document.createElement("div")
        div.className="card";
        div.innerHTML=`  
        <span> ${carrera.lugar} - ${carrera.fecha} - Estado ${carrera.estado}</span>
        <div class="actions">
                    <button onclick="editarCarreras(${index})">✏️</button>
                    <button onclick="eliminarCarreras(${index})">🗑️</button>
                    <button onclick="cambiarEstado(${index})">🔄</button>
        </div>
        `;
        lista.appendChild(div)
    })
   
}
function agregarCircuito(){
    const lugar = document.getElementById('lugarCircuito').value;
    const fecha = document.getElementById('fechaCircuito').value;
        //ver si esta vavia 
    if(lugar && fecha){
       //llamamos la lsita y vemos que este vacio
        carreras.push({lugar,fecha,estado: "Programada"})
        //Guardamos la informacion en la lista.
        guardarCarreras();
        mostrarCarreras();
        alert("Carrera registrada exitosamente");
        document.getElementById('lugarCircuito').value='';
        document.getElementById('fechaCircuito').value='';

    }
}

function eliminarCarreras(index){
    if(confirm("¿Desea eliminar la carrera?")){
        carreras.splice(index,1)
        guardarCarreras();
        mostrarCarreras();
    }
    alert ("Carrera eliminada de la base de datos y del listado");
}

function cambiarEstado(index){
    const estados = ["Programada", "En curso", "Finalzada"];
    let estadoActual = carreras[index].estado;
    let nuevoEstado = estados [(estados.indexOf(estadoActual)+1)% estados.length];
    carreras[index].estado=nuevoEstado;
    guardarCarreras();
    mostrarCarreras();
    alert("Estado actualizado correctamente, reflejado en la lista de carreras");
    }
function editarCarreras(index) {
    const carrera = carreras[index];
    const nuevoLugar = prompt("Nuevo circuito: ", carrera.lugar);
    const nuevaFecha = prompt ("nueva fecha de la carrera: ", carrera.fecha);
    if(nuevaFecha&& nuevoLugar){
        carreras[index].fecha = nuevaFecha;
        carreras[index].lugar = nuevoLugar;
    }
    mostrarCarreras();
    alert("Carrera actualizada correctamente, reflejada en la lista");
}

//--------------------------------------------------------------------
//a partir de aqui es la parte del vehiculo
//--------------------------------------------------------------------
function guardarCarros(){
    localStorage.setItem('carros',JSON.stringify(carros));
}
function mostrarCarros(){
    const lista2 = document.getElementById("listaCarros")
    lista2.innerHTML="";
    // Dentro llamamos las variables con las que queremos trabajar
    carros.forEach((carro,index)=>{
        const div = document.createElement("div")
        div.className="card";
        div.innerHTML=`  
        <span> ${carro.modelo} - #${carro.numero} - Estado: ${carro.estadoCarro}</span>
        <div class="actions">
                    <button onclick="editarCarros(${index})">✏️</button>
                    <button onclick="eliminarCarros(${index})">🗑️</button>
                    <button onclick="cambiarEstadoCarro(${index})">🔄</button>
        </div>
        `;
        lista2.appendChild(div)
    })
}
function agregarCarro(){
    const modelo = document.getElementById('tipoCarro').value;
    const numero = document.getElementById('numeroCarro').value;
        //ver si esta vavia 
    if(modelo && numero){
       //llamamos la lsita y vemos que este vacio
        carros.push({modelo,numero,estadoCarro: "Disponible"})
        //Guardamos la informacion en la lista.
        guardarCarros();
        mostrarCarros();

        document.getElementById('tipoCarro').value='';
        document.getElementById('numeroCarro').value='';
        alert("Vehículo registrado exitosamente");
    }
}

function eliminarCarros(index){
    if(confirm("¿Desea eliminar el vehiculo?")){
        carros.splice(index,1)
        guardarCarros();
        mostrarCarros();
        alert("Vehículo eliminado de la base de datos y removido de la lista");
    }
}

function cambiarEstadoCarro(index){
    const estados = ["Disponible","En uso"];
    let estadoActual = carros[index].estadoCarro;
    let nuevoEstado = estados [(estados.indexOf(estadoActual)+1)% estados.length];
    carros[index].estadoCarro=nuevoEstado;
    guardarCarros();
    mostrarCarros();
    alert("Estado del vehículo actualizado correctamente y reflejado en la lista");
    }
function editarCarros(index) {
    const carro = carros[index];
    const nuevoModelo = prompt ("nuevo modelo del carro: ", carro.modelo);
    const nuevoNumero = prompt("Nuevo numero: ", carro.numero);
    if(nuevoModelo&& nuevoNumero){
        carros[index].modelo = nuevoModelo;
        carros[index].numero = nuevoNumero;
    }
    mostrarCarros();
    alert("Vehículo actualizado correctamente en la base de datos y listado");
}