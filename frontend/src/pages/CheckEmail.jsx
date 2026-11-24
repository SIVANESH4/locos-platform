
import { useLocation, Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

import AuthLayout from "../layouts/AuthLayout";
import AuthHeader from "../layouts/AuthHeader";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import PageHeading from "../components/ui/PageHeading";

function CheckEmail() {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <AuthLayout
      brandPanelProps={{
        eyebrow: "ONE LAST STEP",
        headline: ["Check", "your inbox."],
        description:
          "You're almost ready to get started. Verify your email address to activate your Locos account.",
        footerNumber: "03",
      }}
    >
      <AuthHeader label="EMAIL VERIFICATION" />

      <div className="mb-8 flex justify-center lg:hidden">
        <Logo className="text-3xl" />
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-7 flex h-20 w-20 items-center justify-center border border-border bg-input">
          <MailCheck className="h-10 w-10 text-charcoal" />
        </div>

        <PageHeading>CHECK YOUR EMAIL</PageHeading>

        <p className="mt-4 text-sm leading-6 text-muted">
          We've sent a verification link to your email address.
          Open the email and click the verification link to activate
          your Locos account.
        </p>

        {email && (
          <div className="mt-6 w-full border border-border bg-input px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-muted">
              Verification email sent to
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-charcoal">
              {email}
            </p>
          </div>
        )}

        <div className="mt-8 w-full">
          <Link to="/login" className="block">
            <Button>GO TO LOGIN</Button>
          </Link>
        </div>

        <p className="mt-6 text-xs leading-5 text-muted">
          Didn't receive the email? Check your spam folder.
          You can also request another verification email later.
        </p>
      </div>
    </AuthLayout>
  );
}

export default CheckEmail;
