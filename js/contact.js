(function () {
  const inputTitle = document.getElementById("TitleInput");
  const inputDescription = document.getElementById("DescriptionInput");
  const inputMail = document.getElementById("EmailInput");
  const btnContact = document.getElementById("btn-Validation-Contact");
  const formContact = document.getElementById("formulaireContact");

  inputTitle.addEventListener("keyup", validateForm);
  inputDescription.addEventListener("keyup", validateForm);
  inputMail.addEventListener("keyup", validateForm);

  // Fonction pour gérer les événements de routage (clic sur les liens)
  formContact.addEventListener("submit", (event) => {
    event.preventDefault();
    CheckContact();
  });

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

  //Function permettant de valider tout le formulaire
  function validateForm() {
    const titleOK = validateRequired(inputTitle);
    const descriptionOK = validateRequired(inputDescription);
    const mailOK = validateMail(inputMail); //appel à la vérification du mail au bon format

    if (titleOK && descriptionOK && mailOK) // si les 3 éléments sont ok alors enable btncontact//
    {
      btnContact.disabled = false;
      return true;
    } else {
      btnContact.disabled = true;
      return false;
    }
  }

  //Implémenter une javascript de ma page
  function CheckContact() {
    //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
    //Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
    const dataForm = new FormData(formContact);

    // Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
    const myHeaders = new Headers();
    // Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
    myHeaders.append("Content-Type", "application/json");

    // Convertit les données du formulaire en une chaîne JSON
    const raw = JSON.stringify({
      username: dataForm.get("Email"),
    });

    // Configure les options de la requête HTTP
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          inputMail.classList.add("is-invalid"); // red
        }
      })
      //excution fléchée pour plusieurs lignes
      .then((result) => {
        alert("Votre message a bien été envoyé!");
        document.location.href = "/";
      })
      .catch((error) => console.error(error));
  }
})();
