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
});



document.addEventListener('DOMContentLoaded', () => {
    let productId;
    let productName;
    let pageUrl = new URLSearchParams(window.location.search);
    productId = pageUrl.get('productId');
    productName = pageUrl.get('productName');
    document.title = productName;
    let productHeader = document.getElementById('show-product-header');
    productHeader.textContent = productName;
    getSingleProduct(productId);
    
});

let productImages;

async function getSingleProduct(productId){
    let response = await fetch(`https://dummyjson.com/products/${productId}`);
    let product = await response.json();

    getImages(product);
    getProductInfo(product);
    getProductDetails(product);
    getProoductReviews(product);
    let addToCart =   document.getElementById("add-to-cart");          
    addToCart.onclick= () => addProduct(product.id,product.price,product.discountPercentage,product.thumbnail,product.title,product.brand);

} 

function getImages(product){
    //get porduct images
    productImages = product.images;
    let productImage = document.getElementById('product-image');
    productImage.src = productImages[0];
}
let slideIndex = 0;
function showSlides() {
    let productImage = document.getElementById('product-image');
    slideIndex = (slideIndex + 1) % productImages.length;
    productImage.src = productImages[slideIndex];
}       
    
function getProductInfo(product){
    let description = document.getElementById('show-product-description');
    description.textContent = product.description;

    let category = document.getElementById('show-product-category');
    category.textContent = "Category: "+ product.category;

    let rating = document.getElementById('show-product-rating');
    rating.textContent = "Rating: " + product.rating+" out of 5";

    let price = document.getElementById('show-product-price');
    price.textContent = "Price: "+product.price+"$";
    
}

function getProductDetails(product){
    let brand = document.getElementById('brand');
    brand.textContent = "Brand: " + product.brand;

    let weight = document.getElementById('weight');
    weight.textContent = "Weight: " + product.weight;

    let width = document.getElementById('width');
    width.textContent = "Width: " + product.dimensions.width;

    let height = document.getElementById('height');
    height.textContent = "Height: " + product.dimensions.height;

    let depth = document.getElementById('depth');
    depth.textContent = "Depth: " + product.dimensions.depth;

    let warrenty = document.getElementById('warrenty');
    warrenty.textContent = "Warrenty Time: " + product.warrantyInformation;

    let shipping = document.getElementById('shipping');
    shipping.textContent = "Shipping Time: " + product.shippingInformation;
}

function getProoductReviews(product){
    let reviewsList = product.reviews;
    let reviewsContainer = document.getElementById('reviews-container');
    for( let i=0;i<reviewsList.length;i++){
        let reviewBox = document.createElement('div');
        reviewBox.className = 'review-box';
        
        let reviewName = document.createElement('h1');
        reviewName.className = 'reviewer-name';
        reviewName.textContent = reviewsList[i].reviewerName;
        

        let reviewEmail = document.createElement('h3');
        reviewEmail.className = 'reviewer-email';
        reviewEmail.textContent = reviewsList[i].reviewerEmail;
        


        let reviewcomment = document.createElement('p');
        reviewcomment.className = 'reviewer-comment';
        reviewcomment.textContent = reviewsList[i].comment;
        
        let reviewerRating = document.createElement('h2');
        reviewerRating.className = 'reviewer-rating';
        reviewerRating.textContent = "Rating: "+reviewsList[i].rating+" Out of 5"
        

        let reviewDate = document.createElement('h2');
        reviewDate.className = 'review-date';
        reviewDate.textContent = "Date Posted: "+reviewsList[i].date;
        

        reviewBox.appendChild(reviewName);
        reviewBox.appendChild(reviewEmail);
        reviewBox.appendChild(reviewerRating);
        reviewBox.appendChild(reviewcomment);
        reviewBox.appendChild(reviewDate);
        reviewsContainer.appendChild(reviewBox);

    }
}

