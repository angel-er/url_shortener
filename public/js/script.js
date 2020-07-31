const formulario = document.querySelector('#agregar-url');
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const urlOriginal = document.querySelector('#urlOriginal').value;

  const response = await fetch(e.target.action, {
    method: e.target.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({urlOriginal}),
  });

  const resultado = await response.json();

  // ELIMINAR LOS MENSAJES ANTERIORES
  const alertas = document.querySelector('.mensaje-url');
  if (alertas) {
    document.querySelector('.mensaje-url').remove();
  }

  console.log(resultado);

  // Verificar si todo esta todo bien
  if (resultado.codigo === 200) {
    // construir un mensaje todo se creo bien
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-url');
    mensaje.innerHTML = `<p> Se ha cortado correctamente la URL, visita 
			<a target="_blank" rel="noopener noreferrer" href="/${resultado.url}"> 
				en el enlace aquí
			</a>
		</p>`;

    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);
  } else {
    // Constuir un mensaje correcto
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-url', 'error');
    mensaje.innerHTML = `<p>${resultado.error}</p>`;

    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);
  }
});

// Si jay un error en el queryString
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.has('error'));

if (urlParams.has('error')) {
  // construir un template
  const mensaje = document.createElement('div');
  mensaje.classList.add('mensaje-url', 'error');
  mensaje.innerHTML = `<p>URL no Valida</p>`;

  const contenedor = document.querySelector('main');
  contenedor.appendChild(mensaje);
}
