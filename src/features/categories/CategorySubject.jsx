function CategorySubject({ icon: Icon, title, textColor }) {
  return (
    <div className="flex mb-5 items-center justify-center gap-4 font-sansMed">
      <div className="w-12 md:w-16 h-0.5 bg-linear-to-l from-transparent to-brand-accent/60"></div>
      <div className={`flex items-center gap-2 text-${textColor} `}>
        {Icon && <Icon className="text-xl md:text-3xl" />}
        <h2 className="text-md md:text-2xl font-bold">{title}</h2>
      </div>
      <div className="w-12 md:w-16 h-0.5 bg-linear-to-r from-transparent to-brand-accent/60"></div>
    </div>);

}

export default CategorySubject;