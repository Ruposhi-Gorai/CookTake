import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg">

      {/* Product Image */}
      <div className="relative h-56 w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {product.category}
        </span>

        <h3 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
        </div>

        {/* Button */}
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-medium text-white transition hover:bg-green-700">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}