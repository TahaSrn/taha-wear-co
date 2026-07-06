
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

function Pagination({
  totalProducts,
  productsPerPage,
  currentPage,
  onPageChange
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        
        <HiChevronRight size={20} />
      </button>

      {pages.map((page) =>
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-4 py-2 rounded-lg font-sansMed text-sm transition-colors ${
        currentPage === page ?
        "bg-stone-800 text-white" :
        "border border-gray-300 hover:bg-gray-100"}`
        }>
        
          {page}
        </button>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        
        <HiChevronLeft size={20} />
      </button>
    </div>);

}

export default Pagination;