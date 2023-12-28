var init = function () {

  /*Q3*/
  addAllFilms();

  /*Q4*/
  let filter = document.getElementById('filter');
  filter.addEventListener('keyup', filterFilms);
  filter.value = '';

  /*Q5*/
  let showDetails = document.getElementById('showDetails');
  showDetails.checked = true;
  showDetails.addEventListener('change', toggleDetails);

}

/*Chargement de la page*/
window.addEventListener('DOMContentLoaded', init);

/*Q3*/
var addAllFilms = function () {
  let filmContainer = document.getElementById('films');
  for (let i = 0; i < filmData.length; i++) {
    filmContainer.appendChild(createFilm(i));
  }
}

var createFilm = function (index) {
  /* Q3 : COMPLET */
  var somFilm = filmData[index];
  var theImg = somFilm.image;
  var theTitle = somFilm.title;
  var theText = somFilm.text;

  var divFilm = document.createElement("div");        //création d'un élément div
  divFilm.setAttribute("id", String(index) + '-film');  
  divFilm.setAttribute("class", 'film');

  var img = document.createElement('img');            //création d'un élément img
  img.src = theImg;
  img.alt = theTitle;

  var title = document.createElement('h3');            //création d'un élément h3
  var h3 = document.createTextNode(theTitle);         //création d'un nouveau noeud de texte
  title.appendChild(h3);   

  divFilm.appendChild(img);
  divFilm.appendChild(title);

  /*Q6*/
  divFilm.addEventListener('mouseover', displayText);

  /*Q7*/
  divFilm.addEventListener('mouseout', removeText);

  /*Q8*/
  divFilm.addEventListener('click', selectFilm);

  return divFilm;

}

var filterFilms = function () {
  /* Q4 : COMPLET */
  var input = document.getElementById("filter");   //on recupère l'élément d'id filter
  var fil = input.value.toUpperCase();             //convertie une chaîne en majuscules
  var films = document.getElementById("films");    //on recupère l'élément d'id films
  var film = document.getElementsByClassName('film');    //on récupère les éléments de class film

  for (let i = 0; i < film.length; i++) {               
    var h = film[i].getElementsByTagName("h3")[0];
    var txtValue = h.textContent || h.innerText;
    if (txtValue.toUpperCase().indexOf(fil) > -1) {
      film[i].style.display = "";
    }
    else {
      film[i].style.display = "none";
    }
  }
}

var toggleDetails = function () {
  /* Q5 : COMPLET */
  var checkBox = document.getElementById("showDetails");   //on recupère l'élément d'id showDetails
  var text = document.getElementById("details");           //on recupère l'élément d'id details
  if (checkBox.checked == true){         //si la case est cocher
    text.style.display = "block";        //on montre la description du film
  }
  else {                                  //sinon on ne fait rien
    text.style.display = "none";
  }
}

var displayText = function() {
  /* Q6 : COMPLET */
  var id = this.id;
  var text = filmData[id[0]].text;  //on récupère text dans filmData
  document.getElementById("details").innerHTML = text;  //on recupère l'élément d'id details et renvoie le contenu de l'élemtn text
}

var removeText = function () {
  /* Q7 : COMPLET */
  document.getElementById("details").innerHTML = ""; //on recupère l'élément d'id details et on ne renvoit rien
}


var nextFreeSelectSlot = function () {
  let selectUn = document.querySelector('#select1 .film');
  if (selectUn == undefined) {
    return 1;
  }
  let selectDeux = document.querySelector('#select2 .film');
  if (selectDeux == undefined) {
    return 2;
  }
  return 0;
}

var selectFilm = function () {
  let nextFreeSlot = nextFreeSelectSlot();
  if (nextFreeSlot == 0) {
    window.alert('vous avez déjà sélectionné deux films');
  }
  else {
    let selectUn = document.getElementById('select' + nextFreeSlot);
    let currentSpan = selectUn.querySelector('span');
    selectUn.insertBefore(this, currentSpan);

    this.removeEventListener('click', selectFilm);

    /*Q8*/
    this.addEventListener('click', unselectFilm);

    let details = document.getElementById('details');
    details.textContent = '';
  }
}

/*Q8*/
var unselectFilm = function () {
  /*
    Q8 : COMPLET
  */
  let filmContainer = document.getElementById('films');  //on recupère l'élément films
  filmContainer.appendChild(this);
  this.removeEventListener('click', unselectFilm); //au click, on enlève le film
  this.addEventListener('click', selectFilm);      //au click, on met le film
}
