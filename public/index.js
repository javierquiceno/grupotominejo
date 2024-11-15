const apiUrl = 'http://localhost:5000/api/Carrito'; // Cambia esto si usas otro puerto o dominio
const productos_carrito = document.getElementById('div');
let cartId = null;

// Cargar los productos desde la API y mostrarlos en la página
async function loadProducts() {
    try {
        const response = await fetch(`${apiUrl}/productos`);
        if (!response.ok) {
            throw new Error("No se pudo cargar la lista de productos");
        }
        
        const products = await response.json();
        const productsDiv = document.getElementById('contenedor');
            
        products.forEach(product => {
            const imgElement = document.createElement('img');
            imgElement.src = product.imagen_url;
            imgElement.alt = product.nombre;
            productsDiv.appendChild(imgElement);

            const productDiv = document.createElement('div');
            productDiv.classList.add('informacion');
                   
            productDiv.innerHTML = `
                    <p id="nombre">${product.nombre}</p>
                    <p class="precio"><span>$</span>${product.precio}</p>
                    <p id="descripcion">${product.descripcion || 'Sin descripción'}</p>
                    <button onclick="addToCart(${product.id_producto})">Comprar</button>
                </div>
            `;
            productsDiv.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Crear un carrito (si no existe) y agregar productos
async function addToCart(productId) {
    try {
      // Crear un carrito si no existe
      if (!cartId) {
        const response = await fetch(`${apiUrl}/carrito`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_users: 1 }) // Cambia este ID según tu usuario
        });
  
        if (!response.ok) {
          throw new Error("Error al crear el carrito");
        }
  
        const cart = await response.json();
        cartId = cart.id_carrito;
      }
  
      // Agregar el producto al carrito
      const addProductResponse = await fetch(`${apiUrl}/carrito/${cartId}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idProducto: productId, cantidad: 1 })
      });
  
      if (!addProductResponse.ok) {
        const errorData = await addProductResponse.json();
        throw new Error(errorData.mensaje || "Error al agregar el producto al carrito");
      }
  
      alert('Producto agregado al carrito');
      loadCart();
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  }
// Cargar el contenido del carrito y mostrarlo en la página
async function loadCart() {
    if (!cartId) return;

    try {
        const response = await fetch(`${apiUrl}/carrito/${cartId}/detalles`);
        if (!response.ok) {
            throw new Error("Error al cargar el carrito");
        }

        const cartItems = await response.json();

        const cartDiv = document.getElementById('cart-items');
        cartDiv.innerHTML = ''; // Limpiar los elementos anteriores del carrito

        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>Producto: ${item.nombre}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio: $${item.precio}</p>
            `;
            cartDiv.appendChild(itemDiv);
        });
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
    }
}

// Inicializar la página cargando los productos
loadProducts();
loadCart();
