"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getProducts } from "@/lib/productApi";
import ProductTable from "@/components/ProductTable";
import Pagination from "@/components/Pagination";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

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

        const skip = (currentPage - 1) * pageSize;

        const data = await getProducts({
          limit: pageSize,
          skip,
        });

        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error(error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router, currentPage, pageSize]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

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
          <>
            <ProductTable products={products} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalProducts={totalProducts}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </div>
    </main>
  );
}