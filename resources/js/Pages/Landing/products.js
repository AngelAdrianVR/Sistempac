// Este archivo funciona como una base de datos estática para los productos.
// Se ha agregado la propiedad 'slug' para URLs amigables y se han añadido todos los productos del catálogo.

// Fleje manual negro 
import flejeNegro1 from '@/../../public/images/Products/fleje-de-plastico-manual-ultrex-1.jpg';
import flejeNegro2 from '@/../../public/images/Products/fleje-de-plastico-manual-ultrex-2.png';
import flejeNegroCajaCuadrada from '@/../../public/images/Products/fleje-de-plastico-caja-cuadrada-ultrex-codigo-b.jpg';
import flejeNegroCajaOctagonal from '@/../../public/images/Products/fleje-de-plastico-caja-octagonal-ultrex-codigo-c.jpg';

// Fleje prolipropileno virgen
import flejeVirgen from '@/../../public/images/Products/fleje-virgen.jpg';

// Sello para feje
import selloFleje1 from '@/../../public/images/products/sello-para-fleje-1-2.jpg';
import selloFleje2 from '@/../../public/images/products/sello-para-fleje-plastico-ultrex-1.jpg';
import selloFlejeDentado from '@/../../public/images/products/sello-dentado.png';

// Tensionadoras
import tensionadoraYbicoP262 from '@/../../public/images/products/tensionadora-1101-p262-plastico.jpg';
import tensionadoraYbicoS290 from '@/../../public/images/products/tensionadora-1121-s290-acero.jpg';
import tensionadoraYbicoS298 from '@/../../public/images/products/tensionadora-1122-s298-acero.jpg';
import tensionadoraYbicoS210 from '@/../../public/images/products/tensionadora-1123-s210-acero.jpg';
import tensionadoraYbicoS220 from '@/../../public/images/products/tensionadora-fleje-ybico-s220.png';
import tensionadoraYbicoS225 from '@/../../public/images/products/tensionadora-1125-s225-acero.jpg';
import tensionadoraYbicoS260 from '@/../../public/images/products/tensionadora-ybico-s260.png';
import tensionadoraYbicoS262 from '@/../../public/images/products/tensionadora-1127-s262-acero.jpg';
import tensionadoraYbicoS283 from '@/../../public/images/products/tensionadora-1128-s283-acero.jpg';
import tensionadoraYbicoS240 from '@/../../public/images/products/tensionadora-1130-s240-acero.jpg';
import tensionadoraYbicoS244 from '@/../../public/images/products/tensionadora-1131-s244-acero.jpg';
import tensionadoraYbicoP472 from '@/../../public/images/products/tensionadora-1103-p472-plastico.jpg';
import tensionadoraYbicoP117 from '@/../../public/images/products/tensionadora-1104-p117-plastico.jpg';
import tensionadoraYbicoP173 from '@/../../public/images/products/tensionadora-Ybico-P-173.jpg';
import tensionadoraYbicoP278 from '@/../../public/images/products/tensionadora-1106-p278-plastico-cromo.jpg';
import tensionadoraTranspak1 from '@/../../public/images/products/tensionadora-1501-h21-acero-transpak.jpg';
import tensionadoraEpacHG110R from '@/../../public/images/products/tensionadora-de-fleje-HG110R.jpg';

// Selladoras
import selladoraYbicoC3004 from '@/../../public/images/products/selladora-1111-c3004-1112-c3005.png';
import selladoraYbicoC5004 from '@/../../public/images/products/selladora-1113-c5004-1114-c5005.jpg';
import selladoraTranspakH35 from '@/../../public/images/products/selladora-Transpak-H-35.png';
import selladoraYbicoC3103 from '@/../../public/images/products/selladora-acero-1141-c3103.jpg';
import selladoraYbicoC3203 from '@/../../public/images/products/selladora-acero-1146-c3203-1147-c3204-1148-c3205-1149-c3206.jpg';
import selladoraYbicoC3180 from '@/../../public/images/products/selladora-acero-1145-c3180.jpg';
import selladoraYbicoC3160 from '@/../../public/images/products/selladora-acero-1150-c3160.jpg';

// Cortadores
import cortadorYbicoH201 from '@/../../public/images/products/cortadora-ybico-H-201.png';
import cortadorYbicoH305 from '@/../../public/images/products/cortadora-ybico-H-305.png';
import cortadorYbicoHGC002 from '@/../../public/images/products/cortadora-epac-HGC002.png';
import cortadorYbicoH410 from '@/../../public/images/products/cortadora-ybico-H-410.png';

// Despachadores
import despachadorExcellEC213 from '@/../../public/images/products/despachador-cinta-excell-ec213.png';
import despachadorExcellEC238 from '@/../../public/images/products/despachador-reforzado-cinta-2-y-3-ec238.jpg';
import despachadorEpak from '@/../../public/images/products/despachador-epack.png';

// Cierrabolsas
import cierrabolsasExcell1 from '@/../../public/images/products/cierra-bolsa-cinta-1-2-ex-605k-v2.jpg';
import cierrabolsasExcell2 from '@/../../public/images/products/cierra-bolsa-cinta-5-8-1712-ex808kjpg.jpg';

// Aplicadores
import aplicadorExcell from '@/../../public/images/products/sf-2781e.png';
import aplicadorManualExcell from '@/../../public/images/products/sf-755-hand-saver.png';
import aplicadorManualExcell2 from '@/../../public/images/products/sd-750a.png';


/**
 * Genera un slug a partir de un string.
 * @param {string} text - El texto a convertir.
 * @returns {string} - El slug generado.
 */
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};


// Definición de las categorías extraídas del catálogo
export const categories = [
    'Flejes y Sellos',
    'Equipos para Flejar',
    'Máquinas Flejadoras',
    'Equipos de Empaque',
    'Selladoras Térmicas',
    'Engrapadoras',
    'Consumibles',
];

// Listado de todos los productos
export const allProducts = [
    // Flejes y Sellos
    {
        id: 1,
        name: 'Fleje de Plástico Manual',
        category: 'Flejes y Sellos',
        description: 'Fleje de poliéster reciclado para aplicación manual, ideal para aplicaciones generales y asegurar cargas. Disponible en varios anchos y espesores.',
        images: [flejeNegro1, flejeNegro2, flejeNegroCajaCuadrada, flejeNegroCajaOctagonal],
        details: [
            { label: 'Material', value: 'Poliéster (PET) Reciclado' },
            { label: 'Anchos Disponibles', value: '3/8", 1/2", 5/8"' },
            { label: 'Espesores', value: '0.022", 0.026", 0.031"' },
            { label: 'Presentaciones', value: 'Manual, Caja Cuadrada, Caja Octagonal, Automático, Jumbo' },
        ],
    },
    {
        id: 2,
        name: 'Fleje de Polipropileno Virgen',
        category: 'Flejes y Sellos',
        description: 'Fleje de polipropileno 100% virgen para máquinas automáticas y semiautomáticas.',
        images: [flejeVirgen],
        details: [
            { label: 'Material', value: 'Polipropileno 100% Virgen' },
            { label: 'Modelo FVA-38', value: 'Ancho 3/8", Resistencia 90 Kg, 2700 Mts/Rollo' },
            { label: 'Modelo FVA-12', value: 'Ancho 1/2", Resistencia 130 Kg, 2000 Mts/Rollo' },
            { label: 'Peso por Rollo', value: '10.0 Kg' },
        ],
    },
    {
        id: 3,
        name: 'Sellos Metálicos para Fleje de Plástico',
        category: 'Flejes y Sellos',
        description: 'Sello abierto galvanizado para fleje de plástico, disponible en varias medidas y presentaciones.',
        images: [selloFleje1, selloFleje2],
        details: [
            { label: 'Material', value: 'Galvanizado' },
            { label: 'Anchos', value: '3/8", 1/2", 5/8", 3/4"' },
            { label: 'Modelos', value: 'SPS-38AC, SPS-28AC, SPS-58AC, SPS-34AC' },
            { label: 'Empaque', value: 'Caja con 1000 pzas o Saco con 5000 pzas' },
        ],
    },
    {
        id: 4,
        name: 'Sellos para Fleje de Poliéster Dentado',
        category: 'Flejes y Sellos',
        description: 'Sellos con interior especialmente diseñado para un mejor agarre en fleje de poliéster.',
        images: [selloFlejeDentado],
        details: [
            { label: 'Modelo SPF-12', value: 'Ancho 1/2", Calibre 22' },
            { label: 'Modelo SPF-58', value: 'Ancho 5/8", Calibre 20' },
            { label: 'Empaque', value: 'Costal con 2 millares' },
        ],
    },
    // Equipos para Flejar
    {
        id: 5,
        name: 'Tensionadora Ybico P-262',
        category: 'Equipos para Flejar',
        description: 'Tensionadora de uso rudo con cuerpo de fundición y bujes de acero. Para fleje de plástico de hasta 3/4".',
        images: [tensionadoraYbicoP262],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'P-262' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.200 Kg' }, {label: 'Longitud', value: '245 mm'}
        ],
    },
    {
        id: 6,
        name: 'Tensionadora Ybico P-472',
        category: 'Equipos para Flejar',
        description: 'Tensionadora de Aluminio Gigante para uso rudo,de fundición bujes autolubricados entre la base y el Enrollador. Para fleje demedidas hasta 3/4" a 1-1/2"',
        images: [tensionadoraYbicoP472],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'P-472' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.300 Kg' }, {label: 'Longitud', value: '340 mm'}
        ],
    },
    {
        id: 7,
        name: 'Tensionadora Ybico P-117',
        category: 'Equipos para Flejar',
        description: 'Tensionadora para uso rudo, Cuerpo de metal de fundición con bujes de latón entre la base y el Enrollador. Para fleje demedidas hasta 3/4"',
        images: [tensionadoraYbicoP117],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'P-472' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.200 Kg' }, {label: 'Longitud', value: '300 mm'}
        ],
    },
    {
        id: 8,
        name: 'Tensionadora Ybico P-278',
        category: 'Equipos para Flejar',
        description: 'Tensionadora de Uso Rudo Con Nariz Para Fleje de PET y Nylon.Ancho de Fleje Permitido 1". Ideal Para Superficies o Paquetes Irregulares',
        images: [tensionadoraYbicoP278],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'P-472' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.500 Kg' }
        ],
    },
    {
        id: 9,
        name: 'Tensionadora Ybico P-173',
        category: 'Equipos para Flejar',
        description: 'Restirador y cortador manual para usarse con la hebilla de plástico.',
        images: [tensionadoraYbicoP173],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'P-472' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '0.100 Kg' }
        ],
    },
    {
        id: 10,
        name: 'Tensionadora Transpak H-21',
        category: 'Equipos para Flejar',
        description: 'Tensionadora para uso rudo, cuerpo de metal de fundición. Para fleje de plástico de hasta 3/4".',
        images: [tensionadoraTranspak1],
        details: [
            { label: 'Marca', value: 'Transpak' }, { label: 'Modelo', value: 'H-21' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.200 Kg' },
        ],
    },
    {
        id: 11,
        name: 'Tensionadora Epac HG110R',
        category: 'Equipos para Flejar',
        description: 'Tensionadora para uso Pesado (16010) o Liviano (16011), Cuerpo de metal de fundición. Para fleje de medidas hasta 3/4"',
        images: [tensionadoraEpacHG110R],
        details: [
            { label: 'Marca', value: 'Epac' }, { label: 'Modelo', value: 'HG110R' },
            { label: 'Origen', value: 'China' }, { label: 'Peso', value: '2.200 Kg' }, {label: 'Longitud', value: '300 mm'}
        ],
    },
    {
        id: 12,
        name: 'Selladora Ybico C-3004 / C-3005',
        category: 'Equipos para Flejar',
        description: 'Selladora cromada con mordazas de acero y forros de PVC. Para sellos de 1/2" (C-3004) y 5/8" (C-3005).',
        images: [selladoraYbicoC3004],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelos', value: 'C-3004, C-3005' }, 
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.650 Kg' }, {label: 'Longitud', value: '400 mm'}
        ],
    },
    {
        id: 13,
        name: 'Selladora Ybico C-5004 / C-5005',
        category: 'Equipos para Flejar',
        description: 'Selladora cromada con mordazas de acero y forros de PVC. Para sellos de 1/2" (C-3004) y 5/8" (C-3005).',
        images: [selladoraYbicoC5004],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelos', value: 'C-3004, C-3005' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.000 Kg' }, {label: 'Longitud', value: '510 mm'},
        ],
    },
    {
        id: 14,
        name: 'Selladora Transpak H-35',
        category: 'Equipos para Flejar',
        description: 'Selladora cromada con 3 mordazas de acero y Mango de 390 mm de Longitud, para sellos de 1/2".',
        images: [selladoraTranspakH35],
        details: [
            { label: 'Marca', value: 'Transpak' }, { label: 'Modelos', value: 'H-35' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.500 Kg' }, {label: 'Longitud', value: '390 mm'},
        ],
    },
    {
        id: 15,
        name: 'Tensionadora para Fleje de Acero Ybico S-290',
        category: 'Equipos para Flejar',
        description: 'Tensionadora para uso normal en fleje de acero. Permite anchos desde 3/8" hasta 3/4" y espesor de 0.035".',
        images: [tensionadoraYbicoS290],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-290' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.000 Kg' }, {label: 'Longitud', value: '365 mm'}
        ],
    },
    {
        id: 16,
        name: 'Tensionadora para Fleje de Acero Ybico S-298',
        category: 'Equipos para Flejar',
        description: 'Tensionadora para uso rudo. Permite flejar anchos desde 3/4" hasta 1-1/4" y espesor de 0.035"',
        images: [tensionadoraYbicoS298],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-298' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '3.500 Kg' }, {label: 'Longitud', value: '480 mm'}
        ],
    },
    {
        id: 17,
        name: 'Tensionadora para Fleje de Acero Ybico S-210',
        category: 'Equipos para Flejar',
        description: 'Tensionadora de cremallera para empaques redondos o irregulares. Permite flejar anchos de fleje desde 3/8" hasta 3/4" y espesor de 0.020"',
        images: [tensionadoraYbicoS210],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-210' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.500 Kg' }, {label: 'Longitud', value: '250 mm'}
        ],
    },
    {
        id: 18,
        name: 'Tensionadora para Fleje de Acero Ybico S-220',
        category: 'Equipos para Flejar',
        description: 'Tensionadora de cremallera. Permite flejar anchos de fleje desde 3/8" hasta 3/4" y espesor máximo de 0.030"',
        images: [tensionadoraYbicoS220],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-220' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.100 Kg' }, {label: 'Longitud', value: '350 mm'}
        ],
    },
    {
        id: 19,
        name: 'Tensionadora para Fleje de Acero Ybico S-225',
        category: 'Equipos para Flejar',
        description: 'Tensionadora de cremallera. Permite flejar anchos de fleje desde 3/8" hasta 3/4" y espesor máximo de 0.030"',
        images: [tensionadoraYbicoS225],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-225' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.100 Kg' }, {label: 'Longitud', value: '350 mm'}
        ],
    },
    {
        id: 20,
        name: 'Tensionadora para Fleje de Acero Ybico S-260',
        category: 'Equipos para Flejar',
        description: 'Tensionadora forjada con cortador para fleje de acero inoxidable. Permite flejar anchos de fleje desde 3/8" hasta 3/4" y espesor máximo de 0.030"',
        images: [tensionadoraYbicoS260],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-225' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.700 Kg' }, {label: 'Longitud', value: '280 mm'}
        ],
    },
    {
        id: 21,
        name: 'Tensionadora para Fleje de Acero Ybico S-262 / HG-S1',
        category: 'Equipos para Flejar',
        description: 'Tensionadora forjada con cortador para fleje de acero inoxidable. Tipo BAND-IT permite flejar anchos de fleje desde 3/8" hasta 3/4" y espesor máximo de 0.030" (Todas las partes templadas)',
        images: [tensionadoraYbicoS262],
        details: [
            { label: 'Marca', value: 'Ybico/E-pac' }, { label: 'Modelo', value: 'S-225' },
            { label: 'Origen', value: 'Taiwán/China' }, { label: 'Peso', value: '1.700 Kg' }, {label: 'Longitud', value: '280 mm'}
        ],
    },
    {
        id: 22,
        name: 'Tensionadora para Fleje de Acero Ybico S-283',
        category: 'Equipos para Flejar',
        description: 'Tensionadora forjada con cortador para fleje de acero inoxidable. Tipo BAND-IT permite flejar anchos de fleje desde 3/8" hasta 3/4" y espesor máximo de 0.030" (Todas las partes templadas)',
        images: [tensionadoraYbicoS283],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-283' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '0.320 Kg' }, {label: 'Longitud', value: '220 mm'}
        ],
    },
    {
        id: 23,
        name: 'Tensionadora para Fleje de Acero Ybico S-240',
        category: 'Equipos para Flejar',
        description: 'Tensionadora Para Fleje de Acero Inoxidable con Cortador y Martillo para superficies irregulares. Para Flejes de 3/8" a 3/4" y espesor Máximo de 0.030"',
        images: [tensionadoraYbicoS240],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-240' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.450 Kg' }
        ],
    },
    {
        id: 24,
        name: 'Tensionadora para Fleje de Acero Ybico S-244',
        category: 'Equipos para Flejar',
        description: 'Tensionadora Para Fleje de Acero Inoxidable con Cortador para superficies irregulares. Para Flejes de 3/8" a 3/4" y espesor Máximo de 0.030"',
        images: [tensionadoraYbicoS244],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-244' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.450 Kg' }
        ],
    },
    {
        id: 25,
        name: 'Cortadora para Fleje de Acero Ybico H-201',
        category: 'Equipos para Flejar',
        description: 'Cortador para fleje de acero. Fabricado en acero forjado. Permite cortar flejes con anchos desde 3/8" hasta 1-1/4" en un espesor de 0.031"',
        images: [cortadorYbicoH201],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'H-201' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '0.800 Kg' }, {label: 'Longitud', value: '320 mm'}
        ],
    },
    {
        id: 26,
        name: 'Cortadora para Fleje de Acero Ybico H-305/HGC002',
        category: 'Equipos para Flejar',
        description: 'Cortador para fleje de acero. Fabricado en acero forjado para uso rudo. Acondicionado para cortar flejes con anchos de hasta 2" en un espesor de 0.050"',
        images: [cortadorYbicoH305, cortadorYbicoHGC002],
        details: [
            { label: 'Marca', value: 'Ybico/E-pac' }, { label: 'Modelo', value: 'H-305/HGC002' },
            { label: 'Origen', value: 'Taiwán/China' }, { label: 'Peso', value: '2.800 Kg' }, {label: 'Longitud', value: '660 mm'}
        ],
    },
    {
        id: 27,
        name: 'Cortadora para Fleje de Acero Ybico H-410',
        category: 'Equipos para Flejar',
        description: 'Cortador para fleje de acero. Fabricado en acero forjado para uso rudo. Acondicionado para cortar flejes con anchos de hasta 2" en un espesor de 0.050". Con Navaja Reversible',
        images: [cortadorYbicoH410],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'H-410' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.900 Kg' }, {label: 'Longitud', value: '650 mm'}
        ],
    },
    {
        id: 28,
        name: 'Selladora para Fleje de Acero Ybico',
        category: 'Equipos para Flejar',
        description: 'Selladora con doble mordaza de acero templado. 4 medidas para cada ancho de fleje, 3/8", 1/2", 5/8" y 3/4" y espesor de 0.025"',
        images: [selladoraYbicoC3103],
        details: [
            { label: 'Marca', value: 'Ybico/Epac' }, { label: 'Modelos Ybico', value: 'C-3103, C-3104, C-3105, C-3106' }, { label: 'Modelos Epac', value: 'HGB811-12, HGB811-58' },
            { label: 'Origen', value: 'Taiwán/China' }, { label: 'Peso', value: '0.900 Kg' }, {label: 'Longitud', value: '340 mm'}
        ],
    },
    {
        id: 29,
        name: 'Selladora para Fleje de Acero Ybico',
        category: 'Equipos para Flejar',
        description: 'Selladora maneral largo con doble mordaza de acero templado. 4 medidas para cada ancho de fleje, 3/8", 1/2", 5/8" y 3/4" y espesor de 0.025"',
        images: [selladoraYbicoC3203],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelos', value: 'C-3203, C-3204, C-3205, C-3206' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '0.900 Kg' }, {label: 'Longitud', value: '350 mm'}
        ],
    },
    {
        id: 30,
        name: 'Selladora para Fleje de Acero Ybico C-3180',
        category: 'Equipos para Flejar',
        description: 'Selladora para uso rudo con doble mordaza de acero tratado. Permite anchos de fleje de 1-1/4" y espesor de 0.035" Sellado lateral',
        images: [selladoraYbicoC3180],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'C-3180' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.900 Kg' }, {label: 'Longitud', value: '730 mm'}
        ],
    },
    {
        id: 31,
        name: 'Selladora para Fleje de Acero Ybico C-3160',
        category: 'Equipos para Flejar',
        description: 'Selladora para uso rudo con doble mordaza de acero tratado. Permite anchos de fleje de 3/4" y espesor de 0.035" Sellado lateral',
        images: [selladoraYbicoC3160],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'C-3160' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.400 Kg' }, {label: 'Longitud', value: '660 mm'}
        ],
    },
    {
        id: 32,
        name: 'Flejadora de Combinación para Acero Ybico SL 200',
        category: 'Equipos para Flejar',
        description: 'No necesita sello. Para fleje de acero de 1/2", 5/8" y 3/4" con espesores de 0.017" a 0.035".',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'SL 200' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '3.500 Kg' },
        ],
    },
    {
        id: 33,
        name: 'Portarrollo Importado',
        category: 'Equipos para Flejar',
        description: 'Portarrollo para fleje de plástico o acero, con mecanismo de freno, disco de metal y bandeja.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Modelo', value: 'PRI-1 (Negro), PRI-2 (Azul/Amarillo)' },
            { label: 'Capacidad', value: '60 Kg.' }, { label: 'Peso', value: '16.0 Kg' },
            { label: 'Centros', value: '8" y 16" de diámetro' },
        ],
    },

    // Equipos de Empaque
    {
        id: 34,
        name: 'Despachador de cinta de 2" y 3"',
        category: 'Equipos de Empaque',
        description: 'Despachador cinta empaque . Marco Metálico. Sistema de freno ajustable, doble navaja con protección. Tira estática',
        images: [despachadorExcellEC213, despachadorExcellEC238],
        details: [
            { label: 'Marca', value: 'Excell' }, { label: 'Modelos de Excell (2")', value: 'EC-213, ET-267, EC-238' },
            { label: 'Modelos de Excell (3")', value: 'EC-313, EC-338' },
            { label: 'Origen', value: 'Taiwán' }
        ],
    },
    {
        id: 35,
        name: 'Despachador de Cinta Excell',
        category: 'Equipos de Empaque',
        description: 'Despachador para cinta de empaque con marco metálico, freno ajustable y doble navaja con protección. Disponible para 2" y 3".',
        images: [despachadorEpak],
        details: [
            { label: 'Marca', value: 'E-pac' },
            { label: 'Modelos', value: 'HGTS001, HGTS002' },
            { label: 'Origen', value: 'China' },
        ],
    },
    {
        id: 36,
        name: 'Cierrabolsas Excell',
        category: 'Equipos de Empaque',
        description: 'Cierrabolsas metálico con sistema de cuchilla cortadora. Para cintas de 1/2" (EX-605K) y 5/8" (EX-808K).',
        images: [cierrabolsasExcell1, cierrabolsasExcell2],
        details: [
            { label: 'Marca', value: 'Excell' },
            { label: 'Modelos', value: 'EX-605K, EX-808K' },
            { label: 'Centro de cinta', value: '3"' },
        ],
    },
    {
        id: 37,
        name: 'Aplicador de Película Estirable',
        category: 'Equipos de Empaque',
        description: 'Aplicador para película con alma de 1.5", 2" y 3". Ajuste deslizable de 12" a 20".',
        images: [aplicadorExcell],
        details: [
            { label: 'Marca', value: 'Excell / E-Pac' },
            { label: 'Modelos', value: 'SD 278E (Excell), BM500 (E-Pac)' },
            { label: 'Peso', value: '2.1 Kg' }, { label: 'Longitud', value: '500 mm' }
        ],
    },
    {
        id: 38,
        name: 'Aplicador de Película Manual',
        category: 'Equipos de Empaque',
        description: 'Aplicador de película de alma de 3". La tensión a la película es aplicada en forma manual.',
        images: [aplicadorManualExcell, aplicadorManualExcell2],
        details: [
            { label: 'Marca', value: 'Excell / E-Pac' },
            { label: 'Modelos', value: 'SD 255 y SD 7772 (Excell), FH-2723 (E-Pac)' },
        ],
    },
    // Selladoras Térmicas
    {
        id: 15,
        name: 'Selladora Térmica Estándar',
        category: 'Selladoras Térmicas',
        description: 'Selladora manual de calor directo para bolsas de plástico. Disponible en varios anchos. Voltaje de 110V.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Modelos', value: 'ST 15, ST 25, ST 35, ST 50' },
            { label: 'Anchos de sellado', value: '15, 25, 35, 50 cm' },
            { label: 'Voltaje', value: '110 V' },
        ],
    },
    {
        id: 16,
        name: 'Selladora Térmica Electrónica Hanna',
        category: 'Selladoras Térmicas',
        description: 'Selladora con tarjeta electrónica de alta tecnología, sella polietileno, PVC y polipropileno en 1.5 seg.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Hanna' },
            { label: 'Modelos', value: 'NT 200/2, NT-300/2, XP-200-5, etc.' },
            { label: 'Material', value: 'Plástico ABS (NT) o Metal Aleado (XP)' },
        ],
    },
    // Engrapadoras
    {
        id: 17,
        name: 'Engrapadora Neumática Tking',
        category: 'Engrapadoras',
        description: 'Diseñada para trabajar a alta velocidad. Retorno de martillo automático y presión y profundidad de engrape ajustable.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Tking' },
            { label: 'Modelo', value: 'ADCS19' },
            { label: 'Peso', value: '2.65 Kg' },
        ],
    },
    {
        id: 18,
        name: 'Engrapadora Mecánica Tking',
        category: 'Engrapadoras',
        description: 'Puede engrapar miles de veces sin requerir mantenimiento. Excelente inversión económica.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Tking' },
            { label: 'Modelo', value: 'HDCSN1935' },
            { label: 'Peso', value: '2.2 Kg' },
        ],
    },
    // Máquinas Flejadoras
    {
        id: 19,
        name: 'Máquina Flejadora Semiautomática Transpak',
        category: 'Máquinas Flejadoras',
        description: 'Máquina con tecnología taiwanesa, control de tensión exterior y compatible con flejes de 1/4" a 5/8".',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Transpak' },
            { label: 'Modelo', value: 'TP-201' },
            { label: 'Voltaje', value: '110/115 Volts' },
            { label: 'Peso', value: '110 Kg' },
        ],
    },
    {
        id: 20,
        name: 'Máquina Flejadora Automática Brother',
        category: 'Máquinas Flejadoras',
        description: 'Máquina flejadora automática con tecnología china. Medida del arco 800 x 600 mm.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Brother' },
            { label: 'Modelos', value: 'WG 22 XN, AP 8060' },
            { label: 'Voltaje', value: '220/230 Volts' },
        ],
    },
    {
        id: 21,
        name: 'Flejadora Eléctrica Portátil Automática E-pac',
        category: 'Máquinas Flejadoras',
        description: 'Puede usarse en flejes de Polipropileno o PET (Liso o Embosado). Sellado por fricción y tensión ajustable.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'E-pac' },
            { label: 'Modelo', value: 'JDC 13/16' },
            { label: 'Batería', value: 'Recargable 110V' },
            { label: 'Peso', value: '2.7 Kg' },
        ],
    },
    // Consumibles
    {
        id: 22,
        name: 'Película Estirable (Playo)',
        category: 'Consumibles',
        description: 'Película estirable para emplayar de aplicación manual. Alta resistencia y elongación. Calibre 60.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ultrex' },
            { label: 'Medidas', value: '3"x1000\', 5"x1000\', 18"x1000\'' },
            { label: 'Empaque', value: 'Caja con 4 rollos (para 18")' },
        ],
    },
    {
        id: 23,
        name: 'Escuadra Protectora de Plástico',
        category: 'Consumibles',
        description: 'Escuadra plástica para protección de bultos a flejar. Para flejes de hasta 1" de ancho.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ultrex' },
            { label: 'Modelo', value: 'EP-1000' },
            { label: 'Largo de Pata', value: '1.750"' },
        ],
    },
    {
        id: 24,
        name: 'Hebilla de Plástico para Fleje',
        category: 'Consumibles',
        description: 'Hebilla de polipropileno 100% virgen para flejados livianos. Para fleje de hasta 5/8".',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ultrex' },
            { label: 'Modelo', value: 'HP-58' },
            { label: 'Ancho Máximo', value: '5/8"' },
        ],
    },
    {
        id: 25,
        name: 'Grapas Cobrizadas para Cajas',
        category: 'Consumibles',
        description: 'Grapas cobrizadas para cerrar cajas de cartón. Cartucho con 50 grapas.',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ultrex' },
            { label: 'Modelo', value: '3315-U' },
            { label: 'Ancho de Corona', value: '34.7 mm' },
            { label: 'Largo de Pata', value: '15 mm' },
        ],
    },
].map(product => ({ ...product, slug: generateSlug(product.name) })); // Agregamos el slug a cada producto
