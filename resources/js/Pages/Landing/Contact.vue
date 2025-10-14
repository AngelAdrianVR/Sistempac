<script setup>
import LandingLayout from '@/Layouts/LandingLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

// Usamos useForm de Inertia para manejar el estado del formulario
const form = useForm({
    name: '',
    email: '',
    phone: '',
    message: '',
});

// Función para manejar el envío del formulario
const submit = () => {
    // Hacemos un POST a la ruta del backend que hemos definido.
    // El backend se encargará de redirigir a WhatsApp.
    form.post(route('contact.send'), {
        onSuccess: () => form.reset(),
        // onSuccess se ejecutará si el usuario vuelve a la página,
        // reseteando el formulario.
    });
};

// Lógica para las animaciones de entrada
const isMounted = ref(false);
onMounted(() => {
    // Retrasamos la activación para que la transición sea visible
    setTimeout(() => {
        isMounted.value = true;
    }, 100);
});

// Información de contacto
const contactInfo = [
    { icon: 'phone', text: '33-3656-6410', href: 'tel:3336566410' },
    { icon: 'mail', text: 'ventas@propackgdl.com.mx', href: 'mailto:ventas@propackgdl.com.mx' },
    { icon: 'location', text: 'Aluminio 23, San José del Bajío, 45140 Zapopan, Jal.', href: 'https://maps.app.goo.gl/yYd5gLqGzX5a9zJG9' },
];
</script>

<template>
    <LandingLayout title="Contacto">
        <!-- Hero Section -->
        <section class="bg-slate-100 py-12 md:py-20">
            <div class="container mx-auto px-4 text-center">
                <h1
                    class="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 transition-all duration-700 ease-out"
                    :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                >
                    Contáctanos
                </h1>
                <p
                    class="text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 ease-out delay-200"
                    :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                >
                    Estamos aquí para ayudarte. Envíanos un mensaje o visítanos.
                </p>
            </div>
        </section>

        <!-- Contact Form and Info Section -->
        <section class="py-16 md:py-24 bg-white">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <!-- Contact Info -->
                    <div
                        class="transition-all duration-700 ease-out delay-300"
                         :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                    >
                        <h2 class="text-3xl font-bold text-slate-800 mb-6">Información de Contacto</h2>
                        <p class="text-gray-600 mb-8 leading-relaxed">
                            No dudes en llamarnos o enviarnos un correo electrónico con cualquier pregunta que tengas. Nuestro equipo está listo para atenderte.
                        </p>

                        <div class="space-y-6">
                            <a v-for="info in contactInfo" :key="info.text" :href="info.href" target="_blank" class="flex items-start group">
                                <div class="bg-amber-100 text-amber-600 rounded-full p-3 mr-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                    <svg v-if="info.icon === 'phone'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <svg v-if="info.icon === 'mail'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    <svg v-if="info.icon === 'location'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <div>
                                    <span class="text-gray-800 font-semibold group-hover:text-amber-600 transition-colors">{{ info.text }}</span>
                                </div>
                            </a>
                        </div>
                        
                        <!-- MAPA ACTUALIZADO -->
                        <div class="mt-10 rounded-lg overflow-hidden shadow-lg h-80">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.87030800048!2d-103.41113172571404!3d20.71536758087961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428af6045151525%3A0x44616233155d541e!2sAluminio%2023%2C%20San%20Jos%C3%A9%20del%20Baj%C3%ADo%2C%2045132%20Zapopan%2C%20Jal.!5e0!3m2!1sen!2smx!4v1728683268875!5m2!1sen!2smx" 
                                width="100%" 
                                height="100%" 
                                style="border:0;" 
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                    
                    <!-- Contact Form -->
                    <div
                        class="bg-gray-50 p-8 rounded-lg shadow-lg transition-all duration-700 ease-out delay-500"
                        :class="isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                    >
                        <h2 class="text-3xl font-bold text-slate-800 mb-6">Envíanos un Mensaje</h2>
                        <form @submit.prevent="submit">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <!-- Name -->
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                    <input type="text" id="name" v-model="form.name" class="block w-full px-4 py-3 bg-white border-gray-300 border rounded-lg focus:ring-amber-500 focus:border-amber-500 transition" required>
                                    <div v-if="form.errors.name" class="text-red-500 text-xs mt-1">{{ form.errors.name }}</div>
                                </div>
                                <!-- Phone -->
                                <div>
                                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                    <input type="tel" id="phone" v-model="form.phone" class="block w-full px-4 py-3 bg-white border-gray-300 border rounded-lg focus:ring-amber-500 focus:border-amber-500 transition">
                                </div>
                            </div>
                            <!-- Email -->
                            <div class="mb-6">
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                                <input type="email" id="email" v-model="form.email" class="block w-full px-4 py-3 bg-white border-gray-300 border rounded-lg focus:ring-amber-500 focus:border-amber-500 transition" required>
                                <div v-if="form.errors.email" class="text-red-500 text-xs mt-1">{{ form.errors.email }}</div>
                            </div>
                            <!-- Message -->
                            <div class="mb-8">
                                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                                <textarea id="message" v-model="form.message" rows="5" class="block w-full px-4 py-3 bg-white border-gray-300 border rounded-lg focus:ring-amber-500 focus:border-amber-500 transition" required></textarea>
                                <div v-if="form.errors.message" class="text-red-500 text-xs mt-1">{{ form.errors.message }}</div>
                            </div>
                            <!-- Submit Button -->
                            <button type="submit" :disabled="form.processing" class="w-full bg-slate-800 text-white font-bold py-4 px-6 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 transition-transform transform hover:scale-105 disabled:opacity-50">
                                Enviar Mensaje por WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </LandingLayout>
</template>
