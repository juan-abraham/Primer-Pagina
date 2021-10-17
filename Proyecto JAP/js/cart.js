const MONEDA = 'UYU';
let carro = [];

function mostrarCarrito(carro) {
    let html = "";
    for (let i = 0; i < carro.articles.length; i++) {
        let art = carro.articles[i];
        let ex = cambio(art.currency,MONEDA,parseFloat(art.unitCost))
        html += `
        
        <table id="tituloTabla">
        <th class="tablaImagen"> <img src=`+art.src+`></th>
        <th class="marcoTabla">` + art.name + `</th>
        <th class="marcoTabla">` + art.currency + ` ` + art.unitCost + `</th>
        <th class="marcoTabla"><input class="input-" type="number" id="` + i + `" value="` + art.count + `" min = 1 onchange="update(`+i+`)"></th>
        <th class="marcoTabla"><div id="subtotal-art` + i + `">
        <p>` + ex[0] + ` ` +  parseFloat(art.count) * ex[1] + `</p></div></th>
      </table> `
        
    }
    document.getElementById("carro").innerHTML = html;
}

function cambio(from,to,amount){
    let result = [to];
    if (from === 'UYU' && to === 'USD'){
        result.push( parseFloat(amount)/40);
    }else if (from === 'USD' && to === 'UYU'){
        result.push( parseFloat(amount)*40);
    }else{
        result.push( parseFloat(amount));
    }
    return result;
}

function subtotalArt(articulo){ // función que toma el precio, cantidad e id del articulo para calcular el subtotal 
    let art = carro.articles[articulo];
    let cant = document.getElementById(articulo).value
    let ex = cambio(art.currency,MONEDA,parseFloat(art.unitCost));
    if (cant < 1){
        cant = 1;
        document.getElementById(art).value = 1;
    }
    document.getElementById("subtotal-art"+articulo).innerHTML = `<p>` + ex[0] + ` ` +  cant * ex[1] + `</p>`;
    return cant * ex[1]
}

function showTotal(){
    let html_art = "";
    let html_envio = "";
    let html_total = "";
    let total  = 0;
    for (let i = 0; i < carro.articles.length; i++){
        total += subtotalArt(i)
    } 
    let envio = 0.05 // de momeneto se pone solo el standar
    let total_total = total+total*envio
    html_art = `<p class="mt-2" style="text-align:end; font-size: 1.5em;">`+total+`</p>`;
    html_envio = `<p class="mt-2" style="text-align:end; font-size: 1.5em;">`+envio*total+`</p>`;
    html_total = `<p class="mt-2" style="text-align:end; font-size: 1.5em; font-weight:600;">`+total_total+`</p>`;
    document.getElementById("tot-art").innerHTML = html_art;
    document.getElementById("tot-envio").innerHTML = html_envio;
    document.getElementById("total-total").innerHTML = html_total;
    let html_moneda=`<p class="mt-2" style="text-align:end; font-size: 1.5em;"> `+MONEDA+` </p>`;
    document.getElementById("mon").innerHTML = html_moneda;
    document.getElementById("mone").innerHTML = html_moneda;
    html_moneda=`<p class="mt-2" style="text-align:end; font-size: 1.5em;font-weight:600;"> `+MONEDA+` </p>`;
    document.getElementById("mont").innerHTML = html_moneda;
}

function update(articulo){
    subtotalArt(articulo);
    showTotal();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_BUY_URL2).then(function (resultObj) { // se puso  en el init el link
        if (resultObj.status === "ok") {
            carro = resultObj.data;
            mostrarCarrito(carro)
            showTotal()
        }
    });
});