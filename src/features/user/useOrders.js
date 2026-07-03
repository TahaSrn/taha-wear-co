// src/features/user/useOrders.js
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../services/apiOrders";

export function useOrders(userId) {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrders(userId),
    enabled: !!userId,
  });

  return { orders, isLoading, error };
}
