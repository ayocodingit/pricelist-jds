const products = [
    {
        image: '/product/kartika-toast.jpg',
        name: 'kartika toast kecil',
        price: 5000,
        username: 'novansyaah'
    },
    {
        image: '/product/kartika-toast.jpg',
        name: 'kartika toast besar',
        price: 8500,
        username: 'novansyaah'
    },
]

export const getProducts = (q = '') => {
    if (q == '') return products

    const regex = new RegExp(q, 'gi');

    return products.filter((product) => product.name.match(regex))
}