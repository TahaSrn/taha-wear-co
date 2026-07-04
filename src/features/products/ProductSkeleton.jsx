function ProductSkeleton({
  contentSpaces,
  imageHeight,
  imageDivPadding,
  imageRounded,
}) {
  return (
    <div className="rounded-xl bg-white shadow-md overflow-hidden animate-pulse">
      <div className={`w-full p-${imageDivPadding}`}>
        <div
          className={`w-full h-${imageHeight} rounded-${imageRounded} skeleton`}
        />
      </div>

      <div className={`p-${contentSpaces} flex flex-col gap-${contentSpaces}`}>
        <div className="space-y-2">
          <div className="h-4 w-5/6 rounded skeleton" />
          <div className="h-4 w-2/3 rounded skeleton" />
        </div>

        <div className="h-4 w-1/2 rounded skeleton" />

        <div className="mt-4 h-11 rounded-full skeleton" />
      </div>
    </div>
  );
}

export default ProductSkeleton;
