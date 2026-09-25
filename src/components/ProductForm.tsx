"use client";

import { useState } from "react";
import { Product } from "@/types/product";

interface ProductFormProps {
  initialData?: Product;
  submitLabel: string;
  onSubmit: (data: {
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
  }) => Promise<void>;
}

export default function ProductForm({
  initialData,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [price, setPrice] = useState(
    initialData ? String(initialData.price) : ""
  );
  const [stock, setStock] = useState(
    initialData ? String(initialData.stock) : ""
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must contain at least 3 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required.";
    }

    const priceValue = Number(price);

    if (!price.trim()) {
      newErrors.price = "Price is required.";
    } else if (Number.isNaN(priceValue) || priceValue <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    const stockValue = Number(stock);

    if (!stock.trim()) {
      newErrors.stock = "Stock is required.";
    } else if (
      Number.isNaN(stockValue) ||
      !Number.isInteger(stockValue) ||
      stockValue < 0
    ) {
      newErrors.stock = "Stock must be a whole number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSaving(true);

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        price: Number(price),
        stock: Number(stock),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-6 shadow"
    >
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium"
          >
            Product Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Enter product title"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium"
          >
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Enter product description"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium"
          >
            Category
          </label>

          <input
            id="category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Enter category"
          />

          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-sm font-medium"
          >
            Price
          </label>

          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Enter price"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-600">
              {errors.price}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="mb-1 block text-sm font-medium"
          >
            Stock
          </label>

          <input
            id="stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Enter stock quantity"
          />

          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">
              {errors.stock}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}