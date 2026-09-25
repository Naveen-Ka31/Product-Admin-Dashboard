"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProductForm from "@/components/ProductForm";
import { saveUpdatedProduct } from "@/lib/productStorage";
import {
  getProductById,
  updateProduct,
} from "@/lib/productApi";

import { Product } from "@/types/product";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const id = String(params.id);

        const data = await getProductById(id);

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

  const handleSubmit = async (data: {
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
  }) => {
    try {
     const updatedProduct = await updateProduct(id, data);

    saveUpdatedProduct(updatedProduct);

    alert("Product updated successfully.");

    router.push(`/products/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-600">
            {error || "Product not found."}
          </p>

          <button
            onClick={() => router.push("/products")}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => router.push(`/products/${product.id}`)}
          className="mb-6 text-sm font-medium hover:underline"
        >
          ← Back to Product
        </button>

        <h1 className="mb-2 text-2xl font-bold">
          Edit Product
        </h1>

        <p className="mb-6 text-gray-500">
          Update product information.
        </p>

        <ProductForm
          initialData={product}
          submitLabel="Save Changes"
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}