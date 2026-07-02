import useGetArticles from "./useGetArticles";
import KnowledgeCard from "./KnowledgeCard";
import Spinner from "../../ui/Spinner";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import CategorySubject from "../categories/CategorySubject";

function KnowledgeSection() {
  const { articles, isLoading } = useGetArticles();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-xl bg-gray-100 flex items-center justify-center"
          >
            <Spinner />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <CategorySubject icon={HiOutlineAcademicCap} title="دانشنامه مد" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {articles.map((article) => (
          <KnowledgeCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default KnowledgeSection;
