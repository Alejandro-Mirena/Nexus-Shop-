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
    name: "iPhone 17 ",
    price: 699,
    description:
      "Experience the next level of Apple intelligence with the iPhone 17 Pro: a groundbreaking camera system with advanced computational photography, the blazing-fast A19 Pro chip, and a stunning ProMotion display. Push the limits of what a smartphone can do.",
    image:
      "https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17pro__t1j902iw6kya_large_2x.jpg",
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
    name: "AirPods Pro",
    price: 249,
    description:
      "Immerse yourself in sound with the AirPods Pro: active noise cancellation, transparency mode, and customizable fit make the AirPods Pro the perfect companion for music, calls, and everything in between. Elevate your audio experience with the AirPods Pro.",
    image:
      "https://www.apple.com/v/airpods-pro/a/images/meta/og__c1zv8c8n7q06.png",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "HomePod mini",
    price: 99,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://www.apple.com/v/homepod-mini/a/images/meta/og__d5k62k8b4qka.png",
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
