//Agregar producto
document.addEventListener('DOMContentLoaded', () => {
    async function handleContactar(e) {

        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;
        const stock = document.getElementById('stock').value;
        const imagen_url = document.getElementById('imagen_url').value;
        
        
        try {
            
            const res = await fetch('http://localhost:5000/api/auth/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, descripcion, precio, stock, imagen_url  }) 
            });

            const data = await res.json()
            if (res.status === 200) {
                alert('Producto agregardo.')
                
            } else {
                alert(`Error ${data.msg}`)
                
            }
        }catch(error){
            console.error(error)
            alert('Error al contactar.')
        }
    }

    document.getElementById('agregarForm').addEventListener('submit', handleContactar)

})