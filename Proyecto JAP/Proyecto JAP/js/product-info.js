var category = {};

function showImagesGallery(array){ // FUNCION QUE MUESTRA EN FORMATE QUE QUEREMOS LA INFORMACION DEL JSON / IMAGENES

    let cargarImagenes = "";
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        if (i===0) {
        htmlContentToAppend += 
        `<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`  
        cargarImagenes += 
        `<div class="carousel-item active">
        <img class="d-block w-100" src="`+imageSrc+`" alt="First slide">
      </div>`
      } else { htmlContentToAppend += 
        `<li data-target="#carouselExampleIndicators" data-slide-to="`+i+`"></li>`  
        cargarImagenes += 
        `<div class="carousel-item">
        <img class="d-block w-100" src="`+imageSrc+`" alt="First slide">
      </div>`

      }
      
        
        document.getElementById("productImagesGallery").innerHTML = cargarImagenes;
        document.getElementById("listaLineas").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let soldCountHTML = document.getElementById("soldCount");
            let valorAutosHTML = document.getElementById("valorAutos");
        
            productNameHTML.innerHTML = category.name;
            productDescriptionHTML.innerHTML = category.description;
            soldCountHTML.innerHTML = category.soldCount;
            valorAutosHTML.innerHTML = category.currency + " " + category.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
            getJSONData(PRODUCTS_URL).then(function(resultObj){ // obtengo el json del producto
                if (resultObj.status === "ok"){
                  productosRelacionadosMostrar(resultObj.data,category) // muestro la información del producto relacionado
                  // llamo a la función con el json obtenido de PRODUCTS_URL y con el producto principal de esta página
                }
            });

        }
    });
});

// función que muestra la información de los productos relacionados del producto principal de la pagina

function productosRelacionadosMostrar(relacionados,productos){ 
    let html = "";

    for(i = 0; i < productos.relatedProducts.length; i++){ 
      let index = productos.relatedProducts[i]; 
      let related = relacionados[index]; 
      html+=`
      <a  href="product-info.html" class="list-group-item list-group-item-action" style="border:1px solid #fff">
        <div class="row">
            <div class="col-3">
                <img src="`+related.imgSrc+`" alt="`+related.description+`" class="img-thumbnail">
            </div>
            <div class="col-9">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+related.name+`</h4>
                    <small class="text-muted">`+related.soldCount+` vendidos</small>
                </div>
                <small class="text-muted">`+related.description+`</small>
                <p>`+related.currency+` `+related.cost+`</p>
            </div>
        </div>
      </a>
      `
      if(i<productos.relatedProducts.length-1){ // Para que se separen por una línea y quede lindo
        html+=`<div class="dropdown-divider"></div>`;
      }
    }
    document.getElementById("productos-relacionados").innerHTML=html; // Cargamos al código html
  }
  