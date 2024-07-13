document.addEventListener('DOMContentLoaded', () => {
  checkLogin();
  fillRememberedEmail(); // this is a function that works if the user 
  // ticked the rememberMe checkbox on the sign in page that is triggered
  // when the dom is loaded and it reFILLS THE EMAIL input field instantly
  // + it also displays the checkbox as ticked if an email is found! lol  
  const eyeIcon = document.querySelector('#password img');
  eyeIcon.addEventListener('click', togglePasswordVisibility);
});

function register(event) {
  event.preventDefault();

  const policyChecked = document.querySelector('#rememberMe input[type="checkbox"]').checked;
  if (!policyChecked) {
    alert('You must read and accept the Privacy Policy.');
    return;
  }

  const email = document.querySelector('input[name="email"]').value;
  const fname = document.querySelector('input[name="fname"]').value;
  const lname = document.querySelector('input[name="lname"]').value;
  const password = document.querySelectorAll('input[name="password"]')[0].value;
  const repeatPassword = document.querySelectorAll('input[name="password"]')[1].value;
  const repeatPasswordInput = document.querySelectorAll('input[name="password"]')[1];
  const passwordErrorMessage = document.getElementById('password-error-message');

  if (password.length < 8) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  if (password !== repeatPassword) {
    repeatPasswordInput.style.borderColor = 'red';
    if (!passwordErrorMessage) {
      const errorMessage = document.createElement('p');
      errorMessage.id = 'password-error-message';
      errorMessage.style.color = 'red';
      errorMessage.innerText = "Passwords don't match";
      repeatPasswordInput.parentNode.insertBefore(errorMessage, repeatPasswordInput.nextSibling);
    }
    return;
  } else {
    repeatPasswordInput.style.borderColor = '';
    if (passwordErrorMessage) {
      passwordErrorMessage.remove();
    }
  }

  const hashedPassword = btoa(password);

  const user = { email, fname, lname, password: hashedPassword };
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', 'authenticated');
  alert('User registered successfully!');
  window.location.href = 'profile.html';
}

function ticked() {
  const policyChecked = document.querySelector('#SignUpCheck input[type="checkbox"]').checked;
  if (!policyChecked) {
    alert('You must read and accept the Privacy Policy.');
  }
}

function rememberMe() {
  const remembered = document.querySelector('#rememberMeCheckbox').checked;
  const emailField = document.querySelector('input[name="email"]');

  if (remembered) {
    localStorage.setItem('rememberedEmail', emailField.value);
  } else {
    localStorage.removeItem('rememberedEmail');
  }
}

function fillRememberedEmail() {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    document.querySelector('input[name="email"]').value = rememberedEmail;
    document.querySelector('#rememberMeCheckbox').checked = true;
  }
}

function login(event) {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const hashedPassword = btoa(password);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.email === email && storedUser.password === hashedPassword) {
    localStorage.setItem('token', 'authenticated');
    window.location.href = "profile.html";
  } else {
    alert('Invalid credentials');
  }
}

function checkLogin() {
  const token = localStorage.getItem('token');
  if (token === 'authenticated') {
    window.location.href = "profile.html";
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = "login.html";
}

function togglePasswordVisibility() {
  const passwordField = document.querySelector('#password input[name="password"]');
  const eyeIcon = document.querySelector('#password img');
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.src = 'Assets/eye-password-hide.svg'; // Update to hide icon
  } else {
    passwordField.type = 'password';
    eyeIcon.src = 'Assets/eye-password-show.svg'; // Update to show icon
  }
}
