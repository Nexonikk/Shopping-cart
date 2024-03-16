gsap.from('.nav h2', { duration: 1, y: '-100%', opacity: 0, ease: 'power1' })
gsap.from('.cart i', { duration: 1, y: '-100%', opacity: 0, ease: 'power1' })
gsap.from('.shop', { duration: 1, y: '-5%', opacity: 0, ease: 'power2', delay: 0.5 })

let shop = document.getElementById("shop")

let basket = JSON.parse(localStorage.getItem("data")) || []


let genrateShop = () => {
    return (shop.innerHTML = shopItemData
        .map((x) => {
            let { id, name, price, desc, img } = x
            let search = basket.find((x) => x.id === id) || []
            return `
        <div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="">
                <div class="details">5
                    <h3> ${name}</h3>
                    <p>${desc}</p>
                </div>
                <div class="price-quantity">
                    <h2>$ ${price} </h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quatity">
                        ${search.item === undefined ? 0 : search.item}
                        </div>         
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                    </div>
             </div>
        </div>
        `
        }).join(""))
}

genrateShop()

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
    localStorage.setItem("data", JSON.stringify(basket))
    // console.log(basket)
    update(selectedItem.id)
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
    // console.log(basket)

    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item
}

