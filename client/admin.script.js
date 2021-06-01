//Verify password
let user_input = prompt('Enter admin password: ');
let url = 'https://mcjewelry.herokuapp.com/jewelry/admin' || 'http://localhost:3000/jewelry/admin';
let data = { input: user_input };

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(handleResponse)
.catch(function(error) {
    console.log('Looks like there was a problem: \n', error);
});

function handleResponse(data) {
    if(!data) { window.location.href = './index.html'; }
}

//Display jewelry in database
let w = window.innerWidth;
let table;

fetch('https://mcjewelry.herokuapp.com/jewelry' || 'http://localhost:3000/jewelry')
.then(response => response.json())
.then(displayResults)
.catch(function(error) {
    console.log('Looks like there was a problem: \n', error);
});

function displayResults(data) {

    let jewelry = data;

    createTable();

    jewelry.forEach((item, index) => {
        let item_row = table.insertRow(index + 1);
        item_row.id = item.identity;
        let item_provider = item_row.insertCell(0);
        let item_invoice = item_row.insertCell(1);
        let item_name = item_row.insertCell(2);
        let item_sku = item_row.insertCell(3);
        let item_price = item_row.insertCell(4);
        let item_currency = item_row.insertCell(5);
        let item_update = item_row.insertCell(6);
        let item_delete = item_row.insertCell(7);

        item_provider.innerHTML = `<input type='text' value='${item.provider}'></input>`;
        item_invoice.innerHTML = `<input type='text' value='${item.invoice}'></input>`;
        item_name.innerHTML = `<input type='text' value='${item.product}'></input>`;
        item_sku.innerHTML = `<input type='text' value='${item.sku}'></input>`;
        item_price.innerHTML = `<input type='number' step='.01' value=${item.unitprice.toFixed(2)}></input>`;
        item_currency.innerHTML = `<input type='text' value='${item.currency}'></input>`;

        let update_btn = document.createElement('button');
        update_btn.innerHTML = 'Update';
        update_btn.value = item.identity;
        update_btn.addEventListener('click', updateItem);
        update_btn.classList.add('form_btn');
        item_update.appendChild(update_btn);

        let delete_btn = document.createElement('button');
        delete_btn.innerHTML = 'Delete';
        delete_btn.value = item.identity;
        delete_btn.addEventListener('click', deleteItem);
        delete_btn.classList.add('form_btn');
        item_delete.appendChild(delete_btn);

        //add selector classes for styling responsiveness...(incomplete)
        item_name.classList.add('item_name');
        item_price.classList.add('item_price');

        if (w < 376) {
            item_currency.innerHTML = '';
            item_price.innerHTML = '$' + item.unitprice.toFixed(2) + ' ' + item.currency;

        }
    });
}

function createTable() {
    table = document.createElement('table');
    table.id = 'jewelry_table';
    let headings = table.insertRow(0);
    let provider_heading = headings.insertCell(0)
    let invoice_heading = headings.insertCell(1);
    let product_heading = headings.insertCell(2);
    let sku_heading = headings.insertCell(3);
    let unitprice_heading = headings.insertCell(4);
    let currency_heading = headings.insertCell(5);
    let update_heading = headings.insertCell(6);
    let delete_heading = headings.insertCell(7);

    provider_heading.classList.add('headings');
    invoice_heading.classList.add('headings');
    product_heading.classList.add('headings');
    sku_heading.classList.add('headings');
    unitprice_heading.classList.add('headings');
    currency_heading.classList.add('headings');
    update_heading.classList.add('headings');
    delete_heading.classList.add('headings');

    provider_heading.innerHTML = '<b>Provider</b>';
    invoice_heading.innerHTML = '<b>Invoice</b>';
    product_heading.innerHTML = '<b>Product</b>';
    sku_heading.innerHTML = '<b>Sku</b>';
    unitprice_heading.innerHTML = '<b>Unit Price</b>';
    currency_heading.innerHTML = '<b>Currency</b>';
    update_heading.innerHTML = '<b>Update</b>';
    delete_heading.innerHTML = '<b>Delete</b>';

    document.getElementById('search_results').appendChild(table);

    if (w < 376) {
        provider_heading.innerHTML = '';
        invoice_heading.innerHTML = '';
        product_heading.innerHTML = '';
        sku_heading.innerHTML = '';
        unitprice_heading.innerHTML = '';
        currency_heading.innerHTML = '';
        update_heading.innerHTML = '';
        delete_heading.innerHTML = '';
    } 
    console.log('window width = ' + w)
}

//Creates item
function createItem() {
    let jewel = {
        provider: document.getElementById('input_provider').value,
        invoice: document.getElementById('input_invoice').value,
        product: document.getElementById('input_product').value,
        sku: document.getElementById('input_sku').value,
        unitprice: document.getElementById('input_unitprice').value,
        currency: document.getElementById('input_currency').value
    }

    fetch('https://mcjewelry.herokuapp.com/jewelry/'  || `http://localhost:3000/jewelry/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jewel)
    })
    .then((response) => {
        if(response) {
            location.reload();
        }
    })
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    });
}

//Updates item
function updateItem(event) {
    let item_id = event.target.value;
    console.log(`I will update the item with id ${item_id}`);

    let jewel_row = document.getElementById('jewelry_table').rows.namedItem(item_id);

    let provider = jewel_row.cells[0].getElementsByTagName('input')[0].value;
    let invoice = jewel_row.cells[1].getElementsByTagName('input')[0].value;
    let product = jewel_row.cells[2].getElementsByTagName('input')[0].value;
    let sku = jewel_row.cells[3].getElementsByTagName('input')[0].value;
    let unitprice = jewel_row.cells[4].getElementsByTagName('input')[0].value;
    let currency = jewel_row.cells[5].getElementsByTagName('input')[0].value;

    let jewel = {
        provider: provider,
        invoice: invoice,
        product: product,
        sku: sku,
        unitprice: unitprice,
        currency: currency
    }

    fetch(`https://mcjewelry.herokuapp.com/jewelry/update/${item_id}` || `http://localhost:3000/jewelry/update/${item_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jewel)
    })
    .then((response) => {
        if(response) {
            location.reload();
        }
    })
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    });
}

//Deletes item
function deleteItem(event) {
    let item_id = event.target.value;

    fetch(`https://mcjewelry.herokuapp.com/jewelry/delete/${item_id}` || `http://localhost:3000/jewelry/delete/${item_id}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if(response) {
            location.reload();
        }
    })
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    });
}