"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Fresh Cut Capsicum",
    category: "Vegetables",
    price: 49,
    originalPrice: 69,
    description: "Washed & chopped capsicum ready to cook.",
    image: "/assets/capsicum.jpg",
  },
  {
    id: 2,
    name: "Mixed Sprouts",
    category: "Sprouts",
    price: 59,
    originalPrice: 79,
    description: "Protein-rich fresh mixed sprouts.",
    image: "/assets/sprouts.jpg",
  },
  {
    id: 3,
    name: "Soaked Rajma",
    category: "Soaked",
    price: 45,
    originalPrice: 60,
    description: "12-hour soaked rajma for faster cooking.",
    image: "/assets/rajma.jpg",
  },
  {
    id: 4,
    name: "Chopped Onion",
    category: "Vegetables",
    price: 35,
    originalPrice: 45,
    description: "Freshly chopped onions.",
    image: "/assets/onion.jpg",
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Our Fresh Products
        </h2>
        <p className="mt-2 text-gray-500">
          Ready-to-cook vegetables, sprouts & soaked essentials.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          No products found in this category.
        </p>
      )}
    </section>
  );
}