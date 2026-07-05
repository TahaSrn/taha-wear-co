// src/features/products/useGetNewestProducts.js
import { useQuery } from "@tanstack/react-query";
import { getNewestProducts } from "../../services/apiProducts";

export default function useGetNewestProducts() {
  const {
    data: newestProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newestProducts"],
    queryFn: getNewestProducts,
    staleTime: 1000 * 60 * 5,
  });

  return { newestProducts, isLoading, error };
}
