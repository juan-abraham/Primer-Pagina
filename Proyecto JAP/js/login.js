
//FUNCION QUE PONE EL USUARIO Y LA CONTRASENA EN EL LOCAL STORAGE 
//EN CASO DE NO PONER NADA SALTA ALERT DICIENDO QUE SE COLOQUE
function verificar() {
    let dato = document.getElementById("user"); 
    let usuario = {};
    let sena = document.getElementById("contra"); 
    let clave = {};
if (dato.value.trim() ===''){
    alert('Falto el Usuario');
}
else if (sena.value.trim()==="") { 
    alert('Falto la contrasena');
} 
else {
    location.href ="indexlogin.html";
    usuario.nombre = dato.value;
    clave.password = sena.value;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('clave', JSON.stringify(clave));

}

}
// FUNCION PARA DESCONECTAR 
function desconectar() {
    localStorage.clear();
    location.href="login.html";
}
//FUNCION DE GOOGLE

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token); }


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
despliegueNombre();
});

function despliegueNombre(){ // MOSTRAR NOMBRE EN LA PAGINA
  
    let usuario = JSON.parse ( localStorage.getItem("usuario"));
    let htmlContentToAppend=`<div class="dropdown">
    <a class="btn btn-outline-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
     aria-haspopup="true" aria-expanded="false">
    <i class="fas fa-user-astronaut mr-1"> Soy `+usuario.nombre+`</i>
    </a>
    <div class="dropdown-menu dropdown-menu-dark " aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item"  href="my-profile.html">Mi perfil</a>
      <div class="dropdown-divider"></div>
      <button class="btn btn-outline-light dropdown-item" id="desc" onclick="desconectar()"><i class="fas fa-power-off mr-1"></i>   Cerrar Sesión  </button>
    </div>
  </div>`;
    
    if(document.getElementById("nombre")!=null){ 
    document.getElementById("nombre").innerHTML=htmlContentToAppend;
    }
  }

  