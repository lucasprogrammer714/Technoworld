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


loadTable();

let productsJson = localStorage.getItem("products");
let products = productsJson ? JSON.parse(productsJson) : [];

if (!productsJson) {
    let product1 = new Product("SmartWatch Xiaomi", "reloj inteligente", 5, 150.000, "FF34", "SmartWatch");
    let product2 = new Product("SAMSUNG A52", "celular azul", 4, 250.000, "FF35", "Celulares");
    let product3 = new Product("Motorola Edge", "celular rojo", 3, 300.000, "FF36", "Celulares");
    let product4 = new Product("Samsung TV", "tv smart", 7, 350.000, "FF37", "TV");
    let product5 = new Product("SmartWatch RedNet", "reloj inteligente", 5, 150.000, "FF38", "SmartWatch");

    let listaProductosPredeterminada = [product1, product2, product3, product4, product5];
    
    listaProductosPredeterminada.forEach(product => products.push(product));
    
    const productsJson = JSON.stringify(products);
    localStorage.setItem("products", productsJson);
}



let newProductbtn = document.getElementById('newProduct_btn');
let updateStockbtn = document.getElementById('updateStock_btn');
let closeModaltbtn = document.getElementById('close_modal');
let closeModalStock = document.getElementById('close_modal_stock');




newProductbtn.addEventListener("click", AddNewProduct)
updateStockbtn.addEventListener("click", updateStock)
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

     if(validate){

        const newProduct = new Product(nameProduct, description, stock, price, code, category);

        let productsJson = localStorage.getItem("products");
        let products = productsJson ? JSON.parse(productsJson) : [];

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
        messageError.innerText = "La descripcion es obligatoria" ;
        return false;

    }
    if (stock === '') {
        messageError.innerText = "Stock es obligatorio";
        return false;

    }
    if (price === '') {
        messageError.innerText = "Precio es obligatorio";
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
    messageError.innerText = "Producto guardado exitosamente" ;

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




function loadTable() {
    let tableProducts = document.querySelector(".table");

    tableProducts.querySelectorAll("tbody").forEach(tbody => tbody.remove());

    let productsJson = localStorage.getItem("products");


   if (productsJson) {
        let products = JSON.parse(productsJson);

        products.forEach((product, index) => {
            console.log(product);
            let tableBody = document.createElement("tbody");

            tableBody.innerHTML = `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${product.nameProduct}</td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>${product.price}</td>
            <td>${product.code}</td>
            <td>${product.category}</td>
            </tr>  
            `;
            tableProducts.append(tableBody);
        });
 } else {
   console.log("No hay productos en el localStorage.");
    }
}

function updateStock() {
    let newStock = document.getElementById('newStock').value;
    let productCode = document.getElementById('codeProduct').value;
    let validateMessage = document.getElementById('validateCodeMessage');
    let productsJson = localStorage.getItem("products");
    
    if (productsJson) {
      let products = JSON.parse(productsJson);
      
      const productUpdated = products.find((product) => product.code === productCode);
      
      if (productUpdated) {
        productUpdated.stock = newStock;
        
        localStorage.setItem("products", JSON.stringify(products));
        
                
        loadTable();

        validateMessage.style.color = '#5cb85c';
        validateMessage.innerText = 'Stock actualizado correctamente.'

        clearInputField()
 

      } else {
        validateMessage.innerText = 'Producto no encontrado.'
      }
    } else {
        validateMessage.innerText = 'No hay productos en el stock.'

    }

  }
  