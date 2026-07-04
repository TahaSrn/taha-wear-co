function Banner() {
  return (
    <div className="w-full flex justify-center pt-4 md:pt-10 px-2 md:px-0">
      <div className="w-full max-w-7xl mx-auto px-2 md:px-4">
        <div className="w-full aspect-100/60 md:aspect-100/60 lg:aspect-100/38 overflow-hidden rounded-xl border border-caffee-300">
          <img
            src="/banner.jpg"
            alt="banner"
            className="w-full h-full object-cover object-[10%_center] md:object-center"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
