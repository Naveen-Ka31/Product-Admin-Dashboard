"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getProducts } from "@/lib/productApi";
import ProductTable from "@/components/ProductTable";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts({
          limit: 10,
          skip: 0,
        });

        setProducts(data.products);
      } catch (error) {
        console.error(error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Product Dashboard
            </h1>

            <p className="text-gray-500">
              Manage your products
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </header>

        {products.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center">
            No products found.
          </div>
        ) : (
          <ProductTable products={products} />
        )}
      </div>
    </main>
  );
}