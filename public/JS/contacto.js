//contactar
document.addEventListener('DOMContentLoaded', () => {
    async function handleContactar(e) {

        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correoElectronico = document.getElementById('correoElectronico').value;
        const mensaje = document.getElementById('mensaje').value;
        
        
        try {
            
            const res = await fetch('http://localhost:5000/api/auth/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, correoElectronico, mensaje }) 
            });

            const data = await res.json()
            if (res.status === 200) {
                alert('Mensaje enviado.')
                
            } else {
                alert(`Error ${data.msg}`)
                
            }
        }catch(error){
            console.error(error)
            alert('Error al contactar.')
        }
    }

    document.getElementById('contactoForm').addEventListener('submit', handleContactar)

})