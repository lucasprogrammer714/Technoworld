let userName = prompt("Ingrese su Nombre")
let lastName = prompt("Ingrese su Apellido")
console.log("Bienvenido a Technoworld " + userName + " " + lastName)

const productos = []

let confirmProduct = confirm("¿Desea agregar algun producto?")


if (confirmProduct) {
    newProduct()
}


function newProduct() {
    let addProduct = true;
    
    while(addProduct){
        const id = prompt("Ingrese el ID del producto")
        const nameProduct = prompt("Ingrese nombre de producto")
        const price = prompt("Ingrese precio de producto")
        const stock = prompt("Ingrese stock")
    
        const producto = { id, nameProduct, price, stock }
    
        productos.push(producto)
    
        let showProduct = confirm("¿Desea ver la lista de productos")
        if (showProduct) {
            showProducts(productos)
        }
        else{
            addProduct = false
        }
            
        let updateProduct = confirm("¿Desea actualizar algun producto?")
        if (updateProduct) UpdateProduct(productos)
    }
   

    
}


function showProducts(productos) {
    for (const producto of productos) {
        console.log(producto)
    }
}


function UpdateProduct(productos) {
    const id = prompt("Ingrese Id de producto")
    const productIndex = productos.findIndex(product => product.id === id)


    if (productIndex !== -1) {

        let productItem = prompt("Eliga item: N-Nombre / S-Stock / P-Precio")

        switch (productItem) {
            case 'N':
                const nameProduct = prompt("Ingrese nuevo nombre de producto");
                productos[productIndex].nameProduct = nameProduct;
                break
            case 'S':
                const stock = prompt("Ingrese nuevo stock");
                productos[productIndex].stock = stock;
                break
            case 'P':
                const price = prompt("Ingrese nuevo precio");
                productos[productIndex].price = price;
                break
            default:
                alert("item invalido")
        }

        showNewProducts(productos)
    }
    else {
        alert("producto no existe en la lista")
    }

}

function showNewProducts(productos) {
    for (const producto of productos) {
        console.log(producto)
    }
}