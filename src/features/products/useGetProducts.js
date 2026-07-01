// features/products/useGetProducts.js
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export default function useGetProducts({
  categoryIds,
  colors,
  minPrice,
  maxPrice,
} = {}) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", categoryIds, colors, minPrice, maxPrice],
    queryFn: () => getProducts({ categoryIds, colors, minPrice, maxPrice }),
  });

  return { products, isLoading, error };
}
