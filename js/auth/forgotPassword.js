//Implémenter une javascript de ma page

(function () {
  //forgot password

  const inputMail = document.getElementById("emailInput");
  const btnRenewPassword = document.getElementById("btn-validation-renewP");
  const formRenewPassword = document.getElementById("renewPassword");

  inputMail.addEventListener("keyup", validateForm);

  // Fonction pour gérer clic sur les liens
  formRenewPassword.addEventListener("submit", (event) => {
    event.preventDefault();
    checkForgotpCredentials();
  });
  //Function permettant de valider tout le formulaire

  function validateForm() {
    const mailOK = validateMail(inputMail); //appel à la vérification du mail au bon format

    if (mailOK) // si tous les éléments sont ok alors enable btn //
    {
      btnRenewPassword.disabled = false;
      return true;
    } else {
      btnRenewPassword.disabled = true;
      return false;
    }
  }

  //Function permettant de vérifier le format du mail

  function validateMail(input) {
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
      //match: est-ce qu'il y a bien un match
      // entre le format donné par le user et le format regex
      input.classList.add("is-valid"); // green
      input.classList.remove("is-invalid");
      return true;
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid"); // red
      return false;
    }
  }

  function checkForgotpCredentials() {
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "form"
    const dataForm = new FormData(formRenewPassword);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      username: dataForm.get("email"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(apiUrl + "account/reset", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          inputMail.classList.add("is-invalid"); // red
          alert("Vos informations ne permettent pas d'envoyer un email");
        }
      })

      //excution fléchée
      .then((result) => {
        alert("Si un compte est associé à votre email, vous recevrez un lien sécurisé pour créer votre nouveau mot de passe.");
        document.location.href = "/";
      })
      .catch((error) => console.error(error));
  }
})();
