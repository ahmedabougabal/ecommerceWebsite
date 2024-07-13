document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    window.location.href = 'login.html'; // Redirect to login if not logged in
  } else {
    document.getElementById('email').innerText = user.email;
    document.getElementById('fname').innerText = user.fname;
    document.getElementById('lname').innerText = user.lname;
  }
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html'; // Redirect to login page
}
