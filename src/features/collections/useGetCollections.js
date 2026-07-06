import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../../services/apiCollections";

export default function useGetCollections() {
  const {
    data: collections = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
    staleTime: 1000 * 60 * 5
  });

  return { collections, isLoading, error };
}