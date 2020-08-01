let contador = 1; // PARA NAVEGAR POR LAS 3 PAGINAS QUE CONTIENEN EL JSON

let boton = document.querySelector("button");
let contenedor = document.querySelector(".contenido");

boton.addEventListener("click", () => {
  let miSolicitud = new XMLHttpRequest();
  miSolicitud.open(
    "GET",
    `https://learnwebcode.github.io/json-example/animals-${contador}.json`
  );
  miSolicitud.onload = () => {
    if (miSolicitud.status >= 200 && miSolicitud.status < 400) {
      let miData = JSON.parse(miSolicitud.responseText);
      crearTexto(miData);
    } else {
      console.log("contectado al servidor pero devolvió un error"); //SOLO UN EJEMPLO, ACA DEBERIA HACER ALGO EN EL CASO DE QUE DEVUELVA UN ERROR
    }
  };
  miSolicitud.onerror = () => {
    console.log("error de conexion"); //MISMO CASO QUE EL CONSOLE LOG DE ARRIBA
  };
  miSolicitud.send();
  contador++; //AUMENTAR PARA PASAR A LA SIGUIENTE PAGINA DE JSON
  if (contador > 3) {
    boton.classList.add("ocultar");
  } //LUEGO DE LLEGAR A LA 3ER PAGINA, OCULTAR EL BOTON
});

const crearTexto = (data) => {
  const iterarComidas = (gustoDeComida) => {
    for (ii = 0; ii < gustoDeComida.length; ii++) {
      if (ii == 0) {
        htmlString += gustoDeComida[ii];
      } else {
        htmlString += ` and ${gustoDeComida[ii]}`;
      }
    }
  }; //FUNCION PARA NO REPETIR EL MISMO LOOP DOS VECES CON LAS COMIDAS QUE LE GUSTAN Y LAS QUE NO

  let htmlString = "";
  for (i = 0; i < data.length; i++) {
    htmlString += `<p> ${data[i].name} is a ${data[i].species} that likes `;
    iterarComidas(data[i].foods.likes);
    htmlString += " and dislikes ";
    iterarComidas(data[i].foods.dislikes);
    htmlString += ".</p> </br> <hr>";
  }
  contenedor.insertAdjacentHTML("beforeend", htmlString);
};
