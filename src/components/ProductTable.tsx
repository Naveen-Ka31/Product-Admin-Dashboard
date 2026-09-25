"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-lg bg-white shadow md:block">
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

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
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
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="rounded object-cover"
                    />

                    <span className="font-medium hover:underline">
                      {product.title}
                    </span>
                  </Link>
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

                <td className="px-6 py-4">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg bg-white p-4 shadow"
          >
            <div className="flex gap-4">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={80}
                height={80}
                className="h-20 w-20 rounded object-cover"
              />

              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${product.id}`}
                  className="font-semibold hover:underline"
                >
                  {product.title}
                </Link>

                <p className="mt-1 text-sm capitalize text-gray-500">
                  {product.category}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t pt-4">
              <div>
                <p className="text-xs text-gray-500">
                  Price
                </p>
                <p className="font-medium">
                  ${product.price}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Rating
                </p>
                <p className="font-medium">
                  ⭐ {product.rating}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Stock
                </p>
                <p className="font-medium">
                  {product.stock}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                href={`/products/${product.id}`}
                className="flex-1 rounded-md border px-3 py-2 text-center text-sm hover:bg-gray-100"
              >
                View
              </Link>

              <Link
                href={`/products/${product.id}/edit`}
                className="flex-1 rounded-md bg-black px-3 py-2 text-center text-sm text-white hover:bg-gray-800"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}