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

let productId;
let productName;

document.addEventListener('DOMContentLoaded', () => {
    
});