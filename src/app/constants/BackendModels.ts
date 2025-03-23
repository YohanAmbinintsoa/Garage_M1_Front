export const carBrand = [
    { name: 'designation', accessor:'designation', type: 'text', required: true },
]

export const carModel = [
    { name: 'brand', accessor:'designation', type: 'select', required: true, optionsEndpoint: 'carBrands' },
    { name: 'designation', accessor:'designation', type: 'text', required: true },
]