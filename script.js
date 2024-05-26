let products = [
  {
    id: 1,
    product_name: "Iphone 14 pro",
    price: 1000,
    quantity: 1,
    imageUrl:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
  },
  {
    id: 2,
    product_name: "Samsung S23 Ultra",
    price: 1200,
    quantity: 1,
    imageUrl:
      "https://961cells.com/wp-content/uploads/2023/02/S23-ultra-white.jpg",
  },
  {
    id: 3,
    product_name: "Macbook Air 2023",
    price: 1100,
    quantity: 1,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcM-xqywgWLC8fsiksRCwoKjL4A-dhlhZLipk9ge3ZPw&s",
  },
]

let shop = document.querySelector(".shop")
let cart = document.querySelector(".cart")
let cart_items = document.querySelector(".cart-items")
let open_cart_button = document.querySelector(".open-cart-button")
let cart_length = document.querySelector(".cart-length")
let total = document.querySelector(".total")

const current_products = JSON.parse(localStorage.getItem("products")) || []

let cartData = current_products

open_cart_button.addEventListener("click", () => {
  cart.classList.toggle("show")
})

//show the products in the page
function showProducts() {
  shop.innerHTML = products
    .map((product) => {
      return `<div class="card" id="${product.id}" >
                <img src="${product.imageUrl}" >
                <h2>${product.product_name}</h2>
                <h3>${product.price}$</h3>
                <button onclick="addToCart(${product.id})">add</button>
        </div>`
    })
    .join("")
}

showProducts()

//add the products to the cart

function addToCart(productId) {
  const currentProduct = products.find((product) => product.id === productId)
  cartData.find((e) => e.id === productId)
    ? currentProduct.quantity++
    : cartData.push(currentProduct)
  localStorage.setItem("products", JSON.stringify(cartData))

  showProductsInCart()
  lengthProductsInCart()
  calcTotal()
}

//show products in the cart

function showProductsInCart() {
  cart_items.innerHTML = cartData
    .map((product) => {
      return `<div class="card" id="${product.id}" >
                  <img src="${product.imageUrl}" >
                  <h2>${product.product_name}</h2>
                  <h3>${product.price}$</h3>
                  <div class="add-quantity">
                        <button  onclick="incrementQuantity(${product.id})">+</button>
                            <h3>quantity:${product.quantity}</h3>
                        <button onclick="decreaseQuantity(${product.id})">-</button>
                  </div>
                  <button onclick="removeProduct(${product.id})">remove</button>
              </div>`
    })
    .join("")
}

showProductsInCart()

function lengthProductsInCart() {
  if (cartData.length > 0) {
    cart_length.innerHTML = cartData.length
  } else {
    cart_length.innerHTML = ""
  }
}

lengthProductsInCart()

function removeProduct(productId) {
  let newCartData = cartData.filter((e) => e.id !== productId)
  cartData = newCartData
  localStorage.setItem("products", JSON.stringify(cartData))
  showProductsInCart()
  lengthProductsInCart()
  calcTotal()
}

//calc the total of the prices of the products

function calcTotal() {
  let totalPrice = 0
  cartData.forEach((product) => {
    return (totalPrice += product.price * product.quantity)
  })

  total.innerHTML = `total: ${totalPrice}$`
}

calcTotal()

function incrementQuantity(productId) {
  const existingProduct = cartData.find((e) => e.id === productId)
  existingProduct.quantity++
  localStorage.setItem('products',JSON.stringify(cartData))
  calcTotal()
  showProductsInCart()
}


function decreaseQuantity(productId){
    const existingProduct = cartData.find(e=> e.id === productId);
     existingProduct.quantity += -1

     if(existingProduct.quantity <= 0){
        let newCartData = cartData.filter(e=> e.id !== productId);
        cartData= newCartData
        lengthProductsInCart()
        showProductsInCart()
        calcTotal()
     }

     localStorage.setItem('products',JSON.stringify(cartData))
     lengthProductsInCart()

     calcTotal()
     showProductsInCart()
}