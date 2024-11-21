
const productos = [{
  id: 1,
  nombre: "Gabinete Gamer Xigmatek Atx Vortex Rgb Vidrio Templado Color Negro Fan x1 - 120 mm ARGB varios colores",
  descripcion: "Gabinete Gamer ATX con RGB y vidrio templado.",
  descripcionCorta: "Gabinete gamer con RGB y diseño en vidrio templado.",
  precio: 10000,
  imagenes: ["imagenes/gabinete-1.png", "imagenes/gabiete-2.png"],
  categoria: "gabinetes"
},
{
  id: 2,
  nombre: "Teclado Mecanico Dragonborn K630rgb-sp Brown Swich teclado mecánico , compacto y súper transportable",
  descripcion: "Teclado mecánico compacto con retroiluminación RGB.",
  descripcionCorta: "Teclado compacto con retroiluminación RGB, ideal para gamers.",
  precio: 6000,
  imagenes: ["imagenes/teclado-1.png", "imagenes/teclado-2.png"],
  categoria: "perifericos"
},
{
  id: 3,
  nombre: "Procesador gamer Intel Core i7-4790 CM8064601560113 de 4 núcleos y 4GHz de con gráfica integrada",
  descripcion: "Procesador gamer de 4 núcleos y 4 GHz.",
  descripcionCorta: "Procesador Intel i7 de 4 núcleos a 4GHz, ideal para gaming.",
  precio: 8000,
  imagenes: ["imagenes/i7-1.png", "imagenes/i7-2.png"],
  categoria: "procesadores"
},
{
  id: 4,
  nombre: "Nvidia MSI GeForce 10 Series GTX 1050 Ti GEFORCE GTX 1050 TI 4GT OC OC Edition - 4 GB",
  descripcion: "Tarjeta gráfica de 4GB para gaming.",
  descripcionCorta: "Tarjeta gráfica GTX 1050 Ti de 4GB, optimizada para juegos.",
  precio: 9000,
  imagenes: ["imagenes/msi-tarjeta-grafica-geforce-gtx-1050-ti-4gb-gddr5.jpg", "imagenes/gtx-1050ti-1.png"],
  categoria: "tarjeta-de-video"
},
{
  id: 5,
  nombre: "Monitor Gamer ASUS Gaming VG248QG LED 24 Negro 100v/240v resolución de 1920px-1080px",
  descripcion: "Monitor gaming ASUS de alta resolución.",
  descripcionCorta: "Monitor ASUS de 24 pulgadas, resolución Full HD.",
  precio: 3000,
  imagenes: ["imagenes/monitor-asus-1.png", "imagenes/monitor.asus-2.png"],
  categoria: "monitores"
},
{
  id: 6,
  nombre: "Placa de video Nvidia Asus Phoenix GeForce GTX 16 Series GTX 1650 PH-GTX1650-O4GD6 OC Edition 4GB",
  descripcion: "Tarjeta gráfica Nvidia de 4GB.",
  descripcionCorta: "Tarjeta gráfica Nvidia GTX 1650 de 4GB para gaming.",
  precio: 10000,
  imagenes: ["imagenes/dual-1.png", "imagenes/dual-2.png"],
  categoria: "tarjeta-de-video"
},
{
  id: 7,
  nombre: "Notebook Lenovo Ideapad 1 4gb 128gb 14 Intel Celeron W11 Color Plateado",
  descripcion: "Notebook Lenovo con 4GB de RAM y 128GB de almacenamiento.",
  descripcionCorta: "Notebook Lenovo Ideapad con 4GB RAM y 128GB SSD.",
  precio: 7000,
  imagenes: ["imagenes/notebook-500x500.jpg", "imagenes/notebook-2 -500x500.webp"],
  categoria: "notebook"
},
{
  id: 8,
  nombre: "Pc Armada Gamer Amd Ryzen 7 5700g Ram 32gb 960g Ssd Wifi",
  descripcion: "PC armada gamer con AMD Ryzen 7 y 32GB de RAM.",
  descripcionCorta: "PC gamer con Ryzen 7, 32GB RAM y 960GB SSD.",
  precio: 15000,
  imagenes: ["imagenes/pc-armada-1.webp", "imagenes/pc-amada-2.webp"],
  categoria: "pc-armada"
},
{
  id: 9,
  nombre: "Mouse gamer de juego Redragon Centrophorus2 M601-RGB black",
  descripcion: "Mouse gamer con retroiluminación RGB.",
  descripcionCorta: "Mouse gamer Redragon con retroiluminación RGB.",
  precio: 3000,
  imagenes: ["imagenes/mouse-gamer-1.webp", "imagenes/mouse-gamer-2.webp"],
  categoria: "perifericos"
}
];


;

document.addEventListener('DOMContentLoaded', function () {
  cargarProductos();
  cargarCarrito();
});


function cargarTodosLosProductos() {

  cargarProductos("todos");
}


function cargarProductos(categoria = "todos", ordenarPorPrecio = 'asc') {
  const contenedorProductos = document.getElementById('productos-container');
  contenedorProductos.textContent = ''; 

  let productosFiltrados = categoria === "todos" ? productos : productos.filter(producto => producto.categoria === categoria);


  if (ordenarPorPrecio === 'asc') {
    productosFiltrados.sort((a, b) => a.precio - b.precio); 
  } else if (ordenarPorPrecio === 'desc') {
    productosFiltrados.sort((a, b) => b.precio - a.precio); 
  }

  productosFiltrados.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'col-12 col-md-6 col-lg-4 mb-4';

    const cardInner = document.createElement('div');
    cardInner.className = 'card shadow-sm h-100';

    const carousel = crearCarousel(producto);
    const cardBody = crearCardBody(producto);

    cardInner.appendChild(carousel);
    cardInner.appendChild(cardBody);
    card.appendChild(cardInner);

    contenedorProductos.appendChild(card);


    const modal = crearModalProducto(producto);
    document.body.appendChild(modal);
  });
}


function ordenarProductos() {
  const ordenarSeleccionado = document.getElementById('ordenar-precio').value;  
  cargarProductos("todos", ordenarSeleccionado);  
}


cargarProductos();



function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  const productoEnCarrito = carrito.find(p => p.id === idProducto);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(); 
  actualizarContadorCarrito(); 
}



function crearCarousel(producto) {
  const carousel = document.createElement('div');
  carousel.className = 'carousel slide';
  carousel.setAttribute('id', `producto-${producto.id}`);
  carousel.dataset.bsTouch = "false";

  const carouselInner = document.createElement('div');
  carouselInner.className = 'carousel-inner';

  producto.imagenes.forEach((imagen, index) => {
    const item = document.createElement('div');
    item.className = `carousel-item ${index === 0 ? 'active' : ''}`;

    const img = document.createElement('img');
    img.src = imagen;
    img.alt = producto.nombre;
    img.className = 'd-block w-100';

    item.appendChild(img);
    carouselInner.appendChild(item);
  });

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-control-prev';
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('data-bs-target', `#producto-${producto.id}`);
  prevButton.setAttribute('data-bs-slide', 'prev');

  const prevIcon = document.createElement('span');
  prevIcon.className = 'carousel-control-prev-icon';
  prevButton.appendChild(prevIcon);

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-control-next';
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('data-bs-target', `#producto-${producto.id}`);
  nextButton.setAttribute('data-bs-slide', 'next');

  const nextIcon = document.createElement('span');
  nextIcon.className = 'carousel-control-next-icon';
  nextButton.appendChild(nextIcon);

  carousel.appendChild(carouselInner);
  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  return carousel;
}


function crearCardBody(producto) {
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body text-center';

  const title = document.createElement('h5');
  title.className = 'card-title mb-2';
  title.textContent = producto.nombre;

  const price = document.createElement('p');
  price.className = 'card-text fw-bold text-primary';
  price.textContent = `$${producto.precio}`;

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'd-flex justify-content-center gap-2 mt-3';

  const detailsButton = document.createElement('button');
  detailsButton.className = 'btn btn-outline-primary btn-sm';
  detailsButton.textContent = 'Ver Detalles';
  detailsButton.setAttribute('data-bs-toggle', 'modal');
  detailsButton.setAttribute('data-bs-target', `#producto-modal-${producto.id}`);

  const addButton = document.createElement('button');
  addButton.className = 'btn btn-success btn-sm';
  addButton.textContent = 'Agregar al Carrito';
  addButton.addEventListener('click', () => agregarAlCarrito(producto.id));

  buttonGroup.appendChild(detailsButton);
  buttonGroup.appendChild(addButton);

  cardBody.appendChild(title);
  cardBody.appendChild(price);
  cardBody.appendChild(buttonGroup);

  return cardBody;
}

function crearModalProducto(producto) {
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = `producto-modal-${producto.id}`;
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', `productoModalLabel-${producto.id}`);
  modal.setAttribute('aria-hidden', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog modal-lg';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const modalTitle = document.createElement('h5');
  modalTitle.className = 'modal-title';
  modalTitle.id = `productoModalLabel-${producto.id}`;
  modalTitle.textContent = producto.nombre;

  const closeButton = document.createElement('button');
  closeButton.className = 'btn-close';
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';


  const carousel = document.createElement('div');
  carousel.className = 'carousel slide mb-4';
  carousel.setAttribute('id', `producto-carousel-${producto.id}`);
  carousel.setAttribute('data-bs-ride', 'carousel');

  const carouselInner = document.createElement('div');
  carouselInner.className = 'carousel-inner';

  producto.imagenes.forEach((imagen, index) => {
    const item = document.createElement('div');
    item.className = `carousel-item ${index === 0 ? 'active' : ''}`;

    const img = document.createElement('img');
    img.src = imagen;
    img.alt = producto.nombre;
    img.className = 'd-block w-100';

    item.appendChild(img);
    carouselInner.appendChild(item);
  });

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-control-prev';
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('data-bs-target', `#producto-carousel-${producto.id}`);
  prevButton.setAttribute('data-bs-slide', 'prev');

  const prevIcon = document.createElement('span');
  prevIcon.className = 'carousel-control-prev-icon';
  prevButton.appendChild(prevIcon);

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-control-next';
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('data-bs-target', `#producto-carousel-${producto.id}`);
  nextButton.setAttribute('data-bs-slide', 'next');

  const nextIcon = document.createElement('span');
  nextIcon.className = 'carousel-control-next-icon';
  nextButton.appendChild(nextIcon);

  carousel.appendChild(carouselInner);
  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);


  const priceSection = document.createElement('div');
  priceSection.className = 'mb-4';

  const priceText = document.createElement('h5');
  priceText.className = 'text-primary';
  priceText.textContent = `Precio: $${producto.precio.toFixed(2)}`;

  priceSection.appendChild(priceText);


  const descriptionSection = document.createElement('div');
  descriptionSection.className = 'mb-4';

  const descriptionTitle = document.createElement('h6');
  descriptionTitle.className = 'text-muted';
  descriptionTitle.textContent = 'Descripción del Producto';

  const descriptionText = document.createElement('p');
  descriptionText.className = 'text-secondary';
  descriptionText.textContent = producto.descripcion;

  descriptionSection.appendChild(descriptionTitle);
  descriptionSection.appendChild(descriptionText);


  const addToCartButton = document.createElement('button');
  addToCartButton.className = 'btn btn-success btn-lg w-100';
  addToCartButton.textContent = 'Agregar al Carrito';
  addToCartButton.addEventListener('click', () => agregarAlCarrito(producto.id));

  modalBody.appendChild(carousel);
  modalBody.appendChild(priceSection);
  modalBody.appendChild(descriptionSection);
  modalBody.appendChild(addToCartButton);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  return modal;
}




let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  const productoEnCarrito = carrito.find(p => p.id === idProducto);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  actualizarContenidoCarrito();
  actualizarContadorCarrito();
}


function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}



function incrementarCantidad(idProducto) {
  const productoEnCarrito = carrito.find(p => p.id === idProducto);
  if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
  }
  guardarCarrito();
  actualizarContenidoCarrito();
  actualizarContadorCarrito();
}


function decrementarCantidad(idProducto) {
  const productoEnCarrito = carrito.find(p => p.id === idProducto);
  if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
      productoEnCarrito.cantidad--;
  } else {
      carrito = carrito.filter(p => p.id !== idProducto);
  }
  guardarCarrito();
  actualizarContenidoCarrito();
  actualizarContadorCarrito();
}


function eliminarProducto(idProducto) {
  carrito = carrito.filter(p => p.id !== idProducto);
  guardarCarrito();
  actualizarContenidoCarrito();
  actualizarContadorCarrito();
}


function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarContenidoCarrito();
  actualizarContadorCarrito();
}


function actualizarContenidoCarrito() {
  const contenedorCarrito = document.getElementById('contenidoCarrito');
  const totalProductosElem = document.getElementById('totalProductos');
  const totalMontoElem = document.getElementById('totalMonto');


  while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }

  let totalProductos = 0;
  let totalMonto = 0;

  carrito.forEach(producto => {
      totalProductos += producto.cantidad;
      totalMonto += producto.precio * producto.cantidad;


      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto-carrito', 'border', 'rounded', 'p-2', 'mb-3');

      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row', 'align-items-center');
      productoDiv.appendChild(rowDiv);


      const colImagen = document.createElement('div');
      colImagen.classList.add('col-2');
      const img = document.createElement('img');
      img.src = producto.imagenes[0];
      img.alt = producto.nombre;
      img.classList.add('img-fluid', 'rounded');
      img.style.width = '100%';
      img.style.objectFit = 'cover';
      colImagen.appendChild(img);
      rowDiv.appendChild(colImagen);


      const colDetalles = document.createElement('div');
      colDetalles.classList.add('col-5');
      const nombre = document.createElement('h6');
      nombre.textContent = producto.nombre;
      nombre.classList.add('mb-1');
      const precio = document.createElement('p');
      precio.textContent = `Precio unitario: $${producto.precio}`;
      precio.classList.add('mb-0', 'text-muted');
      const cantidad = document.createElement('p');
      cantidad.textContent = `Cantidad: ${producto.cantidad}`;
      cantidad.classList.add('mb-0', 'fw-bold');
      const total = document.createElement('p');
      total.textContent = `Total: $${producto.precio * producto.cantidad}`;
      total.classList.add('mb-0', 'text-success');
      colDetalles.append(nombre, precio, cantidad, total);
      rowDiv.appendChild(colDetalles);


      const colControles = document.createElement('div');
      colControles.classList.add('col-2', 'd-flex', 'align-items-center', 'justify-content-center', 'gap-2');
      const btnDecrementar = document.createElement('button');
      btnDecrementar.textContent = '-';
      btnDecrementar.classList.add('btn', 'btn-warning', 'btn-sm');
      btnDecrementar.onclick = () => decrementarCantidad(producto.id);
      const btnIncrementar = document.createElement('button');
      btnIncrementar.textContent = '+';
      btnIncrementar.classList.add('btn', 'btn-success', 'btn-sm');
      btnIncrementar.onclick = () => incrementarCantidad(producto.id);
      colControles.append(btnDecrementar, btnIncrementar);
      rowDiv.appendChild(colControles);


      const colEliminar = document.createElement('div');
      colEliminar.classList.add('col-2', 'text-end');
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
      btnEliminar.onclick = () => eliminarProducto(producto.id);
      colEliminar.appendChild(btnEliminar);
      rowDiv.appendChild(colEliminar);


      contenedorCarrito.appendChild(productoDiv);
  });


  totalProductosElem.textContent = `Total de productos: ${totalProductos}`;
  totalMontoElem.textContent = `Total a pagar: $${totalMonto}`;
}


function actualizarContadorCarrito() {
  const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  const contadorCarrito = document.getElementById('contador-carrito');
  contadorCarrito.textContent = totalProductos;
}

function abrirModalCarrito() {
  const modalCarrito = document.getElementById("modalCarrito");
  modalCarrito.style.display = "block";
  actualizarContenidoCarrito(); 
}


function cerrarModalCarrito() {
  const modalCarrito = document.getElementById("modalCarrito");
  modalCarrito.style.display = "none";
}


window.onclick = function (event) {
  const modalCarrito = document.getElementById("modalCarrito");
  if (event.target === modalCarrito) {
      cerrarModalCarrito();
  }
};
  

function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  const productoEnCarrito = carrito.find(p => p.id === idProducto);

  if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
  } else {
      carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(); 
  actualizarContadorCarrito(); 
}
   


function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", cargarCarrito);



