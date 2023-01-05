// Je charge mon fichier JSON
var xml = new XMLHttpRequest();
var myArray;
xml.onload = function () {
  // myArray prend le tableau JSON traduit
  myArray = JSON.parse(xml.response);
};
xml.open("get", "movies.json", false);
xml.send();

// Je fais appel au tbody et et la barre de recherche
const table = document.getElementById("movieTable");
const searchBar = document.getElementById("searchBar");

// Boucle d'insertion des films dans le tbody
for (let i = 0; i < myArray.length; i++) {
  // Boucle pour acteur car acteurs contient 2 objets (acteur1 et acteur2) avec plusieurs propriétés
  let acteurs = "";
  for (let k = 0; k < myArray[i].acteurs.length; k++) {
    acteurs += `<p>${myArray[i].acteurs[k]["acteur" + k].prenom} ${
      myArray[i].acteurs[k]["acteur" + k].nom
    }</p>`;
  }
  // Insertion des TR dans le tbody
  table.innerHTML += `
    <tr>
    <td scope="row"><img src="${myArray[i].poster}" alt="poster ${myArray[i].titre}"></td>
    <td scope="row">${myArray[i].titre}</td>
    <td scope="row">${myArray[i].duree}</td>
    <td scope="row">${myArray[i].realisateur}</td>
    <td scope="row">${myArray[i].festivals}</td>
    <td scope="row">${myArray[i].anneeDeProd}</td>
    <td scope="row">${acteurs}</td>
    </tr>`;
}

// Filtrage des films en directe lors la saisie de la valeur de l'input
searchBar.addEventListener("keyup", function () {
  let searchText, rows, data, dataValue;
  // Variable qui prend la valeur de l'input et la mets en majuscule
  searchText = searchBar.value.toUpperCase();
  // Variable qui prend tout les tr du tbody
  rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    // Variable qui prend la valeur du td titre de chaque row
    data = rows[i].getElementsByTagName("td")[1];
    if (data) {
      // Variable qui prend la valeur du titre
      dataValue = data.innerText;
      // Si la valeur du titre mise en majuscule est identique de celle d'un index existant :
      if (dataValue.toUpperCase().indexOf(searchText) > -1) {
        // On affiche son tr
        rows[i].style.display = "";
      } else {
        // Sinon on le cache
        rows[i].style.display = "none";
      }
    }
  }
});

// Tri croissant, fonction onclick avec parametre index de la colonne
function ascSort(index) {
  let rows, switching, x, y, shouldSwitch;
  switching = true;
  // Boucle while tant que switching est true
  while (switching) {
    // On change la valeur de switching
    switching = false;
    // Variable qui prend les tr du tbody
    rows = table.rows;
    for (i = 0; i < rows.length - 1; i++) {
        // Variable prend la valeur false 
      shouldSwitch = false;
      // Variable qui prend la valeur de la case selon l'index de la colonne
      x = rows[i].getElementsByTagName("td")[index];
      // Variable qui prend la valeur de la prochaine case selon l'index de la colonne
      y = rows[i + 1].getElementsByTagName("td")[index];
      // Si la valeur de x en miniscule est superieure à celle de y en miniscule
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // Variable prend la valeur true
        shouldSwitch = true;
        // Et on sort de la boucle for
        break;
      }
    }
    // Si la variable a la valeur true
    if (shouldSwitch) {
        // On switch  les 2 tr
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      // Et on donne la valeur true a la variable switching pour redemarrer la boucle while
      switching = true;
    }
  }
}

// Tri décroissant, fonction onclick avec parametre index de la colonne
function descSort(index) {
    let rows, switching, x, y, shouldSwitch;
    switching = true;
    // Boucle while tant que switching est true
    while (switching) {
      // On change la valeur de switching
      switching = false;
      // Variable qui prend les tr du tbody
      rows = table.rows;
      for (i = 0; i < rows.length - 1; i++) {
          // Variable prend la valeur false 
        shouldSwitch = false;
        // Variable qui prend la valeur de la case selon l'index de la colonne
        x = rows[i].getElementsByTagName("td")[index];
        // Variable qui prend la valeur de la prochaine case selon l'index de la colonne
        y = rows[i + 1].getElementsByTagName("td")[index];
        // Si la valeur de x en miniscule est inferieure à celle de y en miniscule
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // Variable prend la valeur true
          shouldSwitch = true;
          // Et on sort de la boucle for
          break;
        }
      }
      // Si la variable a la valeur true
      if (shouldSwitch) {
          // On switch  les 2 tr
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        // Et on donne la valeur true a la variable switching pour redemarrer la boucle while
        switching = true;
      }
    }
}

function numDescSort(index) {
    let rows, switching, x, y, shouldSwitch;
    switching = true;
    // Boucle while tant que switching est true
    while (switching) {
      // On change la valeur de switching
      switching = false;
      // Variable qui prend les tr du tbody
      rows = table.rows;
      for (i = 0; i < rows.length - 1; i++) {
          // Variable prend la valeur false 
        shouldSwitch = false;
        // Variable qui prend la valeur de la case selon l'index de la colonne
        x = rows[i].getElementsByTagName("td")[index];
        // Variable qui prend la valeur de la prochaine case selon l'index de la colonne
        y = rows[i + 1].getElementsByTagName("td")[index];
        // Si la valeur de x est inferieure à celle de y
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          // Variable prend la valeur true
          shouldSwitch = true;
          // Et on sort de la boucle for
          break;
        }
      }
      // Si la variable a la valeur true
      if (shouldSwitch) {
          // On switch  les 2 tr
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        // Et on donne la valeur true a la variable switching pour redemarrer la boucle while
        switching = true;
      }
    }
}

function numAscSort(index) {
    let rows, switching, x, y, shouldSwitch;
    switching = true;
    // Boucle while tant que switching est true
    while (switching) {
      // On change la valeur de switching
      switching = false;
      // Variable qui prend les tr du tbody
      rows = table.rows;
      for (i = 0; i < rows.length - 1; i++) {
          // Variable prend la valeur false 
        shouldSwitch = false;
        // Variable qui prend la valeur de la case selon l'index de la colonne
        x = rows[i].getElementsByTagName("td")[index];
        // Variable qui prend la valeur de la prochaine case selon l'index de la colonne
        y = rows[i + 1].getElementsByTagName("td")[index];
        // Si la valeur de x est superieure à celle de y
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          // Variable prend la valeur true
          shouldSwitch = true;
          // Et on sort de la boucle for
          break;
        }
      }
      // Si la variable a la valeur true
      if (shouldSwitch) {
          // On switch  les 2 tr
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        // Et on donne la valeur true a la variable switching pour redemarrer la boucle while
        switching = true;
      }
    }
}
