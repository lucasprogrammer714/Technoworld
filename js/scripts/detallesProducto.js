mostrarProductoPorCodigo('FF');


function crearCardProducto(producto) {
    return `
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.detalle}</p>
            <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
          </div>
        </div>
      </div>
    `;
  }


  function mostrarProductoPorCodigo(identificador) {
    fetch('../data/detallesProductos.json')  
      .then(response => response.json())
      .then(data => {
        const productoFiltrado = data.productos.find(producto => producto.Identificador === identificador);
console.log("holaaaaaaaa")
        if (productoFiltrado) {
          const container = document.getElementById('productos-container');
          container.innerHTML = crearCardProducto(productoFiltrado);
        } else {
          console.log('Producto no encontrado');
        }
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }
