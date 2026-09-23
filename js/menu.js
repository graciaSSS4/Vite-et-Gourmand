const menusList = document.getElementById("allCards");
let content = "";
const filtMenu = document.getElementById("menuFilter");

// Toutes les informations nécessaires
const menus = [
  {
    // Toutes les informations nécessaires
    title: "Menu de Noël",
    text: "Ecrire ici la Description du menu.",
    nbPersonne: 6,
    prix: 150,
    image: "../images_VandG/chicken-plate.jpg",
  },
  {
    title: "Menu d'évènement",
    text: "Ecrire ici la Description du menu.",
    nbPersonne: 4,
    prix: 100,
    image: "../images_VandG/entrecote-plate.jpg",
  },
];

// Cars' chain assembly
for (const menu of menus) {
  content += getMenu(menu);
}
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
function getMenu(menu) {
  const title = sanitizeHtml(menu.title);
  const text = sanitizeHtml(menu.text);
  const image = sanitizeHtml(menu.image);

  return ` <div class="col p-3">
        <div class="card menu-card h-100">
        <img src="${image}" class="card-img-top" alt="${title}" />
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${title}</h5>
          <p class="card-text text-justify">${text}</p>
          <p class="fw-bold">${menu.nbPersonne} pers. min | ${menu.prix} €</p>
          <a href="#" class="btn btn-primary mt-auto">Voir le détail</a>
        </div>
      </div>
    </div> `;
}

// Filters
filtMenu.addEventListener("change", () => {
  const filtered = menus.filter((menu) => menu.nbPersonne <= nbChoisi);

  console.log(filtered);
});
