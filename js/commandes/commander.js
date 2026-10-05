(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const onlyMenu = Number(urlParams.get("onlyMenu"));
  const menu = menus[onlyMenu];
  const chosenMenuInfo = document.getElementById("chosenMenu");
  const btnCommander = document.getElementById("btn-Validation-Commander");
  const recapchosenPrix = document.getElementById("recapPrix");
  const inputAdress = document.getElementById("AdressInput");
  const inputDate = document.getElementById("DateInput");
  const inputHeure = document.getElementById("selectHour");
  const inputNbPersonne = document.getElementById("nbPersonne");
  const inputCity = document.getElementById("CityInput");

  btnCommander.addEventListener("click", validateCommand);

  // Pré-remplissage des infos user
  /*getInfoUser().then((user) => {
    document.getElementById("PrenomInput").value = user.prenom;
    document.getElementById("NomInput").value = user.nom;
    document.getElementById("EmailInput").value = user.email;
    document.getElementById("PhoneInput").value = user.phone;
  });*/
  // récuperer le menu chosen et l'afficher
  const title = sanitizeHtml(menu.title);
  const image = sanitizeHtml(menu.image);
  const theme = sanitizeHtml(menu.theme);

  chosenMenuInfo.innerHTML = `          <div class="row row-cols-2 align-items-center">
                <div class="col">
        <img src="${image}" class="w-100 rounded" alt="${title}" />
      </div>
      <div class="col">
          <h5 class="text-justify">${title}</h5>
          <p class="text-justify">Thème : ${theme}</p>
          <p class="fw-bold text-justify">${menu.nbPersonne} pers. min | ${menu.prix} €</p>
    </div>
    </div> `;

  function finalPrice() {
    // les champs
    const nbPersonne = Number(inputNbPersonne.value);
    const totalMenu = menu.prixPersonne * nbPersonne;

    // Réduction 10%
    let reduction = 0;
    if (nbPersonne >= menu.nbPersonne + 5) {
      reduction = totalMenu * 0.1;
    }
    const reducPrice = totalMenu - reduction;

    // Livraison
    const deliveryCity = inputCity.value.trim().toLowerCase();
    let delivery = 0;
    if (deliveryCity !== "bordeaux" && deliveryCity !== "") {
      delivery = 5;
    }
    const totalMenuPrice = reducPrice + delivery;

    // Affichage du bloc price
    recapchosenPrix.innerHTML = `
    Sous-total : ${totalMenu} €
    ${reduction > 0 ? `Réduction de 10% : -${reduction.toFixed(2)} €` : ""}
    ${delivery > 0 ? `Livraison hors Bordeaux : +${delivery.toFixed(2)} €` : ""}
    Total Menu : ${totalMenuPrice.toFixed(2)}

    `;
  }
  inputNbPersonne.addEventListener("input", finalPrice);
  inputCity.addEventListener("input", finalPrice);

  function validateCommand() {
    const adressOK = validateRequired(inputAdress);
    const dateOK = validateRequired(inputDate);
    const heureOK = validateRequired(inputHeure);
    const nbOK = validateRequired(inputNbPersonne);

    if (adressOK && dateOK && heureOK && nbOK) // si les 3 éléments sont ok alors enable btncontact//
    {
      btnCommander.disabled = false;
      return true;
    } else {
      btnCommander.disabled = true;
      return false;
    }
  }
})();
