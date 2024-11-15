//Registro de usuario
document.addEventListener('DOMContentLoaded', () => {
    async function handleRegister(e) {

        e.preventDefault();

        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo_electronico = document.getElementById('correo_electronico').value;
        const ciudad = document.getElementById('ciudad').value;
        const nombre_usuario = document.getElementById('nombre_usuario').value;
        const contrasena = document.getElementById('contrasena').value;
        

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombres, apellidos, correo_electronico, ciudad, nombre_usuario, contrasena })
            });

            const data = await res.json()
            if (res.status === 200) {
                Swal.fire({
                    title: 'Registro Exitoso',
                    text: 'Usuario creado con exito',
                    icon: 'succes',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: `Error al registrar usuario ${data.msg}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }catch(error){
            console.error(error)
            //alert('Error de registro de usuario')
            Swal.fire({
                title: 'Error',
                text: `Error al registrar usuario ${data.msg}`,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    document.getElementById('registerform').addEventListener('submit', handleRegister)

})
