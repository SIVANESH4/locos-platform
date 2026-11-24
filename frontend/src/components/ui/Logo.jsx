function Logo({ className = "", showDot = true }) {
  return (
    <span
      className={`inline-flex items-center font-bold tracking-tight text-charcoal ${className}`}
    >
      LOCOS
      {showDot && (
        <span className="text-brand">.</span>
      )}
    </span>
  );
}

export default Logo;