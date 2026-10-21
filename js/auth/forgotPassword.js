//Implémenter une javascript de ma page

(function () {
  //forgot password

  const inputMail = document.getElementById("emailInput");
  const inputValidationPassword = document.getElementById("validatePasswordInput");
  const btnEditPassword = document.getElementById("btn-validation-editP");
  const formEditPassword = document.getElementById("editPassword");

  inputPassword.addEventListener("keyup", validateForm);
  inputValidationPassword.addEventListener("keyup", validateForm);

  btnEditPassword.addEventListener("click", checkForgotpCredentials);
  //Function permettant de valider tout le formulaire

  function validateForm() {
    const mailOK = validateMail(inputMail); //appel à la vérification du mail au bon format

    if (mailOK) // si tous les éléments sont ok alors enable btn //
    {
      btnEditPassword.disabled = false;
      return true;
    } else {
      btnEditPassword.disabled = true;
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

  //Function permettant de vérifier le format du password

  function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{10,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
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
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
    const dataForm = new FormData(formEditPassword);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      password: dataForm.get("password"),
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
          inputPassword.classList.add("is-invalid"); // red
          alert("Vos informations ne permettent pas de changer votre mot de passe");
        }
      })

      //excution fléchée
      .then((result) => {
        alert("Nouveau mot de pas validé! Reconnectez-vous à votre compte!");
        signout();
      })
      .catch((error) => console.error(error));
  }
})();
