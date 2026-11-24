function Input({
  label,
  error,
  id,
  type = "text",
  register,
  className = "",
  labelClassName = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-charcoal ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        {...register}
        {...props}
        className={`
          h-12 w-full border bg-input px-4 text-sm text-charcoal
          outline-none transition placeholder:text-[#9AA19B]
          focus:border-charcoal focus:bg-white focus:ring-1 focus:ring-charcoal
          ${error ? "border-red-500" : "border-border"}
          ${className}
        `}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

export default Input;