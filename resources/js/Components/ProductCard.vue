<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// El índice del modelo seleccionado para mostrar su imagen y tags.
const selectedModelIndex = ref(0);

// El modelo actualmente seleccionado (solo para imagen y tags)
const selectedModelForImage = computed(() => {
  return props.product.models[selectedModelIndex.value];
});

// Imagen del modelo seleccionado
const currentImage = computed(() => {
    // Asumiendo que `selectedModelForImage.value.images` es un array y tomamos el primer elemento.
    const imgSrc = selectedModelForImage.value.images && selectedModelForImage.value.images.length > 0
                   ? selectedModelForImage.value.images[0]
                   : 'https://placehold.co/600x400/e2e8f0/475569?text=Imagen+no+disponible';
    return imgSrc;
});


// Encuentra todas las etiquetas únicas de detalles de todos los modelos
const allDetailLabels = computed(() => {
  const labels = new Set();
  props.product.models.forEach(model => {
    model.details.forEach(detail => {
      labels.add(detail.label);
    });
  });
  // Convertir el Set a un Array para poder iterar en un orden predecible (opcional, pero buena práctica)
  return Array.from(labels);
});

// --- Methods ---
/**
 * Cambia al siguiente modelo para la imagen y los tags.
 */
const nextModel = () => {
  selectedModelIndex.value = (selectedModelIndex.value + 1) % props.product.models.length;
};

/**
 * Cambia al modelo anterior para la imagen y los tags.
 */
const prevModel = () => {
  selectedModelIndex.value = (selectedModelIndex.value - 1 + props.product.models.length) % props.product.models.length;
};

/**
 * Obtiene el valor de un detalle específico para un modelo dado.
 * @param {Object} model - El objeto del modelo.
 * @param {string} label - La etiqueta del detalle que se busca.
 * @returns {string} El valor del detalle o '-' si no se encuentra.
 */
const getDetailValue = (model, label) => {
  const detail = model.details.find(d => d.label === label);
  return detail ? detail.value : '-';
};

</script>

<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-shadow hover:shadow-2xl">
    <div class="flex flex-col md:flex-row">

      <!-- Columna de Imagen (Izquierda en desktop, Arriba en móvil) --><div class="md:w-2/5 relative bg-gray-50 flex items-center justify-center p-4 min-h-[200px]">
        <!-- Tags de información del modelo --><div class="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span class="bg-slate-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Cód: {{ selectedModelForImage.code }}
          </span>
          <span class="bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Mod: {{ selectedModelForImage.model }}
          </span>
           <span class="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Marca: {{ selectedModelForImage.brand }}
          </span>
        </div>

        <!-- Imagen del Producto --><img
          :src="currentImage"
          :alt="`Imagen de ${product.name} - modelo ${selectedModelForImage.model}`"
          class="h-64 w-full object-contain"
        >

        <!-- Controles de Navegación de Modelos --><template v-if="product.models.length > 1">
          <button @click.stop.prevent="prevModel" aria-label="Modelo anterior" class="absolute left-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button @click.stop.prevent="nextModel" aria-label="Siguiente modelo" class="absolute right-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </template>
      </div>

      <!-- Columna de Información (Derecha en desktop, Abajo en móvil) --><div class="md:w-3/5 p-6 flex flex-col">
        <p class="text-sm text-amber-600 font-semibold mb-1">{{ product.category }} <a v-if="product.url" :href="product.url" target="_blank" class="ml-3 text-blue-500 hover:underline">{{ product.url }}</a></p>
        <h3 class="text-xl font-bold text-gray-800 mb-2">{{ product.name }}</h3>
        <p class="text-sm text-gray-600 mb-4 flex-grow">{{ product.description }}</p>

        <!-- Tabla de Detalles de TODOS los Modelos --><div class="mt-auto border-t border-gray-200 pt-4 overflow-x-auto">
          <h4 class="font-semibold text-gray-700 mb-3 text-base">Modelos y Especificaciones:</h4>
          <table class="min-w-full divide-y divide-gray-200 bg-white">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th scope="col" class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                <th v-for="label in allDetailLabels" :key="label" scope="col" class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ label }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(model, index) in product.models" :key="model.code"
                  :class="{'bg-blue-100/50': index === selectedModelIndex, 'hover:bg-gray-100': index !== selectedModelIndex}">
                <td class="py-1 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ model.code }}</td>
                <td class="py-1 px-4 whitespace-nowrap text-sm text-gray-700">{{ model.model }}</td>
                <td v-for="label in allDetailLabels" :key="label" class="py-1 px-4 whitespace-nowrap text-sm text-gray-700">
                  {{ getDetailValue(model, label) }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <p class="text-xs text-gray-500 mt-2">Los campos se muestran con '-' si no están disponibles para un modelo específico.</p> -->
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Puedes añadir estilos adicionales aquí si es necesario */
</style>

