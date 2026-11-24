import Logo from "../components/ui/Logo";

function AuthHeader({ label = "ACCOUNT" }) {
  return (
    <header className="mb-10 flex items-center justify-between lg:hidden">
      <Logo className="text-2xl" />

      <span className="text-xs font-semibold tracking-[0.15em] text-muted">
        {label}
      </span>
    </header>
  );
}

export default AuthHeader;