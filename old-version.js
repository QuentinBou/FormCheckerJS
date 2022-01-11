// Infos du compte
let pseudo, mail, password, confirmPass;
let users = [];
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
const button = document.querySelector('#buttonSubmit')
// LOGIQUE

// Fonctions

const errorDisplay = (tag, msg, valid) => {
  const container = document.querySelector(`.${tag}-container`);
  const span = document.querySelector(`.${tag}-container > .error-span`);
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
  } else if (confirmPass != "" && confirmPass != null){
      if (confirmPass != value){
        errorDisplay("password", passwordError[1])
        passwordCont.style.marginTop = "30px";
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
    button.style.marginTop = '3rem'
    confirmPass = null;
  } else {
    errorDisplay("checkpassword", "", true);
    button.style.marginTop = ''
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

  if (pseudo && mail && password && confirmPass) {
    if (password == confirmPass){
        const data = {
            pseudo: pseudo,
            mail: mail,
            password: password,
          };
          users.push(data);
          console.log(data);
          Swal.fire({
              icon: 'success',
              title: `Bienvenue ${pseudo} !`,
              text: `Votre compte est désormais créer !\n Vous allez recevoir un mail de confirmation sur votre boîte : ${mail}`,
          })
          inputs.forEach((input) => {
            input.value = null;
            pseudo = null
            mail = null
            password = null
            confirmPass = null
            progressBar.classList.remove('progressRed', 'progressBlue', 'progressGreen')
          });
    } else {
        Swal.fire({
            icon: 'error',
            position: 'top-end',
            title: 'Votre mot de passe ne correspond pas.',
            timer: 3000,
            timerProgressBar: true,
        })
    }
  } else {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: "Les champs du formulaire ne sont pas correctement renseignés.",
        timer: 3500,
        timerProgressBar: true,
    })
  }
});