import Logo from "../components/ui/Logo";

function BrandPanel({
  eyebrow = "LOCAL SERVICES / SIMPLIFIED",
  headline = ["Good help.", "Right near."],
  description = "Find skilled professionals around you. Get your everyday jobs done without the unnecessary hassle.",
  footerNumber = "01",
}) {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand px-6 py-5 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:min-h-[620px] lg:px-[clamp(40px,6vw,100px)] lg:py-9 xl:px-[clamp(70px,8vw,140px)]">
      <div className="relative z-10">
        <Logo className="text-2xl" />
      </div>

      <div className="relative z-10 my-7 lg:my-auto lg:py-10">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[2.5px] sm:text-xs">
          {eyebrow}
        </p>

        <h2 className="display-font text-[clamp(44px,6.2vw,100px)] font-medium uppercase leading-[0.91] tracking-[0.5px]">
          {headline.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="mt-5 max-w-[390px] text-xs leading-6 text-[#39423A] sm:text-sm sm:leading-7 lg:mt-7 lg:text-base">
          {description}
        </p>

        <div className="mt-6 hidden items-center gap-3 sm:flex lg:mt-10">
          <div className="h-px w-9 bg-charcoal" />
          <span className="text-[10px] font-semibold uppercase tracking-[1.8px]">
            Find. Connect. Get it done.
          </span>
        </div>
      </div>

      <div className="relative z-10 hidden items-center justify-between border-t border-charcoal/20 pt-4 text-[10px] font-semibold uppercase tracking-[1.5px] sm:flex">
        <span>Built for everyday services</span>
        <span>{footerNumber} / LOCOS</span>
      </div>

      <div className="pointer-events-none absolute -bottom-28 -right-20 hidden h-80 w-80 rounded-full border-[38px] border-charcoal/[0.06] lg:block xl:h-[420px] xl:w-[420px]" />
    </aside>
  );
}

export default BrandPanel;