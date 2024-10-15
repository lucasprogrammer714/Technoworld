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
  let product1 = new Product("SAMSUNG Galaxy A52", "Smartphone 6.5\" Super AMOLED, Cámara 64 MP, 6 GB RAM", 8, 250000, "SP35", "Celulares");
  let product2 = new Product("Motorola Razr 50 Ultra", "Smartphone plegable, Pantalla OLED 6.7\" desplegada", 5, 250000, "SP36", "Celulares");
  let product3 = new Product("Motorola E 14", "Smartphone 6.5\" IPS LCD, Cámara 13 MP, 3 GB RAM", 9, 350000, "SP37", "Celulares");
  let product4 = new Product("Samsung Galaxy S24+", "Smartphone 6.7\" Dynamic AMOLED, Cámara 108 MP, 12 GB RAM", 8, 850000, "SP38", "Celulares");
  let product5 = new Product("Samsung Galaxy Z Flip5", "Smartphone plegable, Pantalla AMOLED 6.7\"", 4, 850000, "SP39", "Celulares");
  let product6 = new Product("Xiaomi Note 11", "Smartphone 6.43\" AMOLED, Cámara 50 MP, 4 GB RAM", 6, 125666, "SP40", "Celulares");
  let product7 = new Product("Xbox Series S", "Consola de videojuegos, AMD Zen 2, 512 GB SSD", 4, 120000, "GM45", "Gaming");
  let product8 = new Product("Playstation 5", "Consola de videojuegos, AMD Ryzen Zen 2, 825 GB SSD", 4, 250000, "GM46", "Gaming");
  let product9 = new Product("Xbox Series S (Black)", "Consola de videojuegos, AMD Zen 2, 512 GB SSD", 4, 210000, "GM47", "Gaming");
  let product10 = new Product("Xbox Series X", "Consola de videojuegos, AMD Zen 2, 1 TB SSD", 4, 250000, "GM48", "Gaming");
  let product11 = new Product("TV LED 32\" Philips", "Televisor LED, 32\" HD, HDMI, USB", 6, 2300000, "TV01", "TV");
  let product12 = new Product("Smart TV Samsung 50\" UHD 4K", "Smart TV, 50\" 4K UHD, HDMI, USB, Wi-Fi", 7, 2560000, "TV02", "TV");
  let product13 = new Product("Smart TV LG UHD 4K", "Smart TV, 55\" 4K UHD, HDMI, USB, Wi-Fi", 9, 1580000, "TV03", "TV");
  let product14 = new Product("Notebook N14X1010 Noblex", "Laptop 14\", Intel Celeron, 4 GB RAM, 128 GB SSD", 12, 1257000, "PN15", "PC/Notebooks");
  let product15 = new Product("Notebook HP 15.6\" AMD Ryzen", "Laptop 15.6\", AMD Ryzen 5, 8 GB RAM, 512 GB SSD", 6, 1259000, "PN32", "PC/Notebooks");
  let product16 = new Product("Smartwatch DT4", "Smartwatch, Pantalla 1.78\" AMOLED, Bluetooth", 15, 899000, "SW15", "SmartWatchs");
  let product17 = new Product("Smartwatch Xiaomi Redmi Watch", "Smartwatch, Pantalla 1.4\" TFT, Bluetooth", 17, 786000, "SW32", "SmartWatchs");
  

  if (!productsJson || products.length === 0) {
    products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14, product15, product16, product17];
    localStorage.setItem("products", JSON.stringify(products)); 
  }

  return products;
}

products = loadDefaultProducts();


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

    Swal.fire({
      title: "Excelente!",
      text: "Se ha guardado el producto correctamente!",
      icon: "success",
      iconColor: "#2596be",
      confirmButtonColor: "#2596be"

    });

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
  validateMessage.innerText = " ";
}



document.getElementById('sortPriceDesc').addEventListener('click', function() {
  loadTable('price', false); 
});

document.getElementById('sortPriceAsc').addEventListener('click', function() {
  loadTable('price', true); 
});

document.getElementById('sortStockDesc').addEventListener('click', function() {
  loadTable('stock', false);
});

document.getElementById('sortStockAsc').addEventListener('click', function() {
  loadTable('stock', true); 
});


function loadTable(sortBy, ascending) {


  let tableProducts = document.querySelector(".table");

  tableProducts.querySelectorAll("tbody").forEach(tbody => tbody.remove());

  let productsJson = localStorage.getItem("products");

  if (productsJson) {
    let products = JSON.parse(productsJson);

    products.sort((a, b) => {
      if (sortBy === 'price') {
        return ascending ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'stock') {
        return ascending ? a.stock - b.stock : b.stock - a.stock;
      }
    });


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
      <td><button class="btn-delete btn btn-primary"><i class="fas fa-trash"></i></button></td>
        <td><button type="button" class="btn-update btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalStock"><i class="fas fa-pencil"></i></button></td>
      </tr>
    `;

      tableBody.querySelector(".btn-delete").addEventListener("click", function () {
        Swal.fire({
          title: "¿Esta seguro?",
          text: "¿Desea eliminar este producto?",
          icon: "warning",
          iconColor: "#2596be",
          showCancelButton: true,
          confirmButtonColor: "#2596be",
          cancelButtonColor: "#2596be",
          confirmButtonText: "Si",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            deleteProduct(product.code);
            Swal.fire({
              title: "Eliminado!",
              text: "El producto fue eliminado.",
              icon: "success",
              iconColor: "#2596be",
              confirmButtonColor: "#2596be"
            });
          }
        });
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


    if (product) {
      document.getElementById('newStock').value = product.stock;
      document.getElementById('newName').value = product.nameProduct;
      document.getElementById('newDescription').value = product.description;
      document.getElementById('newPrice').value = product.price;
      document.getElementById('newCategory').value = product.category;
      document.getElementById('newcode').value = product.code;

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
  let newCode = document.getElementById('newcode').value;

  let validateMessage = document.getElementById('validateCodeMessage');
  let productsJson = localStorage.getItem("products");

  if (productsJson) {
    let products = JSON.parse(productsJson);

    const productUpdated = products.find((product) => product.code === productCode);


    if (productUpdated) {

      let validate = validateForm(newName, newDescription, newStock, newPrice, newCode, newCategory)

      if(validate){

        productUpdated.nameProduct = newName;
        productUpdated.description = newDescription;
        productUpdated.price = newPrice;
        productUpdated.category = newCategory;
        productUpdated.stock = newStock;
        productUpdated.code = newCode;
  
        localStorage.setItem("products", JSON.stringify(products));
        loadTable();
  
        Swal.fire({
          title: "Excelente!",
          text: "Se ha actualizado el producto correctamente!",
          icon: "success",
          iconColor: "#2596be",
          confirmButtonColor: "#2596be"

        });
  
      }
  
    } else {
      validateMessage.innerText = 'Producto no encontrado.';
    }
  } else {
    validateMessage.innerText = 'No hay productos en el stock.';
  }
}


setInterval(function(){
  lowStockAlert();

}, 10000);

function lowStockAlert() {
  const minStock = 3;
  let productsJson = localStorage.getItem("products");

  if (productsJson) {
    let products = JSON.parse(productsJson);
    let productosBajoStock = [];

    products.forEach(element => {
      if (element.stock < minStock) {
        productosBajoStock.push(`
          <li>
            <strong>${element.nameProduct}</strong> (Código: ${element.code}) - Stock: ${element.stock}
          </li>
        `);
      }
    });

    if (productosBajoStock.length > 0) {
      Swal.fire({
        title: "<strong>Alerta: Productos con stock bajo</strong>",
        icon: "info",
        html: `
          Los siguientes productos tienen un stock bajo, se recomienda reponer:
          <ul>
            ${productosBajoStock.join('')}
          </ul>
        `,
      });
    }
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