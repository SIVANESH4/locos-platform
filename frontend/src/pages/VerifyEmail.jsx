
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, LoaderCircle } from "lucide-react";

import api from "../services/api";
import AuthLayout from "../layouts/AuthLayout";
import AuthHeader from "../layouts/AuthHeader";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import PageHeading from "../components/ui/PageHeading";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Please wait while we verify your email address."
  );

  const requestStarted = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("The verification link is missing its token.");
      return;
    }

    if (requestStarted.current) return;
    requestStarted.current = true;

    const verifyEmail = async () => {
      try {
        const response = await api.get("/auth/verify-email/", {
          params: { token },
        });

        setStatus("success");
        setMessage(
          response.data.message ||
            "Your email address has been successfully verified."
        );
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            error.response?.data?.detail ||
            error.response?.data?.error ||
            "This verification link is invalid or has expired."
        );
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <AuthLayout
      brandPanelProps={{
        eyebrow: "ONE LAST STEP",
        headline: ["You're", "almost in."],
        description:
          "Verify your email address to activate your Locos account and get started.",
        footerNumber: "03",
      }}
    >
      <AuthHeader label="EMAIL VERIFICATION" />

      <div className="mb-8 flex justify-center lg:hidden">
        <Logo className="text-3xl" />
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-7 flex h-20 w-20 items-center justify-center border border-border bg-input">
          {status === "loading" && (
            <LoaderCircle className="h-9 w-9 animate-spin text-charcoal" />
          )}

          {status === "success" && (
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          )}

          {status === "error" && (
            <XCircle className="h-10 w-10 text-red-500" />
          )}
        </div>

        {status === "loading" && (
          <>
            <PageHeading>VERIFYING EMAIL</PageHeading>
            <p className="mt-4 text-sm leading-6 text-muted">
              {message}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <PageHeading>EMAIL VERIFIED!</PageHeading>
            <p className="mt-4 text-sm leading-6 text-muted">
              {message}
            </p>

            <div className="mt-8 w-full">
              <Link to="/login">
                <Button>CONTINUE TO LOGIN</Button>
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <PageHeading>VERIFICATION FAILED</PageHeading>
            <p className="mt-4 text-sm leading-6 text-muted">
              {message}
            </p>

            <div className="mt-8 w-full">
              <Link to="/login">
                <Button variant="secondary">
                  BACK TO LOGIN
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}

export default VerifyEmail;
