// src/features/products/useGetProducts.js
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export default function useGetProducts({
  categoryIds,
  colors,
  minPrice,
  maxPrice,
  sortBy,
  search,
} = {}) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "products",
      categoryIds,
      colors,
      minPrice,
      maxPrice,
      sortBy,
      search,
    ],
    queryFn: () =>
      getProducts({
        categoryIds,
        colors,
        minPrice,
        maxPrice,
        sortBy,
        search,
      }),
    // اگر search خالی باشه، کوئری رو اجرا نکن
    enabled: true,
  });

  return { products, isLoading, error };
}
