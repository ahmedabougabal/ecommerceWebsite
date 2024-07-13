document.addEventListener('DOMContentLoaded', () => {
  // Function to load content from a file and insert it into an element
  function loadContent(elementId, filePath) {
      fetch(filePath)
          .then(response => response.text())
          .then(data => {
              document.getElementById(elementId).innerHTML = data;
          })
          .catch(error => console.error('Error loading content:', error));
  }
  loadContent('header', 'navBar.HTML');
  loadContent('footer', 'footer.html');
});

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
