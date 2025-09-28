// src/data/mockData.ts

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  tags?: string[];
}

export const categories = [
  "Makeup",
  "Skincare",
  "Fragrance",
  "Hair Care",
  "Bath & Body",
];

export const brands = [
  "CHANEL",
  "DIOR",
  "YSL",
  "FENTY",
  "RARE",
  "GLOSSIER",
  "CHARLOTTE",
  "NARS",
];

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Luxury Lipstick Collection",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 45,
    oldPrice: 60,
    image: "/images/lipstick.jpg",
    tags: ["NEW"],
  },
  {
    id: 2,
    name: "Premium Eye Palette",
    brand: "ColorPro",
    category: "Makeup",
    price: 89,
    oldPrice: 120,
    image: "/images/eye-palette.jpg",
    tags: ["BESTSELLER"],
  },
  {
    id: 3,
    name: "Hydrating Serum",
    brand: "SkinLux",
    category: "Skincare",
    price: 125,
    oldPrice: 150,
    image: "/images/serum.jpg",
    tags: ["LIMITED"],
  },
  {
    id: 4,
    name: "Signature Fragrance",
    brand: "Elegance",
    category: "Fragrance",
    price: 95,
    oldPrice: 130,
    image: "/images/fragrance.jpg",
    tags: ["TRENDING"],
  },
];
