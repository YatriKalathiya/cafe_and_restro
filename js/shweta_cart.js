// localStorage.removeItem('cart');
let cart = JSON.parse(localStorage.getItem('cart') || []);

console.log("cart>>>>>>>",cart);
if (cart.length === 0) {
    document.getElementById('empty-cart').style.display = 'block';
    document.getElementById('filled-cart').style.display = 'none';
} else {  
    document.getElementById('empty-cart').style.display = 'none';
    document.getElementById('filled-cart').style.display = 'block';
}
// Add event delegation for dynamically generated customize buttons
document.getElementById('large-screen-cart').addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('customiseBtn')) {
        const index = event.target.getAttribute('data-index');
        const item = cart[index];
        
        // Populate modal content with item details
        document.getElementById('customize-content').innerHTML = `
            <div>
                <h6>${item.title}</h6>
                <p>Current Quantity: <span id="quantity-display">${item.count}</span></p>
                <div>
                    <p>Types:</p>
                    <input type="radio" name="Regular" value="Regular" ${item.size === 'Regular' ? 'checked' : ''}> Small
                    <input type="radio" name="Butter" value="Butter" ${item.size === 'Butter' ? 'checked' : ''}> Medium
                    <input type="radio" name="Cheese" value="Cheese" ${item.size === 'Cheese' ? 'checked' : ''}> Large
                </div>
                <div>
                    <p>Stuffings:</p>
                    <input type="checkbox" class="stuffing-checkbox" value="Palack" ${item.stuffings.includes("Palack") ? 'checked' : ''}> Palak<br>
                    <input type="checkbox" class="stuffing-checkbox" value="Paneer" ${item.stuffings.includes("Paneer") ? 'checked' : ''}> Paneer<br>
                </div>
                <div>
                    <p>Dips:</p>
                    <input type="checkbox" class="dip-checkbox" value="Green chutney" ${item.dips.includes("Green chutney") ? 'checked' : ''}> Green chutney<br>
                    <input type="checkbox" class="dip-checkbox" value="Ketchup" ${item.dips.includes("Ketchup") ? 'checked' : ''}> Ketchup<br>
                </div>
            </div>
        `;

        const myModal = new bootstrap.Modal(document.getElementById('customiseModal'));
        myModal.show();

        // Handle save customizations
        document.getElementById('saveCustomizations').onclick = function() {
            // Update item based on selections
            const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
            const selectedStuffings = Array.from(document.querySelectorAll('.stuffing-checkbox:checked')).map(checkbox => checkbox.value);
            const selectedDips = Array.from(document.querySelectorAll('.dip-checkbox:checked')).map(checkbox => checkbox.value);
            
            // Update cart item
            item.size = selectedSize;
            item.stuffings = selectedStuffings;
            item.dips = selectedDips;

            myModal.hide();
            renderCart(); // Re-render cart to show updated information
        };
    }
});

// Function to render large screen cart items
function renderLargeScreenCart() {
    // console.log("cart>@@@@@@@@@@@>>>>>",cart);
    
    const container = document.getElementById('large-screen-cart');
    container.innerHTML = '';

    cart.map((item, index) => {
        // console.log("cart******************",cart);
        
        const itemHtml = `
            <div class="col-xl-3 col-lg-4  col-md-6 col-12">
                <div class="card sb_card1" style="width: 18rem;">
                    <img src="${item.img}" class="card-img-top" alt="${item.name}" style="position: relative;">
                    <img src="${item.icon}" alt="Veg icon" style="position: absolute; top: 5%; right: 10%;">
                    <div class="card-body sb_card_body1" style="background-color: #020202;">
                        <h6 class="card-title">${item.title}</h6>
                        <p class="card-text">
                            <div class="d-flex align-items-center" style="color: #999999; font-size: 13px;">
                                ${item.cat}
                                <span class="sb_dots"> &#x2022;</span><span>Pure Veg</span><span class="sb_dots">&#x2022;</span>
                                <span><i class="fa-solid fa-star sb_star"></i>${item.rate}</span>
                            </div>
                        </p>
                        <p style="font-size: 13px;">${item.des}</p>
                        <div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 style="color: #FB7514 !important;">$${item.totalPrice}</h5>
                                    <p style="font-size: 14px; cursor: pointer;"  id="customiseBtn" data-index="${index}">Customize</p>
                                </div>
                                <div class="sb_qty_btn">
                                ${item.count === 1
                ? `<span><i class="fa-solid fa-trash-can" onclick="deleteItem(${index})" style="color: #000 !important;"></i></span>`
                : `<span><i class="fa-solid fa-minus" onclick="updateQuantity(${index}, -1)"></i></span>`
            }
                                    <span>${item.count}</span>
                                    <span><i class="fa-solid fa-plus" onclick="updateQuantity(${index}, 1)"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
               <div class="modal fade" id="customiseModal" tabindex="-1" aria-labelledby="customiseModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content sb_modal-content3">
                    <div class="modal-header">
                        <i class="fa-solid fa-xmark fs-3 ms-auto" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></i>
                    </div>
                    <h5 class="text-center">Customize As Per Your Taste</h5>
                    <div class="modal-body">
                        <div class="mx-1 mb-3 sb_model_body1">
                            <p style="border-bottom: 1px solid #161616; padding: 10px;" class="mb-0">Add Instructions</p>
                            <div style="padding: 10px;">
                                <small>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit veritatis, amet molestiae
                                    soluta voluptatibus.
                                </small>
                            </div>
                        </div>
                        <div class="mx-1 mb-3 sb_model_body1">
                            <p style="border-bottom: 1px solid #161616; padding: 10px;" class="mb-0">Size</p>
                            <div class="sb_option">
                                <span>Small</span>
                                <div class="sb_radio-container">
                                   <span class="mx-3" style="color: #999;"><small>+$4</small></span>
                                    <input type="radio" id="small" name="size" value="small">
                                    <label for="small"></label>
                                </div>
                            </div>
                            <div class="sb_option">
                                <span>Medium</span>
                                <div class="sb_radio-container">
                                    <span class="mx-3" style="color: #999;"><small>+$4</small></span>
                                    <input type="radio" id="medium" name="size" value="medium">
                                    <label for="medium"></label>
                                </div>
                            </div>
                            <div class="sb_option">
                                <span>Large</span>
                                <div class="sb_radio-container">
                                    <span class="mx-3" style="color: #999;"><small>+$10</small></span>
                                    <input type="radio" id="large" name="size" value="large">
                                    <label for="large"></label>
                                </div>
                            </div>
                        </div>
                        <div class="mx-1 mb-3 sb_model_body1">
                            <p style="border-bottom: 1px solid #161616; padding: 10px;" class="mb-0">Stuffings</p>
                            <div class="sb_option">
                                <span>Palak</span>
                                <div class="d-flex">
                                    <span class="mx-3" style="color: #999;"><small>+$3</small></span>
                                    <div class="form-check">
                                        <input class="form-check-input stuffing-checkbox" type="checkbox" value="3">
                                        <label class="form-check-label"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="sb_option">
                                <span>Paneer</span>
                                  <div class="d-flex">
                                    <span class="mx-3" style="color: #999;"><small>+$5</small></span>
                                  <div class="form-check">
                                    <input class="form-check-input stuffing-checkbox" type="checkbox" value="2">
                                    <label class="form-check-label"></label>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="mx-1 mb-3 sb_model_body1">
                            <p style="border-bottom: 1px solid #161616; padding: 10px;" class="mb-0">Dips</p>
                            <div class="sb_option">
                                <span>Green Chutney</span>
                                <div class="d-flex">
                                    <span class="mx-3" style="color: #999;"><small>+$3</small></span>
                                    <div class="form-check">
                                        <input class="form-check-input dip-checkbox" type="checkbox" value="3">
                                        <label class="form-check-label"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="sb_option">
                                <span>Ketchup</span>
                                <div class="d-flex">
                                    <span class="mx-3" style="color: #999;"><small>+$2</small></span>
                                    <div class="form-check">
                                        <input class="form-check-input dip-checkbox" type="checkbox" value="2">
                                        <label class="form-check-label"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #020202; color: white; border-top: 1px solid #545454;">
                        <div class="d-flex justify-content-between align-content-center p-4">
                            <div class="sb_qty_btn">
                                <span><i class="fa-solid fa-trash-can" onclick="deleteItem(0)"
                                        style="color: #000 !important;"></i></span>
                                <span id="quantity-display">1</span>
                                <span><i class="fa-solid fa-plus" onclick="updateQuantity(0, 1)"></i></span>
                            </div>
                            <div><button class="sb_btn" id="addItemBtn" onclick="addItemToCart()">Add Item</button></div>
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
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    renderCart();
    updateTotals();
}

function deleteItem(index) {
    cart.splice(index, 1);
    renderCart();
    updateTotals();
}

// Function to update totals
function updateTotals() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

// Add event delegation for dynamically generated customise buttons
document.getElementById('large-screen-cart').addEventListener('click', function (event) {
    
    if (event.target && event.target.id === 'customiseBtn') {
        const myModal = new bootstrap.Modal(document.getElementById('customiseModal'));
        myModal.show();
    }
});


