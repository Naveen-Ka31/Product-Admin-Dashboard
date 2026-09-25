"use client";

import Image from "next/image";
import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Product
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Category
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Price
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Rating
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Stock
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b last:border-b-0"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="rounded object-cover"
                  />

                  <span className="font-medium">
                    {product.title}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4 capitalize">
                {product.category}
              </td>

              <td className="px-6 py-4">
                ${product.price}
              </td>

              <td className="px-6 py-4">
                ⭐ {product.rating}
              </td>

              <td className="px-6 py-4">
                {product.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}