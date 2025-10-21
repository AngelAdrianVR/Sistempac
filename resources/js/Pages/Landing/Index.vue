<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import LandingLayout from '@/Layouts/LandingLayout.vue';

// --- REFERENCIAS PARA ANIMACIONES ---
const strappingRoll = ref(null);
const qualityFeatures = ref(null);
const windowWidth = ref(window.innerWidth);

// Referencia para elementos que se animarán al hacer scroll
const elementsToAnimate = ref([]);

// --- LÓGICA DE ANIMACIÓN DEL ROLLO DE FLEJE (EXISTENTE) ---

// Función de ayuda para interpolación lineal (suaviza la animación)
const lerp = (start, end, t) => start * (1 - t) + end * t;

// Puntos clave para PANTALLAS GRANDES (lg y superiores)
const keyPointsLg = [
    { selector: '#hero', styles: { top: 32, left: 52, scale: 1.7, rotate: 0, opacity: 1 } },
    { selector: '#calidad', styles: { top: 40, left: 30, scale: 1.4, rotate: -90, opacity: 1 } },
    { selector: '#calidad', isEnd: true, styles: { top: 40, left: 30, scale: 1.4, rotate: -90, opacity: 0 } }
];

// Puntos clave para PANTALLAS PEQUEÑAS (móviles)
const keyPointsSm = [
    { selector: '#hero', styles: { top: 25, left: 53, scale: 1.1, rotate: 0, opacity: 1 } },
    { selector: '#calidad', styles: { top: 40, left: 77, scale: 1, rotate: -90, opacity: 1 } },
    { selector: '#calidad', isEnd: true, styles: { top: 40, left: 77, scale: 1, rotate: -90, opacity: 0 } }
];

const activeKeyPoints = computed(() => {
    return windowWidth.value >= 1024 ? keyPointsLg : keyPointsSm;
});

const handleScroll = () => {
    if (!strappingRoll.value) return;

    const keyPoints = activeKeyPoints.value;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    let prevPointIndex = 0;
    for (let i = 0; i < keyPoints.length - 1; i++) {
        const nextPoint = keyPoints[i + 1];
        const nextElem = document.querySelector(nextPoint.selector);
        if (!nextElem) continue;

        const triggerY = nextPoint.isEnd
            ? (nextElem.offsetTop - windowHeight / 2) + 1
            : nextElem.offsetTop - windowHeight / 2;

        if (scrollY < triggerY) {
            break;
        }
        prevPointIndex = i;
    }

    const nextPointIndex = prevPointIndex + 1;

    if (nextPointIndex >= keyPoints.length) {
        const lastStyles = keyPoints[keyPoints.length - 1].styles;
        requestAnimationFrame(() => {
            if (strappingRoll.value) {
                strappingRoll.value.style.opacity = lastStyles.opacity;
            }
        });
        return;
    }

    const prevPoint = keyPoints[prevPointIndex];
    const nextPoint = keyPoints[nextPointIndex];
    const prevElem = document.querySelector(prevPoint.selector);
    const nextElem = document.querySelector(nextPoint.selector);

    if (!prevElem || !nextElem) return;

    const startScroll = (prevPointIndex === 0) ? 0 : (prevElem.offsetTop - windowHeight / 2);

    const endScroll = nextPoint.isEnd
        ? startScroll + 300
        : nextElem.offsetTop - windowHeight / 2;

    let progress = (scrollY - startScroll) / (endScroll - startScroll);
    progress = Math.max(0, Math.min(1, progress));

    if (isNaN(progress)) progress = 0;

    const prevStyles = prevPoint.styles;
    const nextStyles = nextPoint.styles;
    const currentStyles = {
        top: lerp(prevStyles.top, nextStyles.top, progress),
        left: lerp(prevStyles.left, nextStyles.left, progress),
        scale: lerp(prevStyles.scale, nextStyles.scale, progress),
        rotate: lerp(prevStyles.rotate, nextStyles.rotate, progress),
        opacity: lerp(prevStyles.opacity, nextStyles.opacity, progress),
    };

    let featuresOpacity = 0;
    if (qualityFeatures.value) {
        if (prevPointIndex === 0 && nextPointIndex === 1) {
            featuresOpacity = Math.max(0, (progress - 0.5) * 2);
        } else if (prevPointIndex >= 1) {
            featuresOpacity = 1;
        }
    }

    requestAnimationFrame(() => {
        if (strappingRoll.value) {
            strappingRoll.value.style.top = `${currentStyles.top}vh`;
            strappingRoll.value.style.left = `${currentStyles.left}vw`;
            strappingRoll.value.style.transform = `translate(-50%, -50%) rotate(${currentStyles.rotate}deg) scale(${currentStyles.scale})`;
            strappingRoll.value.style.opacity = currentStyles.opacity;
        }
        if (qualityFeatures.value) {
            qualityFeatures.value.style.opacity = featuresOpacity;
        }
    });
};

const handleResize = () => {
    windowWidth.value = window.innerWidth;
    handleScroll();
};

// --- LÓGICA PARA TRANSICIONES DE TEXTO ---

// Función para agregar elementos al array que se observará
const addElementToAnimate = (el) => {
    if (el) {
        elementsToAnimate.value.push(el);
    }
};

onMounted(() => {
    // Set initial state for the animated roll to be invisible
    if (strappingRoll.value) {
        strappingRoll.value.style.opacity = '0';
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Call handleScroll after a short delay to trigger the initial fade-in transition
    setTimeout(() => {
        handleScroll();
    }, 100);

    // Intersection Observer for animating elements as they become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply delay if defined in the element's data attribute
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, parseInt(delay));
                // Stop observing the element once it is visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each registered element
    elementsToAnimate.value.forEach(el => {
        if (el) observer.observe(el);
    });
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <Head title="Inicio" />
    <LandingLayout>
        <!-- Animated strap roll image -->
        <div ref="strappingRoll" class="fixed z-30" style="width: 170px; height: 170px; transition: transform 0.1s linear, top 0.1s linear, left 0.1s linear, opacity 1s ease-out;">
            <img src="/images/fleje_negro_landing.png" alt="Rollo de fleje animado">
        </div>

        <div class="relative z-20 bg-white">
            <!-- Hero Section -->
            <section id="hero" class="h-screen flex items-center">
                <img src="/images/landing-hero.png" class="absolute top-10 left-1/2 -translate-x-1/2" alt="Herramientas de empaque y embalaje">
                <!-- <img :ref="addElementToAnimate" src="/images/landing-hero.png" class="scroll-animate fade-in-up-soft absolute top-10 left-1/2 -translate-x-1/2 opacity-90" data-delay="200" alt="Herramientas de empaque y embalaje"> -->
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 :ref="addElementToAnimate" data-delay="100" class="scroll-animate fade-in-up-soft text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight mt-10">
                        Soluciones en <span class="text-yellow-500">Empaque</span><br> que Impulsan tu Negocio
                    </h1>
                    <p :ref="addElementToAnimate" data-delay="300" class="scroll-animate fade-in-up-soft mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Desde flejes de alta resistencia hasta maquinaria de vanguardia, te ofrecemos la seguridad y eficiencia que tus envíos necesitan.
                    </p>
                </div>
            </section>

            <!-- Quality Section -->
            <section class="min-h-screen flex items-center bg-gray-50 py-20 overflow-hidden">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
                    <div id="calidad" class="w-full md:w-1/2 text-left relative">
                         <div class="absolute -top-12 -left-12 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl"></div>
                        <div ref="qualityFeatures" class="transition-opacity duration-300">
                             <ul class="space-y-4 mb-8">
                                <li :ref="addElementToAnimate" class="scroll-animate fade-in-up flex items-center text-lg font-medium text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" /></svg>
                                    <span>Medidas 3/8", 1/2", 5/8"</span>
                                </li>
                                <li :ref="addElementToAnimate" data-delay="150" class="scroll-animate fade-in-up flex items-center text-lg font-medium text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    <span>Material resistente</span>
                                </li>
                                <li :ref="addElementToAnimate" data-delay="300" class="scroll-animate fade-in-up flex items-center text-lg font-medium text-gray-800">
                                     <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18m-9-4v8" /></svg>
                                    <span>Polipropileno/PET</span>
                                </li>
                            </ul>
                        </div>
                        <h2 :ref="addElementToAnimate" data-delay="200" class="scroll-animate fade-in-up text-3xl md:text-5xl font-bold text-blue-900">Calidad que Protege</h2>
                        <p :ref="addElementToAnimate" data-delay="300" class="scroll-animate fade-in-up mt-4 text-gray-600 text-lg">
                            Nuestros productos están diseñados para resistir las condiciones más exigentes, asegurando que tu mercancía llegue intacta. Cada rollo de fleje es sinónimo de confianza.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Variety Section -->
            <section id="variedad" class="min-h-screen flex items-center bg-white py-24">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 :ref="addElementToAnimate" class="scroll-animate fade-in-up text-3xl md:text-5xl font-bold text-blue-900">Un Catálogo para Cada Necesidad</h2>
                    <p :ref="addElementToAnimate" data-delay="150" class="scroll-animate fade-in-up mt-4 text-gray-600 text-lg max-w-2xl mx-auto mb-12">
                        Explora nuestra amplia gama de productos de empaque, diseñados para ofrecerte la máxima calidad y eficiencia.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div :ref="addElementToAnimate" class="scroll-animate fade-in-up bg-gray-50 p-8 rounded-xl border border-gray-200 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                            <h3 class="font-bold text-blue-900 text-xl mb-2">Flejes y Cintas</h3>
                            <p class="text-gray-600">Plástico, acero y textiles para cualquier tipo de carga. Resistencia y durabilidad garantizadas.</p>
                        </div>
                        <div :ref="addElementToAnimate" data-delay="150" class="scroll-animate fade-in-up bg-gray-50 p-8 rounded-xl border border-gray-200 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                             <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 12v-2m0-6v.01M6 12h.01M18 12h.01M6 18h.01M18 6h.01M6 6h.01M18 18h.01M12 18h.01M12 6h.01M12 12h.01" /><path d="M12 12l-6-6m12 0l-6 6m0 6l6-6m-6 6l-6-6" /></svg></div>
                            <h3 class="font-bold text-blue-900 text-xl mb-2">Maquinaria</h3>
                            <p class="text-gray-600">Equipos automáticos y semiautomáticos para optimizar tu proceso de embalaje.</p>
                        </div>
                        <div :ref="addElementToAnimate" data-delay="300" class="scroll-animate fade-in-up bg-gray-50 p-8 rounded-xl border border-gray-200 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                             <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div>
                            <h3 class="font-bold text-blue-900 text-xl mb-2">Otros Consumibles</h3>
                            <p class="text-gray-600">Película stretch, cintas adhesivas y todo lo que necesitas para un empaque seguro.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Solutions Section -->
            <section id="soluciones" class="min-h-screen flex items-center bg-gray-50 py-24 overflow-hidden">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div class="text-left">
                            <span :ref="addElementToAnimate" class="scroll-animate fade-in-up text-yellow-500 font-semibold">Soluciones Integrales</span>
                            <h2 :ref="addElementToAnimate" data-delay="100" class="scroll-animate fade-in-up text-3xl md:text-5xl font-bold text-blue-900 mt-2">Ingeniería de Empaque a tu Medida</h2>
                            <p :ref="addElementToAnimate" data-delay="200" class="scroll-animate fade-in-up mt-6 text-gray-600 text-lg">
                                No solo vendemos productos, creamos soluciones. Nuestro equipo de expertos analiza tus necesidades para diseñar un sistema de empaque que optimice costos, proteja tu producto y agilice tu logística.
                            </p>
                            <ul class="mt-6 space-y-4 text-gray-700">
                                <li :ref="addElementToAnimate" data-delay="300" class="scroll-animate fade-in-up flex items-start"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg><span>Análisis de la línea de producción.</span></li>
                                <li :ref="addElementToAnimate" data-delay="400" class="scroll-animate fade-in-up flex items-start"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg><span>Selección de materiales óptimos.</span></li>
                                <li :ref="addElementToAnimate" data-delay="500" class="scroll-animate fade-in-up flex items-start"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg><span>Pruebas de resistencia y durabilidad.</span></li>
                            </ul>
                        </div>
                        <div :ref="addElementToAnimate" class="scroll-animate fade-in-up relative">
                            <img @click="$inertia.visit(route('landing.products'))" src="@/../../public/images/Maquinas.png" alt="Soluciones de empaque" class="rounded-xl cursor-pointer shadow-2xl w-full h-auto z-10 relative">
                            <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>
                            <div class="absolute -top-8 -left-8 w-48 h-48 bg-blue-900/10 rounded-lg -rotate-12"></div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Section -->
            <section id="contacto" class="relative bg-white py-24 sm:py-32">
                 <div class="absolute inset-0 overflow-hidden -z-10">
                    <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl"></div>
                 </div>
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 :ref="addElementToAnimate" class="scroll-animate fade-in-up text-3xl md:text-5xl font-bold text-blue-900">¿Listo para Optimizar tu Embalaje?</h2>
                    <p :ref="addElementToAnimate" data-delay="150" class="scroll-animate fade-in-up mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Nuestro equipo de expertos está listo para asesorarte. Contáctanos y encuentra la solución perfecta que se adapte a tus necesidades.
                    </p>
                     <a :ref="addElementToAnimate" data-delay="300" :href="route('landing.products')" class="scroll-animate fade-in-up mt-8 inline-block bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/50">
                        Ver catálogo de productos
                    </a>
                </div>
            </section>
        </div>
    </LandingLayout>
</template>

<style>
/* Ensures smooth scrolling for a better user experience */
html {
    scroll-behavior: smooth;
}

/* --- STYLES FOR TEXT TRANSITIONS ON SCROLL --- */

/* Initial state for all animated elements */
.scroll-animate {
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: var(--delay, 0s); /* Allows using data-delay as a CSS variable */
}

/* Standard "slide up" animation */
.scroll-animate.fade-in-up {
    transform: translateY(30px);
}

/* Softer "slide up" animation for the hero section */
.scroll-animate.fade-in-up-soft {
    transform: translateY(20px);
    transition-duration: 0.9s;
}

/* Final state when the element becomes visible */
.scroll-animate.is-visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
