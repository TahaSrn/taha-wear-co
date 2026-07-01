// src/features/products/useGetMaxPrice.js
import { useQuery } from "@tanstack/react-query";
import { getMaxPrice } from "../../services/apiProducts";

export default function useGetMaxPrice() {
  const { data: maxPrice = 10000000 } = useQuery({
    queryKey: ["maxPrice"],
    queryFn: getMaxPrice,
  });

  return { maxPrice };
}
