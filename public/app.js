const carrito = document.getElementById('carrito');
const footer_carrito = document.getElementById('footer_carrito');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
const fragment_footer = document.createDocumentFragment();
const botones = document.querySelectorAll('.card_btn');
const footer_template = document.getElementById('footer_template');

let carritoObjetos = [];

document.addEventListener('click', e => {
  if (e.target.matches('.card button')) {
    agregarCarrito(e);
  }
  if (e.target.matches('.button_agregar')) {
    btn_aumentar(e);
  }
  if (e.target.matches('.button_quitar')) {
    btn_quitar(e);
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

    clone.querySelector('.item_total span').innerHTML = item.precio * item.cantidad;
    clone.querySelector('.button_agregar').dataset.id = item.id;
    clone.querySelector('.button_quitar').dataset.id = item.id;
    fragment.appendChild(clone);
  });
  carrito.appendChild(fragment);
  totalCarrito();
};

const totalCarrito = () => {
  footer_carrito.textContent = '';
  const clone = footer_template.content.cloneNode(true);
  const arraytotal = carritoObjetos.map(fruta => fruta.cantidad * fruta.precio);
  const total = arraytotal.reduce((a, b) => a + b, 0);
  clone.querySelector('span').textContent = total;

  fragment_footer.appendChild(clone);
  footer_carrito.appendChild(fragment_footer);
};

const btn_aumentar = e => {
  carritoObjetos = carritoObjetos.map(fruta => {
    if (fruta.id === e.target.dataset.id) {
      fruta.cantidad++;
    }
    return fruta;
  });
  mostrarCarrito();
};

const btn_quitar = e => {
  carritoObjetos = carritoObjetos.filter(fruta => {
    if (fruta.id === e.target.dataset.id) {
      if (fruta.cantidad > 0) {
        fruta.cantidad--;
        if (fruta.cantidad === 0) {
          return;
        } else {
          return fruta;
        }
      }
    } else {
      return fruta;
    }
  });
  mostrarCarrito();
};
