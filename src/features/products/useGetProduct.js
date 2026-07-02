// src/features/products/useGetProduct.js
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";

export default function useGetProduct(productId) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });

  return { product, isLoading, error };
}
