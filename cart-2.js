




const numberOfItems = document.getElementById("number_of_items")
const subTotal_total = document.getElementById("subtotal-total")

function itemCount() {

  const storedItems = JSON.parse(localStorage.getItem("products"))
  const total_items = storedItems.record.products
  let subTotalValue = 0;
  for(let i=0;i<total_items.length;i++){
     subTotalValue+= Math.ceil(parseFloat(total_items[i].price));
  }
  subTotal_total.innerHTML=subTotalValue
  numberOfItems.innerHTML = `Subtotal (${total_items.length} items)`  
  
}
itemCount()

function increaseCount(){


}

function decreaseCount(){

}

function updateBin()
{

}



async function displayAddedItem() {
    try {
      // Retrieve products from localStorage
      const products1 = JSON.parse(localStorage.getItem("products"));
    
      // Get the items container element
      const itemsContainer = document.getElementById("items");
    
      // Check if itemsContainer exists before proceeding
      if (!itemsContainer) {
        throw new Error('Items container element not found.');
      }
    
      // Clear previous content
      itemsContainer.innerHTML = '';
      const products = products1.record.products;
    
      // Iterate through products and create HTML for each
      products.forEach(product => {
        // Create elements for each product
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('product-item');
    
        const img = document.createElement('img');
        img.src = product.image;
        img.style.width = '50px'; 
        img.style.height = '50px'
    
        const titleSpan = document.createElement('span');
        titleSpan.textContent = product.title;
        
        const brand_div = document.createElement('spans')
        brand_div.textContent = "brand:"

        const brandSpan = document.createElement('span');
        brandSpan.textContent = product.brand;
        brandSpan.style.width = '20px'; 
        brandSpan.style.height = '20px';
    
        const priceSpan = document.createElement('span');
        priceSpan.textContent = product.price;

        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('quantity-control');
       
        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.addEventListener('click', () => decreaseQuantity(product));

        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = 1;
        quantityInput.classList.add('quantity-input');

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.addEventListener('click', () => increaseQuantity(product));
    
        const removeImg = document.createElement('img');
        removeImg.classList.add('remove-item');
        removeImg.src = 'delete.svg';
        removeImg.style.width = '20px'; 
        removeImg.style.height = '20px';

    
          quantityDiv.appendChild(decreaseBtn);
          quantityDiv.appendChild(quantityInput);
          quantityDiv.appendChild(increaseBtn);

        // Append elements to the itemDiv
        itemDiv.appendChild(img)
        itemDiv.appendChild(titleSpan);
        itemDiv.appendChild(brand_div);
        itemDiv.appendChild(brandSpan);
        itemDiv.appendChild(priceSpan);
        itemDiv.appendChild(quantityDiv);
        itemDiv.appendChild(removeImg);
    
        // Append the itemDiv to the items container
        itemsContainer.appendChild(itemDiv);
      });
    
    } catch (error) {
      console.error('Error displaying added items:', error.message);
    }
    }
displayAddedItem()

