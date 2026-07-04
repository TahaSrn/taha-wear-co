function CategorySubject({ icon: Icon, title }) {
  return (
    <div className="flex mb-5 items-center justify-center gap-4 font-sansMed">
      <div className="w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent to-brand-accent/60"></div>
      <div className="flex items-center gap-2 text-stone-800">
        {Icon && <Icon className="text-2xl md:text-3xl text-brand-accent" />}
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      </div>
      <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent to-brand-accent/60"></div>
    </div>
  );
}

export default CategorySubject;
