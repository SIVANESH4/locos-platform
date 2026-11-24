import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowUpRight,
  UserRound,
  Wrench,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";

import AuthLayout from "../layouts/AuthLayout";
import AuthHeader from "../layouts/AuthHeader";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PageHeading from "../components/ui/PageHeading";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await api.post("/auth/register/", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
        role: data.role,
      });

      navigate("/check-email", {
        state: { email: data.email },
      });
    } catch (error) {
      const responseData = error.response?.data;

      if (responseData) {
        const message = Object.entries(responseData)
          .map(([field, messages]) => {
            const formattedMessages = Array.isArray(messages)
              ? messages.join(" ")
              : String(messages);

            return field === "non_field_errors"
              ? formattedMessages
              : `${field.replaceAll("_", " ")}: ${formattedMessages}`;
          })
          .join("\n");

        toast.error(message || "Registration failed.");
      } else {
        toast.error(error.message || "Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      brandPanelProps={{
        eyebrow: "YOUR LOCAL NETWORK STARTS HERE",
        headline: ["Make it", "happen."],
        description:
          "Join a growing network of customers and skilled professionals. Create your account and get started with Locos.",
        footerNumber: "02",
      }}
    >
      <AuthHeader label="CREATE ACCOUNT" />

      <div className="mb-7 sm:mb-9">
        <PageHeading subtitle="Create your account and become part of your local service network.">
          Join Locos<span className="text-brand">.</span>
        </PageHeading>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        {/* Name fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="first_name"
            label="First name"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            register={register("first_name", {
              required: "First name is required.",
            })}
            error={errors.first_name?.message}
          />

          <Input
            id="last_name"
            label="Last name"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            register={register("last_name", {
              required: "Last name is required.",
            })}
            error={errors.last_name?.message}
          />
        </div>

        {/* Email */}
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

        {/* Account type */}
        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-charcoal">
            I want to join as
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="CUSTOMER"
                className="peer sr-only"
                {...register("role", {
                  required: "Please select an account type.",
                })}
              />

              <div className="flex min-h-[66px] items-center gap-3 border border-border bg-input px-3 transition peer-checked:border-charcoal peer-checked:bg-[#E9EDDF] peer-focus-visible:ring-2 peer-focus-visible:ring-charcoal">
                <UserRound size={19} strokeWidth={1.7} />

                <div>
                  <p className="text-xs font-semibold text-charcoal">
                    Customer
                  </p>
                  <p className="mt-1 text-[10px] text-muted">
                    Find professionals
                  </p>
                </div>
              </div>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                value="TECHNICIAN"
                className="peer sr-only"
                {...register("role", {
                  required: "Please select an account type.",
                })}
              />

              <div className="flex min-h-[66px] items-center gap-3 border border-border bg-input px-3 transition peer-checked:border-charcoal peer-checked:bg-[#E9EDDF] peer-focus-visible:ring-2 peer-focus-visible:ring-charcoal">
                <Wrench size={19} strokeWidth={1.7} />

                <div>
                  <p className="text-xs font-semibold text-charcoal">
                    Technician
                  </p>
                  <p className="mt-1 text-[10px] text-muted">
                    Offer your services
                  </p>
                </div>
              </div>
            </label>
          </div>

          {errors.role && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a password"
            register={register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters.",
              },
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

        {/* Confirm password */}
        <div className="relative">
          <Input
            id="confirm_password"
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Confirm your password"
            register={register("confirm_password", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === password || "Passwords do not match.",
            })}
            error={errors.confirm_password?.message}
            className="pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((previous) => !previous)
            }
            aria-label={
              showConfirmPassword ? "Hide password" : "Show password"
            }
            className="absolute right-4 top-[42px] text-muted hover:text-charcoal"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {/* Terms */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 accent-charcoal"
              {...register("terms", {
                required: "Please accept the terms to continue.",
              })}
            />

            <span className="text-xs leading-5 text-muted">
              I agree to the platform terms and conditions
              and privacy policy.
            </span>
          </label>

          {errors.terms && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.terms.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="group flex items-center justify-between"
        >
          <span>
            {loading ? "Creating account..." : "Create your account"}
          </span>

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
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-charcoal underline decoration-brand decoration-[3px] underline-offset-4 hover:decoration-charcoal"
        >
          Sign in
        </Link>
      </p>

      <div className="mt-9 flex items-center justify-between text-[9px] font-medium uppercase tracking-[1px] text-[#A0A8A2] sm:mt-12 sm:text-[10px]">
        <span>© {new Date().getFullYear()} LOCOS</span>
        <span>Made for local connections</span>
      </div>
    </AuthLayout>
  );
}

export default Register;