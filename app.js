// Infos du compte
let pseudo, mail, password, confirmPass;
let users = []
// Les messages
const pseudoError = [
  "Le pseudo doit faire entre 5 et 24 caractères.",
  "Le pseudo ne doit pas contenir de caractères spéciaux.",
];
const emailError = "Adresse email incorrect.";
const passwordError = [
  "Votre mot de passe doit contenir au moins 8 caractères, 1 Nombre, 1 majuscules et 1 minuscules.",
  "Votre mot de passe ne correspond pas.",
];

// Les selecteurs
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");
const passwordCont = document.querySelector(".checkpassword-container");
const form = document.querySelector("form");
// LOGIQUE

// Fonctions

const errorDisplay = (tag, msg, valid) => {
  const container = document.querySelector(`.${tag}-container`);
  const span = document.querySelector(`.${tag}-container > span`);
  const inputBorder = document.querySelector(`.${tag}-container > input`);

  if (!valid) {
    container.classList.add("error");
    inputBorder.classList.add("error-input");
    span.textContent = msg;
  } else {
    container.classList.remove("error");
    inputBorder.classList.remove("error-input");
  }
};

const pseudoCheck = (value) => {
  if (value.length > 0 && (value.length < 5 || value.length > 24)) {
    errorDisplay("pseudo", pseudoError[0]);
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("pseudo", pseudoError[1]);
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

const emailCheck = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("mail", emailError);
    mail = null;
  } else {
    errorDisplay("mail", "", true);
    mail = value;
  }
};

const passwordCheck = (value) => {
  if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
    errorDisplay("password", passwordError[0]);
    passwordCont.style.marginTop = "30px";
    password = null;
  } else {
    errorDisplay("password", "", true);
    passwordCont.style.marginTop = "";
    password = value;
    if (value.length == 8) {
      progressBar.classList.add("progressRed");
    }
    if (value.length > 9 && value.length < 12) {
      progressBar.classList.replace("progressRed", "progressBlue");
    }
    if (value.length > 12) {
      progressBar.classList.replace("progressBlue", "progressGreen");
    }
  }
};

const confPasswordCheck = (value) => {
  if (value != password) {
    errorDisplay("checkpassword", passwordError[1]);
    confirmPass = null;
  } else {
    errorDisplay("checkpassword", "", true);
    confirmPass = value;
  }
};

// Listeners

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoCheck(e.target.value);
        break;

      case "mail":
        emailCheck(e.target.value);
        break;

      case "password":
        passwordCheck(e.target.value);
        break;

      case "checkpassword":
        confPasswordCheck(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if(pseudo && mail && password && confirmPass){
      const data = {
          pseudo: pseudo,
          mail: mail,
          password: password,
      }
      users.push(data)
      alert("Votre compte est désormais créer !")
  } else {
      alert("Les champs du formulaire ne sont pas correctement renseignés.")
  }
});
