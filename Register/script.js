const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector("#form");

const getParent = input => input.parentElement;

const showError = (input, message) => {
  const parent = getParent(input);
  parent.className = "form-control fail";
  const small = parent.querySelector("small");
  small.innerText = message;
};

const showSuccess = input => {
  const parent = getParent(input);
  parent.className = "form-control success";
};

const checkRequired = inputArr => {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${input.placeholder} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length === 0) {
  } else if (input.value.length < min || input.value.length > max) {
    showError(input, `Length must be between ${min} and ${max} characters`);
  } else {
    showSuccess(input);
  }
};

const checkConfirmPassword = (confirm, password) => {
  if (confirm.value !== password.value) {
    showError(confirm, `Did not match`);
  }
};

form.addEventListener("submit", e => {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 2, 20);
  checkLength(password, 6, 25);
  checkConfirmPassword(confirmPassword, password);
});
