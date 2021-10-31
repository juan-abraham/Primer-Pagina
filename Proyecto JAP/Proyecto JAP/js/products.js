const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_PRODUCT = "Vendidos";
const ORDER_BY_SOLD_PRODUCT2 = "Vendidos2";
const ORDER_ASC_BY_COST = "menorAmayor";
const ORDER_DESC_BY_COST = "mayorAmenor";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

// FUNCION QUE ORDENA LOS PRODUCTOS POR DIFERENTES ATRIBUTOS
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_SOLD_PRODUCT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_SOLD_PRODUCT2) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount < bCount) {
        return -1;
      }
      if (aCount > bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount < bCount) {
        return -1;
      }
      if (aCount > bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}
// FUNCION QUE DA FORMATO A DONDE SE MOSTRARA LA LISTA
function showCategoriesList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    // importante para hacer el bucle
    let category = currentCategoriesArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(category.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.cost) <= maxCount))
    ) {
      htmlContentToAppend +=
        `

<div class="col-md-4">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                <img src="` +
        category.imgSrc +
        `" alt="` +
        category.description +
        `" class="img-thumbnail">
                <h4 class="mb-1">` +
        category.name +
        `</h4>
                  <div class="card-body">
                  <small class="text-muted">` +
        category.soldCount +
        ` artículos</small>
                
                        <p class="mb-1">` +
        category.description +
        `</p>
                        <p> A un precio de ` +
        category.currency +
        "  " +
        category.cost +
        ` </p>
                    </div>
                
                </a>
            </div> `;
    }

    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortProducts(
    currentSortCriteria,
    currentCategoriesArray
  );

  //Muestro las categorías ordenadas
  showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_SOLD_PRODUCT);
  });

  document
    .getElementById("sortByCount2")
    .addEventListener("click", function () {
      sortAndShowCategories(ORDER_BY_SOLD_PRODUCT2);
    });
  document.getElementById("sortByCost").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortByCost2").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_COST);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showCategoriesList();
    });
});
