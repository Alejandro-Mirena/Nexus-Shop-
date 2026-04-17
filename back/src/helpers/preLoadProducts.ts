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
  discount?: number;
  isOnSale?: boolean;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 17 Pro ",
    price: 699,
    description:
      "El iPhone 17 Pro llega con el potente chip A19 Pro, sistema de cámara profesional de triple lente y pantalla ProMotion de 120Hz con brillo excepcional. Diseñado para fotógrafos, creadores y profesionales que exigen lo mejor en rendimiento y experiencia móvil.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-model-unselect-gallery-2-202509_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=dU9qRExIQUlQTzVKeDd1V1dtUE1MUWFRQXQ2R0JQTk5udUZxTkR3ZVlpTEJBSVhDREVhQVF4eThVb2E3Y2VibUlYUWYrQkRLNitCbE9QRVRqNHErMkE3b3pFWnhZZ2g0M0pRR0pEdHVSRUVtYkFqYmVJbENIK1gycDVvVjJtTEZkWHlyQUZHM0VoZTBZR3diWjJXVERn&traceId=1",
    categoryId: 1,
    stock: 10,
    discount: 10,
    isOnSale: true,
  },
  {
    name: "MacBook Pro 14",
    price: 999,
    description:
      "El MacBook Pro de 14 pulgadas está impulsado por el chip Apple Silicon más avanzado, con pantalla Liquid Retina XDR de alto brillo y batería de larga duración. Ideal para diseñadores, desarrolladores y profesionales que necesitan potencia máxima en formato compacto.",
    image:
      "https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mbp_14_16_028335cc2_2x.jpg",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "iPad Pro",
    price: 799,
    description:
      "El iPad Pro redefine la productividad con su chip M-series, pantalla Liquid Retina XDR ultrabrillante y compatibilidad con Apple Pencil Pro y Magic Keyboard. La herramienta perfecta para artistas, diseñadores y profesionales que buscan un rendimiento sin límites.",
    image:
      "https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_pro_30558c612_2x.png",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Apple Watch SE 3",
    price: 399,
    description:
      "El Apple Watch SE 3 ofrece las funciones esenciales de salud y fitness de Apple Watch a un precio más accesible, con detección de caídas y monitoreo de frecuencia cardíaca. Su diseño ligero y elegante lo convierte en el compañero ideal para el día a día activo.",
    image:
      "https://www.apple.com/assets-www/en_WW/watch/product_tile/large/se_32690d524_2x.png",
    categoryId: 4,
    stock: 10,
    discount: 20,
    isOnSale: true,
  },
  {
    name: "AirPods 4",
    price: 249,
    description:
      "Los AirPods 4 ofrecen audio de alta calidad con chip H2, diseño renovado de ajuste personalizado y cancelación activa de ruido para una experiencia sonora inmersiva. Perfectos para música, llamadas y podcasts con la comodidad y conectividad característica de Apple.",
    image:
      "https://www.apple.com/v/airpods-4/g/images/overview/bento-gallery/bento_case_open__63kccmu775u6_xlarge_2x.jpg",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "HomePod mini",
    price: 99,
    description:
      "El HomePod mini ofrece un sonido envolvente y de alta fidelidad en un formato compacto, con Siri integrado y funciones de centro de hogar inteligente para toda la familia. Compatible con Apple Music y servicios de streaming, transforma cualquier habitación en una experiencia auditiva única.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/homepod-select-202210?wid=1080&hei=1080&fmt=jpeg&qlt=90&.v=Q1RBQitMYmJvQlQ1STVESXY1WlV2SlpLYkQ5SThRcnhoWTlFVGlOdXJxUE12WnA0VTdkakoxb3RuNWhBdXJCbnA2cGlnUFFScllJaDlyTVB3cDNhSWY1YVdUQzhNQjVzZ2NsNHh0QzJzMEE",
    categoryId: 9,
    stock: 10,
  },
  {
    name: "Pantalla de estudio XDR",
    price: 3299,
    description:
      "La Pantalla Pro XDR de Apple ofrece una imagen de 6K con brillo extremo, amplia gama de colores y tecnología de retroiluminación de última generación para profesionales creativos. Diseñada para editores de video, fotógrafos y diseñadores que exigen la mayor precisión visual del mercado.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MFEL4?wid=532&hei=582&fmt=png-alpha&.v=eHV6SzVxYnErY1lnZnFGbm43MnRld0hqc0NvK2RZTVd5TWVhUDFuQlo0M3YzcG5UekJGa1NTUlI3aFMvTS8vbThEd1FhZ3hucDd1d3NPNU1Ydzhsdmc",
    categoryId: 7,
    stock: 10,
    discount: 20,
    isOnSale: true,
  },
  {
    name: "Galaxy Buds3 FE",
    price: 155,
    description:
      "Los Galaxy Buds3 FE ofrecen sonido de alta calidad con cancelación de ruido activa y compatibilidad con Galaxy AI para traducción en tiempo real directamente al oído. Su diseño ergonómico y batería de larga duración los convierten en el accesorio ideal para usuarios Samsung.",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/pe/sm-r400nzaalta/gallery/pe-galaxy-buds-fe-sm-r400nzaalta-538769511?$Q90_1920_1280_F_PNG$",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "Galaxy S26 Ultra 1TB",
    price: 2335,
    description:
      "El Samsung Galaxy S26 Ultra con 1TB de almacenamiento ofrece rendimiento excepcional con cámara de última generación y pantalla Dynamic AMOLED. Ideal para quienes buscan lo mejor en fotografía móvil, productividad y velocidad sin compromisos.",
    image:
      "https://images.samsung.com/is/image/samsung/assets/pe/students-offers/offer-cards/PC_SM-S948BZVVLTP_FT12_570x304.png?$570_N_PNG$",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "REDMI Note 15 Pro",
    price: 379,
    description:
      "El Redmi Note 15 Pro combina un potente procesador con batería de larga duración y cámara de alta resolución a un precio accesible. Una opción perfecta para quienes buscan rendimiento y estilo sin gastar de más en su día a día.",
    image:
      "https://i02.appmifile.com/765_item_pe/19/01/2026/f2713f522e5ca8213604708e055c694e.png?thumb=1&w=600&f=webp&q=85",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "Cámara Profesional HXR-NX800",
    price: 3650,
    description:
      "La Sony HXR-NX800 captura video en 4K con gran estabilización óptica y audio de alta fidelidad, ideal para producciones cinematográficas exigentes. Diseñada para camarógrafos profesionales que necesitan calidad broadcast en cualquier situación.",
    image:
      "https://pesonyb2c.vtexassets.com/arquivos/ids/224878/GENBA_HXR-NX800_01_MainImage_SSO_1000x1000px.jpg?v=638658922068770000",
    categoryId: 5,
    stock: 10,
    discount: 20,
    isOnSale: true,
  },
  {
    name: "40W Dynamic Power Adapter with 60W Max",
    price: 40,
    description:
      "El cargador Dynamic Power Adapter de 40W con pico de 60W carga tus dispositivos Apple de forma rápida y eficiente gracias a su tecnología de carga inteligente. Compacto y compatible con USB-C, es perfecto para usar en casa o durante el viaje.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGKN4?wid=532&hei=582&fmt=png-alpha&.v=T0lOcnNHdkZoVHZXUE1wQk9tZ1A4d0hqc0NvK2RZTVd5TWVhUDFuQlo0M0NzdzNDT1N4VEJGYnliSWtxOW1wYWxkajZ1cGQ5WVZidWhPak1Ga21BOGc",
    categoryId: 9,
    stock: 10,
  },
  {
    name: "240W USB-C Charge Cable (2 m)",
    price: 30,
    description:
      "El cable USB-C de 240W y 2 metros ofrece carga ultrarrápida y transferencia de datos de alta velocidad para tus dispositivos compatibles. Su construcción resistente garantiza durabilidad y rendimiento óptimo durante un largo tiempo de uso.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MU2G3?wid=532&hei=582&fmt=png-alpha&.v=VDR6aHRWaDFmcExoSmNtMlQ5c0hoUUhqc0NvK2RZTVd5TWVhUDFuQlo0MWxsQUIyWU0zbSt0MzZmM0dGczBmWTBRdVRwV25xV1pnRHIzRlMzQnRJVlE",
    categoryId: 9,
    stock: 10,
    discount: 20,
    isOnSale: true,
  },
  {
    name: "Beats iPhone 17 Pro Rugged Case with MagSafe and Camera Control - Everest Black",
    price: 80,
    description:
      "La funda Beats Rugged Case para iPhone 17 Pro en Everest Black ofrece protección robusta contra caídas con compatibilidad MagSafe y acceso al control de cámara. Su diseño ergonómico resiste golpes y arañazos sin comprometer la elegancia del dispositivo.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJM4?wid=532&hei=582&fmt=png-alpha&.v=dFVqUWZ0a2tHOEZCaGpkN2NheUN5UUhqc0NvK2RZTVd5TWVhUDFuQlo0MmJWWStyQy9Bc0pkZ0lVRHMwajExY2tERE10eXgzUjNzTld2OEZnZSs4REE",
    categoryId: 9,
    stock: 10,
    discount: 20,
    isOnSale: true,
  },
  {
    name: "AirPods Max 2 - Midnight",
    price: 80,
    description:
      "Los AirPods Max 2 en color Midnight ofrecen audio inmersivo con cancelación activa de ruido de nueva generación y sonido espacial adaptativo de alta fidelidad. Fabricados con materiales premium, son el compañero ideal para música, llamadas y entretenimiento.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=532&hei=582&fmt=png-alpha&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdmVWNWdHYnp5cHkwMldsSElEOHpydzVnNEpSU25rZDdFWXRRajVqcEhqRlNIVjdYdVpHUzVnakg0UTYvWXlHaWNzNkh1dXhBL3hoTFhpMitUTmx4MTMrNmVjbmk5c1V4VVk2VEt3TGcxekg",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "Twelve South HiRise Pro Adjustable Stand for MacBook with MagSafe",
    price: 80,
    description:
      "El soporte HiRise Pro de Twelve South es totalmente ajustable y compatible con MagSafe, elevando tu MacBook a la altura ergonómica ideal para trabajar cómodamente. Su diseño minimalista en aluminio complementa perfectamente el estilo de los productos Apple.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HR1A2?wid=532&hei=582&fmt=png-alpha&.v=TTFDN0ZJaGlnekgwL0VCdmJMS1VYQUhqc0NvK2RZTVd5TWVhUDFuQlo0MVRkSVFSeVNXa2J3WnBwaWcwK3pZZWc5VFJuMHdmaFl3YnN3Y2M3ZitsWlE",
    categoryId: 9,
    stock: 10,
  },
  {
    name: "Insta360 X5 Standard Bundle",
    price: 545,
    description:
      "El bundle Insta360 X5 incluye la cámara 360° con mayor resolución de la marca, ideal para capturar aventuras en video esférico de alta calidad. Con estabilización FlowState y edición intuitiva, es perfecta para creadores de contenido más exigentes.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HS6Z2?wid=890&hei=890&fmt=jpeg&qlt=90&.v=YVc3YnA1eW5uUzNrcG0ybEdLaDFOb3ExblZJSGFXSFVPMUE2c2RxMy8rTEIyT1U4Q2h1SENVWVZvOW9uL0hMSFMrZGtqM2F3U3hDVTdPeEV3dkt6Q0E",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "Laptop HP Victus Gaming15",
    price: 1052,
    description:
      "La HP Victus Gaming 15 está equipada con procesador de alto rendimiento y tarjeta gráfica dedicada para una experiencia de juego fluida y envolvente. Su pantalla de 15 pulgadas con alta tasa de refresco garantiza gráficos nítidos en cada partida.",
    image:
      "https://pe-media.hptiendaenlinea.com/catalog/product/cache/314dec89b3219941707ad62ccc90e585/A/0/A0DH6LA_1ImagenPrincipalConTexto_a.jpg",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "Iphone 16 Air",
    price: 999,
    description:
      "El iPhone 16 Air es el modelo más delgado y ligero de Apple, con chip A18 y una pantalla Super Retina XDR extraordinariamente brillante y vibrante. Diseñado para quienes valoran la portabilidad sin renunciar al rendimiento más avanzado de Apple.",
    image:
      "https://www.apple.com/v/iphone/home/cj/images/overview/select-variant/iphone_air__b5qmgl05ojyq_large_2x.jpg",
    categoryId: 1,
    stock: 10,
    discount: 15,
    isOnSale: true,
  },
  {
    name: "Iphone 16 ",
    price: 699,
    description:
      "El iPhone 16 llega con el potente chip A18, sistema de cámara mejorado con modo fotográfico avanzado y mayor duración de batería respecto a generaciones anteriores. Un smartphone versátil y confiable para el día a día con la calidad característica de Apple.",
    image:
      "https://www.apple.com/v/iphone/home/cj/images/overview/select-variant/iphone_16__b6tkv86m2gc2_large_2x.jpg",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "iPhone 17 Pro   Case with MagSafe - Blue",
    price: 60,
    description:
      "La funda oficial para iPhone 17 Pro en color azul con MagSafe ofrece protección elegante y sujeción magnética perfecta para accesorios compatibles del ecosistema Apple. Fabricada con materiales de alta calidad que cuidan tu iPhone sin añadir volumen innecesario.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF94_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=bEJnYWVLUjlXK2pKTzcvWmZ1MUVJRlZya2lKWlJmUEwrYndWOTJiVWJWQUYwVmtIbGRkS25RMVpBRlo0bk5DUWFLcW9vODByUXkzdzhEck15RktvdUE",
    categoryId: 9,
    stock: 10,
  },
  {
    name: " Anchor Blue Ocean Band",
    price: 100,
    description:
      "La correa Anchor Blue Ocean está fabricada con materiales reciclados del océano en un tono azul vibrante, compatible con Apple Watch de todas las series. Cómoda, resistente al agua y sostenible, es perfecta para un estilo de vida activo y consciente.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGCJ4?wid=532&hei=582&fmt=png-alpha&.v=SEhhTkhjVVpTS1U0NWxOU04wdjFEQUhqc0NvK2RZTVd5TWVhUDFuQlo0M1FVMURSTjM1ZmU2VVZiOVpOZzlBZlJEVlhPYjUyMWFpVGpsUm1JdVpxWUE",
    categoryId: 9,
    stock: 10,
  },
  {
    name: " Ipad",
    price: 350,
    description:
      "El iPad ofrece la experiencia Apple más accesible con pantalla Liquid Retina, chip potente y compatibilidad con Apple Pencil y Magic Keyboard para mayor productividad. Ideal para estudiar, crear contenido y mantenerse entretenido en cualquier lugar del mundo.",
    image:
      "https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_7fc90e139_2x.png",
    categoryId: 3,
    stock: 10,
  },
  {
    name: " Apple Pencil Pro",
    price: 79,
    description:
      "El Apple Pencil Pro incorpora detección de apretón y giroscopio para una experiencia de escritura y dibujo más precisa y natural en tu iPad compatible. Perfecto para artistas, diseñadores y estudiantes que buscan la máxima expresión creativa en formato digital.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MX2D3?wid=532&hei=582&fmt=png-alpha&.v=YVo4RFdhVU5yOEtndnBqTVBDZytYQUhqc0NvK2RZTVd5TWVhUDFuQlo0MlVSVEd3WGxyWkRkbCttOFdLT3Y0VUdXQ1pIVUZFeHUrOEx0QnlPY1lrdWc",
    categoryId: 9,
    stock: 10,
    discount: 10,
    isOnSale: true,
  },
  {
    name: " Magic Keyboard for iPad Pro",
    price: 300,
    description:
      "El Magic Keyboard para iPad Pro convierte tu tablet en una herramienta de productividad con trackpad integrado y teclado de teclas con recorrido mejorado. Su diseño premium en aluminio ofrece una experiencia de escritura cómoda y profesional en todo momento.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWR03?wid=532&hei=582&fmt=png-alpha&.v=WGdQQmYxTHpudDRaTi9PcXplejZiQUhqc0NvK2RZTVd5TWVhUDFuQlo0M3VJK2RiQkFEb1A5SXpwN1pFQWVxMk5LZnl4Z2NLUk15aUJVVGNTenFYalE",
    categoryId: 9,
    stock: 10,
    discount: 10,
    isOnSale: true,
  },
  {
    name: " MacBook Neo",
    price: 599,
    description:
      "El MacBook Neo redefine la portabilidad con su diseño ultradelgado, pantalla de alto brillo y el más reciente chip Apple Silicon para un rendimiento sobresaliente. Perfecto para profesionales creativos y estudiantes que necesitan potencia y autonomía todo el día.",
    image:
      "https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mbn_0cd16ed14_2x.jpg",
    categoryId: 2,
    stock: 10,
  },
  {
    name: " Galaxy Z Fold7",
    price: 1599,
    description:
      "El Samsung Galaxy Z Fold7 combina smartphone y tablet en un dispositivo plegable con pantalla interna de 8 pulgadas y rendimiento de élite de última generación. Su bisagra avanzada y estructura ultraresistente lo convierten en el plegable más sofisticado del mercado.",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/us/f2507/gallery/us-galaxy-z-fold7-f966-sm-f966udbaxaa-547827574?$product-details-jpg$",
    categoryId: 1,
    stock: 10,
  },
  {
    name: " Monitor Teros ",
    price: 259,
    description:
      "El Monitor Teros ofrece una pantalla nítida con colores precisos y amplio ángulo de visión, ideal para trabajo de oficina, diseño gráfico y entretenimiento diario. Su diseño sin bordes y ajuste de altura lo convierten en una opción versátil para cualquier espacio.",
    image:
      "https://coolboxpe.vtexassets.com/arquivos/ids/410892-1200-1200?v=638719410482770000&width=1200&height=1200&aspect=true",
    categoryId: 7,
    stock: 10,
  },
  {
    name: " Canon PIXMA  ",
    price: 110,
    description:
      "La impresora Canon PIXMA ofrece impresiones de alta calidad en color y blanco y negro con conectividad inalámbrica y compatibilidad total con dispositivos móviles. Compacta y eficiente, es la solución perfecta para el hogar y la pequeña oficina moderna.",
    image:
      "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTcwMTB8aW1hZ2UvanBlZ3xoZDgvaGRkLzE1MDM0ODgwOTE3NTM0LmpwZ3w4MTU1N2UwYTEzNDVlNzIwNTZiOTlkOGIwNTQ3OTdmYTBmODAxYjU5MDJhODhlM2MyNDMzMGRiNWZiYzA4ZDFh/8B6B63BE-713E-43F2-879D-51A352F654A1.jpg",
    categoryId: 6,
    stock: 10,
    discount: 20,
    isOnSale: true,
  },
  {
    name: " AirPods Pro 3 ",
    price: 249,
    description:
      "Los AirPods Pro 3 incorporan cancelación activa de ruido de última generación, audio adaptativo y chip H2 mejorado para una experiencia sonora sin precedentes. Su estuche con carga MagSafe y mayor autonomía los convierten en los auriculares más avanzados de Apple.",
    image:
      "https://www.apple.com/v/airpods-pro/r/images/overview/contrast/explore_airpods_pro_3_open__e4dxk8zpalkm_large_2x.jpg",
    categoryId: 4,
    stock: 10,
  },
  {
    name: " iPad Air",
    price: 249,
    description:
      "El iPad Air combina el chip Apple Silicon con pantalla Liquid Retina de alta fidelidad en un diseño delgado y liviano disponible en varios colores vibrantes. Es la opción ideal para usuarios que buscan productividad y creatividad en un formato portable y elegante.",
    image:
      "https://www.apple.com/v/ipad-air/ah/images/overview/closer-look/space-gray/slide_1A__u8zw91uc6iaq_large_2x.jpg",
    categoryId: 3,
    stock: 10,
  },
  {
    name: " Belkin UltraCharge Pro 2-in-1",
    price: 249,
    description:
      "El Belkin UltraCharge Pro 2-in-1 permite cargar dos dispositivos simultáneamente con tecnología de carga rápida y compatibilidad con iPhone, AirPods y Apple Watch. Su diseño compacto es perfecto para el escritorio o el viaje, manteniendo todos tus dispositivos listos.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HS8F2?wid=532&hei=582&fmt=png-alpha&.v=UnJiMXNTVVcwSkYwek9zMzJNL1Zvd0hqc0NvK2RZTVd5TWVhUDFuQlo0MS9IQ0R1K0VGQzBZR0Z1aHJJQ0pqT2UyL3B0Q1hlVkMvblZidXlLOGZoN1E",
    categoryId: 9,
    stock: 10,
    discount: 30,
    isOnSale: true,
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
