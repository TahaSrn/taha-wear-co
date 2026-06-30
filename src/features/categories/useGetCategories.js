import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories";

export default function useGetCategories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (error) throw new Error(error.message);

  return {
    categories,
    isLoading,
    error,
  };
}
