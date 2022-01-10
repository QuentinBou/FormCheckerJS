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

const pseudoInp = document.querySelector('#pseudo')
const emailInp = document.querySelector('#mail')
const passwordInp = document.querySelector('#password')
const confirmInp = document.querySelector('#checkpassword')

// Les selecteurs
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");
const passwordCont = document.querySelector(".checkpassword-container");
const form = document.querySelector("form");
// LOGIQUE



// Création d'érreur box
function createError(msg){
  Swal.fire({
    toast: true,
    position : 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: 'error',
    title: msg
  })
}

// Création Success box
function createSuccess(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Inscription confirmée.',
    text: 'Bienvenue parmis nous !',
    confirmButtonText: 'Merci.',
  })
}

// Fonctions

const pseudoCheck = () => {
  let value = pseudoInp.value
  if (value.length > 0 && (value.length < 5 || value.length > 24)) {
    createError(pseudoError[0]);
    pseudo = null;
    return false
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    createError(pseudoError[1]);
    pseudo = null;
    return false
  } else {
    pseudo = value
    return true
  }
};

const emailCheck = () => {
  let value = emailInp.value
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    createError(emailError);
    mail = null;
    return false
  } else {
    mail = value;
    return true
  }
};

const passwordCheck = () => {
  let value = passwordInp.value
  if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
    createError(passwordError[0]);
    password = null;
    return false
  } else {
    return value
  }
};

const confPasswordCheck = () => {
  let value = confirmInp.value
  if (value != passwordCheck()) {
    createError(passwordError[1]);
    confirmPass = null;
  } else {
    confirmPass = value;
    return true
  }
};

// Listeners

passwordInp.addEventListener('input', e => {
  if (e.target.value.length == 8) {
    progressBar.className = "progressRed";
  }
  if (e.target.value.length > 9 && e.target.value.length < 12) {
    progressBar.className = "progressBlue";
  }
  if (e.target.value.length > 12) {
    progressBar.className = "progressGreen";
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudoCheck()){
    if (emailCheck()){
      if (passwordCheck()){
        if (confPasswordCheck()) {
          const data = {
            pseudo: pseudo,
            mail: mail,
            password: confirmPass,
          };
          users.push(data);
          inputs.forEach((input) => {
            input.value = null;
            pseudo = null
            mail = null
            password = null
            confirmPass = null
            progressBar.classList.remove('progressRed', 'progressBlue', 'progressGreen')
          });
          createSuccess()
        }
      }
    }
  }
})

