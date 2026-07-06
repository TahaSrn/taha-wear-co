
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import useGetArticle from "../features/knowledge/useGetArticle";
import Spinner from "../ui/Spinner";

function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { article, isLoading } = useGetArticle(slug);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleShopRedirect = () => {
    if (article) {
      if (!article.category_id || article.category_id === 0) {
        navigate("/shop");
      } else {
        navigate(`/shop?category=${article.category_id}`);
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center h-screen">
          <Spinner />
        </main>
        <Footer />
      </>);

  }

  if (!article) {
    return (
      <>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p className="text-center text-stone-500 font-sansMed">
            مقاله مورد نظر یافت نشد
          </p>
        </main>
        <Footer />
      </>);

  }

  const paragraphs = article.content.split("\n").filter((p) => p.trim());

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover" />
          
        </div>

        <h1 className="text-2xl md:text-3xl font-sansBold text-stone-800 mb-6">
          {article.title}
        </h1>

        <div className="space-y-4 font-sansMed text-stone-700 leading-relaxed text-base">
          {paragraphs.map((paragraph, index) => {
            const isNumbered = /^[۰-۹0-9]+[\.\-\–]/.test(paragraph.trim());
            if (isNumbered) {
              return (
                <div key={index} className="flex gap-2 items-start pr-4">
                  <span className="text-stone-800 font-sansBold min-w-6">
                    {paragraph.match(/^[۰-۹0-9]+[\.\-\–]/)?.[0] || "•"}
                  </span>
                  <span>{paragraph.replace(/^[۰-۹0-9]+[\.\-\–]\s*/, "")}</span>
                </div>);

            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        <div className="mt-10">
          <button
            onClick={handleShopRedirect}
            className="w-full bg-stone-800 text-white py-4 rounded-xl hover:bg-stone-700 transition-all duration-300 font-sansMed text-base cursor-pointer">
            
            {!article.category_id || article.category_id === 0 ?
            "مشاهده همه محصولات" :
            "مشاهده محصولات این دسته‌بندی"}
          </button>
        </div>
      </main>
      <Footer />
    </div>);

}

export default ArticlePage;