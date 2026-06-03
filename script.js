// Selección de elementos del DOM
const imageInput = document.getElementById('image-input');
const carrusel = document.getElementById('carrusel');
const placeholderText = document.getElementById('placeholder-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let imagenesCargadas = [];
let currentIndex = 0;

// Evento que se dispara al seleccionar archivos
imageInput.addEventListener('change', function(e) {
    const files = e.target.files;
    if (files.length === 0) return;

    // Eliminar imágenes previas si el usuario vuelve a subir otras
    const viejasImgs = carrusel.querySelectorAll('.carrusel-slide');
    viejasImgs.forEach(img => img.remove());
    
    // Reiniciar variables de control
    imagenesCargadas = [];
    currentIndex = 0;

    // Ocultar el mensaje de marcador de posición
    placeholderText.style.display = 'none';

    // Recorrer los archivos seleccionados y procesarlos
    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const imgNode = document.createElement('img');
            imgNode.src = event.target.result;
            imgNode.classList.add('carrusel-slide');
            
            // La primera imagen cargada se muestra por defecto
            if (index === 0) {
                imgNode.classList.add('active');
            }
            
            carrusel.appendChild(imgNode);
            imagenesCargadas.push(imgNode);

            // Mostrar los botones del carrusel si hay más de una imagen
            if (imagenesCargadas.length > 1) {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            }
        };
        
        // Leer la imagen como URL de datos en base64
        reader.readAsDataURL(file);
    });
});

// Función para cambiar de diapositiva activando/desactivando clases CSS
function mostrarSlide(index) {
    if (imagenesCargadas.length === 0) return;

    imagenesCargadas.forEach(img => img.classList.remove('active'));
    
    // Controlar desbordamiento circular (bucle infinito)
    if (index >= imagenesCargadas.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = imagenesCargadas.length - 1;
    } else {
        currentIndex = index;
    }

    imagenesCargadas[currentIndex].classList.add('active');
}

// Eventos para los botones de dirección
nextBtn.addEventListener('click', () => {
    mostrarSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
    mostrarSlide(currentIndex - 1);
});