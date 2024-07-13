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
// catch params
const paramValue = new URLSearchParams(window.location.search);
product = paramValue.get('product')
let query = document.getElementById("query")
const regex = new RegExp(paramValue.get('product'),"igm")
let exist = false;
if(product){
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
                    
                    if (product.description.search(regex)>=0){
                        exist= true;
                        query.innerHTML = `Results for ${paramValue.get('product')}`
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
                        name.href = `singleProductPage.html?productId=${encodeURIComponent(product.id)}&productName=${encodeURIComponent(product.title)}`;                        ;
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
                        addToCart.onclick= () => addProduct(product.id,product.price,product.discountPercentage,product.thumbnail,product.title,product.brand);
                }else if(!exist){
                    query.innerHTML = `No results for ${paramValue.get('product')}`
                    query.style.marginBottom='50px';
                    
                }});
                }
              
            } catch (error) {
                console.error('Error fetching products:', error);
            }
               
        }
    document.addEventListener('DOMContentLoaded', getProducts());
}
else{
    query.innerHTML = "No results found"
    query.style.marginBottom='175px';
}
