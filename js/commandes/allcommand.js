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
           ${statut === "terminé" ? `<button class= "btn btn-success" data-bs-toggle="modal" data-bs-target="#DeleteAccountModal">Donner mon avis</button>` : ""}
           </div>
      </div>
    </div> `;
  }

  // function checkCredentials() {
  //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
  //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
  //  const dataForm = new FormData(signinForm);

  // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
  //   const myHeaders = new Headers();
  // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
  //   myHeaders.append("Content-Type", "application/json");

  // Convertit les données du formulaire en une chaîne JSON
  //  const raw = JSON.stringify({
  //  statut: dataForm.get("statut"),
  //  });

  // Configure les options de la requête HTTP
  // const requestOptions = {
  //method: "GET",
  //headers: myHeaders,
  /* body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "command", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Vos informations ne permettent ... à compléter");
        }
      })
      //excution fléchée pour plusieurs lignes
      .then((result) => {
        treatmentstatut(data.statut);
      })
      .catch((error) => console.error(error));
  } */

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
