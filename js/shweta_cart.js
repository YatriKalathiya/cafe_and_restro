
// show add items page 
document.getElementById('add_item_btn').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('filled-cart').style.display = 'block';
    document.getElementById('empty-cart').style.display = 'none';
})

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
            <div class="col-xl-3 col-lg-4  col-md-6 col-12">
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
                                    <p style="font-size: 14px; cursor: pointer;"  id="customiseBtn" data-index="${index}">Customize</p>
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

// Function to update quantity and re-render cart
function updateQuantity(index, change) {
    cartData[index].quantity = Math.max(1, cartData[index].quantity + change);
    renderCart();
    updateTotals();
}

function deleteItem(index) {
    cartData.splice(index, 1);
    renderCart();
    updateTotals();
}

// Function to update totals
function updateTotals() {
    const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.getElementById('total-items').textContent = `Total ${totalItems} Items`;
    document.getElementById('total-price').textContent = `$${totalPrice}`;

}
// Function to render the entire cart
function renderCart() {
    renderLargeScreenCart();
    updateTotals();
}
// Initial render
renderCart();


//Model Open & Close Order summary, Review, thank you
document.addEventListener('DOMContentLoaded', function () {
    const orderSummaryModal = new bootstrap.Modal(document.getElementById('orderSummaryModal'));
    const reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
    const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));

    // Open Order Summary Modal when "Place Order" is clicked
    document.getElementById('placeOrderBtn').addEventListener('click', function () {
        orderSummaryModal.show();
    });

    // Open Review Modal when "Add Review" is clicked
    document.getElementById('addReviewBtn').addEventListener('click', function () {
        orderSummaryModal.hide();
        reviewModal.show();
    });

    // Open Thank You Modal when "Submit" is clicked
    document.getElementById('submitReviewBtn').addEventListener('click', function () {
        reviewModal.hide();
        thankYouModal.show();
    });
});

document.getElementById('customiseBtn').addEventListener('click', function() {
    const myModal = new bootstrap.Modal(document.getElementById('customiseModal'));
    myModal.show();
});

