var currentComments=[];
const ORDER_ASC_BY_SCORE= "menorMayor";
const ORDER_DESC_BY_SCORE="Mayormenor";
const ORDER_ASC_BY_DATE= "ANTES";
const ORDER_DESC_BY_DATE="DESPUES";
var currentSortCriteria = undefined;





let lista = []; //Declaro un array vacío. Le llamo "lista"


function mostrarNombre() { 
let usuario = JSON.parse ( localStorage.getItem("usuario")); //Toma el nombre del local y lo pone en el comentairo agregado

return usuario.nombre;
}

document.addEventListener("DOMContentLoaded", () => {




  document.getElementById("agregar").addEventListener("click", () => { 
    
    //creo diferentes variables, esto hace funcion que se pase por arriba le mouse y se marque la calificaicon
    //cuando hago click en "Agregar"
    
    let comentar = {}; //Creo una variable de objeto llamada "comentar"
    let score = 1;
    var ele = document.getElementsByName('estrellas');
    for (i=0; i < ele.length; i++) {
      if (ele[i].checked) {
        score = ele[i].value;
      }
    }
    let date= new Date(); //funcion que pone la hora como esta en JSON

  let formatDate= date.getFullYear().toString()+"-"
  +(date.getMonth()+1).toString().padStart(2,'0')+"-"+
  date.getDate().toString().padStart(1,'0')+" "+date.getHours().toString().padStart(2,'0')+":"
  +date.getMinutes().toString().padStart(2,'0')+":"+date.getSeconds().toString().padStart(2,'0');
  // diferentes variables que se utilizaran para crear el comentario
    comentar.date = formatDate;
     comentar.score = score;
     comentar.nombre = document.getElementById("nombre").value; 
     comentar.comentario = document.getElementById("rellenarComentario").value;
      
     if (comentar.comentario.trim() == "") {
        alert("Comentario vacio");
    } else {
      lista.push(comentar);
    }
    mostrar(lista);
    document.getElementById('rellenarComentario').value="";
    var ele = document.getElementsByName('estrellas');
    for (let i=0; i<ele.length; i++) {
      ele[i].checked=false;
    }
    
    //Mostramos la lista.e
  }); 


});


function mostrar (lista){  //función que recibe el array, lo recorre 
// y va agregando cada elemento a la tabla.
let tabla = document.getElementById("comentarios2"); //Obtengo el "tbody"

  let filas = "";
for ( let comentar of lista) {    
    filas += 
    
    `<main class="contenedor1">
    <hr class="line">
    <div class="contenedor1">
<div class="container-comments2">

 <div class="comments2">
    
                  
     <div class="info-comments2">
        
         <div class="header2">
             <h4 id="comentaruser"><i class="fas fa-user-astronaut mr-1"></i>   ${mostrarNombre()} </h4>
             <h5 class="fechayhora"> ${autitos(comentar.score)}  </h5>
         </div>
         
         <p class="descripcion" >` + comentar.comentario + ` </p>
         <div class="footer2">
            
             
             Realizado el ` + comentar.date + ` 
             <h5 class="request2">Responder</h5>
         </div>
     </div>
     
 </div>
</div>
</div>
</main>`;
}
tabla.innerHTML = filas;
console.log(lista);

}

function ordenarComentario(criteria, array){ //función que ordena los comentarios por puntuación o fecha
  let result = [];
  
  if (criteria === ORDER_ASC_BY_SCORE){
      result = array.sort(function(a, b) {
          let aCount = parseInt(a.score);
          let bCount = parseInt(b.score);

          if ( aCount > bCount ){ return 1; }
          if ( aCount < bCount ){ return -1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_SCORE){
      result = array.sort(function(a, b) {
          let aCount = parseInt(a.score);
          let bCount = parseInt(b.score);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_ASC_BY_DATE){
    result = array.sort(function(a, b) {
        let aCount = new Date(a.dateTime);
        let bCount = new Date(b.dateTime);

        if ( aCount > bCount ){ return 1; }
        if ( aCount < bCount ){ return -1; }
        return 0;
      });
  }else if (criteria === ORDER_DESC_BY_DATE){
      result = array.sort(function(a, b) {
        let aCount = new Date(a.dateTime);
        let bCount = new Date(b.dateTime);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  };

  return result;
}

function sortAndShowComments(sortCriteria, commentsArray){
  currentSortCriteria = sortCriteria;

  if(commentsArray != undefined){
      currentComments = commentsArray;
  }

  currentComments = sortComments(currentSortCriteria, currentComments);

  //Muestro los productos ordenados
  mostrar(currentComments);
}
