
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentEditIndex = -1;

// Function to update cart display
function updateCartDisplay() {
    const container = document.getElementById('large-screen-cart');
    container.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalItems += item.count;
        totalPrice += item.totalPrice * item.count;

        const itemHtml = `
                <div class="col-xl-3 col-lg-4 col-md-6 col-12">
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
                                        <h5 style="color: #FB7514 !important;">$${item.totalPrice.toFixed(2)}</h5>
                                        <p style="font-size: 14px; cursor: pointer;" class="customiseBtn" data-index="${index}">Customize</p>
                                    </div>
                                    <div class="sb_qty_btn">
                                        ${item.count === 1
                ? `<span><i class="fa-solid fa-trash-can" onclick="deleteItem(${index})" style="color: #000 !important;"></i></span>`
                : `<span><i class="fa-solid fa-minus" onclick="updateQuantity(${index}, -1)"></i></span>`}
                                        <span>${item.count}</span>
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

    // Update total items and price
    document.getElementById('total-items').textContent = `Total ${totalItems} Items`;
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;

    // Update cart visibility
    document.getElementById('empty-cart').style.display = cart.length === 0 ? 'block' : 'none';
    document.getElementById('filled-cart').style.display = cart.length === 0 ? 'none' : 'block';
}

// Function to update quantity
function updateQuantity(index, change) {
    cart[index].count += change;
    if (cart[index].count === 0) {
        deleteItem(index);
    } else {
        updateCartDisplay();
        saveCart();
    }
}

// Function to delete item
function deleteItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    saveCart();
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to open customize modal
function openCustomizeModal(index) {
    currentEditIndex = index;
    const item = cart[index];
    const modal = document.getElementById('customiseModal');

    // Set the current values in the modal
    document.querySelector(`input[name="type"][value="${item.type}"]`).checked = true;
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = item.dips.includes(checkbox.value) || item.stuffings.includes(checkbox.value);
    });

    // Update modal quantity
    modal.querySelector('.sb_qty_btn span:nth-child(2)').textContent = item.count;

    // Set the index on the modal for reference
    modal.dataset.index = index;

    // Show modal
    const myModal = new bootstrap.Modal(modal);
    myModal.show();
}

// Function to update item in cart
function updateCartItem() {
    const modal = document.getElementById('customiseModal');
    const index = parseInt(modal.dataset.index);
    const item = cart[index];

    // Update type
    item.type = document.querySelector('input[name="type"]:checked').value;

    // Update dips and stuffings
    item.dips = [];
    item.stuffings = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        if (checkbox.id === 'palak' || checkbox.id === 'paneer') {
            item.stuffings.push(checkbox.value);
        } else {
            item.dips.push(checkbox.value);
        }
    });

    // Recalculate price
    item.totalPrice = calculatePrice(item);

    // Update quantity
    item.count = parseInt(modal.querySelector('.sb_qty_btn span:nth-child(2)').textContent);

    // Update display and save
    updateCartDisplay();
    saveCart();

    // Close modal
    const myModal = bootstrap.Modal.getInstance(modal);
    myModal.hide();
}

// Function to calculate price based on selections
function calculatePrice(item) {
    let price = item.basePrice;
    if (item.type === 'Butter') price += 4;
    if (item.type === 'Cheese') price += 10;
    item.stuffings.forEach(() => price += 3);
    item.dips.forEach(() => price += 3);
    return price;
}

  // Function to populate order summary modal dynamically
  function populateOrderSummaryModal() {
    const modalBody = document.querySelector('#orderSummaryModal .modal-body');
    const modalFooter = document.querySelector('#orderSummaryModal .modal-footer');

    // Check if modal elements exist before proceeding
    if (!modalBody || !modalFooter) {
        console.error('Modal body or footer not found');
        return;
    }

    let subtotalPrice = 0;
    let totalItems = 0;
    modalBody.innerHTML = '';  // Clear the modal body for new data

    // Loop through cart to display each item
    cart.forEach(item => {
        const itemTotal = item.totalPrice * item.count;
        subtotalPrice += itemTotal;
        totalItems += item.count;

        const itemHtml = `
        <div class="my-3 d-flex justify-content-between">
           <div class="d-flex">
            <div><img src="${item.img}" alt="${item.name}" style="width: 100px;"></div>
            <div class="ms-3">
                <p class="m-0">${item.title}</p>
                <p class="m-0" style="font-size: 12px">QTY : ${item.count}</p>
                <p class="m-0" style="color: #FB7514;">$${item.totalPrice.toFixed(2)}</p>
            </div>
           </div>
            <div>
                <p style="color: #FB7514;">$${itemTotal.toFixed(2)}</p>
            </div>
        </div>
    `;
        modalBody.innerHTML += itemHtml;  // Append each item to the modal body
    });

    // Calculate totals and tax
    const tax = subtotalPrice * 0.035; // Example 3.5% tax
    const mainTotal = subtotalPrice + tax;

    // Check if the footer has the text-end class for totals
    const textEndElement = modalFooter.querySelector('.text-end');
    if (textEndElement) {
        textEndElement.innerHTML = `
        <p>Sub Total : &nbsp; <span>$${subtotalPrice.toFixed(2)}</span></p>
        <p>Tax : &nbsp;&nbsp; &nbsp; <span>$${tax.toFixed(2)}</span></p>
        <p style="border-top: 1px dashed #545454;" class="pt-2">Total : &nbsp; <span>$${mainTotal.toFixed(2)}</span></p>
    `;
    } else {
        console.error('.text-end element not found in modal footer');
    }
}


// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    updateCartDisplay();

    // Customize button click
    document.getElementById('large-screen-cart').addEventListener('click', function (event) {
        if (event.target.classList.contains('customiseBtn')) {
            openCustomizeModal(parseInt(event.target.dataset.index));
        }
    });

    // Modal quantity buttons
    document.querySelector('#customiseModal .sb_qty_btn').addEventListener('click', function (event) {
        const qtySpan = this.querySelector('span:nth-child(2)');
        let qty = parseInt(qtySpan.textContent);

        if (event.target.classList.contains('fa-plus')) {
            qtySpan.textContent = ++qty;
        } else if (event.target.classList.contains('fa-minus') && qty > 1) {
            qtySpan.textContent = --qty;
        } else if (event.target.classList.contains('fa-trash-can')) {
            deleteItem(currentEditIndex);
            bootstrap.Modal.getInstance(document.getElementById('customiseModal')).hide();
        }
    });

    // Add Item button click
    document.querySelector('#customiseModal .sb_btn').addEventListener('click', updateCartItem);

    // Open Order Summary Modal when "Place Order" is clicked
    document.getElementById('placeOrderBtn').addEventListener('click', function () {

        populateOrderSummaryModal();
        const orderSummaryModal = new bootstrap.Modal(document.getElementById('orderSummaryModal'));
        orderSummaryModal.show();
    });

    // Open Review Modal when "Add Review" is clicked
    document.getElementById('addReviewBtn').addEventListener('click', function () {
        const orderSummaryModal = bootstrap.Modal.getInstance(document.getElementById('orderSummaryModal'));
        const reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
        orderSummaryModal.hide();
        reviewModal.show();
    });

    // Open Thank You Modal when "Submit" is clicked
    document.getElementById('submitReviewBtn').addEventListener('click', function () {
        const reviewModal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
    
        // Get feedback data
        const feedback = {
            overall: document.querySelector('.sb_emoji[data-category="overall"] i[style*="color"]')?.className || '',
            food: document.querySelector('.sb_emoji[data-category="food"] i[style*="color"]')?.className || '',
            service: document.querySelector('.sb_emoji[data-category="service"] i[style*="color"]')?.className || '',
            ambiance: document.querySelector('.sb_emoji[data-category="ambiance"] i[style*="color"]')?.className || '',
            value: document.querySelector('.sb_emoji[data-category="value"] i[style*="color"]')?.className || '',
            text: document.getElementById('feedbackText').value || ''
        };
    
        console.log('Feedback captured:', feedback); // Debug log to see captured feedback
    
        // Store feedback in sessionStorage
        sessionStorage.clear();
        sessionStorage.setItem('feedback', JSON.stringify(feedback));
    
        // Hide Review modal
        reviewModal.hide();
    
        // Show Thank You modal
        const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
        thankYouModal.show();
    });
    
    
});

// Initial render
updateCartDisplay();


function add_smile(element) {
    element.style.color = "#5bbd79";
 }
function add_smile1(element) {
    element.style.color = "#d3b24c";
 }
function add_smile2(element) {
    element.style.color = "#79a053";
 }
function add_smile3(element) {
    element.style.color = "#fb7b1b";
 }
function add_smile4(element) {
    element.style.color = "#f34843";
 }