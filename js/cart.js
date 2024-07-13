

  const numberOfItems = document.getElementById("number_of_items")
  const subTotal_total = document.getElementById("subtotal-total")
  const final_total = document.getElementById("estimated-total-total")
  const discount_value = document.getElementById("saving-total")


  function itemCount() {
    
    const storedItems = JSON.parse(localStorage.getItem("products"))
    const total_items = storedItems.record.products
    
    let subTotalValue = 0;
    let totalQuantity = 0;

    for(let i=0;i<total_items.length;i++){
      const price = parseFloat(total_items[i].price).toFixed(2);
      const quantity = total_items[i].quantity;
      
      totalQuantity += total_items[i].quantity
      subTotalValue += price * quantity
    

    }
    
    subTotal_total.innerHTML=`$${subTotalValue.toFixed(2)}`
    numberOfItems.innerHTML = `Subtotal (${totalQuantity} items)` 
    final_total.innerHTML = `$${subTotalValue.toFixed(2)}`

  }
  itemCount()

  function increaseCount(product){

    const storedItems = JSON.parse(localStorage.getItem("products"));
      const products = storedItems.record.products;

      // Use a for loop to find the product
      for (let i = 0; i < products.length; i++) {
          if (products[i].id === product.id) {
              products[i].quantity += 1; 
              break; 
          }
      }

      localStorage.setItem("products", JSON.stringify(storedItems));
      itemCount();
      displayAddedItem()

  }

  function decreaseCount(product){

    const storedItems = JSON.parse(localStorage.getItem("products"));
      const products = storedItems.record.products;

      // Use a for loop to find the product
      for (let i = 0; i < products.length; i++) {
          if (products[i].id === product.id) {
              if(products[i].quantity > 1)
              {
                products[i].quantity -= 1; 
              }
              
              break; 
          }
      }

      localStorage.setItem("products", JSON.stringify(storedItems));
      itemCount();
      displayAddedItem()

  }

  function removeItem(product){

    const storedItems = JSON.parse(localStorage.getItem("products"));
    let products = storedItems.record.products;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === product.id) {
            products.splice(i, 1); 
            break; 
        }
    }

    storedItems.record.products = products;
    localStorage.setItem("products", JSON.stringify(storedItems));
    itemCount()
    displayAddedItem()
    

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
        console.log(products)
      
        // Iterate through products and create HTML for each
        products.forEach(product => {

          // Create elements for each product
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('product-item');
      
          const img = document.createElement('img');
          img.src = product.image;
          img.style.width = '100px';   
          img.style.height = '100px'
          
          const divWrapper = document.createElement("div")
          divWrapper.classList.add("divWrap")
          
          const subWrapper = document.createElement("div")
          subWrapper.classList.add("subWrap")
          

          const titleSpan = document.createElement('span'); 
          titleSpan.textContent = product.title;
          titleSpan.style.width='230px'
          
          const brand_div = document.createElement('spans')
          brand_div.textContent = "brand:"

          const brandSpan = document.createElement('span');
          brandSpan.classList.add('brandSpan')
          brandSpan.textContent = product.brand;
          
      
          const priceSpan = document.createElement('span');
          priceSpan.textContent = product.price;

          const quantityDiv = document.createElement('div');
          quantityDiv.classList.add('quantity-control');
          
        
          const decreaseBtn = document.createElement('button');
          decreaseBtn.textContent = '-';
          decreaseBtn.onclick = ()=> decreaseCount(product)
          

          const quantityInput = document.createElement('input');
          quantityInput.type = 'text';
          quantityInput.value = product.quantity;
          quantityInput.classList.add('quantity-input');
          quantityInput.readOnly = true

          const increaseBtn = document.createElement('button');
          increaseBtn.textContent = '+';
          increaseBtn.onclick = ()=> increaseCount(product)
          
      
          const removeImg = document.createElement('img');
          removeImg.classList.add('remove-item');
          removeImg.src = '/Images/delete.svg';
          removeImg.style.width = '20px'; 
          removeImg.style.height = '20px';
          removeImg.onclick = ()=> removeItem(product)
          

            // quantity selector div
            quantityDiv.appendChild(decreaseBtn);
            quantityDiv.appendChild(quantityInput);
            quantityDiv.appendChild(increaseBtn);

          // append items to subWrap 
          subWrapper.appendChild(brand_div)
          subWrapper.appendChild(brandSpan)

          // append items to div wrapper
          divWrapper.appendChild(titleSpan);
          divWrapper.appendChild(subWrapper)

          // Append elements to the itemDiv
          itemDiv.appendChild(img)
          itemDiv.appendChild(divWrapper)
          itemDiv.appendChild(priceSpan);
          itemDiv.appendChild(quantityDiv);
          itemDiv.appendChild(removeImg);

      
          // Append the itemDiv to the items container
          itemsContainer.appendChild(itemDiv);
        });
      
      } catch (error) {
        console.error('Error displaying added items:', error.message);
      }
      itemCount();
      }
  displayAddedItem()

