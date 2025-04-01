export const carBrand = [
    { name: 'designation', accessor:'designation', type: 'text', required: true },
]

export const carModel = [
    { name: 'brand', accessor:'designation', type: 'select', required: true, optionsEndpoint: 'carBrands' },
    { name: 'designation', accessor:'designation', type: 'text', required: true },
]

export const articleCategory = [
    { name: 'designation', accessor:'designation', type: 'text', required: true },
]

export const article = [
    { name: 'articleCategory', accessor:'designation', type: 'select', required: true, optionsEndpoint: 'articleCategories' },
    { name: 'designation', accessor:'designation', type: 'text', required: true },
]

export const services = [
    { name: 'designation', accessor:'designation', type: 'text', required: true },
]

export const car = [
    { name: 'carModel', accessor:'designation', type: 'select', required: true, optionsEndpoint: 'carModels' },
    { name: 'designation', accessor:'designation', type: 'text', required: true },
    { name: 'year', accessor:'year', type: 'text', required: true },
]