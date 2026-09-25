"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  getProducts,
  searchProducts,
  getProductsByCategory,
  getCategories,
} from "@/lib/productApi";

import ProductTable from "@/components/ProductTable";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import ProductFilters from "@/components/ProductFilters";

import { Product } from "@/types/product";
import {
  getLocalProducts,
  getDeletedProducts,
} from "@/lib/productStorage";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Read initial values from URL.
   */
  const pageParam = Number(searchParams.get("page"));
  const pageSizeParam = Number(
    searchParams.get("pageSize")
  );

  const currentPage =
    Number.isInteger(pageParam) && pageParam >= 1
      ? pageParam
      : 1;

  const pageSize =
    [10, 20, 50].includes(pageSizeParam)
      ? pageSizeParam
      : 10;

  const search =
    searchParams.get("search") || "";

  const selectedCategory =
    searchParams.get("category") || "";

  const sortBy =
    searchParams.get("sort") || "";

  const sortOrder =
    searchParams.get("order") === "desc"
      ? "desc"
      : "asc";

  const [totalProducts, setTotalProducts] =
    useState(0);

  /*
   * Load categories.
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();

        const categoryNames = data.map(
          (category: string | { slug: string }) =>
            typeof category === "string"
              ? category
              : category.slug
        );

        setCategories(categoryNames);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );
      }
    };

    loadCategories();
  }, []);

  /*
   * Fetch products.
   */
  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const controller =
      new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const skip =
          (currentPage - 1) * pageSize;

        let data;

        if (selectedCategory) {
          data =
            await getProductsByCategory(
              selectedCategory,
              pageSize,
              skip
            );
        } else if (search.trim()) {
          data = await searchProducts(
            search.trim(),
            pageSize,
            skip,
            controller.signal
          );
        } else {
          data = await getProducts({
            limit: pageSize,
            skip,
          });
        }

        const localData = getLocalProducts();
const deletedProducts = getDeletedProducts();

let resultProducts = data.products
  .map((product: Product) => {
    const updatedProduct = localData.updated.find(
      (item) => item.id === product.id
    );

    return updatedProduct || product;
  })
  .filter(
    (product: Product) => !deletedProducts.includes(product.id)
  );

resultProducts = [
  ...localData.added,
  ...resultProducts,
];

        /*
         * Client-side sorting.
         */
        if (sortBy) {
          resultProducts = [
            ...resultProducts,
          ].sort((a, b) => {
            let comparison = 0;

            if (sortBy === "price") {
              comparison =
                a.price - b.price;
            }

            if (sortBy === "rating") {
              comparison =
                a.rating - b.rating;
            }

            if (sortBy === "title") {
              comparison =
                a.title.localeCompare(
                  b.title
                );
            }

            return sortOrder === "asc"
              ? comparison
              : -comparison;
          });
        }

        setProducts(resultProducts);
        setTotalProducts(data.total);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "CanceledError"
        ) {
          return;
        }

        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(error);

        setError(
          "Failed to load products."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(
      () => {
        fetchProducts();
      },
      search.trim() ? 500 : 0
    );

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [
    router,
    currentPage,
    pageSize,
    search,
    selectedCategory,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.ceil(
    totalProducts / pageSize
  );

  /*
   * Update URL parameters.
   */
  const updateUrl = (
    updates: Record<string, string>
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
    );

    router.push(
      `/products?${params.toString()}`
    );
  };

  const handlePageChange = (
    page: number
  ) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    updateUrl({
      page: String(page),
    });
  };

  const handlePageSizeChange = (
    size: number
  ) => {
    updateUrl({
      pageSize: String(size),
      page: "1",
    });
  };

  const handleSearchChange = (
    value: string
  ) => {
    updateUrl({
      search: value,
      category: "",
      page: "1",
    });
  };

  const handleCategoryChange = (
    category: string
  ) => {
    updateUrl({
      category,
      search: "",
      page: "1",
    });
  };

  const handleSortChange = (
    value: string
  ) => {
    updateUrl({
      sort: value,
      page: "1",
    });
  };

  const handleSortOrderChange = (
    value: string
  ) => {
    updateUrl({
      order: value,
      page: "1",
    });
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
          <p className="mb-4 text-red-600">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
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

        {/* Header */}
       <header className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-5 shadow sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h1 className="text-2xl font-bold">Product Dashboard</h1>
    <p className="text-gray-500">Manage your products</p>
  </div>

  <div className="flex gap-3">
    <button
      onClick={() => router.push("/products/new")}
      className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
    >
      + Add Product
    </button>

    <button
      onClick={handleLogout}
      className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Logout
    </button>
  </div>
</header>
        {/* Search */}
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={
              handleSearchChange
            }
          />
        </div>

        {/* Filters */}
        <ProductFilters
          categories={categories}
          selectedCategory={
            selectedCategory
          }
          sortBy={sortBy}
          sortOrder={sortOrder}
          onCategoryChange={
            handleCategoryChange
          }
          onSortChange={
            handleSortChange
          }
          onSortOrderChange={
            handleSortOrderChange
          }
        />

        {/* Products */}
        {products.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center">
            No products found.
          </div>
        ) : (
          <>
            <ProductTable
              products={products}
            />

            <Pagination
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
              pageSize={pageSize}
              totalProducts={
                totalProducts
              }
              onPageChange={
                handlePageChange
              }
              onPageSizeChange={
                handlePageSizeChange
              }
            />
          </>
        )}
      </div>
    </main>
  );
}