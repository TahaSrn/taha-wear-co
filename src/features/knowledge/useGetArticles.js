import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../services/apiArticles";

export default function useGetArticles() {
  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return { articles, isLoading, error };
}
