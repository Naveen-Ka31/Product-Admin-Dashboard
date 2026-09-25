"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getProductById } from "@/lib/productApi";
import { Product } from "@/types/product";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

interface ProductDetails extends Product {
  reviews: Review[];
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] =
    useState<ProductDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const id = String(params.id);

        const data =
          await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error(error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <h1 className="mb-2 text-2xl font-bold">
            Product Not Found
          </h1>

          <p className="mb-6 text-gray-500">
            The product you are looking for does
            not exist.
          </p>

          <Link
            href="/products"
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">

        {/* Back button */}
        <Link
          href="/products"
          className="mb-6 inline-block text-sm font-medium hover:underline"
        >
          ← Back to Products
        </Link>

        {/* Product information */}
        <section className="rounded-lg bg-white p-6 shadow">
          <div className="grid gap-8 md:grid-cols-2">

            {/* Images */}
            <div>
              <div className="mb-4 flex justify-center">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="rounded-lg object-contain"
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.images
                  ?.slice(0, 4)
                  .map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={100}
                      height={100}
                      className="h-24 w-full rounded object-cover"
                    />
                  ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="mb-2 text-sm capitalize text-gray-500">
                {product.category}
              </p>

              <h1 className="mb-4 text-3xl font-bold">
                {product.title}
              </h1>

              <p className="mb-4 text-2xl font-bold">
                ${product.price}
              </p>

              <p className="mb-4">
                ⭐ {product.rating}
              </p>

              <p className="mb-6 text-gray-600">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-gray-100 p-4">
                  <p className="text-sm text-gray-500">
                    Stock
                  </p>

                  <p className="font-semibold">
                    {product.stock}
                  </p>
                </div>

                <div className="rounded-md bg-gray-100 p-4">
                  <p className="text-sm text-gray-500">
                    Brand
                  </p>

                  <p className="font-semibold">
                    {product.brand || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Reviews
          </h2>

          {product.reviews?.length ? (
            <div className="space-y-4">
              {product.reviews.map(
                (review, index) => (
                  <div
                    key={index}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <p className="font-semibold">
                        {review.reviewerName}
                      </p>

                      <p>
                        ⭐ {review.rating}
                      </p>
                    </div>

                    <p className="text-gray-600">
                      {review.comment}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {new Date(
                        review.date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-gray-500">
              No reviews available.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}