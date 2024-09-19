
// show add items page 
document.getElementById('add_item_btn').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('filled-cart').style.display = 'block';
    document.getElementById('empty-cart').style.display = 'none';
})
 
// add items in array

// const cardData = [
//     {
//       name: "Masala Dosa",
//       image: "../shweta_img/img4.png",
//       vegIcon: "../shweta_img/veg.svg",
//       description: "Lorem ipsum dolor sit amet consectetur...",
//       category: "South Indian",
//       rating: 4.5,
//       price: "$120",
//       quantity: 1,
//     },
//     {
//       title: "Masala Dosa",
//       image: "../shweta_img/img4.png",
//       vegIcon: "../shweta_img/veg.svg",
//       description: "Lorem ipsum dolor sit amet consectetur...",
//       category: "South Indian",
//       rating: 4.5,
//       price: "$120",
//       quantity: 1,
//     },
   
//   ];
// Cart data array
const cartData = [
    {
        name: "Masala Dosa",
        image: "../shweta_img/img4.png",
        vegIcon: "../shweta_img/veg.svg",
        description: "Lorem ipsum dolor sit amet consectetur...",
        category: "South Indian",
        rating: 4.5,
        price: 120,
        quantity: 1,
    },
    {
        name: "Idli Sambar",
        image: "../shweta_img/img4.png",
        vegIcon: "../shweta_img/veg.svg",
        description: "Steamed rice cakes served with lentil soup...",
        category: "South Indian",
        rating: 4.3,
        price: 80,
        quantity: 2,
    },
];

// Function to render large screen cart items
function renderLargeScreenCart() {
    const container = document.getElementById('large-screen-cart');
    container.innerHTML = '';

    cartData.forEach((item, index) => {
        const itemHtml = `
            <div class="col-xl-3 col-md-4">
                <div class="card sb_card1" style="width: 18rem;">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}" style="position: relative;">
                    <img src="${item.vegIcon}" alt="Veg icon" style="position: absolute; top: 5%; right: 10%;">
                    <div class="card-body sb_card_body1" style="background-color: #020202;">
                        <h6 class="card-title">${item.name}</h6>
                        <p class="card-text">
                            <div class="d-flex align-items-center" style="color: #999999; font-size: 13px;">
                                ${item.category}
                                <span class="sb_dots"> &#x2022;</span><span>Pure Veg</span><span class="sb_dots">&#x2022;</span>
                                <span><i class="fa-solid fa-star sb_star"></i>${item.rating}</span>
                            </div>
                        </p>
                        <p style="font-size: 13px;">${item.description}</p>
                        <div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 style="color: #FB7514 !important;">$${item.price}</h5>
                                    <p style="font-size: 14px;">Customize</p>
                                </div>
                                <div class="sb_qty_btn">
                                ${item.quantity === 1 
                                    ? `<span><i class="fa-solid fa-trash-can" onclick="deleteItem(${index})" style="color: #000 !important;"></i></span>`
                                    : `<span><i class="fa-solid fa-minus" onclick="updateQuantity(${index}, -1)"></i></span>`
                                }
                                    <span>${item.quantity}</span>
                                    <span><i class="fa-solid fa-plus" onclick="updateQuantity(${index}, 1)"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += itemHtml;
    });
}

// Function to render small screen cart items
function renderSmallScreenCart() {
    const container = document.getElementById('small-screen-cart');
    container.innerHTML = '';

    cartData.forEach((item, index) => {
        const itemHtml = `
            <div class="col-12 d-flex justify-content-between p-2">
                <div>
                    <img src="${item.image}" alt="${item.name}" width="70px">
                </div>
                <div>
                    <h6>${item.name}</h6>
                    <small>${item.category}</small>
                    <p>$${item.price}</p>
                </div>
                <div>
                    <small style="color: #FB7514;">Customize</small>
                    <div class="sb_qty_btn">
                         ${item.quantity === 1 
                            ? `<span><i class="fa-solid fa-trash-can" onclick="deleteItem(${index})" style="color: #000 !important;"></i></span>`
                            : `<span><i class="fa-solid fa-minus" onclick="updateQuantity(${index}, -1)"></i></span>`
                        }
                        <span>${item.quantity}</span>
                        <span><i class="fa-solid fa-plus" onclick="updateQuantity(${index}, 1)"></i></span>
                    </div>
                </div>
            </div>
            <hr>
        `;
        container.innerHTML += itemHtml;
    });

    container.innerHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
            <p class="m-0">Add More Items</p>
            <img src="../shweta_img/plus.svg" alt="">
        </div>
    `;
}

// Function to update quantity and re-render cart
function updateQuantity(index, change) {
    cartData[index].quantity = Math.max(1, cartData[index].quantity + change);
    renderCart();
    updateTotals();
}

function deleteItem(index) {
    cartData.splice(index,1);
    renderCart();
    updateTotals();
}

// Function to update totals
function updateTotals() {
    const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.getElementById('total-items').textContent = `Total ${totalItems} Items`;
    document.getElementById('total-price').textContent = `$${totalPrice}`;
    document.getElementById('total-items-sm').textContent = `Total (${totalItems} items)`;
    document.getElementById('total-price-sm').textContent = `$${totalPrice}`;
}

// Function to render the entire cart
function renderCart() {
    renderLargeScreenCart();
    renderSmallScreenCart();
    updateTotals();
}

// Initial render
renderCart();
