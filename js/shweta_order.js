document.addEventListener('DOMContentLoaded', function () {
    const orderDetails = JSON.parse(localStorage.getItem('orders')) || [];
    // console.log("orderDetails>>>>>>>>>",orderDetails);
    
    const emptyOrderSection = document.getElementById('empty-order');
    const addOrderSection = document.getElementById('add_order');

    function toggleOrderSection() {
        if (orderDetails.length > 0) {
            emptyOrderSection.style.display = 'none';
            addOrderSection.style.display = 'block';

            generateOrderCards(orderDetails);  
        } else {
            emptyOrderSection.style.display = 'block';
            addOrderSection.style.display = 'none';
        }
    }

    function generateOrderCards(orders) {
        const orderContainer = document.querySelector('.sb_container .row');

        if (!orderContainer) {
            console.error('Order container not found');
            return;
        }

        orderContainer.innerHTML = ''; // Clear previous content

        orders.forEach(order => {
            const invoiceNo = order.invoiceNo || generateInvoiceNumber();  
            order.invoiceNo = invoiceNo;
            // console.log('Order with Invoice:', order);

            // Create HTML for each order card
            const cardHTML = `
                <div class="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div class="card sb_card2">
                        <div class="card-body">
                            <div class="sb_line py-3 view-invoice" data-bs-toggle="modal" data-bs-target="#invoiceModal" data-invoice="${invoiceNo}">View Invoice</div>
                            <div>
                                <div class="d-flex align-content-center justify-content-between">
                                    <div style="color: #737373;">Order Date</div>
                                    <div>${order.date}</div>
                                </div>
                                 <div style="border-bottom: 1px dashed #545454; margin: 10px 0;"></div>
                                <div class="d-flex align-content-center justify-content-between">
                                    <div style="color: #737373;">Invoice no.</div>
                                    <div>${invoiceNo}</div>
                                </div>
                                <div style="border-bottom: 1px dashed #545454; margin: 10px 0;"></div>
                                <div class="d-flex align-content-center justify-content-between">
                                    <div style="color: #737373;">Total Amount</div>
                                    <div>$${order.total}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            orderContainer.innerHTML += cardHTML;  // Add the card to the container
        });
        localStorage.setItem('orders', JSON.stringify(orders));
        // console.log('Updated orders:', orders);

    }

    // Initialize the sections based on the order details
    toggleOrderSection();

    // Event listener to handle invoice modal opening
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-invoice')) {
            const invoiceNo = event.target.getAttribute('data-invoice');
            openInvoiceModal(invoiceNo);
        }
    });
});

// Function to open invoice modal and populate it with data
function openInvoiceModal(invoiceNo) {
    const orderDetails = JSON.parse(localStorage.getItem('orders')) || [];

    const numericInvoiceNo = Number(invoiceNo);

    const order = orderDetails.find(order => Number(order.invoiceNo) === numericInvoiceNo);
    // console.log("Order found:", order);

    if (order) {
        const modalBody = document.getElementById('invoiceContent');
        modalBody.innerHTML = generateInvoiceHTML(order);
    }
}

// Function to generate HTML invoice
function generateInvoiceHTML(order) {
    let itemsHTML = '';
    let subTotal = 0;
    // const serviceCharge = 25;

    // Loop through each item in the order and generate table rows
    order.items.forEach(item => {
        // console.log("item",item);
        
        const itemTotal = item.price * item.quantity;
        subTotal += itemTotal ;
        itemsHTML += `
            <tr>
                <td>${item.title}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal}</td>
            </tr>
        `;
    });


    return `
        <div class="text-center py-2">
            <h3>Royal Cafe & Restaurant</h3>
            <p><small style="color: #999999;">1315 Dye Street, Minnesota - 55347</small></p>
        </div>
        <div style="border-bottom: 1px dashed #545454;"></div>
        <div class="sb_invoice-items">
            <table class="table table-borderless" style="color: white;">
                <thead style="border-bottom: 1px dashed #545454;">
                    <tr>
                        <td>Date:</td>
                        <td>Table:</td>
                        <td>Invoice No:</td>
                        <td>Time:</td>
                    </tr>
                    <tr>
                        <td>${order.date}</td>
                        <td>06</td>
                        <td>${order.invoiceNo}</td>
                        <td>11:38:20 &nbsp;AM</td>
                    </tr>
                    <tr style="border-bottom: 1px dashed #545454;"></tr>
                    <tr>
                        <th>Item</th>
                        <th>Rate</th>
                        <th>Qty.</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
                <tfoot>
                    <tr style="border-bottom: 1px dashed #545454;"></tr>
                    <tr>
                        <td colspan="3" class="text-end">Sub Total:</td>
                        <td>$${subTotal}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-end">Tax:</td>
                        <td>$${order.tax}</td>
                    </tr>
                    <tr style="border-bottom: 1px dashed #545454;"></tr>
                    <tr>
                        <td colspan="3" class="text-end">Total:</td>
                        <td>$${order.total}</td>
                    </tr>
                    <tr class="text-center mt-3">
                        <td colspan="4"><small style="color: #999999;">Thank You! Visit Again</small></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
}
// Function to download the invoice as a PDF
function downloadInvoicePDF() {
    const invoiceContent = document.getElementById('invoiceContent').innerHTML;
    
    if (!invoiceContent) {
        console.error('Invoice content element not found');
        return;
    }

    const invoiceWrapper = document.createElement('div');
    invoiceWrapper.innerHTML = invoiceContent;

    const elementsToStyle = invoiceWrapper.querySelectorAll('*');
    elementsToStyle.forEach((el) => {
        el.style.color = 'black';  
        el.style.backgroundColor = 'white'; 
    });

    html2pdf().from(invoiceWrapper).set({
        margin: 1,
        filename: 'invoice.pdf',
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        html2canvas: {
            scale: 2,  
            logging: true,  
            useCORS: true  
        },
    }).save();
}

// Event listener for "Download Invoice" button inside modal
document.getElementById('downloadInvoice').addEventListener('click', function () {
    downloadInvoicePDF();
});

function generateInvoiceNumber() {
    let invoiceNumber = Number(localStorage.getItem('lastInvoiceNumber')) || 1000;
    let newInvoiceNumber = invoiceNumber + 1;
    localStorage.setItem('lastInvoiceNumber', newInvoiceNumber.toString());
    return newInvoiceNumber;
}
