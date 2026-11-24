import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import AuthHeader from "../layouts/AuthHeader";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PageHeading from "../components/ui/PageHeading";

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/login/", {
        email: data.email,
        password: data.password,
      });

      const { access, refresh } = response.data;

      if (!access || !refresh) {
        throw new Error("Invalid login response.");
      }

      localStorage.setItem("access_token", access);
localStorage.setItem("refresh_token", refresh);

// Fetch the authenticated user's profile.
const userResponse = await api.get("/auth/me/");

// Update global authentication state.
setUser(userResponse.data);

toast.success("Welcome back!");
navigate("/");
    } catch (error) {
      const responseData = error.response?.data;

      const message = responseData
        ? Object.values(responseData).flat().join(" ")
        : error.message || "Unable to connect to the server.";

      toast.error(message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader label="ACCOUNT / LOGIN" />

      <div className="mb-7 sm:mb-9">
        <PageHeading subtitle="Welcome back. Enter your credentials to access your account.">
          Sign in<span className="text-brand">.</span>
        </PageHeading>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        <Input
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          register={register("email", {
            required: "Email address is required.",
          })}
          error={errors.email?.message}
        />

        <div>
          <div className="relative">
            <Input
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              register={register("password", {
                required: "Password is required.",
              })}
              error={errors.password?.message}
              className="pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-[42px] text-muted hover:text-charcoal"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <span
            title="Password recovery will be implemented later."
            className="cursor-not-allowed text-xs text-[#929B94]"
          >
            Forgot password?
          </span>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-between"
        >
          <span>{loading ? "Signing in..." : "Sign in to Locos"}</span>

          {!loading && (
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          )}
        </Button>
      </form>

      <div className="my-6 h-px bg-[#E5E8E3] sm:my-8" />

      <p className="text-xs text-muted sm:text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-charcoal underline decoration-brand decoration-[3px] underline-offset-4 hover:decoration-charcoal"
        >
          Create account
        </Link>
      </p>

      <div className="mt-9 flex items-center justify-between text-[9px] font-medium uppercase tracking-[1px] text-[#A0A8A2] sm:mt-12 sm:text-[10px]">
        <span>© {new Date().getFullYear()} LOCOS</span>
        <span>Made for local connections</span>
      </div>
    </AuthLayout>
  );
}

export default Login;