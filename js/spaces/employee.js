(function () {
  const manageMenusList = document.getElementById("manageMenu");
  let content = "";

  // Cars' chain assembly
  menus.forEach((menu, index) => {
    content += mgetMenu(menu, index);
  });
  manageMenusList.innerHTML = content;

  //Génération d'un card
  function mgetMenu(menu, index) {
    const title = sanitizeHtml(menu.title);

    const image = sanitizeHtml(menu.image);
    const theme = sanitizeHtml(menu.theme);
    const regime = sanitizeHtml(menu.regime);
    const stock = sanitizeHtml(menu.stock);

    return ` <div class="col p-3">
        <div class="card menu-card h-100">
        <img src="${image}" class="card-img-top" alt="${title}" />
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${title}</h5>
          <p class="card-text text-justify">Thème : ${theme}  · ${regime}</p>
<p class="card-text text-justify">Stock : ${stock}  </p>
          <p class="fw-bold">${menu.nbPersonne} pers. min | ${menu.prix} €</p>
          <a ${index} class="btn btn-warning mt-auto"data-bs-toggle="modal" data-bs-target="#EditManageModal">Modifier
          <i class="bi bi-pencil-square"></i></a>
          <a ${index} class="btn btn-danger mt-auto" data-bs-toggle="modal" data-bs-target="#DeleteManageModal">Supprimer</a>
        </div>
      </div>
    </div> `;
  }
})();
