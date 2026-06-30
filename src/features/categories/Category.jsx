function Category({ category }) {
  return (
    <div className="rounded-xl bg-white w-[90%] h-100 flex flex-col items-center justify-center font-sansBold relative overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <img
        className="w-[90%] h-[90%] object-cover rounded-xl transition-transform duration-300 hover:scale-105 cursor-pointer"
        src={category.image}
        alt={category.image}
      />

      <div className="absolute text-lg bg-cyan-50 py-3 px-10 rounded-full right-10 bottom-10">
        <span>{category.name}</span>
      </div>
    </div>
  );
}

export default Category;
