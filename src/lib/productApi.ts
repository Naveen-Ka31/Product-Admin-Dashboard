import api from "./axios";
import { ProductResponse } from "@/types/product";

export interface ProductQueryParams {
  limit: number;
  skip: number;
}

export const getProducts = async ({
  limit,
  skip,
}: ProductQueryParams): Promise<ProductResponse> => {
  const response = await api.get("/products", {
    params: {
      limit,
      skip,
    },
  });

  return response.data;
};

export const searchProducts = async (
  query: string,
  limit: number,
  skip: number,
  signal?: AbortSignal
): Promise<ProductResponse> => {
  const response = await api.get("/products/search", {
    params: {
      q: query,
      limit,
      skip,
    },
    signal,
  });

  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/products/categories");

  return response.data;
};