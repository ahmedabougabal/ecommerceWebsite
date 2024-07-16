
 // if you want to free local sotrage un comment the below comments !

// let localStorageItem = JSON.parse(localStorage.getItem('products'));
// localStorageItem.record.products = [];
// localStorage.setItem('products', JSON.stringify(localStorageItem));


 


    let cart_queue = [];
    let Update_flag = false;


    const binId = '';
    const apiKey = '';

      



  // function  to add items to the waiting queue 
  async function addProduct(itemID,itemPrice,itemDiscount,itemImage,itemTitle,itemBrand){


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
  }




  
