
import { useQuery } from "@tanstack/react-query";
import { getProductSizes } from "../../services/apiProducts";

export default function useGetProductSizes(productId) {
  const {
    data: sizes = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["productSizes", productId],
    queryFn: () => {
      console.log("useGetProductSizes - fetching for:", productId);
      return getProductSizes(productId);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });

  console.log("useGetProductSizes - result:", { sizes, isLoading, error });

  return { sizes, isLoading, error };
}