const menusList = document.getElementById("allCards");
let content = "";
const filtMenu = document.getElementById("selectNbp");
const filtPrice = document.getElementById("selectPrice");
const filtTheme = document.getElementById("selectTheme");
const filtRegime = document.getElementById("selectRegime");
const filtMin = document.getElementById("selectPrmin");
const filtMax = document.getElementById("selectPrmax");

// Toutes les informations nécessaires
const menus = [
  {
    // Toutes les informations nécessaires
    title: "Menu de Noël",
    text: "Ecrire ici la Description du menu.",
    theme: "Noël",
    regime: "Sans lactose",
    nbPersonne: 6,
    prix: 150,
    image: "../images_VandG/chicken-plate.jpg",
  },
  {
    title: "Menu d'évènement",
    text: "Ecrire ici la Description du menu.",
    theme: "Événement",
    regime: "Classique",
    nbPersonne: 4,
    prix: 100,
    image: "../images_VandG/entrecote-plate.jpg",
  },
];

// Cars' chain assembly
menus.forEach((menu, index) => {
  content += getMenu(menu, index);
});
menusList.innerHTML = content;

// Security : neutralise tous HTML malveillant
function sanitizeHtml(text) {
  // Créez un élément HTML temporaire de type "div"
  const tempHtml = document.createElement("div");

  // Affectez le texte reçu en tant que contenu texte brut de l'élément "tempHtml"
  tempHtml.textContent = text;

  // Utilisez .innerHTML pour récupérer le contenu de "tempHtml"
  // Cela va "neutraliser" ou "échapper" tout code HTML potentiellement malveillant
  return tempHtml.innerHTML;
}

//
function getMenu(menu, index) {
  const title = sanitizeHtml(menu.title);
  const text = sanitizeHtml(menu.text);
  const image = sanitizeHtml(menu.image);
  const theme = sanitizeHtml(menu.theme);
  const regime = sanitizeHtml(menu.regime);

  return ` <div class="col p-3">
        <div class="card menu-card h-100">
        <img src="${image}" class="card-img-top" alt="${title}" />
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${title}</h5>
          <p class="card-text text-justify">${text}</p>
          <p class="card-text text-justify">Thème : ${theme}</p>
          <p class="card-text text-justify">Régime : ${regime}</p>
          <p class="fw-bold">${menu.nbPersonne} pers. min | ${menu.prix} €</p>
          <a href="detailmenu?onlyMenu=${index}" class="btn btn-primary mt-auto">Voir le détail</a>
        </div>
      </div>
    </div> `;
}

// Filters
// La boucle d'affichage
function showMenus(liste) {
  let content = "";
  liste.forEach((menu, index) => {
    content += getMenu(menu, index);
  });
  menusList.innerHTML = content;
}

// Function permettant d'appliquer tous les filtres
function allFilters() {
  const nbFiltered = Number(filtMenu.value);
  const prFiltered = Number(filtPrice.value);
  const thFiltered = filtTheme.value;
  const regFiltered = filtRegime.value;
  // les || affiche tout de même les menus si aucune valeur n'est inscrite dans la fourchette
  const prminFiltered = Number(filtMin.value) || 0;
  const prmaxFiltered = Number(filtMax.value) || Infinity;
  const menusFiltered = menus.filter(
    (menu) =>
      menu.nbPersonne <= nbFiltered &&
      menu.prix <= prFiltered &&
      menu.theme === thFiltered &&
      menu.regime === regFiltered &&
      menu.prix >= prminFiltered &&
      menu.prix <= prmaxFiltered,
  );

  // Au chargement : on affiche les menus filtrés
  showMenus(menusFiltered);
}
filtMenu.addEventListener("change", allFilters);
filtPrice.addEventListener("change", allFilters);
filtTheme.addEventListener("change", allFilters);
filtRegime.addEventListener("change", allFilters);
filtMin.addEventListener("input", allFilters);
filtMax.addEventListener("input", allFilters);
