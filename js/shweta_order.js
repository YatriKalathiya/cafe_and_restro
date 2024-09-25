
// Sample order data (replace with your actual data structure)
const orders = [
    { orderDate: '19/06/2024', invoiceNo: '565465453', table:'05', items: [{title: 'Dosa', rate: 120, qty: 1},{title: 'Samosa', rate: 80, qty: 1}], totalAmount: 200 },
    { orderDate: '20/06/2024', invoiceNo: '765445454', table:'06', items: [{title: 'Samosa', rate: 80, qty: 2}], totalAmount: 160 },
    { orderDate: '21/06/2024', invoiceNo: '865465453', table:'08', items: [{title: 'Panipuri', rate: 20, qty: 5}], totalAmount: 100 },
    { orderDate: '22/06/2024', invoiceNo: '965465453', table:'04', items: [{title: 'Dabeli', rate: 50, qty: 3}], totalAmount: 150 }
];


// Function to generate dynamic order cards
function generateOrderCards(orders) {
    const orderContainer = document.querySelector('.sb_container .row');

    if (!orderContainer) {
        console.error('Order container not found');
        return;
    }

    orderContainer.innerHTML = '';  // Clear previous content

    orders.forEach((order, index) => {
        const cardHTML = `
            <div class="col-xl-3 col-lg-4 col-md-6 col-12">
                <div class="card sb_card2">
                    <div class="card-body">
                        <div class="sb_line py-3 view-invoice" data-bs-toggle="modal" data-bs-target="#invoiceModal" data-index="${index}">View Invoice</div>
                        <div>
                            <div class="d-flex align-content-center justify-content-between">
                                <div style="color: #737373;">Order Date</div>
                                <div>${order.orderDate}</div>
                            </div>
                            <div style="border-bottom: 1px dashed #545454; margin: 10px 0;"></div>
                            <div class="d-flex align-content-center justify-content-between">
                                <div style="color: #737373;">Invoice No.</div>
                                <div>${order.invoiceNo}</div>
                            </div>
                            <div style="border-bottom: 1px dashed #545454; margin: 10px 0;"></div>
                            <div class="d-flex align-content-center justify-content-between">
                                <div style="color: #737373;">Total Amount</div>
                                <div>$${order.totalAmount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        orderContainer.innerHTML += cardHTML;
    });

    // Add event listeners for "View Invoice" buttons
    document.querySelectorAll('.view-invoice').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            openInvoiceModal(orders[index]);
        });
    });
}

// Function to open invoice modal and populate it with data
function openInvoiceModal(order) {
    const modalBody = document.getElementById('invoiceContent');
    modalBody.innerHTML = generateInvoiceHTML(order);
}

// Function to generate HTML invoice
function generateInvoiceHTML(order) {
    let itemsHTML = '';

    // Loop through each item in the order and generate table rows
    order.items.forEach(item => {
        const itemTotal = item.rate * item.qty;
        itemsHTML += `
            <tr>
                <td>${item.title}</td>
                <td>$${item.rate}</td>
                <td>${item.qty}</td>
                <td>$${itemTotal}</td>
            </tr>
        `;
    });
    return `
        <div class="text-center py-2">
            <h3>Royal Cafe & Restaurant</h3>
            <p><small style="color: #999999;">1315 Dye Street, Minnesota - 55347</small></p>
        </div>
        <div style="border-bottom: 1px dashed #545454;" ></div>
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
                    <td>${order.orderDate}</td>
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
                        <td>$${order.totalAmount}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-end">Tax:</td>
                        <td>$20</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-end">Service Charges:</td>
                        <td>$25</td>
                    </tr>
                    <tr style="border-bottom: 1px dashed #545454;"></tr>
                    <tr>
                        <td colspan="3" class="text-end">Total:</td>
                        <td>$${order.totalAmount + 20 + 25}</td>
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

// Event listener for 'Order Now' button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('add_order_btn').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('add_order').style.display = 'block';
        document.getElementById('empty-order').style.display = 'none';
        generateOrderCards(orders);
    });
});
