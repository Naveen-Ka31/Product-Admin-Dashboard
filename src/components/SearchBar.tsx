"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="w-full md:max-w-md">
      <label
        htmlFor="search"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Search products
      </label>

      <input
        id="search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by product name..."
        className="w-full rounded-md border bg-white px-4 py-2 outline-none focus:ring-2"
      />
    </div>
  );
}