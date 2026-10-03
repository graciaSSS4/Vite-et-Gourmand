const urlParams = new URLSearchParams(window.location.search);
const onlyMenu = Number(urlParams.get("onlyMenu"));
const menu = menus[onlyMenu];
const detailOnlyMenu = document.getElementById("detailMenu");
//on teste si ça affiche bien le menu détaillé demandé

const title = sanitizeHtml(menu.title);
const text = sanitizeHtml(menu.text);
const image = sanitizeHtml(menu.image);
const theme = sanitizeHtml(menu.theme);
const regime = sanitizeHtml(menu.regime);
const entree = sanitizeHtml(menu.entree);
const plat = sanitizeHtml(menu.plat);
const dessert = sanitizeHtml(menu.dessert);
const allergene = sanitizeHtml(menu.allergene);

detailOnlyMenu.innerHTML = `         <div class="text-center">
        <img src="${menu.image}" class="card-img-top" alt="${title}" />
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${menu.title}</h5>
          <p class=" text-justify">${menu.text}</p>
          <p class="text-justify">Thème : ${menu.theme}</p>
          <p class="text-justify"><strong>Régime</strong> : ${menu.regime}</p>
          <p class="fw-bold text-justify">${menu.nbPersonne} pers. min | ${menu.prix} €</p>
         <p class=" text-justify">Allergènes : ${menu.allergene}</p>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="entree-tab" data-bs-toggle="tab" data-bs-target="#entree-tab-pane" type="button" role="tab" aria-controls="entree-tab-pane" aria-selected="true">Entrée</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="plat-tab" data-bs-toggle="tab" data-bs-target="#plat-tab-pane" type="button" role="tab" aria-controls="plat-tab-pane" aria-selected="false">Plat</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="dessert-tab" data-bs-toggle="tab" data-bs-target="#dessert-tab-pane" type="button" role="tab" aria-controls="dessert-tab-pane" aria-selected="false">Dessert</button>
  </li>
  </ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="entree-tab-pane" role="tabpanel" aria-labelledby="entree-tab" tabindex="0">${menu.entree}</div>
  <div class="tab-pane fade" id="plat-tab-pane" role="tabpanel" aria-labelledby="plat-tab" tabindex="0">${menu.plat}</div>
  <div class="tab-pane fade" id="dessert-tab-pane" role="tabpanel" aria-labelledby="dessert-tab" tabindex="0">${menu.dessert}</div>
</div>
          <a href="commander?onlyMenu=${onlyMenu}" class="btn btn-primary mt-auto">Commander</a>
        </div>
      
    </div> `;
