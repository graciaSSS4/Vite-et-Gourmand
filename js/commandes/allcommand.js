(function () {
  const commandList = document.getElementById("allCommands");
  let content = "";

  // Cars' chain assembly
  allcommands.forEach((allcommand, index) => {
    content += getCommand(allcommand, index);
  });
  commandList.innerHTML = content;

  //Génération d'un card
  function getCommand(allcommand, index) {
    const title = sanitizeHtml(allcommand.title);
    const image = sanitizeHtml(allcommand.image);
    const statut = sanitizeHtml(allcommand.statut);

    return ` <div class="col p-3">
        <div class="card menu-card h-100">
        <img src="${image}" class="card-img-top" alt="${title}" />
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${title}</h5>
          <p class="card-text text-justify">Statut : ${statut}</p>
          <p class="fw-bold">${allcommand.nbPersonne} pers. min | ${allcommand.prix} €</p>
          <a href="detailmenu?onlyMenu=${index}" class="btn btn-primary mt-auto">Placeholder to modify</a>
        </div>
      </div>
    </div> `;
  }
})();
