class Product {
  constructor(nameProduct, description, stock, price, code, category) {
    this.nameProduct = nameProduct;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.code = code;
    this.category = category;
  }
}



let productsJson = localStorage.getItem("products");
let products = productsJson ? JSON.parse(productsJson) : [];

function loadDefaultProducts() {
  let product1 = new Product("SmartWatch Xiaomi", "reloj inteligente", 5, 150.000, "FF34", "SmartWatchs");
  let product2 = new Product("SAMSUNG A52", "celular azul", 4, 250.000, "FF35", "Celulares");
  let product3 = new Product("Motorola Edge", "celular rojo", 3, 300.000, "FF36", "Celulares");
  let product4 = new Product("Samsung TV", "tv smart", 7, 350.000, "FF37", "TV");
  let product5 = new Product("SmartWatch RedNet", "reloj inteligente", 5, 150.000, "FF38", "SmartWatchs");

  let productsJson = localStorage.getItem("products");
  if (!productsJson || products.length === 0) {
    products = loadDefaultProducts();
    localStorage.setItem("products", JSON.stringify(products));
  }

  return [product1, product2, product3, product4, product5];
}


loadTable();


let newProductbtn = document.getElementById('newProduct_btn');
let closeModaltbtn = document.getElementById('close_modal');
let closeModalStock = document.getElementById('close_modal_stock');



newProductbtn.addEventListener("click", AddNewProduct)
closeModaltbtn.addEventListener("click", clearMessage)
closeModalStock.addEventListener("click", clearMessage)



function AddNewProduct() {

  const nameProduct = document.getElementById('nameProduct').value;
  const description = document.getElementById('description').value;
  const stock = document.getElementById('stock').value;
  const price = document.getElementById('price').value;
  const code = document.getElementById('code').value;
  const selectElement = document.getElementById("category");

  const category = selectElement.value;

  let validate = validateForm(nameProduct, description, stock, price, code, category)


  if (validate) {

    const newProduct = new Product(nameProduct, description, stock, price, code, category);

    let products = JSON.parse(localStorage.getItem('products')) || [];

    products.push(newProduct);

    const updatedProductsJson = JSON.stringify(products);
    localStorage.setItem("products", updatedProductsJson);

    clearInputField();

    loadTable();

  }

}



function validateForm(nameProduct, description, stock, price, code, category) {
  let messageError = document.getElementById('errorMessage');

  if (nameProduct === '') {
    messageError.innerText = "El nombre del producto es obligatorio";
    return false;
  }

  if (description === '') {
    messageError.innerText = "La descripcion es obligatoria";
    return false;

  }
  if (stock === '') {
    messageError.innerText = "Stock es obligatorio";
    return false;
  } else if (isNaN(stock) || Number(stock) <= 0) {
    messageError.innerText = "Stock debe ser un número positivo";
    return false;
  }

  if (price === '') {
    messageError.innerText = "Precio es obligatorio";
    return false;
  } else if (isNaN(price) || Number(price) <= 0) {
    messageError.innerText = "Precio debe ser un número positivo";
    return false;
  }
  if (code === '') {
    messageError.innerText = "Codigo es obligatorio";
    return false;

  }
  if (category === '') {
    messageError.innerText = "Categoria es obligatorio";
    return false;
  }

  messageError.style.color = '#5cb85c';
  messageError.innerText = "Producto guardado exitosamente";

  return true;
}





function clearInputField() {
  document.getElementById('formProducts').reset();
  document.getElementById('formUpdateStock').reset();

}

function clearMessage() {
  let messageError = document.getElementById('errorMessage');
  messageError.innerText = "";

  let validateMessage = document.getElementById('validateCodeMessage');
  validateMessage.innerText = ' ';
}



document.getElementById('sortPriceDesc').addEventListener('click', function() {
  loadTable(false); 
});

document.getElementById('sortPriceAsc').addEventListener('click', function() {
  loadTable(true); 
});

document.getElementById('sortPriceDesc').addEventListener('click', function() {
  loadTable(false); 
});

document.getElementById('sortPriceAsc').addEventListener('click', function() {
  loadTable(true); 
});


function loadTable(ascending) {

  let tableProducts = document.querySelector(".table");

  tableProducts.querySelectorAll("tbody").forEach(tbody => tbody.remove());

  let productsJson = localStorage.getItem("products");

  if (productsJson) {
    let products = JSON.parse(productsJson);

    products.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);

    products.forEach((product, index) => {
      let tableBody = document.createElement("tbody");


      let formattedPrice = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'ARS'
      }).format(product.price);

      tableBody.innerHTML = `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${product.nameProduct}</td>
        <td>${product.description}</td>
        <td>${product.stock}</td>
        <td>${formattedPrice}</td>
        <td>${product.code}</td>
        <td>${product.category}</td>
        <td><button class="btn-delete btn btn-primary">Eliminar</button></td>
        <td><button type="button" class="btn-update btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalStock">Actualizar</button></td>
      </tr>
    `;

      tableBody.querySelector(".btn-delete").addEventListener("click", function () {
        deleteProduct(product.code);
      });

      tableBody.querySelector(".btn-update").addEventListener("click", function () {
        loadProductToForm(product.code);
      });

      tableProducts.append(tableBody);
    });

  }

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', filterTable);

}



function filterTable() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const table = document.querySelector('.table');
  const rows = table.querySelectorAll('tbody');

  rows.forEach(row => {
    const cells = row.getElementsByTagName('td');
    let found = false;

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent.toLowerCase().indexOf(filter) > -1) {
        found = true;
        break;
      }
    }

    if (found) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterTableByPrice(){

}

let currentProductCode = null;

function loadProductToForm(productCode) {
  currentProductCode = productCode;
  let productsJson = localStorage.getItem("products");
  if (productsJson) {
    let products = JSON.parse(productsJson);
    let product = products.find(p => p.code === productCode);
    console.log("Este es el codigo de producto", productCode)
    console.log("Este es EL producto", product)


    if (product) {
      document.getElementById('newStock').value = product.stock;
      document.getElementById('newName').value = product.nameProduct;
      document.getElementById('newDescription').value = product.description;
      document.getElementById('newPrice').value = product.price;
      document.getElementById('newCategory').value = product.category;
    }
  }
}



document.getElementById('updateStock_btn').addEventListener('click', function () {
  updateProduct(currentProductCode);
});

function updateProduct(productCode) {
  let newStock = document.getElementById('newStock').value;
  let newName = document.getElementById('newName').value;
  let newDescription = document.getElementById('newDescription').value;
  let newPrice = document.getElementById('newPrice').value;
  let newCategory = document.getElementById('newCategory').value;

  let validateMessage = document.getElementById('validateCodeMessage');
  let productsJson = localStorage.getItem("products");

  if (productsJson) {
    let products = JSON.parse(productsJson);

    const productUpdated = products.find((product) => product.code === productCode);


    if (productUpdated) {
      productUpdated.nameProduct = newName;
      productUpdated.description = newDescription;
      productUpdated.price = newPrice;
      productUpdated.category = newCategory;
      productUpdated.stock = newStock;

      localStorage.setItem("products", JSON.stringify(products));
      loadTable();

      validateMessage.style.color = '#5cb85c';
      validateMessage.innerText = 'Producto actualizado correctamente.';

    } else {
      validateMessage.innerText = 'Producto no encontrado.';
    }
  } else {
    validateMessage.innerText = 'No hay productos en el stock.';
  }
}

function deleteProduct(code) {

  let productsUser = JSON.parse(localStorage.getItem('products')) || [];


  let productIndex = productsUser.findIndex(product => product.code === code);

  if (productIndex !== -1) {
    productsUser.splice(productIndex, 1);

    localStorage.setItem('products', JSON.stringify(productsUser));

    loadTable();
  }
}