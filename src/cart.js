gsap.from('.nav h2', { duration: 1, y: '100%', opacity: 0, ease: 'power1' })
gsap.from('.cart i', { duration: 1, y: '100%', opacity: 0, ease: 'power1' })
gsap.from('.shop', { duration: 1, y: '5%', opacity: 0, ease: 'power2', delay: 0.5 })
gsap.from('.shopping-cart', { duration: 1, z: '5%', opacity: 0, ease: 'power2', delay: 0.5 })
gsap.from('.text-center', { duration: 1, z: '5%', opacity: 0, ease: 'power2', delay: 0.5 })



let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x
        let search = shopItemData.find((y) => y.id === id) || []
        return `
        <div class="cart-item">
          <img width="100"src=${search.img} alt="" />
          <div class="details">
  
            <div class="title-price-x">
                <h4 class="title-price">
                  <p>${search.name}</p>
                  <p class="cart-item-price">$ ${search.price}</p>
                </h4>
                <i title="Remove item" onclick="removeItem(${id})" class="fa-solid fa-x"></i>
            </div>
            
            <div class="buttons">
            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
            <div id=${id} class="quatity">
            ${item}
            </div>                        
            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
        </div>
        
            <h3>$ ${item * search.price}</h3>
          </div>
        </div>
        `
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
      `
  }
}

generateCartItems();


let increment = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    })
  } else {
    search.item += 1
  }

  generateCartItems()
  update(selectedItem.id)
  localStorage.setItem("data", JSON.stringify(basket))
  // console.log(basket)
}

let decrement = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return
  else if (search.item === 0) return
  else {
    search.item -= 1
  }

  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems()
  localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
  let search = basket.find((x) => x.id === id)
  // console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  TotalAmount()
}

let removeItem = (id) => {
  let selectedItem = id

  basket = basket.filter((x) => x.id !== selectedItem.id)
  generateCartItems()
  TotalAmount()
  localStorage.setItem("data", JSON.stringify(basket))
}

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
}

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x
        let search = shopItemData.find((y) => y.id === id) || []

        return item * search.price
      })
      .reduce((x, y) => x + y, 0)
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <a href="index.html">
    <button class="checkout">Checkout</button>
</a>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `
  } else return
}

TotalAmount()