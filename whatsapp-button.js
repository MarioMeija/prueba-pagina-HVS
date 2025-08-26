// Detectar si es dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const whatsappButton = document.getElementById('whatsappButton');
    const sucursalSelector = document.getElementById('sucursalSelector');
    const closeSelector = document.getElementById('closeSelector');
    const sucursalOptions = document.querySelectorAll('.sucursal-option');
    
    // Mostrar/ocultar selector de sucursal
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            sucursalSelector.style.display = sucursalSelector.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Cerrar selector
    if (closeSelector) {
        closeSelector.addEventListener('click', function() {
            sucursalSelector.style.display = 'none';
        });
    }
    
    // Configurar clic en opciones de sucursal
    if (sucursalOptions.length > 0) {
        sucursalOptions.forEach(option => {
            option.addEventListener('click', function() {
                const number = this.getAttribute('data-number');
                const sucursal = this.getAttribute('data-sucursal');
                openWhatsApp(number, sucursal);
            });
        });
    }
    
    // Cerrar el selector si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (sucursalSelector && !sucursalSelector.contains(event.target) && 
            whatsappButton && !whatsappButton.contains(event.target)) {
            sucursalSelector.style.display = 'none';
        }
    });
});

// Función para abrir WhatsApp
function openWhatsApp(number, sucursal) {
    // Ocultar el selector
    const sucursalSelector = document.getElementById('sucursalSelector');
    if (sucursalSelector) {
        sucursalSelector.style.display = 'none';
    }
    
    // Mensaje predeterminado
    const message = `Hola, me gustaría obtener información sobre la sucursal de ${sucursal}`;
    
    // Formatear número (eliminar caracteres no numéricos)
    const cleanNumber = number.replace(/\D/g, '');
    
    // Crear el enlace según el dispositivo
    let url;
    
    if (isMobileDevice()) {
        // Para móviles: abre la app nativa
        url = `whatsapp://send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
    } else {
        // Para desktop: abre WhatsApp Web
        url = `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
    }
    
    // Abrir en nueva pestaña
    window.open(url, '_blank');
}