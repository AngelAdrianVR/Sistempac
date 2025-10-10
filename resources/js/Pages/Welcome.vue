<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import LandingLayout from '@/Layouts/LandingLayout.vue';

// Referencias para los elementos
const strappingRoll = ref(null);
const qualityFeatures = ref(null);
const windowWidth = ref(window.innerWidth);

// Función de ayuda para interpolación lineal (suaviza la animación)
const lerp = (start, end, t) => start * (1 - t) + end * t;

// --- DEFINICIÓN DE KEYPOINTS RESPONSIVOS ---

// Puntos clave para PANTALLAS GRANDES (lg y superiores)
const keyPointsLg = [
    // 1. Inicia grande y centrado en la sección Hero
    { selector: '#hero', styles: { top: 30, left: 55, scale: 1.7, rotate: 0 } },
    // 2. Se mueve a la derecha, junto a la sección de Calidad
    { selector: '#calidad', styles: { top: 40, left: 60, scale: 1.4, rotate: -90 } },
    // 3. Cruza hacia la izquierda para la sección de Variedad
    { selector: '#variedad', styles: { top: 60, left: 15, scale: 1.5, rotate: 0 } },
    // 4. Vuelve a la derecha para la sección de Soluciones
    { selector: '#soluciones', styles: { top: 50, left: 80, scale: 1.5, rotate: 180 } },
    // 5. Termina centrado y más pequeño en la sección de Contacto
    { selector: '#contacto', styles: { top: 50, left: 50, scale: 1.4, rotate: 360 } },
];

// Puntos clave para PANTALLAS PEQUEÑAS (móviles)
const keyPointsSm = [
    // 1. Inicia centrado pero un poco más abajo en la sección Hero
    { selector: '#hero', styles: { top: 25, left: 53, scale: 1.1, rotate: 0 } },
    // 2. Se mueve a la derecha, junto a la sección de Calidad
    { selector: '#calidad', styles: { top: 40, left: 77, scale: 1, rotate: -90 } },
    // 3. Cruza hacia la izquierda para la sección de Variedad
    { selector: '#variedad', styles: { top: 60, left: 15, scale: 0.7, rotate: 0 } },
    // 4. Vuelve a la derecha para la sección de Soluciones
    { selector: '#soluciones', styles: { top: 50, left: 80, scale: 0.9, rotate: 180 } },
    // 5. Termina centrado y más pequeño en la sección de Contacto
    { selector: '#contacto', styles: { top: 50, left: 50, scale: 0.7, rotate: 360 } },
];

// Propiedad computada que elige los keypoints correctos según el ancho de la ventana
const activeKeyPoints = computed(() => {
    // Usamos 1024px (lg en Tailwind) como punto de quiebre
    return windowWidth.value >= 1024 ? keyPointsLg : keyPointsSm;
});

const handleScroll = () => {
    if (!strappingRoll.value) return;

    const keyPoints = activeKeyPoints.value;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // --- INICIO DE LA MODIFICACIÓN ---
    // Calculamos dinámicamente el punto donde la animación debe detenerse.
    // La animación se detendrá por completo cuando el centro de la sección '#contacto'
    // alcance el centro de la pantalla. Esto es más flexible que usar un valor fijo como 3400.
    const contactSection = document.querySelector('#contacto');
    if (contactSection) {
        const stopTriggerPoint = contactSection.offsetTop - windowHeight / 2;

        if (scrollY >= stopTriggerPoint) {
            const lastStyles = keyPoints[keyPoints.length - 1].styles;
            requestAnimationFrame(() => {
                if (strappingRoll.value) {
                    strappingRoll.value.style.top = `${lastStyles.top}vh`;
                    strappingRoll.value.style.left = `${lastStyles.left}vw`;
                    strappingRoll.value.style.transform = `translate(-50%, -50%) rotate(${lastStyles.rotate}deg) scale(${lastStyles.scale})`;
                }
                // Nos aseguramos que la opacidad de otros elementos también esté en su estado final
                if (qualityFeatures.value) {
                    qualityFeatures.value.style.opacity = 0;
                }
            });
            return; // Detenemos la función aquí para que la imagen no se mueva más.
        }
    }
    // --- FIN DE LA MODIFICACIÓN ---

    // La lógica de interpolación se mantiene para las secciones anteriores.
    let prevPointIndex = 0;
    for (let i = 0; i < keyPoints.length - 1; i++) {
        const nextElem = document.querySelector(keyPoints[i + 1].selector);
        if (!nextElem) continue;
        
        const triggerY = nextElem.offsetTop - windowHeight / 2;
        if (scrollY < triggerY) {
            break;
        }
        prevPointIndex = i;
    }
    
    const nextPointIndex = prevPointIndex + 1;

    // Esta comprobación previene errores si no se encuentran los elementos.
    if (nextPointIndex >= keyPoints.length) {
        return;
    }
    
    const prevElem = document.querySelector(keyPoints[prevPointIndex].selector);
    const nextElem = document.querySelector(keyPoints[nextPointIndex].selector);
    
    if (!prevElem || !nextElem) return;

    const startScroll = prevPointIndex === 0 ? 0 : prevElem.offsetTop - windowHeight / 2;
    const endScroll = nextElem.offsetTop - windowHeight / 2;

    let progress = (scrollY - startScroll) / (endScroll - startScroll);
    progress = Math.max(0, Math.min(1, progress));
    
    if (isNaN(progress)) {
        progress = 0;
    }

    const prevStyles = keyPoints[prevPointIndex].styles;
    const nextStyles = keyPoints[nextPointIndex].styles;
    const currentStyles = {
        top: lerp(prevStyles.top, nextStyles.top, progress),
        left: lerp(prevStyles.left, nextStyles.left, progress),
        scale: lerp(prevStyles.scale, nextStyles.scale, progress),
        rotate: lerp(prevStyles.rotate, nextStyles.rotate, progress),
    };

    let featuresOpacity = 0;
    if (qualityFeatures.value) {
        if (prevPointIndex === 0 && nextPointIndex === 1) { // Transición de Hero a Calidad
            featuresOpacity = Math.max(0, (progress - 0.5) * 2);
        } else if (prevPointIndex === 1 && nextPointIndex === 2) { // Transición de Calidad a Variedad
            featuresOpacity = 1 - progress;
        }
    }

    requestAnimationFrame(() => {
        if (strappingRoll.value) {
            strappingRoll.value.style.top = `${currentStyles.top}vh`;
            strappingRoll.value.style.left = `${currentStyles.left}vw`;
            strappingRoll.value.style.transform = `translate(-50%, -50%) rotate(${currentStyles.rotate}deg) scale(${currentStyles.scale})`;
        }
        if (qualityFeatures.value) {
            qualityFeatures.value.style.opacity = featuresOpacity;
        }
    });
};

// Función para actualizar el ancho de la ventana
const handleResize = () => {
    windowWidth.value = window.innerWidth;
    handleScroll(); // Recalcula la animación al cambiar el tamaño
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll(); // Establece la posición inicial al cargar
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <Head title="Inicio" />
    <LandingLayout>
        <!-- Imagen animada del rollo de fleje -->
        <div ref="strappingRoll" class="fixed z-30" style="width: 170px; height: 170px; transition: transform 0.1s linear, top 0.1s linear, left 0.1s linear;">
            <img src="/images/fleje_negro_landing.png" alt="Rollo de fleje animado">
        </div>

        <div class="relative z-20 bg-white">
            <!-- Sección Hero -->
            <section id="hero" class="h-screen flex items-center">
                <img src="/images/landing-hero.png" class="absolute top-10 left-0 lg:left-[510px]" alt="Herramientas de empaque y embalaje">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight">
                        Soluciones en <span class="text-yellow-500">Empaque</span><br> que Impulsan tu Negocio
                    </h1>
                    <p class="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Desde flejes de alta resistencia hasta maquinaria de vanguardia, te ofrecemos la seguridad y eficiencia que tus envíos necesitan.
                    </p>
                    <a href="#calidad" class="mt-8 inline-block bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-800 transition-transform duration-300 hover:scale-105">
                        Descubre Más
                    </a>
                </div>
            </section>

            <!-- Sección Calidad -->
            <section class="min-h-screen flex items-center bg-gray-50 py-20 overflow-hidden">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
                    <div id="calidad" class="w-full md:w-1/2 text-left relative">
                         <div class="absolute -top-12 -left-12 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl"></div>
                        
                        <!-- Lista de Características que aparece y desaparece -->
                        <div ref="qualityFeatures" class="transition-opacity duration-300" style="opacity: 0;">
                            <ul class="space-y-4 mb-8">
                                <li class="flex items-center text-lg font-medium text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
                                    </svg>
                                    <span>Calibres 3/8, 1/2, 5/8</span>
                                </li>
                                <li class="flex items-center text-lg font-medium text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span>Material resistente</span>
                                </li>
                                <li class="flex items-center text-lg font-medium text-gray-800">
                                     <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18m-9-4v8" />
                                    </svg>
                                    <span>Polipropileno/PET</span>
                                </li>
                            </ul>
                        </div>
                        
                        <h2 class="text-3xl md:text-5xl font-bold text-blue-900">Calidad que Protege</h2>
                        <p class="mt-4 text-gray-600 text-lg">
                            Nuestros productos están diseñados para resistir las condiciones más exigentes, asegurando que tu mercancía llegue intacta. Cada rollo de fleje es sinónimo de confianza.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Sección Variedad -->
            <section id="variedad" class="min-h-screen flex items-center bg-white py-20">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
                     <div class="w-full md:w-1/2 text-right">
                        <h2 class="text-3xl md:text-5xl font-bold text-blue-900">Un Catálogo para Cada Necesidad</h2>
                        <p class="mt-4 text-gray-600 text-lg mb-8">
                            Explora nuestra amplia gama de productos de empaque.
                        </p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left">
                                <h3 class="font-bold text-blue-900 text-lg">Flejes y Cintas</h3>
                                <p class="text-sm text-gray-600 mt-2">Plástico, acero y textiles para cualquier tipo de carga.</p>
                            </div>
                            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left">
                                <h3 class="font-bold text-blue-900 text-lg">Maquinaria</h3>
                                <p class="text-sm text-gray-600 mt-2">Equipos automáticos y semiautomáticos para optimizar tu proceso.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Sección Soluciones -->
            <section id="soluciones" class="min-h-screen flex items-center bg-gray-50 py-20 overflow-hidden">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
                    <div class="w-full md:w-1/2 text-left relative">
                        <h2 class="text-3xl md:text-5xl font-bold text-blue-900">Soluciones a tu Medida</h2>
                        <p class="mt-4 text-gray-600 text-lg">
                            Nuestro equipo puede desarrollar soluciones de empaque personalizadas que se adapten perfectamente a tu producto y línea de producción.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Sección Contacto -->
            <section id="contacto" class="h-screen flex flex-col justify-center items-center text-center bg-white py-20">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl md:text-5xl font-bold text-blue-900">¿Listo para Optimizar tu Embalaje?</h2>
                    <p class="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Nuestro equipo de expertos está listo para asesorarte. Contáctanos y encuentra la solución perfecta que se adapte a tus necesidades.
                    </p>
                     <a href="#" class="mt-8 inline-block bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-transform duration-300 hover:scale-105">
                        Hablar con un experto
                    </a>
                </div>
            </section>
        </div>
    </LandingLayout>
</template>

<style>
/* Asegura que el scroll sea suave para una mejor experiencia */
html {
    scroll-behavior: smooth;
}
</style>
