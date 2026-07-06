import { Link } from "react-router";

function KnowledgeCard({ article }) {
  const shortSummary =
  article.summary.length > 100 ?
  article.summary.slice(0, 100) + "..." :
  article.summary;

  return (
    <Link to={`/article/${article.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
          
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-sansBold text-stone-800 text-base md:text-lg mb-2 line-clamp-2">
            {article.title}
          </h3>

          <p className="font-sansMed text-stone-600 text-sm leading-relaxed line-clamp-4 flex-1">
            {shortSummary}
          </p>

          <button className="w-full mt-4 cursor-pointer flex items-center justify-center gap-2 bg-stone-800 text-white py-2.5 rounded-lg hover:bg-stone-700 transition-colors text-sm font-sansMed">
            ادامه مطلب
          </button>
        </div>
      </div>
    </Link>);

}

export default KnowledgeCard;