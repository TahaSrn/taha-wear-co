
import { useQuery } from "@tanstack/react-query";
import { getDiscountedProducts } from "../../services/apiProducts";

export default function useGetDiscountedProducts() {
  const {
    data: discountedProducts = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["discountedProducts"],
    queryFn: getDiscountedProducts,
    staleTime: 1000 * 60 * 5
  });

  return { discountedProducts, isLoading, error };
}