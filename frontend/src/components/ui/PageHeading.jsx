function PageHeading({
  children,
  subtitle,
  className = "",
}) {
  return (
    <div className={className}>
      <h1 className="display-font text-5xl font-medium leading-[0.91] tracking-wide text-charcoal sm:text-6xl">
        {children}
      </h1>

      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeading;