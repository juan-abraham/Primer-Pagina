function guardarPerfil() {
  // Se guardan los datos en LOCAL STORAGE
  if (
    // Valores de los campos obligatorios
    document.getElementById("primer-nombre").value === "" ||
    document.getElementById("segundo-nombre").value === "" ||
    document.getElementById("edad").value === "" ||
    document.getElementById("email").value === "" ||
    document.getElementById("telefono").value === ""
  ) {
    // alert
    let html = alert("Faltan llenar los datos con *");
    document.getElementById("alerta-por-no-llenar-campos").innerHTML = html;
    mostarPerfil(undefined);
  } else {
    // Si completaron todo lo requerido armo el objeto información
    var info = {
      // con JSON guardo los datos puestos en el imput
      primerNombre: document.getElementById("primer-nombre").value,
      primerApellido: document.getElementById("apellido").value,
      segundoNombre: document.getElementById("segundo-nombre").value,
      segundoApellido: document.getElementById("apellido2").value,
      edad: document.getElementById("edad").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
    };
    localStorage.setItem("info", JSON.stringify(info)); // Para guardar en localstorage se convierte el objeto a JSON
    document.getElementById("alerta-por-no-llenar-campos").innerHTML = ""; // ahora si funciona
    mostarPerfil(info); // Llamo a la función que lo muestra cada vez que se guarden nuevamente
  }
}

function mostarPerfil(info) {
  // Plantilla final con los datos del usuario cargados
  let html = "";
  if (info != undefined) {
    // como se ven los datos
    html =
      `
      <div class="container">
      <div class="row mt-2">
        <div class="col-md-6">
          <p class="mb-1 f-w-600">Primer nombre</p>
          <h6 class="text-muted f-w-400">` +
      info.primerNombre +
      `</h6>
        </div>
        <div class="col-md-6">
          <p class="mb-1 f-w-600">Segundo nombre</p>
          <h6 class="text-muted f-w-400">
            ` +
      info.segundoNombre +
      `
          </h6>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6">
          <p class="mb-1 f-w-600">Primer apellido</p>
          <h6 class="text-muted f-w-400">
            ` +
      info.primerApellido +
      `
          </h6>
        </div>
        <div class="col-md-6">
          <p class="mb-1 f-w-600">Segundo apellido</p>
          <h6 class="text-muted f-w-400">
            ` +
      info.segundoApellido +
      `
          </h6>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6">
          <p class="mb-1 f-w-600">Teléfono</p>
          <h6 class="text-muted f-w-400">` +
      info.telefono +
      `</h6>
        </div>
        <div class="col-md-6">
          <p class="mb-1 f-w-600">Edad (años)</p>
          <h6 class="text-muted f-w-400">` +
      info.edad +
      `</h6>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-12">
          <p class="mb-1 f-w-600">E-mail</p>
          <h6 class="text-muted f-w-400">` +
      info.email +
      `</h6>
        </div>
      </div>
      </div>`;
  } else {
    // Si no están cargados los datos todavía aviso
    html = `<div class="row mt-2">
      <div class="col-md-12">
        <div class="card bg-tomato">
          <div class="card-body text-center">
           En caso de no tener los datos, deberás cargarlos
          </div>
        </div>
      </div>
    </div>`;
  }
  document.getElementById("datos-usuario").innerHTML = html;
}

function fotoAgregar() {
  const imgPath = document.getElementById("input-imagen").files[0]; // Carga algo tipo blob a partir del input
  const reader = new FileReader();
  reader.onload = function () {
    // Cuando se cargue lo nuevo
    localStorage.setItem("imagenPerfil", reader.result); // Guardamos en el localStorage
  };

  if (imgPath) {
    // Si hay algo cargado lo lee como URL para poder verlo
    reader.readAsDataURL(imgPath);
  }
  fotoMostrar(); // Mostramos la foto
}

function fotoMostrar() {
  // Función que muestra la foto
  var dataImage = localStorage.getItem("imagenPerfil"); // A partir del localStorage llamamos a los datos de la imagen
  if (dataImage != null) {
    // Si hay algo cargado la mostramos
    let imagenPerfil = document.getElementById("imagen-perfil");
    imagenPerfil.src = dataImage; // Lo que tenemos guardado es la source de la imagen, por eso definimos el atributo src del tag img con id imagen-perfil
    document.getElementById("not-image").innerHTML = ""; // Sacamos el mensaje de no hay imagen
  } else {
    // Si no hay nada cargado mostramos el mensaje
    let html = `<div class="cuadrado"> Foto </div>`;
    document.getElementById("not-image").innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.getItem("info") != null) {
    // Si hay información en el objeto info:
    var profile = JSON.parse(localStorage.getItem("info"));
    document.getElementById("primer-nombre").value = profile.primerNombre;
    document.getElementById("apellido").value = profile.primerApellido;
    document.getElementById("segundo-nombre").value = profile.segundoNombre;
    document.getElementById("apellido2").value = profile.segundoApellido;
    document.getElementById("edad").value = profile.age;
    document.getElementById("email").value = profile.email;
    document.getElementById("telefono").value = profile.telefono;
    // Se muestran los datos cargados mediante el btn
    mostarPerfil(profile);
  } else {
    // Si no hay nada adentro del objeto info le ponemos algo indefinido a la función mostarPerfil para que nos muestre que no hay nada ingresado
    let profile = undefined;
    mostarPerfil(profile);
  }
  fotoMostrar();
});

// Funcion del modal de boostrap
var myModal = document.getElementById("myModal");
var myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", function () {
  myInput.focus();
});
var exampleModal = document.getElementById("exampleModal");
exampleModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute("data-bs-whatever");
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  var modalTitle = exampleModal.querySelector(".modal-title");
  var modalBodyInput = exampleModal.querySelector(".modal-body input");

  modalTitle.textContent = "New message to " + recipient;
  modalBodyInput.value = recipient;
});
