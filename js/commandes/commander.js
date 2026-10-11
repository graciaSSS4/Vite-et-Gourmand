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
  const formCommand = document.getElementById("FormulaireCommand");

  // Cahmps à écouter pour enable le bouton valider
  inputAdress.addEventListener("keyup", validateCommand);
  inputDate.addEventListener("keyup", validateCommand);
  inputHeure.addEventListener("change", validateCommand);
  inputNbPersonne.addEventListener("keyup", validateCommand);
  inputCity.addEventListener("keyup", validateCommand);

  btnCommander.addEventListener("click", finalValidateCommand);

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
    // on accepte que des chiffres dans le champs nbpersonne
    inputNbPersonne.value = inputNbPersonne.value.replace(/\D/g, "");
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
    const cityOK = validateRequired(inputCity);

    if (adressOK && dateOK && heureOK && nbOK && cityOK) // si les éléments sont ok alors enable btncontact//
    {
      btnCommander.disabled = false;
      return true;
    } else {
      btnCommander.disabled = true;
      return false;
    }
  }

  function finalValidateCommand() {
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formCommand"
    const dataForm = new FormData(formCommand);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      adress: dataForm.get("adress"),
      date: dataForm.get("date"),
      hour: dataForm.get("heure"),
      nb: dataForm.get("nbPersonne"),
      city: dataForm.get("city"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "command", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Vos informations ne permettent pas de valider votre commande");
        }
      })
      //excution fléchée pour plusieurs lignes
      .then((result) => {
        alert("Commande validée! Vous allez recevoir un mail de confirmation!");
        document.location.href = "/";
      })
      .catch((error) => console.error(error));
  }
})();
