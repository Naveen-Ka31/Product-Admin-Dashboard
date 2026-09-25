"use client";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  sortBy: string;
  sortOrder: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string) => void;
  onSortOrderChange: (order: string) => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  sortBy,
  sortOrder,
  onCategoryChange,
  onSortChange,
  onSortOrderChange,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row md:items-end">
      {/* Category */}
      <div className="w-full md:w-64">
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium"
        >
          Category
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">All categories</option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Sort field */}
      <div className="w-full md:w-64">
        <label
          htmlFor="sortBy"
          className="mb-1 block text-sm font-medium"
        >
          Sort by
        </label>

        <select
          id="sortBy"
          value={sortBy}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Default</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Sort order */}
      {sortBy && (
        <div className="w-full md:w-48">
          <label
            htmlFor="sortOrder"
            className="mb-1 block text-sm font-medium"
          >
            Order
          </label>

          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(event) =>
              onSortOrderChange(event.target.value)
            }
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      )}
    </div>
  );
}