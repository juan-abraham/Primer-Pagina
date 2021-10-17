var listado = [];
var listafiltrada = [];

function verificacion() {
    var textoEscrito = document.getElementById("busqueda").value;
    listafiltrada = listado.filter(function(category) { //filter devuelve un nuevo array conteniendo los coincidentes
        return category.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1; //si lo escrito está en el array devuelve su posición
        //si no lo está devuelve -1
    })
    mostrarlista(listafiltrada); // escribo la lista filtrada
  }


 

    function mostrarlista(lista){
    
        let htmlContentToAppend = "";
        for(let i = 0; i < lista.length; i++){
            let category = lista[i];
    
            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + `</h4>
                            <small class="text-muted">` + category.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                        <p> A un precio de ` + category.currency + "  " + category.cost + ` </p>
                    </div>
                </div>
            </a>
            `
    
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
            
        }
    }
    


    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            
            if (resultObj.status === "ok")
            {
                listado = resultObj.data;
              
            }
        });
        document.getElementById('busqueda').addEventListener('keyup', function(){
    
            verificacion();
    
    
        });
    });

   