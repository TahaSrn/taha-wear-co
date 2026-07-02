// features/products/useGetProducts.js
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export default function useGetProducts({
  categoryIds,
  colors,
  minPrice,
  maxPrice,
  sortBy,
} = {}) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", categoryIds, colors, minPrice, maxPrice, sortBy],
    queryFn: () =>
      getProducts({ categoryIds, colors, minPrice, maxPrice, sortBy }),
  });

  return { products, isLoading, error };
}
