<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { Link, Head, usePage, router } from '@inertiajs/vue3';
import { allProducts } from '@/Pages/Landing/products.js';

defineProps({
    title: String,
});

const page = usePage();
const isMobileMenuOpen = ref(false);

// --- Search Logic ---
const searchQuery = ref('');
const searchResults = ref([]);
const isSearchActive = ref(false);
const searchContainer = ref(null);

watch(searchQuery, (newQuery) => {
    if (newQuery.length > 1) {
        isSearchActive.value = true;
        searchResults.value = allProducts.filter(p =>
            p.name.toLowerCase().includes(newQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(newQuery.toLowerCase())
        ).slice(0, 5);
    } else {
        searchResults.value = [];
    }
});

/**
 * Redirige a la página de productos con el término de búsqueda seleccionado.
 * @param {object} product - El producto seleccionado de la lista de búsqueda.
 */
const goToProduct = (product) => {
    searchQuery.value = '';
    searchResults.value = [];
    isSearchActive.value = false;
    isMobileMenuOpen.value = false;
    // Cambiamos la ruta para que apunte a la página de productos,
    // pasando el nombre del producto como parámetro de búsqueda 'search'.
    router.visit(route('landing.products', { search: product.name }));
};

// --- Click Outside Logic ---
const handleClickOutside = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    isSearchActive.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});


// --- Navigation and Footer Data ---
const navLinks = [
    { name: 'Inicio', routeName: 'landing.index', href: route('landing.index') },
    { name: 'Productos', routeName: 'landing.products', href: route('landing.products') },
    { name: '¿Quiénes somos?', routeName: 'landing.whoWeAre', href: route('landing.whoWeAre') },
    { name: 'Contacto', routeName: 'landing.contact', href: route('landing.contact') },
];

const footerSections = {
    contacto: {
        title: 'Contacto',
        items: [
            { text: '33-3656-6410', icon: 'phone' },
            { text: 'Zona Norte: 33-1146-4928', icon: 'phone' },
            { text: 'Zona Sur: 33-1044-0741', icon: 'phone' },
        ]
    },
    horarios: {
        title: 'Horario de atención',
        items: [
            { text: 'Lunes a Viernes: 8:00 - 18:00', icon: 'clock' },
        ]
    },
    enlaces: {
        title: 'Enlaces',
        items: [
            { text: 'Inicio', href: route('landing.index') },
            { text: 'Productos', href: route('landing.products') },
            { text: '¿Quiénes somos?', href: route('landing.whoWeAre') },
            { text: 'Contacto', href: route('landing.contact') },
            // { text: 'Tienda', href: 'https://www.propackgdl.com.mx/' },
            // { text: 'Aviso de privacidad', href: '#' },
        ]
    }
};

const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
];

</script>

<template>
<Head :title="title" />
    <div class="bg-gray-50 min-h-screen font-sans text-gray-800">
         <!-- Header -->
        <header class="bg-white shadow-sm sticky top-0 z-50">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <!-- Logo -->
                    <div class="flex-shrink-0">
                        <Link :href="route('landing.index')" class="text-2xl font-bold">
                            <img class="w-72 md:w-60 lg:w-96" src="/images/logo_sistempac.png" alt="PROPACK">
                        </Link>
                    </div>

                    <!-- Desktop Navigation -->
                    <nav class="hidden md:flex items-center space-x-8">
                        <Link v-for="link in navLinks"
                           :key="link.name"
                           :href="link.href"
                           class="text-gray-600 hover:text-amber-500 transition-colors duration-300 font-medium relative"
                           :class="{ 'text-amber-500 font-semibold': route().current(link.routeName) }">
                            {{ link.name }}
                             <span v-if="route().current(link.routeName)" class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full"></span>
                        </Link>
                        <!-- <a href="https://www.propackgdl.com.mx/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-slate-800 hover:bg-slate-700 transition-colors duration-300">
                            Tienda
                        </a> -->
                    </nav>

                     <!-- Search Bar (Desktop) -->
                    <div class="hidden md:flex items-center">
                         <div class="relative" ref="searchContainer">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                class="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                                v-model="searchQuery"
                                @focus="isSearchActive = true"
                            >
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <!-- Search Results -->
                            <div v-if="searchQuery.length > 1 && isSearchActive" class="absolute mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden z-10">
                                <ul>
                                    <li v-if="searchResults.length === 0" class="px-4 py-3 text-sm text-gray-500">No se encontraron resultados.</li>
                                    <li v-for="product in searchResults" :key="product.id" @click="goToProduct(product)" class="cursor-pointer hover:bg-gray-100">
                                        <div class="flex items-center px-4 py-3">
                                            <!-- FIX: Check for models and images before rendering -->
                                            <img v-if="product.models && product.models.length > 0 && product.models[0].images && product.models[0].images.length > 0"
                                                 :src="product.models[0].images[0]"
                                                 :alt="product.name"
                                                 class="w-10 h-10 object-cover rounded-md mr-3 flex-shrink-0">
                                            <!-- Fallback placeholder if no image is available -->
                                            <div v-else class="w-10 h-10 bg-gray-200 rounded-md mr-3 flex items-center justify-center flex-shrink-0">
                                                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"></path></svg>
                                            </div>
                                            <span class="text-sm text-gray-700 font-medium">{{ product.name }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <div class="md:hidden flex items-center">
                        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                            <span class="sr-only">Abrir menú principal</span>
                            <svg v-if="!isMobileMenuOpen" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
             <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 -translate-y-4"
                enter-to-class="transform opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 translate-y-0"
                leave-to-class="transform opacity-0 -translate-y-4">
                <div v-if="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
                    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         <!-- Search Bar (Mobile) -->
                         <div class="relative px-2 pb-4">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                                v-model="searchQuery"
                            >
                            <div class="absolute top-3 left-0 pl-5 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                             <!-- Search Results (Mobile) -->
                            <div v-if="searchQuery.length > 1" class="absolute mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden z-10 left-0 px-2">
                                <ul class="max-h-60 overflow-y-auto">
                                    <li v-if="searchResults.length === 0" class="px-4 py-3 text-sm text-gray-500">No se encontraron resultados.</li>
                                    <li v-for="product in searchResults" :key="product.id" @click="goToProduct(product)" class="cursor-pointer hover:bg-gray-100">
                                         <div class="flex items-center px-4 py-3">
                                            <!-- FIX: Check for models and images before rendering -->
                                            <img v-if="product.models && product.models.length > 0 && product.models[0].images && product.models[0].images.length > 0"
                                                 :src="product.models[0].images[0]"
                                                 :alt="product.name"
                                                 class="w-10 h-10 object-cover rounded-md mr-3 flex-shrink-0">
                                            <!-- Fallback placeholder if no image is available -->
                                            <div v-else class="w-10 h-10 bg-gray-200 rounded-md mr-3 flex items-center justify-center flex-shrink-0">
                                                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"></path></svg>
                                            </div>
                                            <span class="text-sm text-gray-700 font-medium">{{ product.name }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Link v-for="link in navLinks"
                           :key="link.name"
                           :href="link.href"
                           @click="isMobileMenuOpen = false"
                           class="block px-3 py-2 rounded-md text-base font-medium"
                           :class="route().current(link.routeName) ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-100'">
                            {{ link.name }}
                        </Link>
                        <!-- <a href="https://www.propackgdl.com.mx/" target="_blank" rel="noopener noreferrer" class="bg-slate-800 text-white block px-3 py-2 rounded-md text-base font-medium text-center">
                            Tienda
                        </a> -->
                    </div>
                </div>
            </transition>
        </header>

        <!-- Main Content -->
        <main>
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-slate-800 text-gray-300">
            <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Company Info -->
                    <div class="md:col-span-2 lg:col-span-1">
                        <Link :href="route('landing.index')" class="text-2xl font-bold mb-4 block">
                           <img class="w-48 md:w-64" src="/images/logo_sistempac.png" alt="PROPACK">
                        </Link>
                        <p class="text-sm text-gray-400">
                            Soluciones integrales en empaque y embalaje para proteger y transportar tus productos con la máxima seguridad y eficiencia.
                        </p>
                    </div>

                    <!-- Contact -->
                    <div>
                        <h4 class="font-semibold text-white tracking-wider uppercase mb-4">{{ footerSections.contacto.title }}</h4>
                        <ul class="space-y-2">
                            <li v-for="item in footerSections.contacto.items" :key="item.text" class="flex items-center text-sm">
                                <svg class="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span>{{ item.text }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Hours & Links -->
                    <div>
                         <h4 class="font-semibold text-white tracking-wider uppercase mb-4">{{ footerSections.horarios.title }}</h4>
                        <ul class="space-y-2 mb-6">
                             <li v-for="item in footerSections.horarios.items" :key="item.text" class="flex items-center text-sm">
                                <svg class="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{{ item.text }}</span>
                            </li>
                        </ul>
                        <h4 class="font-semibold text-white tracking-wider uppercase mb-4">{{ footerSections.enlaces.title }}</h4>
                         <ul class="space-y-2">
                             <li v-for="item in footerSections.enlaces.items" :key="item.text">
                                 <a v-if="item.href.startsWith('http')" :href="item.href" target="_blank" rel="noopener noreferrer" class="text-sm hover:text-amber-500 transition-colors">{{ item.text }}</a>
                                 <Link v-else :href="item.href" class="text-sm hover:text-amber-500 transition-colors">{{ item.text }}</Link>
                             </li>
                         </ul>
                    </div>

                    <!-- Social Media -->
                    <div class="relative">
                        <!-- <h4 class="font-semibold text-white tracking-wider uppercase mb-4">Síguenos</h4>
                        <div class="flex space-x-4">
                            <a v-for="social in socialLinks" :key="social.name" :href="social.href" class="text-gray-400 hover:text-amber-500 transition-colors">
                                <span class="sr-only">{{ social.name }}</span>
                                <svg v-if="social.icon === 'facebook'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                                <svg v-if="social.icon === 'twitter'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                <svg v-if="social.icon === 'linkedin'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" /></svg>
                                <svg v-if="social.icon === 'instagram'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm0 1.62c-2.403 0-2.73.01-3.682.055-1.002.045-1.503.2-1.842.345a3.278 3.278 0 00-1.18.82 3.278 3.278 0 00-.82 1.18c-.145.339-.3.84-.345 1.842C3.63 8.182 3.62 8.51 3.62 10.915s.01 2.73.055 3.682c.045 1.002.2 1.503.345 1.842a3.278 3.278 0 00.82 1.18 3.278 3.278 0 001.18.82c.339.145.84.3 1.842.345 1.024.048 1.37.058 3.828.058s2.804-.01 3.828-.058c1.002-.045 1.503-.2 1.842-.345a3.278 3.278 0 001.18-.82 3.278 3.278 0 00.82-1.18c.145-.339.3-.84.345-1.842.048-1.024.058-1.37.058-3.828s-.01-2.804-.058-3.828c-.045-1.002-.2-1.503-.345-1.842a3.278 3.278 0 00-.82-1.18 3.278 3.278 0 00-1.18-.82c-.339-.145-.84-.3-1.842-.345C15.05 3.63 14.72 3.62 12.315 3.62zm0 3.115a6.185 6.185 0 100 12.37 6.185 6.185 0 000-12.37zm0 1.62a4.565 4.565 0 110 9.13 4.565 4.565 0 010-9.13z" clip-rule="evenodd" /></svg>
                            </a>
                        </div> -->

                        <!-- Creditos DTW -->
                        <div class="absolute -right-0 bottom-0">
                            <figure class="cursor-pointer">
                                <a class="flex justify-end items-center" href="https://dtw.com.mx/" target="_blank">
                                    <p class="text-white text-xl">BY</p>
                                    <img class="w-20 lg:w-[30%]" src="@/../../public/images/DTW_logo_blanco.png" alt="">
                                </a>
                            </figure>
                        </div>
                    </div>
                </div>

                <div class="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; {{ new Date().getFullYear() }} SISTEMPAC PROPACK. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    </div>
</template>
