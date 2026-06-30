import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export default function useGetProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (error) throw new Error(error.message);

  return {
    products,
    isLoading,
    error,
  };
}
