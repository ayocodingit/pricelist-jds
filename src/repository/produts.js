const products = [
  {
    image: "/product/kartika-toast.jpg",
    name: "kartika toast kecil",
    price: 5000,
    username: "novansyaah",
    tag: 'Ready Stock',

    is_available: true,
    location: "R. Selatan",
  },
  {
    image: "/product/kartika-toast.jpg",
    name: "kartika toast besar",
    price: 8500,
    username: "novansyaah",
    tag: 'Ready Stock',

    is_available: true,
    location: "R. Selatan",
  },
  {
    image:
      "https://id-test-11.slatic.net/p/f69c9ef0a56e85002aa263b09f55c634.jpg",
    name: "Kacang Atom Garuda",
    price: 1500,
    username: "duhabduh",
    tag: 'Ready Stock',

    is_available: true,
    location: "R. Selatan",
  },
  {
    image:
      "https://www.boncabe.com/wp-content/uploads/snack-boncabe-makaroni-krispi-level-10-15-banner-l.webp",
    name: "BonCabe Makaroni Krispi",
    price: 2500,
    username: "duhabduh",
    tag: 'Ready Stock',

    is_available: true,
    location: "R. Selatan",
  },
  {
    image:
      "https://down-id.img.susercontent.com/file/sg-11134201-22110-aoby46n7u3jvdc",
    name: "Kopi Excelso Single Serving",
    price: 5000,
    username: "duhabduh",
    tag: 'Ready Stock',

    is_available: true,
    location: "R. Selatan",
  },
  {
    image:
      "https://i.ibb.co.com/bsdnCSK/image.png",
    name: "ES KUL-KUL PISANG & MELON",
    price: 2500,
    username: "samudra_ajri",
    tag: 'Ready Stock',

    is_available: true,
    location: "R. Selatan",
  },
  {
    image:
      "https://i.ibb.co.com/5B95kvd/photo-2024-10-09-10-34-57.jpg",
    name: "Cranberry Creamcheese Sourdough Bread",
    price: 26000,
    username: "ashrinp",
    tag: 'Open PO',
    is_available: true,
    location: "R. Tengah",
  },
  {
    image:
      "https://i.ibb.co.com/Fzb89Ss/photo-2024-10-09-10-34-52.jpg",
    name: "Butter Salted Bread",
    price: 13000,
    username: "ashrinp",
    tag: 'Open PO',
    is_available: true,
    location: "R. Tengah",
  },
  {
    image:
      "https://i.ibb.co.com/dGM6NfJ/image.png",
    name: "Pempek Campur",
    price: 35000,
    username: "shintadewiaw",
    tag: 'ready stock',
    is_available: true,
    location: "R. Selatan",
  },
  {
    image:
      "https://i.ibb.co.com/yVSVhNq/image.png",
    name: "Pempek Kapal Selam",
    price: 20000,
    username: "shintadewiaw",
    tag: 'ready stock',
    is_available: true,
    location: "R. Selatan",
  },
];

export const getProducts = (q = "") => {
  if (q == "") return products;

  const regex = new RegExp(q, "gi");

  return products.filter((product) => product.name.match(regex));
};
