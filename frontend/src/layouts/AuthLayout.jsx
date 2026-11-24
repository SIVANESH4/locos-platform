
import BrandPanel from "./BrandPanel";

function AuthLayout({ children, brandPanelProps = {} }) {
  return (
    <main className="grid min-h-[100svh] bg-white lg:grid-cols-2">
      <BrandPanel {...brandPanelProps} />

      <section className="flex min-h-[100svh] items-center justify-center px-6 py-8 sm:px-12 sm:py-10 lg:min-h-0 lg:px-10 lg:py-8 xl:px-16">
        <div className="w-full max-w-[410px] xl:max-w-[460px]">
          {children}
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
