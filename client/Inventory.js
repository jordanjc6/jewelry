let addToCalc = document.getElementById('addToCalc');
let toCalcContainer = document.getElementById('toCalcContainer');
let deleteContainer = document.getElementById('deleteContainer')
let inputField1 = document.getElementById('inputField-1');
let inputField2 = document.getElementById('inputField-2');
let inputField3 = document.getElementById('inputField-3');
let quantity = document.getElementById('inputFieldSecond');
let totalCostCalc = document.getElementById('totalCostCalc');
let output = document.getElementById('cost');
let theCost = document.getElementById('theCost');
let productCost = [];
let totalCost = document.getElementById('output');
let jewelryDisplay = document.getElementById('search_results');
let reduction = 0;
let price = 0;
let table;
let defaultText = document.getElementById('defaultText');
let w = window.innerWidth;

//Calculates cost for x quantity of product y
function calculate(event) {
    price = event.target.value;
    theCost.innerHTML = (price * quantity.value).toFixed(2);
    theCost.value = (price * quantity.value).toFixed(2);
}

//Calculates cost for x quantity of product y
function recalculate() {
    theCost.innerHTML = (price * quantity.value).toFixed(2);
    theCost.value = (price * quantity.value).toFixed(2);
}

//Appends the calculated cost to the list of materials that will be included in final cost calculation
function addProduct() {
    if(!theCost.value) { return; }
    
    productCost.push(theCost.valueAsNumber);
    var product = document.createElement('p');
    var deleteProduct = document.createElement('button');
    deleteProduct.value = theCost.value;
    deleteProduct.classList.add('deleteButton');
    product.classList.add('value')
    product.innerText = theCost.value;
    toCalcContainer.appendChild(product);
    deleteContainer.appendChild(deleteProduct);

    console.log(productCost);
    
    inputField1.value = '';
    inputField2.value = '';
    inputField3.value = '';
    quantity.value = 1;
    theCost.value = '';

    deleteProduct.addEventListener('click', (event) => {
        toCalcContainer.removeChild(product)
        deleteContainer.removeChild(deleteProduct)
        reduction += Number(event.target.value);

        console.log(reduction);  
    });
}

//Calculates total cost
totalCostCalc.addEventListener('click', () => {
    
    const yourFinalPrice = (accumulator, currentValue) => accumulator + currentValue;
    let unrounded = productCost.reduce(yourFinalPrice) - reduction;
    totalCost.value = unrounded.toFixed(2);
})

//Will send query to server and receive jewelry array
function search() {

    //Set default values if input fields are left blank
    let material = inputField1.value.trim() ? inputField1.value : 'material';
    let fineness = inputField2.value.trim() ? inputField2.value : 'fineness';
    let size = inputField3.value.trim() ? inputField3.value : 'size';
    
    console.log('material: ' + material);
    console.log('fineness: ' + fineness);
    console.log('size: ' + size);

    theCost.value = '';
    jewelryDisplay.innerHTML = '';

    //Make request to backend
    let url = '';

    if(!inputField1.value.trim() && !inputField2.value.trim() && !inputField3.value.trim()) {
        url = 'https://mcjewelry.herokuapp.com/jewelry' || 'http://localhost:3000/jewelry';
    } else {
        url = `https://mcjewelry.herokuapp.com/jewelry/${material}/${fineness}/${size}` ||  `http://localhost:3000/jewelry/${material}/${fineness}/${size}`;
    }

    fetch(url)
    .then(response => response.json())
    .then(displayResults)
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    });
}

//Will display queried jewelry 
function displayResults(data) {

    let jewelry = data;

    createTable();

    jewelry.forEach((item, index) => {
        let item_row = table.insertRow(index + 1);
        let item_name = item_row.insertCell(0);
        let item_price = item_row.insertCell(1);
        let item_currency = item_row.insertCell(2);
        let item_select = item_row.insertCell(3);

        item_name.innerHTML = `${item.product}`;
        item_price.innerHTML = `${(item.unitprice).toFixed(2)}`;
        item_currency.innerHTML = `${item.currency}`;

        let button = document.createElement('button');
        button.innerHTML = 'Select';
        button.value = item.unitprice;
        button.addEventListener('click', calculate);
        button.classList.add('select_button');

        item_select.appendChild(button);

        item_name.classList.add('item_name');
        item_select.classList.add('item_select');
        item_price.classList.add('item_price');

        if (w < 376) {
            item_currency.innerHTML = '';
            item_price.innerHTML = '$' + item.unitprice.toFixed(2) + ' ' + item.currency;

        }
    });
}

//Create table that will contain the queried jewelry
function createTable() {
    table = document.createElement('table');
    let headings = table.insertRow(0);
    let product_heading = headings.insertCell(0);
    let unitprice_heading = headings.insertCell(1);
    let currency_heading = headings.insertCell(2);
    let select_heading = headings.insertCell(3);

    product_heading.classList.add('headings')
    unitprice_heading.classList.add('headings')
    currency_heading.classList.add('headings')
    select_heading.classList.add('headings')

    product_heading.innerHTML = '<b>Product</b>';
    unitprice_heading.innerHTML = '<b>Unit Price</b>';
    currency_heading.innerHTML = '<b>Currency</b>';
    select_heading.innerHTML = '<b>Select</b>';

    jewelryDisplay.appendChild(table);

    if (w < 376) {
        product_heading.innerHTML = '';
        unitprice_heading.innerHTML = '';
        currency_heading.innerHTML = '';
        select_heading.innerHTML = '';
    } 
    console.log('window width = ' + w)
}