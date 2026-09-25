"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ProductForm from "@/components/ProductForm";
import { addProduct } from "@/lib/productApi";
import { saveAddedProduct } from "@/lib/productStorage";

export default function NewProductPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const handleSubmit = async (data: {
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
  }) => {
    try {
      const product = await addProduct(data);
      saveAddedProduct(product);

      alert("Product added successfully.");

      router.push(`/products/${product.id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to add product.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => router.push("/products")}
          className="mb-6 text-sm font-medium hover:underline"
        >
          ← Back to Products
        </button>

        <h1 className="mb-2 text-2xl font-bold">
          Add Product
        </h1>

        <p className="mb-6 text-gray-500">
          Create a new product.
        </p>

        <ProductForm
          submitLabel="Add Product"
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}