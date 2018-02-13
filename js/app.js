//En nuestro archivo app.js nos traemos los elementos que usaremos
// y creamos un let sin asignarle valor por el momento
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer =document.getElementById('response-container');
let searchedForText;

//A nuestro formulario le agregamos el evento submit y las instrucciones a ejecutar
form.addEventListener('submit', function (e){
	e.preventDefault();
	responseContainer.innerHTML = '';
	searchedForText = searchField.value;
	getNews();
});

//getNews() y es en esta función donde crearemos las peticiones
function getNews() {
	const articleRequest = new XMLHttpRequest(); // creamos nuestro objeto
	// Usamos el método open(), donde debemos poner la key
	articleRequest.open('GET',`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f077c4d69ee74cbb9c18fb651c838399`);
	articleRequest.onload = addNews;
	articleRequest.onerror = handleError;
	articleRequest.send(); // Enviamos la petición
}

function handleError(){
  console.log('Se ha presentado un error');
}

function addNews(){
  const data = JSON.parse(this.responseText);//lo que nos regresa la consola vemos que este objeto tiene la propiedad response
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;
  //Creamos un li, le añadimos una clase para que tenga estilos, le agregamos texto que obtuvimos del JSON y lo anexamos al ul
  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;

  responseContainer.appendChild(li);
}
