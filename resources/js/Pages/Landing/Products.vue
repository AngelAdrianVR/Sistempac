<script setup>
import LandingLayout from '@/Layouts/LandingLayout.vue';
import ProductCard from '@/Components/ProductCard.vue'; // 1. Import the new component
import { ref, onMounted, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { categories, allProducts } from './products.js';

// --- Props ---
const props = defineProps({
    initialSearch: String,
});

// --- State Management ---
// State related to individual cards (expandedDetails, etc.) has been removed.
const activeCategory = ref('Todos');
const displayedCount = ref(12);
const isMounted = ref(false);
const searchQuery = ref(props.initialSearch || '');

// --- Computed Properties ---

// Filters products based on active category and search query.
const filteredProducts = computed(() => {
    let products = allProducts;
    if (activeCategory.value !== 'Todos') {
        products = products.filter(p => p.category === activeCategory.value);
    }
    if (searchQuery.value && searchQuery.value.length > 1) {
        const lowerCaseQuery = searchQuery.value.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(lowerCaseQuery) ||
            p.description.toLowerCase().includes(lowerCaseQuery)
        );
    }
    return products;
});

// Determines the visible products based on the display count.
const visibleProducts = computed(() => {
    return filteredProducts.value.slice(0, displayedCount.value);
});

// Checks if there are more products to load.
const hasMoreProducts = computed(() => {
    return displayedCount.value < filteredProducts.value.length;
});

// --- Methods ---

// Loads more products.
const loadMore = () => {
    displayedCount.value += 8;
};

// Sets the active category and resets the product count.
const setActiveCategory = (category) => {
    activeCategory.value = category;
    displayedCount.value = 12;
};

// This method now handles the event emitted from the ProductCard component.
const requestQuote = (productName) => {
    const phoneNumber = '5213310440741';
    const message = `Hola, me gustaría solicitar una cotización para el producto: ${productName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

// --- Watchers ---

// Updates the URL with the current search query without reloading the page.
watch(searchQuery, (newValue) => {
    router.get(route('landing.products'), { search: newValue }, {
        preserveState: true,
        replace: true,
    });
});


// --- Lifecycle Hooks ---

// Initializes animations on component mount.
onMounted(() => {
    setTimeout(() => {
        isMounted.value = true;
    }, 100);
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
                 <!-- Search Input -->
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
             <div v-if="visibleProducts.length > 0" class="grid grid-cols-1 gap-5">
                <!-- 2. Use the new ProductCard component in a loop -->
                <ProductCard
                    v-for="(product, index) in visibleProducts"
                    :key="product.id"
                    :product="product"
                    :is-mounted="isMounted"
                    :index="index"
                />
            </div>
            <!-- No results message -->
            <div v-else class="text-center py-16">
                 <p class="text-xl text-gray-500">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>


            <!-- "Load More" Button -->
            <div
                v-if="hasMoreProducts"
                class="text-center mt-16 transition-all duration-700 ease-out"
                :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
            >
                <button @click="loadMore" class="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition-colors duration-300 text-lg transform hover:scale-105">
                    Cargar más productos
                </button>
            </div>
            <!-- <a v-else href="https://www.propackgdl.com.mx/" class="mt-10 inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                Visita nuestra tienda
            </a> -->
        </div>
    </LandingLayout>
</template>

<style scoped>
/* Scoped styles can remain if they are specific to the layout of this page */
</style>
