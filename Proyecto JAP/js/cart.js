const MONEDA = "UYU";
var carro = [];

function mostrarCarrito(carro) {
  let html = "";
  for (let i = 0; i < carro.articles.length; i++) {
    let art = carro.articles[i];
    let ex = cambio(art.currency, MONEDA, parseFloat(art.unitCost));
    html +=
      `
        
        <table id="tituloTabla">
        <th class="tablaImagen"> <img src=` +
      art.src +
      `></th>
        <th class="marcoTabla">` +
      art.name +
      `</th>
        <th class="marcoTabla">` +
      art.currency +
      ` ` +
      art.unitCost +
      `</th>
        <th class="marcoTabla"><input class="input-" type="number" id="` +
      i +
      `" value="` +
      art.count +
      `" min = 1 onchange="update(` +
      i +
      `)">
      <button onclick="sacarItemCarro(` +
      i +
      `)">Borrar</button></th>
        <th class="marcoTabla"><div id="subtotal-art` +
      i +
      `">
        <p>` +
      ex[0] +
      ` ` +
      parseFloat(art.count) * ex[1] +
      `</p></div></th>
      </table> `;
  }
  document.getElementById("carro").innerHTML = html;
}

function cambio(from, to, amount) {
  let result = [to];
  if (from === "UYU" && to === "USD") {
    result.push(parseFloat(amount) / 40);
  } else if (from === "USD" && to === "UYU") {
    result.push(parseFloat(amount) * 40);
  } else {
    result.push(parseFloat(amount));
  }
  return result;
}

function subtotalArt(articulo) {
  // función que toma el precio, cantidad e id del articulo para calcular el subtotal
  let art = carro.articles[articulo];
  let cant = document.getElementById(articulo).value;
  let ex = cambio(art.currency, MONEDA, parseFloat(art.unitCost));
  if (cant < 1) {
    cant = 1;
    document.getElementById(art).value = 1;
  }
  document.getElementById("subtotal-art" + articulo).innerHTML =
    `<p>` + ex[0] + ` ` + cant * ex[1] + `</p>`;
  return cant * ex[1];
}

function showTotal() {
  let html_art = "";
  let html_envio = "";
  let html_total = "";
  let total = 0;
  for (let i = 0; i < carro.articles.length; i++) {
    total += subtotalArt(i);
  }
  let envio = envioPago(); // fghf
  let total_total = total + total * envio;
  html_art =
    `<p class="mt-2" style="text-align:end; font-size: 1.5em;">` +
    total +
    `</p>`;
  html_envio =
    `<p class="mt-2" style="text-align:end; font-size: 1.5em;">` +
    envio * total +
    `</p>`;
  html_total =
    `<p class="mt-2" style="text-align:end; font-size: 1.5em; font-weight:600;">` +
    total_total +
    `</p>`;
  document.getElementById("tot-art").innerHTML = html_art;
  document.getElementById("tot-envio").innerHTML = html_envio;
  document.getElementById("total-total").innerHTML = html_total;
  let html_moneda =
    `<p class="mt-2" style="text-align:end; font-size: 1.5em;"> ` +
    MONEDA +
    ` </p>`;
  document.getElementById("mon").innerHTML = html_moneda;
  document.getElementById("mone").innerHTML = html_moneda;
  html_moneda =
    `<p class="mt-2" style="text-align:end; font-size: 1.5em;font-weight:600;"> ` +
    MONEDA +
    ` </p>`;
  document.getElementById("mont").innerHTML = html_moneda;
}

function update(articulo) {
  subtotalArt(articulo);
  showTotal();
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_BUY_URL2).then(function (resultObj) {
    // se puso  en el init el link
    if (resultObj.status === "ok") {
      carro = resultObj.data;
      localStorage.setItem("formaDePago", 0);
      mostrarCarrito(carro);
      showTotal();
    }
  });
});

function cuentaBancaria() {
  //
  let pagoBanco = "";

  pagoBanco = `<div class="row mt-2">
      <div class="col-md-12">
        <div class="card bg-crema mb-1">
          <div class="card-body text-center">
            <p> El número de cuenta donde depositar es: <strong>0004-1568992-218-002</strong> </p>
          </div>
        </div>
      </div>
    </div>`;
  document.getElementById("modal-payment").innerHTML = pagoBanco;
  localStorage.setItem("formaDePago", 1);
}

function tarjetaCredito() {
  //
  let pagoTarjeta = "";
  pagoTarjeta = `<div class = "row">
    <div class="col-md-12 f-w-600 mb-2">
    <label class="labels">Número de tarjeta:</label
    ><input
      type="text"
      class="form-control"
      placeholder="xxxx - xxxx - xxxx - xxxx"
      id="card-number"
      value=""
      autocomplete="off"
    />
  </div>
  <div class="col-md-12 f-w-600 mb-2">
    <label class="labels">CVV:</label
    ><input
      type="text"
      class="form-control"
      placeholder="xxx (detrás de la tarjeta)"
      id="cvv"
      value=""
      autocomplete="off"
    />
  </div>
  <div class="col-md-12 f-w-600 mb-2">
    <label class="labels">Fecha de vencimiento:</label
    ><input
      type="month"
      class="form-control"
      placeholder="ingrese fecha de vencimiento"
      id="valid-date"
      value=""
      autocomplete="off"
    />
  </div>
  <div class="col-md-12 f-w-600 mb-2">
    <label class="labels">Titular de la tarjeta:</label
    ><input
      type="text"
      class="form-control"
      placeholder="como dice en la tarjeta"
      id="card-name"
      value=""
      autocomplete="off"
    />
  </div>
  </div>
  <button type="button" class="btn btn-tomato" onclick="validarPago()"> Verificar </button> 
  <div id="payment-alert"></div>`;
  document.getElementById("modal-payment").innerHTML = pagoTarjeta;
  localStorage.setItem("formaDePago", 2);
}

function borrarPago() {
  localStorage.removeItem("formaDePago");
  document.getElementById("modal-payment").innerHTML = "";
}

function validarPago() {
  let html = "";
  if (
    document.getElementById("card-number").value != "" &&
    document.getElementById("valid-date").value != "" &&
    document.getElementById("cvv").value != "" &&
    document.getElementById("card-name").value != ""
  ) {
    html = `<div class="row mt-2">
      <div class="col-md-12">
        <div class="card bg-not-tomato mb-1">
          <div class="card-body text-center">
            Su tarjeta parece ser correta, de click en el botón Finalizar compra <strong>Cerrar</strong> y luego en <strong>Finalizar compra</strong>.
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById("payment-alert").innerHTML = html;
    return 0;
  } else {
    html = `<div class="row mt-2">
      <div class="col-md-12">
        <div class="card bg-tomato mb-1">
          <div class="card-body text-center">
          Faltan campos para completar
            
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById("payment-alert").innerHTML = html;
    return 1;
  }
}
function envioPago() {
  // Calcula el costo del envío seleccionado
  let tipoEnvio = document.getElementsByName("envio-precio");
  let envio = 0;
  for (i = 0; i < tipoEnvio.length; i++) {
    if (tipoEnvio[i].checked) {
      envio = tipoEnvio[i].value; // Asigna el valor del envío según lo seleccionado
    }
  }
  return envio;
}

function validation() {
  //  Valida los datos
  // se llama a los campos que son obligatorios llenar, para chequear que esten llenos.
  let envio = envioPago(); // La función devuelve 0 si no se apretó ningún botón
  let payment = localStorage.getItem("formaDePago"); // en Localstorage se guarda un numero, con el fin de saber que se ha seleccioando
  let calle = document.getElementById("calle").value; // datos en general
  let num = document.getElementById("num-puerta").value; // datos en general
  let esq = document.getElementById("esq").value; // datos en general

  let html = "";
  if (payment === 2 && validarPago() === 1) {
    payment = null;
  }
  if (envio != 0 && payment != null && calle != "" && num != "" && esq != "") {
    // Si estan todos llenos, con la información guardada en el storage, se avala que se han cargadolos datos
    html = `<div class="row mt-2">
      <div class="col-md-12">
        <div class="card bg-not-tomato mb-1">
          <div class="card-body text-center">
            Ha realizado su compra con éxito :)
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById("not-complete-alert").innerHTML = html;
  } else {
    // Si algun número no esta completo, o dato, sale un alerta que no deja finalizar la compra
    html = `<div class="row mt-2">
      <div class="col-md-12">
        <div class="card bg-tomato mb-1">
          <div class="card-body text-center">
            No has entrado todos los campos requeridos para realizar la compra (método de pago, dirección y tipo de envío).
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById("not-complete-alert").innerHTML = html;
  }
}
function sacarItemCarro(id) {
  // sacara el id del elemento seleccionado
  let i = 0;
  for (let art of carro.articles) {
    art.count = document.getElementById(i).value; // Guardamos la cantidad que tiene en el momento de borrar
    i++;
  }
  carro.articles.splice(id, 1); // Sacamos el elemento dado del array
  carro_length = carro.articles.length; // Para que ande el showTotal()
  mostrarCarrito(carro);
  showTotal();
}
