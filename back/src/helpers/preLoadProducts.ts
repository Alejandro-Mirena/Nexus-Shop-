import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 17 Pro ",
    price: 699,
    description:
      "Experience the next level of Apple intelligence with the iPhone 17 Pro: a groundbreaking camera system with advanced computational photography, the blazing-fast A19 Pro chip, and a stunning ProMotion display. Push the limits of what a smartphone can do.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-model-unselect-gallery-2-202509_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=dU9qRExIQUlQTzVKeDd1V1dtUE1MUWFRQXQ2R0JQTk5udUZxTkR3ZVlpTEJBSVhDREVhQVF4eThVb2E3Y2VibUlYUWYrQkRLNitCbE9QRVRqNHErMkE3b3pFWnhZZ2g0M0pRR0pEdHVSRUVtYkFqYmVJbENIK1gycDVvVjJtTEZkWHlyQUZHM0VoZTBZR3diWjJXVERn&traceId=1",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "MacBook Pro 14",
    price: 999,
    description:
      "Unleash professional-grade performance with the MacBook Pro 14: powered by the latest Apple Silicon chip, featuring a stunning Liquid Retina XDR display, exceptional battery life, and a full suite of pro connectivity. Built for those who demand the most from their machine.",
    image:
      "https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mbp_14_16_028335cc2_2x.jpg",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "iPad Pro",
    price: 799,
    description:
      "Unleash your creativity and productivity with the iPad Pro: powerful performance, stunning Liquid Retina display, and all-day battery life make the iPad Pro the perfect tool for work and play. Transform your ideas into reality with the iPad Pro.",
    image:
      "https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_pro_30558c612_2x.png",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Apple Watch SE 3",
    price: 399,
    description:
      "Get the essentials of Apple Watch at an accessible price with the Apple Watch SE 3: track your fitness and health metrics, stay connected with notifications and calls, and enjoy crash detection and safety features — all in a lightweight and stylish design.",
    image:
      "https://www.apple.com/assets-www/en_WW/watch/product_tile/large/se_32690d524_2x.png",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "AirPods 4",
    price: 249,
    description:
      "Immerse yourself in sound with the AirPods Pro: active noise cancellation, transparency mode, and customizable fit make the AirPods Pro the perfect companion for music, calls, and everything in between. Elevate your audio experience with the AirPods Pro.",
    image:
      "https://www.apple.com/v/airpods-4/g/images/overview/bento-gallery/bento_case_open__63kccmu775u6_xlarge_2x.jpg",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "HomePod mini",
    price: 99,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/homepod-select-202210?wid=1080&hei=1080&fmt=jpeg&qlt=90&.v=Q1RBQitMYmJvQlQ1STVESXY1WlV2SlpLYkQ5SThRcnhoWTlFVGlOdXJxUE12WnA0VTdkakoxb3RuNWhBdXJCbnA2cGlnUFFScllJaDlyTVB3cDNhSWY1YVdUQzhNQjVzZ2NsNHh0QzJzMEE",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Pantalla de estudio XDR",
    price: 3299,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MFEL4?wid=532&hei=582&fmt=png-alpha&.v=eHV6SzVxYnErY1lnZnFGbm43MnRld0hqc0NvK2RZTVd5TWVhUDFuQlo0M3YzcG5UekJGa1NTUlI3aFMvTS8vbThEd1FhZ3hucDd1d3NPNU1Ydzhsdmc",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Galaxy S26 Ultra 1TB",
    price: 2335,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://images.samsung.com/is/image/samsung/assets/pe/students-offers/offer-cards/PC_SM-S948BZVVLTP_FT12_570x304.png?$570_N_PNG$",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Galaxy Buds3 FE",
    price: 155,
    description:
      "Enhance your Galaxy AI experience with the Galaxy Buds FE. Now, you can have your translator speaking to your ear. Activate the translation function on your Samsung Galaxy smartphone with the Galaxy Buds FE turned on. Make friends, no matter the language, when you speak in person or on your smartphone.",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/pe/sm-r400nzaalta/gallery/pe-galaxy-buds-fe-sm-r400nzaalta-538769511?$Q90_1920_1280_F_PNG$",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "REDMI Note 15 Pro",
    price: 379,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://i02.appmifile.com/765_item_pe/19/01/2026/f2713f522e5ca8213604708e055c694e.png?thumb=1&w=600&f=webp&q=85",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Cámara Profesional HXR-NX800",
    price: 3650,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://pesonyb2c.vtexassets.com/arquivos/ids/224878/GENBA_HXR-NX800_01_MainImage_SSO_1000x1000px.jpg?v=638658922068770000",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "40W Dynamic Power Adapter with 60W Max",
    price: 40,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGKN4?wid=532&hei=582&fmt=png-alpha&.v=T0lOcnNHdkZoVHZXUE1wQk9tZ1A4d0hqc0NvK2RZTVd5TWVhUDFuQlo0M0NzdzNDT1N4VEJGYnliSWtxOW1wYWxkajZ1cGQ5WVZidWhPak1Ga21BOGc",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "240W USB-C Charge Cable (2 m)",
    price: 30,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MU2G3?wid=532&hei=582&fmt=png-alpha&.v=VDR6aHRWaDFmcExoSmNtMlQ5c0hoUUhqc0NvK2RZTVd5TWVhUDFuQlo0MWxsQUIyWU0zbSt0MzZmM0dGczBmWTBRdVRwV25xV1pnRHIzRlMzQnRJVlE",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Beats iPhone 17 Pro Rugged Case with MagSafe and Camera Control - Everest Black",
    price: 80,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJM4?wid=532&hei=582&fmt=png-alpha&.v=dFVqUWZ0a2tHOEZCaGpkN2NheUN5UUhqc0NvK2RZTVd5TWVhUDFuQlo0MmJWWStyQy9Bc0pkZ0lVRHMwajExY2tERE10eXgzUjNzTld2OEZnZSs4REE",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "AirPods Max 2 - Midnight",
    price: 80,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=532&hei=582&fmt=png-alpha&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdmVWNWdHYnp5cHkwMldsSElEOHpydzVnNEpSU25rZDdFWXRRajVqcEhqRlNIVjdYdVpHUzVnakg0UTYvWXlHaWNzNkh1dXhBL3hoTFhpMitUTmx4MTMrNmVjbmk5c1V4VVk2VEt3TGcxekg",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Twelve South HiRise Pro Adjustable Stand for MacBook with MagSafe",
    price: 80,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HR1A2?wid=532&hei=582&fmt=png-alpha&.v=TTFDN0ZJaGlnekgwL0VCdmJMS1VYQUhqc0NvK2RZTVd5TWVhUDFuQlo0MVRkSVFSeVNXa2J3WnBwaWcwK3pZZWc5VFJuMHdmaFl3YnN3Y2M3ZitsWlE",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Insta360 X5 Standard Bundle",
    price: 545,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HS6Z2?wid=890&hei=890&fmt=jpeg&qlt=90&.v=YVc3YnA1eW5uUzNrcG0ybEdLaDFOb3ExblZJSGFXSFVPMUE2c2RxMy8rTEIyT1U4Q2h1SENVWVZvOW9uL0hMSFMrZGtqM2F3U3hDVTdPeEV3dkt6Q0E",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Laptop HP Victus Gaming15",
    price: 1052,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://pe-media.hptiendaenlinea.com/catalog/product/cache/314dec89b3219941707ad62ccc90e585/A/0/A0DH6LA_1ImagenPrincipalConTexto_a.jpg",
    categoryId: 6,
    stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
