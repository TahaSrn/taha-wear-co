import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export default function useGetProducts({
  categoryIds,
  colors,
  minPrice,
  maxPrice,
  sortBy,
  search,
  page = 1,
  limit = 12,
} = {}) {
  const {
    data = { products: [], count: 0 },
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
      page,
      limit,
    ],
    queryFn: () =>
      getProducts({
        categoryIds,
        colors,
        minPrice,
        maxPrice,
        sortBy,
        search,
        page,
        limit,
      }),
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });

  return {
    products: data.products || [],
    count: data.count || 0,
    isLoading,
    error,
  };
}
