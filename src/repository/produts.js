import { categoryOptions } from "../utils/contstant/category";
import { tagOptions } from "../utils/contstant/tag";

const products = [
  {
    id: 1,
    image: "https://i.ibb.co.com/bv2BGTj/image.png",
    category: categoryOptions.FOOD,
    name: "kartika toast puffies kecil",
    price: 5000,
    username: "novansyaah",
    tag: tagOptions.READY_STOCK,
    stock: 10,
    discount: 0,
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/TkdQhSc/image.pngg",
    name: "kartika toast puffies besar",
    category: categoryOptions.FOOD,
    price: 8500,
    username: "novansyaah",
    tag: tagOptions.READY_STOCK,
    stock: 10,
    discount: 0,
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 3,
    image:
      "https://id-test-11.slatic.net/p/f69c9ef0a56e85002aa263b09f55c634.jpg",
    category: categoryOptions.FOOD,
    name: "Kacang Atom Garuda",
    price: 1500,
    username: "duhabduh",
    tag: tagOptions.READY_STOCK,
    stock: 10,
    discount: 0,
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 4,
    image:
      "https://www.boncabe.com/wp-content/uploads/snack-boncabe-makaroni-krispi-level-10-15-banner-l.webp",
    name: "BonCabe Makaroni Krispi",
    category: categoryOptions.FOOD,
    price: 2500,
    username: "duhabduh",
    tag: tagOptions.READY_STOCK,
    stock: 10,
    discount: 0,
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 5,
    image:
      "https://down-id.img.susercontent.com/file/sg-11134201-22110-aoby46n7u3jvdc",
    name: "Kopi Excelso Single Serving",
    category: categoryOptions.FOOD,
    price: 5000,
    username: "duhabduh",
    tag: tagOptions.READY_STOCK,
    stock: 10,
    discount: 0,
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 6,
    image: "https://i.ibb.co.com/bsdnCSK/image.png",
    name: "ES KUL-KUL PISANG DAN MELON",
    category: categoryOptions.FOOD,
    price: 2500,
    username: "samudra_ajri",
    tag: tagOptions.READY_STOCK,
    stock: 10,
    discount: 0,
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 7,
    image: "https://i.ibb.co.com/5B95kvd/photo-2024-10-09-10-34-57.jpg",
    name: "Cranberry Creamcheese Sourdough Bread",
    category: categoryOptions.FOOD,
    price: 26000,
    username: "ashrinp",
    tag: tagOptions.PO,
    discount: 0,
    is_available: true,
  },
  {
    id: 8,
    image: "https://i.ibb.co.com/Fzb89Ss/photo-2024-10-09-10-34-52.jpg",
    name: "Butter Salted Bread",
    category: categoryOptions.FOOD,
    price: 13000,
    username: "ashrinp",
    tag: tagOptions.PO,
    discount: 0,
    is_available: true,
  },
  {
    id: 9,
    image: "https://i.ibb.co.com/dGM6NfJ/image.png",
    name: "Pempek Campur",
    category: categoryOptions.FOOD,
    price: 35000,
    username: "shintadewiaw",
    tag: tagOptions.READY_STOCK,
    stock: 10,
    discount: 0,
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 10,
    image: "https://i.ibb.co.com/yVSVhNq/image.png",
    name: "Pempek Kapal Selam",
    category: categoryOptions.FOOD,
    price: 20000,
    username: "shintadewiaw",
    tag: tagOptions.READY_STOCK,
    stock: 10,
    discount: 0,
    is_available: true,
    location: "R. Selatan",
  },
  {
    id: 11,
    image: "https://i.ibb.co.com/VQYydq6/IMG-20241009-145142-643.jpg",
    name: "Cilok Bos Anom - Isi 10 Biji",
    category: categoryOptions.FOOD,
    price: 10000,
    username: "imamfahmi29",
    is_available: true,
    tag: tagOptions.PO,
    discount: 0,
  },

  {
    id: 12,
    image: "https://i.ibb.co.com/VQYydq6/IMG-20241009-145142-643.jpg",
    name: "Cilok Bos Anom - Isi 15 Biji",
    category: categoryOptions.FOOD,
    price: 15000,
    username: "imamfahmi29",
    is_available: true,
    tag: tagOptions.PO,
    discount: 0,
  },
];

const getFunctionSort = (sort) => {
  return sort == "name" ? sortAscByName : sortDescByDiscount;
};

export const getProducts = (q = "", category = "", sort = '') => {
  const funcSort = getFunctionSort(sort);
  if (q == "" && category == "") return funcSort(products.filter((product) => product));

  const regex = new RegExp(q, "gi");

  return funcSort(
    products.filter(
      (product) => product.name.match(regex) && category == product.category
    )
  );
};

export const getByID = (id) => {
  return products.filter((product) => product.id == id)[0];
};

const sortDescByDiscount = (products) => {
  return products.sort((a, b) => {
    return b.discount - a.discount;
  });
};

const sortAscByName = (products) => {
  return products.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};
