
// Retrieve object from local storage
// let localStorageItem = JSON.parse(localStorage.getItem('products'));

// localStorageItem.record.products = [];


// localStorage.setItem('products', JSON.stringify(localStorageItem));


/*               */

let cart_queue = [];
let Update_flag = false;


  const binId = '668d8601e41b4d34e40f81e7';
const apiKey = '$2a$10$oFTM9uqaBHpQjTjZZLIUauYv6mAMtPqAgdACQF7TE2jYo91EMBBti';

  
  // get 3 items using fetch api

async function getProducts(){
  const data = await fetch('https://dummyjson.com/products?limit=10')
  const fetchedData = await data.json()
  console.log(fetchedData.products)
  for(let i=0; i<10;i++){
      displayItems(fetchedData.products[i])
  }
  
  
}
getProducts()

// function to display the added items to the mock page
function displayItems(data){
  const item = `
  <hr>
  <div>${data.title}</div>
  <div>${data.price}</div>
  <img src="${data.images[0]}" width="150px">
  <button onClick="addToCart('${data.id}', '${data.price}','${data.discountPercentage}', '${data.images[0]}', '${data.title.replace(/'/g, "\\'")}','${data.brand}')" class="add-to-cart">click me to add to cart</button>
  `
  document.getElementById("something").innerHTML += item
  console.log("Items in cart:", cart_queue);
}
 


// function  to add items to the waiting queue 
async function addToCart(itemID,itemPrice,itemDiscount,itemImage,itemTitle,itemBrand){


try {
      let newProduct;
      let item_exists_flag = false

      // check if the product already exists in the queue of items
      for (let i=0;i<cart_queue.length;i++){
        if(itemID == cart_queue[i].id){
          cart_queue[i].quantity++;
          item_exists_flag = true
          break;
        }
      }

  // Construct the new product object using function parameters if it does not exist in the queue
      if(!item_exists_flag){
         newProduct = {
          "id": itemID,
          "image": itemImage,
          "price": itemPrice,
          "title": itemTitle,
          "discount" : itemDiscount, 
          "brand" : itemBrand,
          "quantity" : 1
        };
        cart_queue.push(newProduct)
      }

 

  if(Update_flag== false){
    Update_flag = true
    await process_queue();
  }}
  catch (error){
    console.error("error in add to cart: ", error.message)
  }

}

// functionto proccess the products in the queue

async function  process_queue(){

  try {
    while (cart_queue.length > 0) {
      const newProduct = cart_queue.shift();
  // Fetch current data from JSONBin.io
  const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
    headers: {
      'X-Master-Key': apiKey
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from JSONBin.io');
  }

  const currentData = await response.json();
   
  //check if the product exists int he current Data !
  let product_exists_flag = false;
  for (let i=0; i<currentData.record.products.length;i++){
    if(currentData.record.products[i].id == newProduct.id)
    {
      currentData.record.products[i].quantity += newProduct.quantity;
      product_exists_flag = true;
      break;
    }
  }

    if(!product_exists_flag){
      // Update the products array with the new product
       currentData.record.products.push(newProduct);
    }

  // Update JSONBin.io with the modified data
  const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': apiKey
    },
    body: JSON.stringify(currentData.record)
  });

  if (!updateResponse.ok) {
    throw new Error('Failed to update data on JSONBin.io');
  }

  const updatedData = await updateResponse.json();
  // UPDATE LOCAL STORAGE WITH THE LATEST DATA
  localStorage.setItem("products", JSON.stringify(updatedData))
  Update_flag = false;

}} catch (error) {
  console.error('Error updating data on JSONBin.io:', error.message);
}
displayAddedItem()
}



