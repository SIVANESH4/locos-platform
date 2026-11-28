
import Logo from "../components/ui/Logo";
import { Link } from "react-router-dom";

function AuthHeader() {
  return (
    <header className="mb-10 flex items-center justify-between">
      <Logo className="text-2xl" />

      <Link
        to="/"
        className="inline-flex min-h-10 items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
      >
        <span aria-hidden="true">&lt;-</span>
        Back to home
      </Link>
    </header>
  );
}

export default AuthHeader;
