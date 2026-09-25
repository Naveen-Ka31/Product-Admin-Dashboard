import { Product } from "@/types/product";

const STORAGE_KEY = "product-admin-local-products";
const DELETED_KEY = "product-admin-deleted-products";

interface LocalProducts {
  added: Product[];
  updated: Product[];
}

const getLocalData = (): LocalProducts => {
  if (typeof window === "undefined") {
    return {
      added: [],
      updated: [],
    };
  }

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return {
      added: [],
      updated: [],
    };
  }

  try {
    return JSON.parse(data);
  } catch {
    return {
      added: [],
      updated: [],
    };
  }
};

const saveLocalData = (data: LocalProducts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveAddedProduct = (product: Product) => {
  const data = getLocalData();

  data.added.push(product);

  saveLocalData(data);
};

export const saveUpdatedProduct = (product: Product) => {
  const data = getLocalData();

  data.updated = data.updated.filter(
    (item) => item.id !== product.id
  );

  data.updated.push(product);

  saveLocalData(data);
};

export const getLocalProducts = () => {
  return getLocalData();
};

export const saveDeletedProduct = (id: number) => {
  if (typeof window === "undefined") {
    return;
  }

  const data = localStorage.getItem(DELETED_KEY);

  let deletedIds: number[] = [];

  if (data) {
    try {
      deletedIds = JSON.parse(data);
    } catch {
      deletedIds = [];
    }
  }

  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
  }

  localStorage.setItem(
    DELETED_KEY,
    JSON.stringify(deletedIds)
  );
};

export const getDeletedProducts = (): number[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(DELETED_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};