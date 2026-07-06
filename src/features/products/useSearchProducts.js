import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export function useSearchProducts(searchTerm) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: () => getProducts({ search: searchTerm }),
    enabled: !!searchTerm?.trim(),
    staleTime: 1000 * 60
  });

  return {
    products: data?.products ?? [],
    count: data?.count ?? 0,
    isLoading,
    error
  };
}