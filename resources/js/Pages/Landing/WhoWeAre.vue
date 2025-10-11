<script setup>
import LandingLayout from '@/Layouts/LandingLayout.vue';
import { ref, onMounted, computed } from 'vue';

// Lógica para las animaciones de entrada
const isMounted = ref(false);

// --- Lógica para el carrusel de imágenes ---
const images = ref([
    // Se asume que las imágenes están en la carpeta `public/images`
    '/images/maquina-flejadora.png',
    '/images/maquina-flejadora2.jpg',
    '/images/despachador-cinta.png',
    '/images/selladora.png',
    '/images/fleje_negro_landing.png'
]);
const currentImageIndex = ref(0);

// Calcula la imagen actual a mostrar
const currentImage = computed(() => images.value[currentImageIndex.value]);

onMounted(() => {
    // Activa la animación de entrada
    setTimeout(() => {
        isMounted.value = true;
    }, 100);

    // Inicia el carrusel de imágenes
    const imageInterval = setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
    }, 4000); // Cambia la imagen cada 4 segundos

    // Limpia el intervalo cuando el componente se destruye para evitar fugas de memoria
    return () => {
        clearInterval(imageInterval);
    };
});
</script>

<template>
    <LandingLayout title="¿Quiénes Somos?">
        <!-- Hero Section -->
        <section class="relative bg-slate-700 text-white py-20 md:py-32">
            <div class="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070&auto=format&fit=crop" alt="Equipo de trabajo en almacén" class="w-full h-full object-cover opacity-30">
            </div>
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h1
                    class="text-4xl md:text-6xl font-extrabold mb-4 transition-all duration-700 ease-out"
                    :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                >
                    Conoce a SISTEMPAC
                </h1>
                <p
                    class="text-lg md:text-xl max-w-3xl mx-auto transition-all duration-700 ease-out delay-200"
                    :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                >
                    Más que un proveedor, somos tu socio estratégico en soluciones de empaque y embalaje.
                </p>
            </div>
        </section>

        <!-- Content Section -->
        <section class="py-16 md:py-24 bg-white overflow-hidden">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <!-- Nuestra Historia -->
                    <div
                        class="order-2 md:order-1 transition-all duration-1000 ease-out"
                        :class="isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'"
                    >
                        <h2 class="text-3xl font-bold text-slate-800 mb-4">Nuestra Historia</h2>
                        <h3 class="text-blue-900 font-bold">SISTEMPAC, INDUSTRIAS ORJI, S.A. DE C.V.</h3>
                        <p class="text-gray-600 mb-4 leading-relaxed">
                            nace en 1981, desde su inicio hemos tenido el firme compromiso de otorgar calidad en nuestros productos y en nuestro servicio, para nosotros las necesidades del cliente son el motor de nuestra compañía que nos impulsa para cumplir con las expectativas que el cliente requiere de sus proveedores.
                        </p>
                        <p class="text-gray-600 leading-relaxed mb-8">
                            A lo largo de los años, hemos crecido y expandido nuestro catálogo, incorporando maquinaria de última generación y materiales sostenibles para responder a las necesidades cambiantes del mercado. Nuestro compromiso con la excelencia y la satisfacción del cliente ha sido el pilar de nuestro éxito.
                        </p>
                        <!-- Botón "Visita nuestra tienda" -->
                        <a href="https://www.propackgdl.com.mx/" class="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                            Visita nuestra tienda
                        </a>
                    </div>
                    <!-- Carrusel de Imágenes -->
                    <div
                        class="order-1 md:order-2 transition-all duration-1000 ease-out delay-200 relative h-80 w-full flex items-center justify-center"
                        :class="isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
                    >
                        <transition name="fade" mode="out-in">
                            <img :key="currentImage" :src="currentImage" alt="Maquinaria de embalaje" class="rounded-lg shadow-xl object-contain max-h-full max-w-full absolute">
                        </transition>
                    </div>
                </div>
            </div>
        </section>

        <!-- Misión y Visión Section -->
        <section class="py-16 md:py-24 bg-gray-50">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-12 md:gap-16">
                    <!-- Misión -->
                    <div
                        class="bg-white p-8 rounded-lg shadow-lg transition-all duration-1000 ease-out delay-300"
                        :class="isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
                    >
                        <div class="flex items-center mb-4">
                            <div class="bg-amber-500 text-white rounded-full p-3 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 class="text-2xl font-bold text-slate-800">Nuestra Misión</h3>
                        </div>
                        <p class="text-gray-600 leading-relaxed">
                            Proveer soluciones integrales de empaque y embalaje que superen las expectativas de nuestros clientes, a través de productos innovadores, un servicio excepcional y un compromiso firme con la calidad y la sostenibilidad.
                        </p>
                    </div>
                    <!-- Visión -->
                     <div
                        class="bg-white p-8 rounded-lg shadow-lg transition-all duration-1000 ease-out delay-500"
                        :class="isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
                     >
                        <div class="flex items-center mb-4">
                             <div class="bg-amber-500 text-white rounded-full p-3 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </div>
                            <h3 class="text-2xl font-bold text-slate-800">Nuestra Visión</h3>
                        </div>
                        <p class="text-gray-600 leading-relaxed">
                            Ser la empresa líder en el mercado nacional de soluciones de embalaje, reconocida por nuestra innovación, confiabilidad y por ser el socio estratégico preferido por las industrias para la protección de sus productos.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </LandingLayout>
</template>

<style scoped>
/* Estilos para la transición de las imágenes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
