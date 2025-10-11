<script setup>
import LandingLayout from '@/Layouts/LandingLayout.vue';
import { ref, onMounted, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { categories, allProducts } from './products.js';

// --- Props ---
// Recibimos el término de búsqueda inicial desde el controlador.
const props = defineProps({
    initialSearch: String,
});

// --- State Management ---
const activeCategory = ref('Todos');
const displayedCount = ref(12);
const isMounted = ref(false);
const currentImageIndexes = ref({});
// El buscador se inicializa con el valor que llega de la URL.
const searchQuery = ref(props.initialSearch || '');

// --- Computed Properties ---

// Filtra los productos basado en la categoría activa y el término de búsqueda.
const filteredProducts = computed(() => {
    let products = allProducts;

    // 1. Filtrar por categoría
    if (activeCategory.value !== 'Todos') {
        products = products.filter(p => p.category === activeCategory.value);
    }

    // 2. Filtrar por texto de búsqueda (si existe)
    if (searchQuery.value && searchQuery.value.length > 1) {
        const lowerCaseQuery = searchQuery.value.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(lowerCaseQuery) ||
            p.description.toLowerCase().includes(lowerCaseQuery)
        );
    }

    return products;
});

// Determina los productos visibles según el contador
const visibleProducts = computed(() => {
    return filteredProducts.value.slice(0, displayedCount.value);
});

// Verifica si hay más productos para mostrar
const hasMoreProducts = computed(() => {
    return displayedCount.value < filteredProducts.value.length;
});

// --- Methods ---

// Carga más productos
const loadMore = () => {
    displayedCount.value += 8;
};

// Cambia la categoría activa y resetea el contador
const setActiveCategory = (category) => {
    activeCategory.value = category;
    displayedCount.value = 12; // Reset count when category changes
};

// Abre WhatsApp con un mensaje de cotización
const requestQuote = (productName) => {
    const phoneNumber = '5213310440741';
    const message = `Hola, me gustaría solicitar una cotización para el producto: ${productName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

// Funciones para el carrusel de imágenes de cada tarjeta
const nextImage = (productId, imageCount) => {
    currentImageIndexes.value[productId] = (currentImageIndexes.value[productId] + 1) % imageCount;
};

const prevImage = (productId, imageCount) => {
    currentImageIndexes.value[productId] = (currentImageIndexes.value[productId] - 1 + imageCount) % imageCount;
};

// --- Watchers ---

// Observa cambios en searchQuery para actualizar la URL sin recargar la página.
// Esto permite que la URL refleje siempre el filtro actual.
watch(searchQuery, (newValue) => {
    router.get(route('landing.products'), { search: newValue }, {
        preserveState: true,
        replace: true,
    });
});


// --- Lifecycle Hooks ---

// Inicializa la animación y los índices de las imágenes
onMounted(() => {
    setTimeout(() => {
        isMounted.value = true;
    }, 100);
    allProducts.forEach(p => {
        currentImageIndexes.value[p.id] = 0;
    });
});
</script>

<template>
    <LandingLayout title="Productos">
        <!-- Hero Section -->
        <section class="bg-slate-100 py-12 md:py-20">
            <div class="container mx-auto px-4 text-center">
                <h1
                    class="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 transition-all duration-700 ease-out"
                    :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                >
                    Nuestro Catálogo de Productos
                </h1>
                <p
                    class="text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 ease-out delay-200"
                    :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                >
                    Explora nuestra amplia gama de soluciones en empaque y embalaje, diseñadas para ofrecer la máxima calidad y eficiencia.
                </p>
            </div>
        </section>

        <!-- Products Section -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <!-- Search and Categories -->
            <div class="md:flex md:justify-between md:items-center mb-12">
                 <!-- Buscador -->
                <div class="relative mb-6 md:mb-0 md:w-1/3">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Buscar por nombre o descripción..."
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                    >
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div
                class="mb-12 transition-all duration-700 ease-out delay-300"
                :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
            >
                <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Categorías</h2>
                <div class="flex flex-wrap justify-center gap-2 md:gap-4">
                     <button
                        @click="setActiveCategory('Todos')"
                        :class="['px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105', activeCategory === 'Todos' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200']">
                        Todos
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category"
                        @click="setActiveCategory(category)"
                        :class="['px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105', activeCategory === category ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200']">
                        {{ category }}
                    </button>
                </div>
            </div>

            <!-- Products Grid -->
             <div v-if="visibleProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div
                    v-for="(product, index) in visibleProducts"
                    :key="product.id"
                    class="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col"
                    :style="{ transitionDelay: `${index * 50}ms` }"
                    :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
                >
                    <!-- Image Carousel -->
                    <div class="relative w-full h-56">
                        <img
                            v-for="(image, imgIndex) in product.images"
                            :key="imgIndex"
                            :src="image"
                            :alt="`${product.name} - imagen ${imgIndex + 1}`"
                            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                            :class="currentImageIndexes[product.id] === imgIndex ? 'opacity-100' : 'opacity-0'"
                        >
                        <!-- Carousel Controls -->
                        <template v-if="product.images.length > 1">
                            <button @click.stop.prevent="prevImage(product.id, product.images.length)" class="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button @click.stop.prevent="nextImage(product.id, product.images.length)" class="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </template>
                    </div>
                    <!-- Product Info -->
                    <div class="p-5 flex flex-col flex-grow">
                        <p class="text-xs text-amber-600 font-semibold mb-1">{{ product.category }}</p>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate flex-grow" :title="product.name">{{ product.name }}</h3>
                        <p class="text-sm text-gray-500 mb-4 h-10 overflow-hidden">{{ product.description }}</p>
                        <button @click="requestQuote(product.name)" class="mt-auto w-full inline-block text-center bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300">
                           Solicitar Cotización
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mensaje si no hay resultados -->
            <div v-else class="text-center py-16">
                 <p class="text-xl text-gray-500">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>


            <!-- "Cargar Más" Button -->
            <div
                v-if="hasMoreProducts"
                class="text-center mt-16 transition-all duration-700 ease-out"
                :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
            >
                <button @click="loadMore" class="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition-colors duration-300 text-lg transform hover:scale-105">
                    Cargar más productos
                </button>
            </div>
            <a v-else href="https://www.propackgdl.com.mx/" class="mt-10 inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                Visita nuestra tienda
            </a>
        </div>
    </LandingLayout>
</template>
