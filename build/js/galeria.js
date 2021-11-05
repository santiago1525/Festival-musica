document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const video = document.querySelector('.video');

    window.addEventListener('scroll', function() {
        if( video.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
        } else {
            barra.classList.remove('fijo');

        }
       
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion =  document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = ` <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">`;

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);

    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = ` <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">`;


    // Crear el overlay con la imagen
    // Overlay se le llama a la forma en que se pone la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
    }

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('boton-cerrar');
    cerrarModal.onclick = function() {
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
    }

    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}