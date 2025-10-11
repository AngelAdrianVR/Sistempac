// Este archivo funciona como una base de datos estática para los productos.
// Se ha agregado la propiedad 'slug' para URLs amigables y se han añadido todos los productos del catálogo.

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
        images: ['/images/products/placeholder.png', '/images/products/placeholder_alt.png'],
        details: [
            { label: 'Material', value: 'Poliéster (PET) Reciclado' },
            { label: 'Anchos Disponibles', value: '3/8", 1/2", 5/8"' },
            { label: 'Espesores', value: '0.022", 0.026", 0.031"' },
            { label: 'Presentaciones', value: 'Manual, Caja Cuadrada, Caja Octagonal, Automático, Jumbo' },
        ],
    },
    {
        id: 2,
        name: 'Fleje de Polipropileno Virgen (Máquina)',
        category: 'Flejes y Sellos',
        description: 'Fleje de polipropileno 100% virgen para máquinas automáticas y semiautomáticas.',
        images: ['/images/products/placeholder.png'],
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
        images: ['/images/products/placeholder.png'],
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
        images: ['/images/products/placeholder.png'],
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
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'P-262' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.200 Kg' },
        ],
    },
    {
        id: 6,
        name: 'Tensionadora Transpak H-21',
        category: 'Equipos para Flejar',
        description: 'Tensionadora para uso rudo, cuerpo de metal de fundición. Para fleje de plástico de hasta 3/4".',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Transpak' }, { label: 'Modelo', value: 'H-21' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.200 Kg' },
        ],
    },
    {
        id: 7,
        name: 'Selladora Ybico C-3004 / C-3005',
        category: 'Equipos para Flejar',
        description: 'Selladora cromada con mordazas de acero y forros de PVC. Para sellos de 1/2" (C-3004) y 5/8" (C-3005).',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelos', value: 'C-3004, C-3005' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '1.650 Kg' },
        ],
    },
    {
        id: 8,
        name: 'Tensionadora para Fleje de Acero Ybico S-290',
        category: 'Equipos para Flejar',
        description: 'Tensionadora para uso normal en fleje de acero. Permite anchos desde 3/8" hasta 3/4" y espesor de 0.035".',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelo', value: 'S-290' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '2.000 Kg' },
        ],
    },
    {
        id: 9,
        name: 'Selladora para Fleje de Acero Ybico',
        category: 'Equipos para Flejar',
        description: 'Selladora con doble mordaza de acero templado. Disponible para anchos de 3/8", 1/2", 5/8" y 3/4".',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Ybico' }, { label: 'Modelos', value: 'C-3103, C-3104, C-3105, C-3106' },
            { label: 'Origen', value: 'Taiwán' }, { label: 'Peso', value: '0.900 Kg' },
        ],
    },
    {
        id: 10,
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
        id: 11,
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
        id: 12,
        name: 'Despachador de Cinta Excell',
        category: 'Equipos de Empaque',
        description: 'Despachador para cinta de empaque con marco metálico, freno ajustable y doble navaja con protección. Disponible para 2" y 3".',
        images: ['/images/products/placeholder.png', '/images/products/placeholder_alt.png'],
        details: [
            { label: 'Marca', value: 'Excell' },
            { label: 'Modelos', value: 'EC-213 (2"), EC-313 (3")' },
            { label: 'Origen', value: 'Taiwán' },
        ],
    },
    {
        id: 13,
        name: 'Cierrabolsas Excell',
        category: 'Equipos de Empaque',
        description: 'Cierrabolsas metálico con sistema de cuchilla cortadora. Para cintas de 1/2" (EX-605K) y 5/8" (EX-808K).',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Excell' },
            { label: 'Modelos', value: 'EX-605K, EX-808K' },
            { label: 'Centro de cinta', value: '3"' },
        ],
    },
    {
        id: 14,
        name: 'Aplicador de Película Estirable',
        category: 'Equipos de Empaque',
        description: 'Aplicador para película con alma de 1.5", 2" y 3". Ajuste deslizable de 12" a 20".',
        images: ['/images/products/placeholder.png'],
        details: [
            { label: 'Marca', value: 'Excell / E-Pac' },
            { label: 'Modelos', value: 'SD 278E (Excell), BM500 (E-Pac)' },
            { label: 'Peso', value: '2.1 Kg' },
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
