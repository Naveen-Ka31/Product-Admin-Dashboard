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

export const getProductsByCategory = async (
  category: string,
  limit: number,
  skip: number
): Promise<ProductResponse> => {
  const response = await api.get(
    `/products/category/${category}`,
    {
      params: {
        limit,
        skip,
      },
    }
  );

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/products/categories");

  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const addProduct = async (data: {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}) => {
  const response = await api.post("/products/add", data);

  return response.data;
};

export const updateProduct = async (
  id: string,
  data: {
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
  }
) => {
  const response = await api.put(`/products/${id}`, data);

  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};