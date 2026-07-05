function ProductSkeleton({
  contentSpaces = 2,
  desktopImageHeight = 224,
  mobileImageHeight = 128,
  imageDivPadding = 4,
  imageRounded = "0.75rem",
  hasButton = true,
}) {
  return (
    <div className="rounded-xl bg-white shadow-md overflow-hidden animate-pulse">
      <div style={{ padding: imageDivPadding }}>
        <div
          className="w-full skeleton md:hidden"
          style={{
            height: mobileImageHeight,
            borderRadius: imageRounded,
          }}
        />

        <div
          className="hidden md:block w-full skeleton"
          style={{
            height: desktopImageHeight,
            borderRadius: imageRounded,
          }}
        />
      </div>

      <div
        className="flex flex-col"
        style={{
          padding: contentSpaces * 4,
          gap: contentSpaces * 4,
        }}
      >
        <div className="space-y-2">
          <div className="h-4 w-5/6 rounded skeleton" />
        </div>

        <div className="h-4 w-1/2 rounded skeleton" />

        {hasButton && <div className="mt-4 h-11 rounded-full skeleton" />}
      </div>
    </div>
  );
}

export default ProductSkeleton;
