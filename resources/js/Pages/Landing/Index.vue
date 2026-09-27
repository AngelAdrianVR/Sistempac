<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import LandingLayout from '@/Layouts/LandingLayout.vue';

/* -------------------------------------------------------------------------- */
/*  UTILIDADES                                                                */
/* -------------------------------------------------------------------------- */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, t) => start * (1 - t) + end * t;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const smoothstep = (edge0, edge1, x) => {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);

    return t * t * (3 - 2 * t);
};

/* -------------------------------------------------------------------------- */
/*  REFERENCIAS DEL DOM                                                       */
/* -------------------------------------------------------------------------- */
const rootEl = ref(null);
const strappingRoll = ref(null);
const heroRollAnchor = ref(null);
const cardRollAnchor = ref(null);
const scrollHint = ref(null);
const progressBar = ref(null);

/* -------------------------------------------------------------------------- */
/*  CONTENIDO                                                                 */
/* -------------------------------------------------------------------------- */
const heroFacts = [
    {
        label: 'Cobertura',
        value: 'Zona Norte y Zona Sur',
        paths: [
            'M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
            'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
        ],
    },
    {
        label: 'Horario',
        value: 'Lun a Vie · 8:00 – 18:00',
        paths: ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'],
    },
    {
        label: 'Atención',
        value: 'Asesoría personalizada',
        paths: ['M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'],
    },
];

const categories = [
    {
        title: 'Flejes y Cintas',
        text: 'Plástico, acero y textiles para cualquier tipo de carga. Resistencia y durabilidad garantizadas.',
        paths: ['M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'],
    },
    {
        title: 'Maquinaria',
        text: 'Equipos automáticos y semiautomáticos para optimizar tu proceso de embalaje.',
        paths: [
            'M12 6V4m0 12v-2m0-6v.01M6 12h.01M18 12h.01M6 18h.01M18 6h.01M6 6h.01M18 18h.01M12 18h.01M12 6h.01M12 12h.01',
            'M12 12l-6-6m12 0l-6 6m0 6l6-6m-6 6l-6-6',
        ],
    },
    {
        title: 'Otros Consumibles',
        text: 'Película stretch, cintas adhesivas y todo lo que necesitas para un empaque seguro.',
        paths: ['M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'],
    },
];

const qualityFeatures = [
    { text: 'Medidas 3/8", 1/2", 5/8"', paths: ['M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5'] },
    { text: 'Material resistente', paths: ['M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'] },
    { text: 'Polipropileno/PET', paths: ['M3 10h18M3 14h18m-9-4v8'] },
];

const solutionSteps = [
    'Análisis de la línea de producción.',
    'Selección de materiales óptimos.',
    'Pruebas de resistencia y durabilidad.',
];

const contactPhones = [
    { zone: 'Zona Norte', phone: '33-1146-4928', tel: '3311464928' },
    { zone: 'Zona Sur', phone: '33-1044-0741', tel: '3310440741' },
];

/* -------------------------------------------------------------------------- */
/*  MOTOR DE SCROLL: ROLLO DE FLEJE + PARALLAX + PROGRESO                     */
/* -------------------------------------------------------------------------- */
const ROLL_BASE_SIZE = 170; // Tamaño base (px) del contenedor del rollo animado.

const revealElements = ref([]);

const registerReveal = (el) => {
    const node = el instanceof Element ? el : (el && el.$el instanceof Element ? el.$el : null);

    if (node && !revealElements.value.includes(node)) {
        revealElements.value.push(node);
    }
};

let revealObserver = null;
let resizeObserver = null;
let rafId = null;
let lastFrame = 0;
let running = false;
let destroyed = false;
let reduceMotion = false;
let fadeIn = 0;
let fadeInTarget = 0;
let parallaxElements = [];

const metrics = { hero: null, card: null, start: 0, end: 0, docHeight: 1 };
const rollState = { x: 0, y: 0, scale: 1, rotate: 0, opacity: 0, ready: false };
const rollTarget = { x: 0, y: 0, scale: 1, rotate: 0, opacity: 0 };

/* Posición de un elemento relativa al documento (inmune a transforms). */
const documentPositionOf = (el) => {
    let x = 0;
    let y = 0;
    let node = el;

    while (node) {
        x += node.offsetLeft || 0;
        y += node.offsetTop || 0;
        node = node.offsetParent;
    }

    return { x, y };
};

/* Centro visual real de un elemento: centro de maquetación + los translate CSS
   propios y de sus ancestros (por ejemplo el parallax). La posición base se mide
   con offsetTop/offsetLeft, que son inmunes a los transforms. */
const visualCenterOf = (el) => {
    const pos = documentPositionOf(el);
    let offsetX = 0;
    let offsetY = 0;

    for (let node = el; node instanceof Element; node = node.parentElement) {
        const transform = getComputedStyle(node).transform;

        if (transform && transform !== 'none') {
            const matrix = new DOMMatrixReadOnly(transform);
            offsetX += matrix.m41;
            offsetY += matrix.m42;
        }
    }

    return {
        x: pos.x + el.offsetWidth / 2 + offsetX,
        y: pos.y + el.offsetHeight / 2 + offsetY,
        size: el.offsetWidth,
    };
};

const measureLayout = () => {
    if (destroyed) return;

    const viewportHeight = window.innerHeight;

    if (heroRollAnchor.value && cardRollAnchor.value) {
        metrics.hero = visualCenterOf(heroRollAnchor.value);
        metrics.card = visualCenterOf(cardRollAnchor.value);

        metrics.start = 0;
        metrics.end = Math.max(600, metrics.card.y - viewportHeight * 0.55);
    }

    metrics.docHeight = Math.max(1, document.documentElement.scrollHeight - viewportHeight);

    parallaxElements = rootEl.value
        ? Array.from(rootEl.value.querySelectorAll('[data-parallax]')).map((el) => {
            const pos = documentPositionOf(el);

            return {
                el,
                center: pos.y + el.offsetHeight / 2,
                speed: parseFloat(el.dataset.parallax) || 0,
                max: parseFloat(el.dataset.parallaxMax) || 28,
            };
        })
        : [];
};

const renderFrame = (now) => {
    const delta = Math.min((now - lastFrame) / 1000 || 0.016, 0.05);
    lastFrame = now;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    /* Barra de progreso de lectura */
    if (progressBar.value) {
        progressBar.value.style.transform = `scaleX(${clamp(scrollY / metrics.docHeight, 0, 1).toFixed(4)})`;
    }

    /* El indicador de scroll se desvanece al empezar a navegar */
    if (scrollHint.value) {
        scrollHint.value.style.opacity = clamp(1 - scrollY / 260, 0, 1).toFixed(3);
    }

    /* Viaje del rollo de fleje: del hero a la tarjeta de calidad */
    if (strappingRoll.value && metrics.hero && metrics.card) {
        const progress = clamp((scrollY - metrics.start) / Math.max(1, metrics.end - metrics.start), 0, 1);
        const eased = easeInOutCubic(progress);
        const arc = Math.sin(Math.PI * progress);
        const rest = 1 - smoothstep(0.02, 0.3, Math.min(progress, 1 - progress));

        const heroScale = metrics.hero.size / ROLL_BASE_SIZE;
        const cardScale = metrics.card.size / ROLL_BASE_SIZE;

        rollTarget.x =
            lerp(metrics.hero.x, metrics.card.x, eased)
            + arc * -window.innerWidth * 0.09
            + Math.sin(now * 0.0011) * 2.5 * rest;

        rollTarget.y =
            lerp(metrics.hero.y, metrics.card.y, eased)
            + arc * viewportHeight * 0.045
            - scrollY
            + Math.sin(now * 0.0014 + 0.7) * 3.5 * rest;

        rollTarget.scale =
            lerp(heroScale, cardScale, eased)
            * (1 + arc * 0.05 + Math.sin(now * 0.0013) * 0.012 * rest);

        rollTarget.rotate = -372 * easeInOutQuad(progress) + Math.sin(now * 0.0009 + 1.3) * 1.6 * rest;

        /* Acople con la tarjeta de calidad mediante fundido cruzado */
        const docking = smoothstep(0.86, 0.97, progress);
        rollTarget.opacity = fadeIn * (1 - docking);

        if (cardRollAnchor.value) {
            cardRollAnchor.value.style.opacity = docking.toFixed(4);
            cardRollAnchor.value.style.transform = `rotate(-12deg) scale(${(1.07 - 0.07 * docking).toFixed(4)})`;
        }
    }

    /* Aparición inicial del rollo */
    fadeIn += (fadeInTarget - fadeIn) * (1 - Math.exp(-delta * 2.2));

    /* Suavizado con inercia: el rollo persigue su objetivo en cada frame */
    const positionK = 1 - Math.exp(-delta * 9.5);
    const rotationK = 1 - Math.exp(-delta * 6.5);
    const scaleK = 1 - Math.exp(-delta * 8);
    const opacityK = 1 - Math.exp(-delta * 5.5);

    if (!rollState.ready && strappingRoll.value) {
        rollState.x = rollTarget.x;
        rollState.y = rollTarget.y;
        rollState.scale = rollTarget.scale;
        rollState.rotate = rollTarget.rotate;
        rollState.opacity = 0;
        rollState.ready = true;
    }

    rollState.x += (rollTarget.x - rollState.x) * positionK;
    rollState.y += (rollTarget.y - rollState.y) * positionK;
    rollState.scale += (rollTarget.scale - rollState.scale) * scaleK;
    rollState.rotate += (rollTarget.rotate - rollState.rotate) * rotationK;
    rollState.opacity += (rollTarget.opacity - rollState.opacity) * opacityK;

    if (strappingRoll.value) {
        const el = strappingRoll.value;

        el.style.transform =
            `translate3d(${(rollState.x - ROLL_BASE_SIZE / 2).toFixed(1)}px, ${(rollState.y - ROLL_BASE_SIZE / 2).toFixed(1)}px, 0) `
            + `rotate(${rollState.rotate.toFixed(2)}deg) scale(${rollState.scale.toFixed(4)})`;
        el.style.opacity = rollState.opacity.toFixed(3);
        el.style.visibility = rollState.opacity < 0.012 ? 'hidden' : 'visible';
    }

    /* Parallax sutil por profundidad */
    for (const item of parallaxElements) {
        const relative = item.center - (scrollY + viewportHeight / 2);

        if (Math.abs(relative) > viewportHeight * 1.4) continue;

        item.el.style.transform = `translate3d(0, ${clamp(-relative * item.speed, -item.max, item.max).toFixed(2)}px, 0)`;
    }
};

const frameLoop = (now) => {
    if (!running) return;

    renderFrame(now);
    rafId = requestAnimationFrame(frameLoop);
};

/* -------------------------------------------------------------------------- */
/*  CICLO DE VIDA                                                             */
/* -------------------------------------------------------------------------- */
onMounted(() => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    measureLayout();
    requestAnimationFrame(measureLayout);

    /* Revelado progresivo de bloques al entrar en pantalla */
    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                let delay = parseInt(el.dataset.delay || '0', 10);
                const group = el.closest('[data-reveal-group]');

                if (group && !el.dataset.delay) {
                    delay = Math.max(0, Array.from(group.querySelectorAll('.reveal')).indexOf(el)) * 110;
                }

                el.style.setProperty('--rd', `${delay}ms`);
                el.classList.add('is-visible');
                revealObserver.unobserve(el);
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    revealElements.value.forEach((el) => revealObserver.observe(el));

    if (reduceMotion) {
        revealElements.value.forEach((el) => el.classList.add('is-visible'));

        if (cardRollAnchor.value) {
            cardRollAnchor.value.style.opacity = '1';
            cardRollAnchor.value.style.transform = 'rotate(-12deg)';
        }

        return;
    }

    window.addEventListener('load', measureLayout);
    window.addEventListener('resize', measureLayout, { passive: true });

    /* Recalcular medidas cuando el layout cambie (imágenes, fuentes, etc.) */
    resizeObserver = new ResizeObserver(measureLayout);
    resizeObserver.observe(document.body);

    setTimeout(measureLayout, 600);
    setTimeout(measureLayout, 1800);

    /* Arrancar el motor de animación */
    running = true;
    lastFrame = performance.now();
    rafId = requestAnimationFrame(frameLoop);

    /* El rollo aparece cuando la página ya está lista */
    setTimeout(() => {
        fadeInTarget = 1;
    }, 450);
});

onUnmounted(() => {
    destroyed = true;
    running = false;

    if (rafId) cancelAnimationFrame(rafId);
    if (revealObserver) revealObserver.disconnect();
    if (resizeObserver) resizeObserver.disconnect();

    window.removeEventListener('load', measureLayout);
    window.removeEventListener('resize', measureLayout);
});
</script>

<template>
    <Head title="Inicio" />
    <LandingLayout>
        <!-- Barra de progreso de lectura -->
        <div class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
            <div ref="progressBar" class="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500"></div>
        </div>

        <!-- Rollo de fleje que viaja con el scroll hasta la sección de calidad -->
        <div
            ref="strappingRoll"
            class="pointer-events-none fixed left-0 top-0 z-30 h-[170px] w-[170px] opacity-0 will-change-transform"
            aria-hidden="true"
        >
            <img src="/images/fleje_negro_landing.png" alt="" class="h-full w-full object-contain drop-shadow-[0_24px_38px_rgba(30,58,138,0.28)]">
        </div>

        <div ref="rootEl" class="relative z-20 overflow-hidden bg-white">
            <!-- Hero Section -->
            <section id="hero" class="relative flex min-h-screen items-center overflow-hidden">
                <!-- Fondo: cuadrícula sutil con máscara radial -->
                <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>

                <!-- Fondo: halos de color con parallax -->
                <div class="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div data-parallax="0.05" class="absolute -right-40 -top-56 h-[38rem] w-[38rem] rounded-full bg-blue-100/70 blur-3xl"></div>
                    <div data-parallax="-0.04" class="absolute -bottom-72 -left-48 h-[34rem] w-[34rem] rounded-full bg-yellow-500/10 blur-3xl"></div>
                </div>

                <div class="relative z-10 w-full pb-12 pt-8 lg:pb-20 lg:pt-12">
                    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                            <!-- Producto destacado -->
                            <div class="order-1 lg:order-2 lg:col-span-5">
                                <div class="hero-enter-img mx-auto w-[min(84vw,430px)] lg:w-full">
                                    <div class="relative" data-parallax="0.12" data-parallax-max="46">
                                        <img src="/images/landing-hero.png" class="hero-img-fade h-auto w-full" alt="Herramientas de empaque y embalaje">

                                        <!-- Punto de anclaje: centro exacto del grupo de productos -->
                                        <div
                                            ref="heroRollAnchor"
                                            class="pointer-events-none absolute left-1/2 top-[52%] h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 opacity-0 sm:h-[130px] sm:w-[130px] lg:h-[190px] lg:w-[190px]"
                                            aria-hidden="true"
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Mensaje principal -->
                            <div class="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
                                <span class="hero-enter inline-flex items-center gap-2.5 rounded-full border border-blue-900/10 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-900/75 shadow-sm backdrop-blur-sm" style="--d: 0ms">
                                    <span class="relative flex h-2 w-2">
                                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                                        <span class="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                                    </span>
                                    Flejes y productos para empaque
                                </span>

                                <h1 class="hero-enter mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-blue-900 sm:text-5xl lg:text-6xl" style="--d: 130ms">
                                    Soluciones en
                                    <span class="relative inline-block text-yellow-500">
                                        Empaque
                                        <svg class="absolute -bottom-2 left-0 h-[0.3em] w-full overflow-visible" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                                            <path class="hero-underline" d="M3 9C50 3 150 2 197 7" stroke="currentColor" stroke-width="4" stroke-linecap="round" pathLength="1" />
                                        </svg>
                                    </span><br class="hidden sm:block"> que Impulsan tu Negocio
                                </h1>

                                <p class="hero-enter mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0" style="--d: 260ms">
                                    Desde flejes de alta resistencia hasta maquinaria de vanguardia, te ofrecemos la seguridad y eficiencia que tus envíos necesitan.
                                </p>

                                <div class="hero-enter mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start" style="--d: 390ms">
                                    <Link
                                        :href="route('landing.products')"
                                        class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-yellow-500 px-8 py-3.5 text-base font-bold text-blue-900 shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-xl hover:shadow-yellow-500/40"
                                    >
                                        <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"></span>
                                        <span class="relative">Ver catálogo de productos</span>
                                        <svg class="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>

                                    <Link
                                        :href="route('landing.contact')"
                                        class="inline-flex items-center justify-center gap-2 rounded-full border border-blue-900/15 bg-white/80 px-8 py-3.5 text-base font-semibold text-blue-900 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-900/30 hover:bg-white hover:shadow-lg hover:shadow-blue-900/10"
                                    >
                                        Hablar con un asesor
                                    </Link>
                                </div>

                                <!-- Datos rápidos -->
                                <dl class="hero-enter mx-auto mt-9 hidden max-w-3xl grid-cols-1 gap-x-6 gap-y-4 border-t border-blue-900/10 pt-7 sm:grid sm:grid-cols-3 lg:mx-0" style="--d: 520ms">
                                    <div v-for="fact in heroFacts" :key="fact.label" class="flex items-center justify-start gap-3">
                                        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900/[0.05] text-blue-900 ring-1 ring-inset ring-blue-900/10">
                                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                                <path v-for="path in fact.paths" :key="path" stroke-linecap="round" stroke-linejoin="round" :d="path" />
                                            </svg>
                                        </span>
                                        <span class="text-left">
                                            <dt class="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">{{ fact.label }}</dt>
                                            <dd class="text-sm font-semibold text-blue-900">{{ fact.value }}</dd>
                                        </span>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Indicador de scroll -->
                <div ref="scrollHint" class="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 sm:block" aria-hidden="true">
                    <div class="scroll-hint-enter flex flex-col items-center gap-2">
                        <span class="text-[10px] font-bold uppercase tracking-[0.32em] text-gray-400">Descubre</span>
                        <span class="flex h-10 w-6 items-start justify-center rounded-full border border-gray-300/80 p-1.5">
                            <span class="scroll-hint-dot h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                        </span>
                    </div>
                </div>
            </section>

            <!-- Quality Section -->
            <section id="calidad" class="relative overflow-hidden bg-gray-50 py-24 lg:py-32">
                <div class="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div data-parallax="0.06" class="absolute -left-24 top-8 h-72 w-72 rounded-full bg-blue-900/[0.04] blur-3xl"></div>
                    <div data-parallax="-0.05" class="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl"></div>
                </div>

                <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <span :ref="registerReveal" class="reveal reveal-left inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-yellow-600">
                                <span class="h-px w-10 bg-yellow-500"></span>
                                Nuestra promesa
                            </span>

                            <h2 :ref="registerReveal" data-delay="80" class="reveal mt-5 overflow-hidden text-balance text-3xl font-bold tracking-tight text-blue-900 md:text-5xl">
                                <span class="reveal-line block pb-[0.08em]">Calidad que Protege</span>
                            </h2>

                            <p :ref="registerReveal" data-delay="160" class="reveal reveal-up mt-6 text-pretty text-lg leading-relaxed text-gray-600">
                                Nuestros productos están diseñados para resistir las condiciones más exigentes, asegurando que tu mercancía llegue intacta. Cada rollo de fleje es sinónimo de confianza.
                            </p>

                            <ul class="mt-10 space-y-4">
                                <li
                                    v-for="(feature, index) in qualityFeatures"
                                    :key="feature.text"
                                    :ref="registerReveal"
                                    :data-delay="240 + index * 110"
                                    class="reveal reveal-left flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-900/15 hover:shadow-lg hover:shadow-blue-900/5"
                                >
                                    <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-900/[0.06] text-blue-900 ring-1 ring-inset ring-blue-900/10">
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                            <path v-for="path in feature.paths" :key="path" stroke-linecap="round" stroke-linejoin="round" :d="path" />
                                        </svg>
                                    </span>
                                    <span class="font-semibold text-gray-800">{{ feature.text }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Tarjeta clara: destino del rollo animado -->
                        <div :ref="registerReveal" data-delay="220" class="reveal reveal-zoom relative">
                            <div class="relative overflow-hidden rounded-[2rem] border border-blue-900/10 bg-gradient-to-br from-white via-white to-blue-50 p-8 shadow-2xl shadow-blue-900/10 sm:p-10">
                                <div class="quality-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
                                <div class="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" aria-hidden="true"></div>
                                <div class="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true"></div>
                                <div class="quality-ring pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 rounded-full border border-dashed border-blue-900/15 sm:h-80 sm:w-80" aria-hidden="true"></div>
                                <div class="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-900/10 sm:h-52 sm:w-52" aria-hidden="true"></div>

                                <div class="relative flex aspect-[4/3] items-center justify-center">
                                    <img
                                        ref="cardRollAnchor"
                                        src="/images/fleje_negro_landing.png"
                                        alt="Rollo de fleje negro de alta resistencia"
                                        class="w-[52%] max-w-[300px] opacity-0 drop-shadow-[0_28px_45px_rgba(30,58,138,0.30)]"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Variety Section -->
            <section id="variedad" class="relative overflow-hidden bg-white py-24 lg:py-32">
                <div class="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div data-parallax="0.05" class="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-blue-900/[0.03] blur-3xl"></div>
                </div>

                <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="mx-auto max-w-3xl text-center">
                        <span :ref="registerReveal" class="reveal reveal-up inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-yellow-600">
                            <span class="h-px w-8 bg-yellow-500"></span>
                            Catálogo
                            <span class="h-px w-8 bg-yellow-500"></span>
                        </span>

                        <h2 :ref="registerReveal" data-delay="80" class="reveal mt-5 overflow-hidden text-balance text-3xl font-bold tracking-tight text-blue-900 md:text-5xl">
                            <span class="reveal-line block pb-[0.08em]">Un Catálogo para Cada Necesidad</span>
                        </h2>

                        <p :ref="registerReveal" data-delay="160" class="reveal reveal-up mt-6 text-pretty text-lg leading-relaxed text-gray-600">
                            Explora nuestra amplia gama de productos de empaque, diseñados para ofrecerte la máxima calidad y eficiencia.
                        </p>
                    </div>

                    <div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" data-reveal-group>
                        <article
                            v-for="category in categories"
                            :key="category.title"
                            :ref="registerReveal"
                            class="reveal reveal-up group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-gradient-to-b from-white to-gray-50/60 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-900/10 hover:shadow-2xl hover:shadow-blue-900/10"
                        >
                            <div class="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-100/0 blur-2xl transition-colors duration-500 group-hover:bg-blue-100/90" aria-hidden="true"></div>

                            <div class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900/[0.06] text-blue-900 ring-1 ring-inset ring-blue-900/10 transition-all duration-500 group-hover:bg-blue-900 group-hover:text-yellow-400 group-hover:ring-blue-900/60">
                                <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                    <path v-for="path in category.paths" :key="path" stroke-linecap="round" stroke-linejoin="round" :d="path" />
                                </svg>
                            </div>

                            <h3 class="relative mt-6 text-xl font-bold text-blue-900">{{ category.title }}</h3>
                            <p class="relative mt-3 flex-1 leading-relaxed text-gray-600">{{ category.text }}</p>

                            <Link :href="route('landing.products')" class="relative mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-900 transition-colors duration-300 hover:text-yellow-600">
                                Explorar productos
                                <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>

                            <span class="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-500/0 to-transparent transition-all duration-500 group-hover:via-yellow-500/70" aria-hidden="true"></span>
                        </article>
                    </div>
                </div>
            </section>
            
            <!-- Solutions Section -->
            <section id="soluciones" class="relative overflow-hidden bg-gray-50 py-24 lg:py-32">
                <div class="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div data-parallax="-0.05" class="absolute -right-24 top-16 h-80 w-80 rounded-full bg-blue-900/[0.04] blur-3xl"></div>
                    <div data-parallax="0.06" class="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"></div>
                </div>

                <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid items-center gap-16 lg:grid-cols-2">
                        <div>
                            <span :ref="registerReveal" class="reveal reveal-left inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-yellow-600">
                                <span class="h-px w-10 bg-yellow-500"></span>
                                Soluciones integrales
                            </span>

                            <h2 :ref="registerReveal" data-delay="80" class="reveal mt-5 overflow-hidden text-balance text-3xl font-bold tracking-tight text-blue-900 md:text-5xl">
                                <span class="reveal-line block pb-[0.08em]">Ingeniería de Empaque a tu Medida</span>
                            </h2>

                            <p :ref="registerReveal" data-delay="160" class="reveal reveal-up mt-6 text-pretty text-lg leading-relaxed text-gray-600">
                                No solo vendemos productos, creamos soluciones. Nuestro equipo de expertos analiza tus necesidades para diseñar un sistema de empaque que optimice costos, proteja tu producto y agilice tu logística.
                            </p>

                            <ol class="mt-10 space-y-6">
                                <li
                                    v-for="(step, index) in solutionSteps"
                                    :key="step"
                                    :ref="registerReveal"
                                    :data-delay="240 + index * 110"
                                    class="reveal reveal-left relative flex gap-5"
                                >
                                    <div class="flex flex-col items-center">
                                        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-900/10 bg-white text-sm font-extrabold text-blue-900 shadow-sm">0{{ index + 1 }}</span>
                                        <span v-if="index < solutionSteps.length - 1" class="mt-2 w-px flex-1 bg-gradient-to-b from-blue-900/20 to-transparent"></span>
                                    </div>
                                    <p class="pt-2.5 font-semibold text-gray-800">{{ step }}</p>
                                </li>
                            </ol>

                            <div :ref="registerReveal" data-delay="600" class="reveal reveal-up mt-8">
                                <Link :href="route('landing.contact')" class="group inline-flex items-center gap-2 text-sm font-bold text-blue-900 transition-colors duration-300 hover:text-yellow-600">
                                    Solicitar asesoría
                                    <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div :ref="registerReveal" data-delay="200" class="reveal reveal-right relative">
                            <div class="pointer-events-none absolute -left-10 -top-10 h-48 w-48 -rotate-12 rounded-[2rem] bg-blue-900/[0.06]" aria-hidden="true"></div>
                            <div class="pointer-events-none absolute -bottom-8 -right-8 h-44 w-44 rounded-full bg-yellow-400/20 blur-2xl" aria-hidden="true"></div>

                            <Link :href="route('landing.products')" class="group relative block overflow-hidden rounded-[2rem] shadow-2xl shadow-blue-900/20 ring-1 ring-blue-900/10">
                                <img src="/images/Maquinas.png" alt="Maquinaria y soluciones de empaque" class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                                <span class="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-950/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                <span class="absolute bottom-5 left-5 inline-flex translate-y-2 items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-blue-900 opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                    Explorar catálogo
                                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>

                            <div class="absolute -bottom-7 -left-7 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white/95 px-5 py-4 shadow-xl shadow-blue-900/10 backdrop-blur sm:flex">
                                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900/[0.06] text-blue-900 ring-1 ring-inset ring-blue-900/10">
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </span>
                                <span>
                                    <span class="block text-sm font-bold text-blue-900">Soporte experto</span>
                                    <span class="block text-xs text-gray-500">en cada etapa de tu proyecto</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Section -->
            <section id="contacto" class="relative bg-white py-24 lg:py-32">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div :ref="registerReveal" class="reveal reveal-zoom relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-900 via-blue-900 to-blue-950 px-6 py-20 text-center shadow-2xl shadow-blue-900/30 sm:px-16 lg:py-24">
                        <div class="cta-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
                        <div class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-yellow-500/15 blur-3xl" aria-hidden="true"></div>
                        <div class="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" aria-hidden="true"></div>

                        <div class="relative">
                            <span :ref="registerReveal" class="reveal reveal-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                                Hablemos
                            </span>

                            <h2 :ref="registerReveal" data-delay="80" class="reveal mx-auto mt-6 max-w-3xl overflow-hidden text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
                                <span class="reveal-line block pb-[0.08em]">¿Listo para <span class="text-yellow-400">Optimizar</span> tu Embalaje?</span>
                            </h2>

                            <p :ref="registerReveal" data-delay="160" class="reveal reveal-up mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-blue-100/80">
                                Nuestro equipo de expertos está listo para asesorarte. Contáctanos y encuentra la solución perfecta que se adapte a tus necesidades.
                            </p>

                            <div :ref="registerReveal" data-delay="260" class="reveal reveal-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link :href="route('landing.products')" class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-yellow-500 px-8 py-3.5 font-bold text-blue-900 shadow-lg shadow-yellow-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400">
                                    <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"></span>
                                    <span class="relative">Ver catálogo de productos</span>
                                </Link>

                                <Link :href="route('landing.contact')" class="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10">
                                    Ir a contacto
                                </Link>
                            </div>

                            <div :ref="registerReveal" data-delay="360" class="reveal reveal-up mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-10">
                                <a v-for="contact in contactPhones" :key="contact.zone" :href="`tel:${contact.tel}`" class="group flex items-center gap-3 text-blue-100/90 transition-colors duration-300 hover:text-white">
                                    <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-yellow-400 ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:bg-white/15">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </span>
                                    <span class="text-left">
                                        <span class="block text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100/60">{{ contact.zone }}</span>
                                        <span class="block text-sm font-semibold">{{ contact.phone }}</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </LandingLayout>
</template>

<style>
/* Desplazamiento suave para la navegación por anclas */
html {
    scroll-behavior: smooth;
}

/* -------------------------------------------------------------------------- */
/*  FONDOS DECORATIVOS                                                        */
/* -------------------------------------------------------------------------- */
.hero-grid {
    background-image:
        linear-gradient(to right, rgba(30, 58, 138, 0.055) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(30, 58, 138, 0.055) 1px, transparent 1px);
    background-size: 58px 58px;
    -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 32%, black 25%, transparent 72%);
    mask-image: radial-gradient(ellipse 75% 65% at 50% 32%, black 25%, transparent 72%);
}

.quality-grid {
    background-image:
        linear-gradient(to right, rgba(30, 58, 138, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(30, 58, 138, 0.07) 1px, transparent 1px);
    background-size: 44px 44px;
    -webkit-mask-image: radial-gradient(ellipse at 30% 20%, black 15%, transparent 75%);
    mask-image: radial-gradient(ellipse at 30% 20%, black 15%, transparent 75%);
}

.cta-grid {
    background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
    background-size: 52px 52px;
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 78%);
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 78%);
}

/* Difumina los bordes del PNG de productos para integrarlo con el fondo */
.hero-img-fade {
    -webkit-mask-image: radial-gradient(ellipse 78% 72% at 50% 46%, black 58%, transparent 92%);
    mask-image: radial-gradient(ellipse 78% 72% at 50% 46%, black 58%, transparent 92%);
}

/* -------------------------------------------------------------------------- */
/*  ENTRADA DEL HERO                                                          */
/* -------------------------------------------------------------------------- */
.hero-enter {
    opacity: 0;
    animation: hero-enter 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: var(--d, 0ms);
}

@keyframes hero-enter {
    from {
        opacity: 0;
        transform: translateY(28px);
        filter: blur(7px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}

.hero-enter-img {
    opacity: 0;
    animation: hero-enter-img 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards;
}

@keyframes hero-enter-img {
    from {
        opacity: 0;
        transform: translateY(34px) scale(0.965);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Subrayado del título que se dibuja al cargar */
.hero-underline {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: draw-underline 1.15s cubic-bezier(0.65, 0, 0.35, 1) 1s forwards;
}

@keyframes draw-underline {
    to {
        stroke-dashoffset: 0;
    }
}

/* -------------------------------------------------------------------------- */
/*  INDICADOR DE SCROLL                                                       */
/* -------------------------------------------------------------------------- */
.scroll-hint-enter {
    opacity: 0;
    animation: fade-in-soft 1s ease 1.1s forwards;
}

.scroll-hint-dot {
    animation: scroll-hint-dot 1.9s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@keyframes fade-in-soft {
    to {
        opacity: 1;
    }
}

@keyframes scroll-hint-dot {
    0% {
        transform: translateY(0);
        opacity: 0;
    }

    15% {
        opacity: 1;
    }

    70% {
        transform: translateY(15px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 0;
    }
}

/* -------------------------------------------------------------------------- */
/*  SISTEMA DE REVELADO AL HACER SCROLL                                       */
/* -------------------------------------------------------------------------- */
.reveal {
    opacity: 0;
    transition:
        opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--rd, 0ms);
}

.reveal-up {
    transform: translateY(38px);
}

.reveal-left {
    transform: translateX(-38px);
}

.reveal-right {
    transform: translateX(38px);
}

.reveal-zoom {
    transform: translateY(26px) scale(0.94);
}

/* Título que emerge desde detrás de una máscara invisible */
.reveal .reveal-line {
    transform: translateY(115%);
    transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--rd, 0ms);
}

.reveal.is-visible .reveal-line {
    transform: translateY(0);
}

.reveal.is-visible {
    opacity: 1;
    transform: none;
}

/* -------------------------------------------------------------------------- */
/*  ANILLO GIRATORIO DE LA TARJETA DE CALIDAD                                 */
/* -------------------------------------------------------------------------- */
.quality-ring {
    animation: ring-spin 30s linear infinite;
}

@keyframes ring-spin {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

/* -------------------------------------------------------------------------- */
/*  ACCESIBILIDAD: MOVIMIENTO REDUCIDO                                        */
/* -------------------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }

    .hero-enter,
    .hero-enter-img,
    .scroll-hint-enter {
        animation: none;
        opacity: 1;
    }

    .hero-enter-img,
    .hero-enter {
        transform: none;
        filter: none;
    }

    .hero-underline {
        animation: none;
        stroke-dashoffset: 0;
    }

    .reveal {
        opacity: 1;
        transform: none;
        clip-path: none;
        transition: none;
    }

    .reveal .reveal-line {
        transform: none;
        transition: none;
    }

    .quality-ring,
    .scroll-hint-dot {
        animation: none;
    }
}
</style>
