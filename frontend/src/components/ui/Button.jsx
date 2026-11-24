const variants = {
  primary: "bg-brand text-charcoal hover:brightness-95",
  secondary:
    "border border-charcoal bg-white text-charcoal hover:bg-input",
};

function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full
        min-h-12
        px-6
        py-3
        font-semibold
        text-sm
        transition
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;