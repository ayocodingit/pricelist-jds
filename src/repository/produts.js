const products = [
  {
    id: 1,
    image: "https://i.ibb.co.com/bv2BGTj/image.png",
    category: "makanan",
    name: "kartika toast kecil",
    price: 5000,
    username: "novansyaah",
    tag: "Ready Stock",
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/TkdQhSc/image.pngg",
    name: "kartika toast besar",
    category: "makanan",
    price: 8500,
    username: "novansyaah",
    tag: "Ready Stock",
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 3,
    image:
      "https://id-test-11.slatic.net/p/f69c9ef0a56e85002aa263b09f55c634.jpg",
    category: "makanan",
    name: "Kacang Atom Garuda",
    price: 1500,
    username: "duhabduh",
    tag: "Ready Stock",
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 4,
    image:
      "https://www.boncabe.com/wp-content/uploads/snack-boncabe-makaroni-krispi-level-10-15-banner-l.webp",
    name: "BonCabe Makaroni Krispi",
    category: "makanan",
    price: 2500,
    username: "duhabduh",
    tag: "Ready Stock",
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 5,
    image:
      "https://down-id.img.susercontent.com/file/sg-11134201-22110-aoby46n7u3jvdc",
    name: "Kopi Excelso Single Serving",
    category: "makanan",
    price: 5000,
    username: "duhabduh",
    tag: "Ready Stock",

    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 6,
    image: "https://i.ibb.co.com/bsdnCSK/image.png",
    name: "ES KUL-KUL PISANG & MELON",
    category: "makanan",
    price: 2500,
    username: "samudra_ajri",
    tag: "Ready Stock",

    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 7,
    image: "https://i.ibb.co.com/5B95kvd/photo-2024-10-09-10-34-57.jpg",
    name: "Cranberry Creamcheese Sourdough Bread",
    category: "makanan",
    price: 26000,
    username: "ashrinp",
    tag: "Open PO",
    is_available: true,
    location: "R. Tengah",
  },
  {
    id: 8,
    image: "https://i.ibb.co.com/Fzb89Ss/photo-2024-10-09-10-34-52.jpg",
    name: "Butter Salted Bread",
    category: "makanan",
    price: 13000,
    username: "ashrinp",
    tag: "Open PO",
    is_available: true,
    location: "R. Tengah",
  },
  {
    id: 9,
    image: "https://i.ibb.co.com/dGM6NfJ/image.png",
    name: "Pempek Campur",
    category: "makanan",
    price: 35000,
    username: "shintadewiaw",
    tag: "ready stock",
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 10,
    image: "https://i.ibb.co.com/yVSVhNq/image.png",
    name: "Pempek Kapal Selam",
    category: "makanan",
    price: 20000,
    username: "shintadewiaw",
    tag: "ready stock",
    is_available: true,
    location: "R. Selatan",
  },
];

export const getProducts = (q = "") => {
  if (q == "") return products;

  const regex = new RegExp(q, "gi");

  return products.filter((product) => product.name.match(regex));
};

export const getByID = (id) => {
  return products.filter((product) => product.id == id)[0]
}
