// Sample order data (replace with your actual data structure)
const orders = [
    { orderDate: '19/06/2024', invoiceNo: '565465453', totalAmount: '$360' },
    { orderDate: '20/06/2024', invoiceNo: '765445454', totalAmount: '$480' },
    { orderDate: '21/06/2024', invoiceNo: '865465453', totalAmount: '$150' },
    { orderDate: '22/06/2024', invoiceNo: '965465453', totalAmount: '$520' }
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
                                <div>${order.totalAmount}</div>
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
    // This is a simplified version. You should expand this with actual order details.
    return `
        <div class="text-center p-2">
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
                    <tr>
                        <td>Masala Dosa</td>
                        <td>$120</td>
                        <td>2</td>
                        <td>$360</td>
                    </tr>
                    <tr>
                       <td>Masala Dosa</td>
                       <td>$120</td>
                       <td>2</td>
                       <td>$360</td>
                </tr>
                </tbody>
                <tfoot>
                   <tr style="border-bottom: 1px dashed #545454;"></tr>
                    <tr>
                        <td colspan="3" class="text-end">Sub Total:</td>
                        <td>$480</td>
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
                        <td>${order.totalAmount}</td>
                    </tr>
                    <tr class="text-center mt-3">
                        <td colspan="4"><small style="color: #999999;">Thank You! Visit Again</small></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
}

// Function to download HTML as a file
// function downloadInvoice(invoiceHTML, fileName) {
//     const blob = new Blob([invoiceHTML], { type: 'text/html' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = fileName;
//     link.click();
//     URL.revokeObjectURL(link.href);
// }
// Function to download HTML as a file
function downloadInvoice(invoiceHTML, fileName) {
    const fullInvoiceHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice - Royal Cafe & Restaurant</title>
            <style>
                .invoice-container {
                    margin: 0 auto;
                    background-color: #2c2c2c;
                    border-radius: 8px;
                    padding: 20px 0;
                }
                h3 {
                    text-align: center;
                    color: #ffffff;
                    margin-bottom: 5px;
                }
                .text-center {
                    text-align: center;
                }
                small {
                    color: #999999;
                }
                .border-bottom {
                    border-bottom: 1px dashed #545454;
                    margin: 10px 0;
                }
                th {
                    padding: 10px 0;
                    text-align: left;
                    border-bottom: 1px dashed #545454;
                }
                .text-end {
                    text-align: right;
                }
                .mt-3 {
                    margin-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                ${invoiceHTML}
            </div>
        </body>
        </html>
    `;
    const blob = new Blob([fullInvoiceHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Event listener for download invoice button
document.getElementById('downloadInvoice').addEventListener('click', function () {
    const invoiceContent = document.getElementById('invoiceContent').innerHTML;
    downloadInvoice(invoiceContent, 'invoice.html');
});

// Event listener for download invoice button
document.getElementById('downloadInvoice').addEventListener('click', function () {
    const invoiceContent = document.getElementById('invoiceContent').innerHTML;
    downloadInvoice(invoiceContent, 'invoice.html');
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

// Event listener for download invoice button
document.getElementById('downloadInvoice').addEventListener('click', function () {
    const invoiceContent = document.getElementById('invoiceContent').innerHTML;
    const fullInvoiceHTML = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: white; background-color: #1e1e1e; }
                .invoice-container { width: 100%; max-width: 400px; margin: 0 auto; padding: 20px 0; }
                table { width: 100%; border-collapse: collapse; }
                th { border-bottom: 1px dashed #545454; padding: 10px; text-align: left; }
                td {  padding: 10px; text-align: left; }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                ${invoiceContent}
            </div>
        </body>
        </html>
    `;
    downloadInvoice(fullInvoiceHTML, 'invoice.html');
});