import { useQuery } from "@tanstack/react-query";
import { getNewestProducts } from "../../services/apiProducts";

export default function useGetNewestProducts() {
  const {
    data: newestProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newestProducts"],
    queryFn: getNewestProducts,
  });

  if (error) throw new Error(error.message);

  return {
    newestProducts,
    isLoading,
    error,
  };
}
