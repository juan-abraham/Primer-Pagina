
var categoriesArray2 = [];

function autitos(cal) {  // Funcion que convierte la calificacion en autos //

var convertir = parseInt(cal);
let calificacionAutos = "" 

for(let i = 1; i <= convertir; i++) {
    calificacionAutos += `
        <span class="fa fa-car checked "></span>
    `
}
for(let i = convertir +1; i <= 5; i++) {
    calificacionAutos += `
        <span class="fa fa-car-crash cheked2 "></span>
    ` 
} 
return calificacionAutos }




function showCategoriesList(array){ //Mostrar la informacion del JSON //

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += 
        
       `  
       <main class="contenedor1">
              <hr class="line">
              <div class="contenedor1">
       <div class="container-comments2">
          
           <div class="comments2">
              
                            
               <div class="info-comments2">
                  
                   <div class="header2">
                       <h4><i class="fas fa-user-astronaut mr-1"></i>  `+ category.user + `</h4>
                       <h5 class="fechayhora"> ${autitos(category.score)} </h5>
                   </div>
                   
                   <p class="descripcion" >` + category.description + ` </p>
                   <div class="footer2">
                      
                       
                       Realizado el ` + category.dateTime + ` 
                       <h5 class="request2">Responder</h5>
                   </div>
               </div>
               
           </div>
       </div>
       </div>
       </main> 
`
      
        document.getElementById("comentarios").innerHTML = htmlContentToAppend; //Donde tiene que aparecer la tabla //
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){  // Funcion que hace que tome la informacion
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray2 = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray2);
        }
    });
});