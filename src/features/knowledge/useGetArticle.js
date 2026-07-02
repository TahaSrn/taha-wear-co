import { useQuery } from "@tanstack/react-query";
import { getArticleBySlug } from "../../services/apiArticles";

export default function useGetArticle(slug) {
  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug),
    enabled: !!slug,
  });

  return { article, isLoading, error };
}
