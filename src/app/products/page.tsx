import { Suspense } from "react";

import ProductsDashboard from "./ProductsDashboard";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p>Loading products...</p>
        </main>
      }
    >
      <ProductsDashboard />
    </Suspense>
  );
}