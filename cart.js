// Initialize the users object and store it in localStorage
let users = {
  1: 1
}
let cartsIDs = {
  1: 1
}
localStorage.setItem("users", JSON.stringify(users))
localStorage.setItem("CartId", JSON.stringify(cartsIDs))

// Function to get the cart of the user 
async function getUserCart() {
  // Retrieve the users object from localStorage
  const storedUsers = JSON.parse(localStorage.getItem("users"))
  // Get the user ID (assumes there's only one user with ID 1)
  const userId = storedUsers[1]
  
  const data = await fetch('https://dummyjson.com/carts/add', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId,
      products: [
        {}
      ]
    })
  })
  const finalData = await data.json()
  const cartIdData = finalData.id;
  let cartObject = JSON.parse(localStorage.getItem("CartId"))

  cartObject[1] = cartIdData;

  localStorage.setItem("CartId", JSON.stringify(cartObject))

}

getUserCart()


// get 3 items using fetch api
async function getProducts(){
    const data = await fetch('https://dummyjson.com/products?limit=3')
    const fetchedData = await data.json()
    console.log(fetchedData.products)
    for(let i=0; i<3;i++){
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
    <img src="${data.images[0]}" width=150px>
    <button onClick="addToCart(${data.id})" class="add-to-cart">click me to add to cart</button>
    `
    document.getElementById("something").innerHTML += item
}

// function  to add item to cart
async function addToCart(itemID){

  const storedCartId = JSON.parse(localStorage.getItem("CartId"))
  const CartId = storedCartId[1]
const response = await fetch('https://dummyjson.com/carts/1', {
  method: 'PUT', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    merge: true, // this will include existing products in the cart
    products: [
      {
        id: itemID,
        quantity: 1,
      },
    ]
  })
})

const cartdata = await response.json()
console.log(cartdata);
      
}




  //display function displays added items to the cart page
  function displayAddedItem(data){
  
    const item = `
         <img src="${data.image}">
         <span>${data.title}</span>
         <span>${data.price}</span>
         <span>${data.quantity}</span>
         <img class="remove-item" src="delete.svg"></div>
    `
    document.getElementById("items").innerHTML += item
  }

  //




