const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
const botones = document.querySelectorAll('.card_btn');

const carritoObjetos = [];

document.addEventListener('click', e => {
  if (e.target.matches('.card button')) {
    agregarCarrito(e);
  }
});

const agregarCarrito = e => {
  producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  const productoRepetido = carritoObjetos.findIndex(fruta => fruta.id === producto.id);

  if (productoRepetido === -1) {
    carritoObjetos.push(producto);
  } else {
    carritoObjetos[productoRepetido].cantidad++;
  }

  mostrarCarrito();
};

const mostrarCarrito = () => {
  carrito.textContent = '';
  carritoObjetos.forEach(item => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.item_title').textContent = item.titulo;
    clone.querySelector('.item_cant').textContent = item.cantidad;

    clone.querySelector('.item_total span').innerHTML = `Total: $${item.precio * item.cantidad}`;
    clone.querySelector('.button_agregar').dataset.id = item.id;
    clone.querySelector('.button_quitar').dataset.id = item.id;
    fragment.appendChild(clone);
  });
  carrito.appendChild(fragment);
};
