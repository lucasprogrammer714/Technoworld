document.getElementById('pc-notebooks').addEventListener('click', function () {
  mostrarProductoPorCodigo('PN');
});

document.getElementById('gaming').addEventListener('click', function () {
  mostrarProductoPorCodigo('GM');
});

document.getElementById('celulares').addEventListener('click', function () {
  mostrarProductoPorCodigo('SP');
});

document.getElementById('tv').addEventListener('click', function () {
  mostrarProductoPorCodigo('TV');
});
document.getElementById('smartwatchs').addEventListener('click', function () {
  mostrarProductoPorCodigo('SW');
});
document.getElementById('accesorios').addEventListener('click', function () {
  mostrarProductoPorCodigo('AC');
});






function crearCardProducto(producto) {
  return `
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <img src="${producto.RutaImagen}" class="card-img-top img-tarjeta" alt="${producto.nombre}">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.detalle}</p>
          </div>
        </div>
      </div>
    `;
}


function mostrarProductoPorCodigo(identificador) {
  fetch('../data/detallesProductos.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let productosFiltrados = data.productos.filter(producto => producto.Identificador === identificador);
      let cardsProducts = '';

      productosFiltrados.forEach(element => {
        cardsProducts += crearCardProducto(element);
      });
      const container = document.getElementById('productos-container');
      container.innerHTML = cardsProducts;

    })
    .catch(error => console.error('Error al obtener los datos:', error));
}




