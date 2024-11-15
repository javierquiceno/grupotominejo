const apiUrl = 'http://localhost:5000/api/Carrito'; // Cambia esto si usas otro puerto o dominio
const productos_carrito = document.getElementById('div');
let cartId = null;

// Cargar los productos desde la API y mostrarlos en la página
async function loadProducts() {
    try {
        const response = await fetch(`${apiUrl}/productos`);
        const products = await response.json();
        
        const productsDiv = document.getElementById('contenedor');

        products.forEach(product => {
          
            const productContainer = document.createElement('div');
            productContainer.id = 'informacion';

            
            const imgElement = document.createElement('img');
            imgElement.src = product.imagen_url;
            imgElement.alt = product.nombre;
            imgElement.id = 'imagen_url';
            productContainer.appendChild(imgElement);

        
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('informacion');

      
            const nameElement = document.createElement('p');
            nameElement.id = 'nombre';
            nameElement.textContent = product.nombre;
            infoDiv.appendChild(nameElement);

      
            const priceElement = document.createElement('p');
            priceElement.classList.add('precio');
            priceElement.id = 'precio';
            priceElement.innerHTML = `Precio $: ${product.precio}<span>.00</span>`;
            infoDiv.appendChild(priceElement);

            
            const descriptionElement = document.createElement('p');
            descriptionElement.id = 'descripcion';
            descriptionElement.textContent = `Descripcion: ${product.descripcion}`;
            infoDiv.appendChild(descriptionElement);

           
            const buttonElement = document.createElement('button');
            buttonElement.textContent = 'Comprar';
            buttonElement.onclick = () => addToCart(product.id_producto);
            infoDiv.appendChild(buttonElement);

          
            productContainer.appendChild(infoDiv);

       
            productsDiv.appendChild(productContainer);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

/*
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
            const cart = await response.json();
            cartId = cart.id_carrito;
        }

        // Agregar el producto al carrito
        await fetch(`${apiUrl}/carrito/${cartId}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_producto: productId, cantidad: 1 })
        });

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
loadCart();*/

// Crear un carrito (si no existe) y agregar productos
async function addToCart(productId) {
    try {
      // Crear un carrito si no existe
      if (!cartId) {
        const buttonElement = await fetch(`${apiUrl}/carrito`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_users: 1 }) // Cambia este ID según tu usuario
        });
  
        if (!buttonElement.ok) {
          throw new Error("Error al crear el carrito");
        }
  
        const cart = await buttonElement.json();
        cartId = cart.id_carrito;
      }
  
      // Agregar el producto al carrito
      const addProductResponse = await fetch(`${apiUrl}/carrito/${cartId}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_producto: productId, cantidad: 1 })
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
        const buttonElement = await fetch(`${apiUrl}/carrito/${cartId}/detalles`);
        if (!buttonElement.ok) {
            throw new Error("Error al cargar el carrito");
        }

        const cartItems = await buttonElement.json();

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
