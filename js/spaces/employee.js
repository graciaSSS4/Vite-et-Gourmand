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

  //dashCommand
  const manageCommandList = document.getElementById("dashCommand");
  let commandContent = "";
  // Cars' chain assembly
  allcommands.forEach((allcommand, index) => {
    commandContent += mgetCommand(allcommand, index);
  });
  console.log(commandContent);
  manageCommandList.innerHTML = commandContent;

  //Génération d'un card
  function mgetCommand(allcommand, index) {
    const title = sanitizeHtml(allcommand.title);
    const image = sanitizeHtml(allcommand.image);
    const statut = sanitizeHtml(allcommand.statut);
    const statutColor = getStatutColor(allcommand.statut);

    return ` <div class="col p-3">
        <div class="card menu-card h-100">
        <img src="${image}" class="card-img-top" alt="${title}" />
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${title}</h5>
          <span class="card-text fw-bold badge ${statutColor}">Statut : ${statut}</span>
          <p class="fw-bold">${allcommand.nbPersonne} pers. min | ${allcommand.prix} €</p>
           ${statut === "en attente de validation" ? `<button class= "btn btn-danger mb-3">Annuler</button>` : ""}
          ${statut === "en attente de validation" ? `<button class= "btn btn-warning ">Modifier</button>` : ""}
           ${statut === "terminé" ? `<button class= "btn btn-success" data-bs-toggle="modal" data-bs-target="#OrderReviewModal">Donner mon avis</button>` : ""}
           </div>
      </div>
    </div> `;
  }

  function getStatutColor(statut) {
    switch (statut) {
      case "accepté":
      case "en préparation":
        return "bg-success  text-dark bg-opacity-50";
      case "terminé":
      case "livré":
        return "bg-success text-dark";
      case "annulé":
        return "bg-danger text-dark";
      case "en attente de validation":
      case "modifié":
      case "en cours de livraison":
      case "en attente du retour matériel":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  }
})();
