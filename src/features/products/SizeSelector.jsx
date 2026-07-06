
import useGetProductSizes from "./useGetProductSizes";

function SizeSelector({ productId, selectedSize, onSizeChange }) {
  const { sizes, isLoading } = useGetProductSizes(productId);

  if (isLoading) {
    return (
      <div className="mt-6">
        <span className="text-sm font-sansMed text-stone-600 block mb-2">
          سایزهای موجود:
        </span>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3].map((i) =>
          <div
            key={i}
            className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse" />

          )}
        </div>
      </div>);

  }

  if (sizes.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <span className="text-sm font-sansMed text-stone-600 block mb-2">
        سایزهای موجود:
      </span>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => {
          const isSelected = selectedSize?.id === size.id;
          return (
            <button
              key={size.id}
              onClick={() => onSizeChange?.(size)}
              className={`
                w-12 h-12 rounded-lg border-2 transition-all duration-200
                font-sansMed text-sm
                ${
              isSelected ?
              "border-stone-800 bg-stone-800 text-white" :
              "border-stone-300 bg-white text-stone-700 hover:border-stone-500"}
              `
              }>
              
              {size.name}
            </button>);

        })}
      </div>
    </div>);

}

export default SizeSelector;