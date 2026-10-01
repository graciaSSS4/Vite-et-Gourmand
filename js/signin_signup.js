//Implémenter une javascript de ma page

(function () {
  //SIGN UP

  const inputNom = document.getElementById("NomInput");
  const inputPrenom = document.getElementById("PrenomInput");
  const inputPhone = document.getElementById("PhoneInput");
  const inputAdress = document.getElementById("AdressInput");
  const inputAdresscompl = document.getElementById("AdresscomplInput");
  const inputCode = document.getElementById("CodepInput");
  const inputCity = document.getElementById("CityInput");
  const inputMail = document.getElementById("EmailInput");
  const inputPassword = document.getElementById("PasswordInput");
  const inputValidationPassword = document.getElementById("ValidatePasswordInput");
  const btnValidation = document.getElementById("btn-validation-inscription");
  const formInscription = document.getElementById("formulaireInscription");

  inputNom.addEventListener("keyup", validateForm);
  inputPrenom.addEventListener("keyup", validateForm);
  inputPhone.addEventListener("keyup", validateForm);
  inputAdress.addEventListener("keyup", validateForm);
  inputAdresscompl.addEventListener("keyup", validateForm);
  inputCode.addEventListener("keyup", validateForm);
  inputCity.addEventListener("keyup", validateForm);
  inputMail.addEventListener("keyup", validateForm);
  inputPassword.addEventListener("keyup", validateForm);
  inputValidationPassword.addEventListener("keyup", validateForm);

  btnValidation.addEventListener("click", InscrireUtilisateur);
  //Function permettant de valider tout le formulaire

  function validateForm() {
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPrenom);
    const phoneOK = validateRequired(inputPhone); //appel à la vérification
    const adressOK = validateRequired(inputAdress); //appel à la vérification
    const adresscomplOK = validateRequired(inputAdresscompl); //appel à la vérification
    const codeOK = validateRequired(inputCode); //appel à la vérification
    const cityOK = validateRequired(inputCity); //appel à la vérification
    const mailOK = validateMail(inputMail); //appel à la vérification du mail au bon format
    const passwordOK = validatePassword(inputPassword); //appel à la vérification du PWD au bon format
    const passwordConfirmOK = validateConfirmationPassword(inputPassword, inputValidationPassword); //appel à la vérification entre les 2 PWD identiques

    if (
      nomOK &&
      prenomOK &&
      phoneOK &&
      adressOK &&
      adresscomplOK &&
      codeOK &&
      cityOK &&
      mailOK &&
      passwordOK &&
      passwordConfirmOK
    ) // si tous les éléments sont ok alors enable btn inscription//
    {
      btnValidation.disabled = false;
      return true;
    } else {
      btnValidation.disabled = true;
      return false;
    }
  }

  //Function permettant de vérifier que les 2 password sont identiques

  function validateConfirmationPassword(inputPassword, inputValidationPassword) {
    if (inputPassword.value == inputValidationPassword.value) {
      // entre le 1er format donné par le user et le format confirmé
      inputValidationPassword.classList.add("is-valid"); // green
      inputValidationPassword.classList.remove("is-invalid");
      return true;
    } else {
      inputValidationPassword.classList.remove("is-valid");
      inputValidationPassword.classList.add("is-invalid"); // red
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

  function InscrireUtilisateur() {
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
    const dataForm = new FormData(formInscription);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      firstName: dataForm.get("prenom"),
      lastName: dataForm.get("nom"),
      phone: dataForm.get("phone"),
      adress: dataForm.get("adress"),
      adresscompl: dataForm.get("adresscompl"),
      code: dataForm.get("code"),
      city: dataForm.get("city"),
      email: dataForm.get("email"),
      password: dataForm.get("password"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "registration", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Vos informations ne permettent pas de vous inscrire");
        }
      })
      //excution fléchée pour plusieurs lignes
      .then((result) => {
        alert("Insciption validée! Connectez-vous àvotre compte!");
        document.location.href = "/";
      })
      .catch((error) => console.error(error));
  }

  // SIGN IN
  const inputEmailSignin = document.getElementById("EmailInput");
  const inputPasswordSignin = document.getElementById("PasswordInput");
  const btnSingin = document.getElementById("btnSingin");
  const signinForm = document.getElementById("signinForm");

  btnSingin.addEventListener("click", checkCredentials);

  function checkCredentials() {
    //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
    const dataForm = new FormData(signinForm);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      username: dataForm.get("Email"),
      password: dataForm.get("Password"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "login", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          inputEmailSignin.classList.add("is-invalid");
          inputPasswordSignin.classList.add("is-invalid"); // red
        }
      })

      .then((result) => {
        //Il faudra récupérer le vrai token
        const token = result.apiToken;
        setToken(token);

        //placer ce token en cookie
        setCookie(roleCookieName, result.roles[0], 30);
        window.location.replace("/");
      })
      .catch((error) => console.error(error));
  }
})();
