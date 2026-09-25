"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalProducts,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const start =
    totalProducts === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const end = Math.min(
    currentPage * pageSize,
    totalProducts
  );

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (
      let page = startPage;
      page <= endPage;
      page++
    ) {
      pages.push(page);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row md:items-center md:justify-between">
      {/* Showing information */}
      <p className="text-sm text-gray-600">
        Showing {start}–{end} of {totalProducts}
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) =>
          typeof page === "string" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-2 text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`rounded-md px-3 py-2 text-sm ${
                page === currentPage
                  ? "bg-black text-white"
                  : "border"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* Page size */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="pageSize"
          className="text-sm"
        >
          Page size:
        </label>

        <select
          id="pageSize"
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(Number(event.target.value))
          }
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}