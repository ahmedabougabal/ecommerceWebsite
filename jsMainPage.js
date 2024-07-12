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
    //slider code
    let slideIndex = 0;
    const slides = document.querySelectorAll(".mySlides");

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].style.display = "block";
    }       
    showSlides();
    setInterval(showSlides, 3000);
});


async function getProducts(){
    //fetch products code      
        try {
            
             let response = await Promise.all([
                fetch(`https://dummyjson.com/products/category/smartphones?limit=0`),
                fetch(`https://dummyjson.com/products/category/laptops?limit=0`),
                fetch(`https://dummyjson.com/products/category/mobile-accessories?limit=0`),
                fetch(`https://dummyjson.com/products/category/tablets?limit=0`)
             ]);
             let jsonProducts = await Promise.all(response.map(response=> response.json()));
            let productsContainer = document.getElementById('products-container'); 
            for(var i =0 ; i<jsonProducts.length;i++){
            jsonProducts[i].products.forEach(product => {
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
          
        } catch (error) {
            console.error('Error fetching products:', error);
        }
           
    }
document.addEventListener('DOMContentLoaded', getProducts());