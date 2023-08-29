const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id;
let arrayTareas;


//Función actualizar fecha

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-AR',{weekday:'long',month:'short',day:'numeric'});


//Función agregar tarea

function agregarTarea (tarea,id,realizado,eliminado) {
    
    if(eliminado){return};

    const REALIZADO = realizado ?check :uncheck;
    const LINE = realizado ?lineThrough :'';
    
    const elemento = `
                    <li id="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>`;
   lista.insertAdjacentHTML("beforeend",elemento); 
}


//Función de tarea Realizada

function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    arrayTareas[element.id].realizado = arrayTareas[element.id].realizado ?false :true;
}


//Función de tarea Eliminada

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    arrayTareas[element.id].eliminado = true;
}


//Eventos para habilitar boton y escuchar tecla enter 

botonEnter.addEventListener('click' ,()=> {
    const tarea = input.value;
    if(tarea) {
        agregarTarea(tarea,id,false,false);
        arrayTareas.push({
          nombre: tarea,
          id: id,
          realizado: false,
          eliminado: false  
        })
    }
    localStorage.setItem('TODO',JSON.stringify(arrayTareas));
    input.value = '';
    id++;
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const tarea = input.value;
        if(tarea){
            agregarTarea(tarea,id,false,false);
            arrayTareas.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false  
              })
        }
        localStorage.setItem('TODO',JSON.stringify(arrayTareas));
        input.value = '';
        id++;
    }
})

lista.addEventListener('click',function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData=='realizado') {
        tareaRealizada(element);
    } else if(elementData=='eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('TODO',JSON.stringify(arrayTareas));
})


//LOCAL STORAGE GET ITEM

let data = localStorage.getItem('TODO');
if(data){
    arrayTareas = JSON.parse(data);
    id = arrayTareas.length; //en que id me quedé para seguir generando nuevas tareas desde ahí
    cargarLista(arrayTareas);
} else {
    arrayTareas = [];
    id = 0;
}

function cargarLista(DATA) {
    DATA.forEach(function(i) {
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado);
    });
}


//localStorage.setItem('TODO',JSON.stringify(arrayTareas)) PARA AGREGAR UN ELEMENTO 
    //1° ELEMENTO NOMBRE DEL ARCHIVO (TODO) 
    //2° ELEMENTO QUE QUIERO GUARDAR (ARRAYTAREAS)

///localStorage.getItems('TODO') PARA OBTENER UN ELEMENTO