function Button({ children, type, onClick, size }) {
  const styles = {
    primary: "bg-caffee-100",
    secondary: "bg-caffee-200",
  };

  const sizes = {
    small: "text-[10px] md:text-sm px-4 py-2",
    medium: "text-[10px] md:text-[12px] md:text-sm px-4 md:px-13 py-2",
  };

  return (
    <button
      onClick={onClick}
      className={` flex items-center gap-1 justify-center rounded-full font-sansBold text-stone-800 transition-all duration-300 hover:bg-caffee-200 hover:scale-105 cursor-pointer ${sizes[size]} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
