

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
     loadContent('header', '../html/navBar.HTML');
     loadContent('footer', '../html/Footer.html');

    getCategoryFromUrl();
});

 function getCategoryFromUrl(){
    let categoryName;
    let pageUrl = new URLSearchParams(window.location.search);
    categoryName = pageUrl.get('category');
    console.log(categoryName);
    document.title = categoryName;

    document.getElementById('category-header').textContent = categoryName + " Products";
    getCategoryProducts(categoryName);

 }

 async function getCategoryProducts(categoryName){
    try{
        let response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
         let product = await response.json();
         console.log("here");
        createElements(product);
    }catch(error){
        console.error('Error fetching products:', error);
    }
    
    
 }

 function createElements(product){
    console.log("here2");
    let productsContainer = document.getElementById('products-container'); 
    console.log("here3");
    product.products.forEach(product => {
            let divBox = document.createElement('div');
            let name = document.createElement('a');
            let image = document.createElement('img');
            let price = document.createElement('p');
            let brand = document.createElement('p');
            let addToCart = document.createElement('button')
            divBox.className = 'products-container-box';
            image.className = 'products-container-box-image';
            name.className = 'products-container-box-name';
            brand.className = 'products-container-box-brand';
            price.className = 'products-container-box-price';
            addToCart.className = 'products-container-box-addToCart';
            image.src = product.thumbnail;
            name.textContent = product.title;
            name.href = `singleProductPage.html?productId=${encodeURIComponent(product.id)}&productName=${encodeURIComponent(product.title)}`;;
            name.target = '_blank';
            brand.textContent = "Brand: " + product.brand;
            price.textContent = "Price: "+product.price+"$";
            addToCart.textContent = "Add To Cart";

            divBox.appendChild(image);
            divBox.appendChild(name);
            divBox.appendChild(brand);
            divBox.appendChild(price);
            divBox.appendChild(addToCart);
            productsContainer.appendChild(divBox);
        });
        
       
   
 }