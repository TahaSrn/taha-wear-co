// src/ui/Button.jsx
function Button({ children, type, onClick, size, disabled = false }) {
  const styles = {
    primary: "bg-caffee-100",
    secondary: "bg-caffee-200",
    tertiary: "bg-stone-800 text-white hover:bg-stone-700",
  };

  const sizes = {
    small: "text-[10px] md:text-sm px-4 py-2",
    medium: "text-[10px] md:text-[12px] md:text-sm px-4 md:px-13 py-2",
    large: "text-sm md:text-base px-6 md:px-20 py-3",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1 justify-center rounded-full font-sansBold text-stone-800 transition-all duration-300 hover:bg-caffee-200 hover:scale-105 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${sizes[size]} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
