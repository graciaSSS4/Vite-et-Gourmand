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

detailOnlyMenu.innerHTML = `         <div class="ctext-center">
        <img src="${image}" class="card-img-top" alt="${title}" />
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${title}</h5>
          <p class="card-text text-justify">${text}</p>
          <p class="card-text text-justify">Thème : ${theme}</p>
          <p class="card-text text-justify">Régime : ${regime}</p>
          <p class="fw-bold">${menu.nbPersonne} pers. min | ${menu.prix} €</p>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Contact</button>
  </li>
          <a href="commander?onlyMenu=${onlyMenu}" class="btn btn-primary mt-auto">Commander</a>
        </div>
      
    </div> `;
