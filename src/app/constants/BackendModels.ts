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
    { name: 'designation', accessor:'designation', type: 'text', required: true },
    { name: 'articleCategory', accessor:'designation', type: 'select', required: true, optionsEndpoint: 'articleCategories' },
]

export const services = [
    { name: 'designation', accessor:'designation', type: 'text', required: true },
]