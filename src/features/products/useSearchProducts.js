// src/features/products/useSearchProducts.js
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export function useSearchProducts(searchTerm) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: () => getProducts({ search: searchTerm }),
    enabled: !!(searchTerm && searchTerm.trim().length > 0), // تبدیل به boolean با !!
    staleTime: 1000 * 60 * 1,
  });

  return { products, isLoading, error };
}
