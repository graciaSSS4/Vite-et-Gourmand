(function () {
  const btnModify = document.getElementById("btn-Modify");
  const inputNom = document.getElementById("nomInput");
  const inputPrenom = document.getElementById("prenomInput");
  const inputAdress = document.getElementById("adressInput");
  const inputAdresscompl = document.getElementById("adresscomplInput");
  const inputCode = document.getElementById("codepInput");
  const inputCity = document.getElementById("cityInput");
  const formAccount = document.getElementById("FormulaireAccount");
  const btnConfDelete = document.getElementById("btn-ConfirmedDelete");

  // Cahmps à écouter pour enable le bouton valider
  inputNom.addEventListener("keyup", validateModify);
  inputPrenom.addEventListener("keyup", validateModify);
  inputAdress.addEventListener("keyup", validateModify);
  inputAdresscompl.addEventListener("keyup", validateModify);
  inputCode.addEventListener("keyup", validateModify);
  inputCity.addEventListener("keyup", validateModify);

  btnModify.addEventListener("click", checkInfousers);

  // Pré-remplissage des infos user
  /*getInfoUser().then((user) => {
    document.getElementById("prenomInput").value = user.prenom;
    document.getElementById("nomInput").value = user.nom;
     document.getElementById("adressInput").value = user.adress;
      document.getElementById("adresscomplInput").value = user.adresscompl;
      document.getElementById("codepInput").value = user.code;
      document.getElementById("cityInput").value = user.city;
  });*/

  function validateModify() {
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPrenom);
    const adressOK = validateRequired(inputAdress); //appel à la vérification
    const adresscomplOK = validateRequired(inputAdresscompl); //appel à la vérification
    const codeOK = validateRequired(inputCode); //appel à la vérification
    const cityOK = validateRequired(inputCity); //appel à la vérification

    if (nomOK && prenomOK && adressOK && adresscomplOK && codeOK && cityOK) // si les éléments sont ok alors enable btncontact//
    {
      btnModify.disabled = false;
      return true;
    } else {
      btnModify.disabled = true;
      return false;
    }
  }

  function validateRequired(input) {
    if (input.value != "") {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      //c'est bon et c'est en green checked
      return true;
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      //Ce n'est pas bon et en red cross
      return false;
    }
  }

  function checkInfousers() {
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
    const dataForm = new FormData(formAccount);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      firstName: dataForm.get("prenom"),
      lastName: dataForm.get("nom"),
      adress: dataForm.get("adress"),
      adresscompl: dataForm.get("adresscompl"),
      code: dataForm.get("code"),
      city: dataForm.get("city"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(apiUrl + "account/edit", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          inputNom.classList.add("is-invalid"); // red
          inputPrenom.classList.add("is-invalid"); // red
          inputAdress.classList.add("is-invalid"); // red
          inputAdresscompl.classList.add("is-invalid"); // red
          inputCode.classList.add("is-invalid"); // red
          inputCity.classList.add("is-invalid"); // red
          alert("Les informations renseignées ne permettent pas de modifier vos informations personnelles.");
        }
      })

      //excution fléchée
      .then((result) => {
        alert("Vos informations ont bien été modifiées! Reconnectez-vous à votre compte!");
        signout();
      })
      .catch((error) => console.error(error));
  }

  // supprimer le compte

  btnConfDelete.addEventListener("click", deleteAccount);

  function deleteAccount() {
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
    const dataForm = new FormData(formAccount);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      firstName: dataForm.get("prenom"),
      lastName: dataForm.get("nom"),
      adress: dataForm.get("adress"),
      adresscompl: dataForm.get("adresscompl"),
      code: dataForm.get("code"),
      city: dataForm.get("city"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(apiUrl + "account/edit", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("La suppression de votre compte a échoué !");
        }
      })

      //excution fléchée
      .then((result) => {
        alert("Votre compte a bien été supprimé.");
        signout();
      })
      .catch((error) => console.error(error));
  }
})();
