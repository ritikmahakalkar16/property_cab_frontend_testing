"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ArrowRight,
  Building2,
} from "lucide-react";
import { signIn } from "next-auth/react";

const emailSchema = z.string().trim().email();
const nameSchema = z.string().trim().min(2);
const otpSchema = z.string().length(6);

type Step = "email" | "otp" | "register";

export default function AuthComponent() {
  const { sendOtp, loginWithOtp, signUp } = useAuth();
  const router = useRouter();
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams("");

  const [step, setStep] = useState<Step>("email");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    role: "user",
  });

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<HTMLInputElement[]>([]);
  const otp = otpDigits.join("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async () => {
    try {
      emailSchema.parse(formData.email);
    } catch {
      return toast.error("Invalid email");
    }

    setLoading(true);
    const { error } = await sendOtp(formData.email);
    setLoading(false);

    if (error) toast.error(error.message);
    else {
      toast.success("OTP sent to your email");
      setStep("otp");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      otpSchema.parse(otp);
    } catch {
      return toast.error("OTP must be 6 digits");
    }

    setLoading(true);
    const { error } = await loginWithOtp(
      formData.email,
      otp,
      formData.name,
      formData.role,
    );
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Authenticated");

      const redirect = searchParams.get("redirect");
      setTimeout(() => {
        if (redirect) router.push(redirect);
        else if (formData.role === "agent") router.push("/dashboard/agent");
        else if (formData.role === "admin") router.push("/dashboard/admin");
        else router.push("/");
      }, 100);
    }
  };

  const handleRegister = async () => {
    try {
      nameSchema.parse(formData.name);
      emailSchema.parse(formData.email);
    } catch {
      return toast.error("Invalid input");
    }

    setLoading(true);
    const { error } = await signUp(
      formData.email,
      formData.name,
      formData.role,
      formData.phone,
    );
    setLoading(false);

    if (error) toast.error(error.message);
    else {
      toast.success("Account created. Enter OTP");
      setStep("otp");
    }
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otpDigits];
    next[i] = val;
    setOtpDigits(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split("");
    const newOtp = [...otpDigits];

    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });

    setOtpDigits(newOtp);

    // Focus the last filled input or the next empty one
    const focusIndex = Math.min(digits.length, 5);
    otpRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      handleOtpSubmit();
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.25),rgba(2,6,23,0.95))]">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[180px]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[200px]" />

      <div className="relative w-full max-w-5xl flex rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50">
        {/* Left */}
        <div
          className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between text-white relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(2,6,23,0.85), rgba(30,64,175,0.75)), url('https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Decorative glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-orange-500 p-3 rounded-xl shadow-lg">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide">
                  Propertycab
                </h1>
                <p className="text-sm text-blue-200">
                  India’s Trusted Property Platform
                </p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Find Your Perfect Home,
              <span className="block text-orange-400 mt-2">
                Faster & Smarter
              </span>
            </h2>

            <p className="text-blue-100 text-sm max-w-md leading-relaxed">
              Buy, rent, or invest in verified properties across India with
              complete confidence.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { label: "Properties", value: "10,000+" },
                { label: "Agents", value: "500+" },
                { label: "Cities", value: "25+" },
                { label: "Happy Clients", value: "5,000+" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                >
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-blue-200 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              {(isRegistering
                ? ["Details", "Verify"]
                : ["Email", "Verify"]
              ).map((label, i) => {
                let active = false;
                let completed = false;

                if (isRegistering) {
                  // Register Flow
                  // Step 1: "register" -> Details
                  // Step 2: "otp" -> Verify
                  if (step === "register" && i === 0) active = true;
                  if (step === "otp" && i === 1) active = true;

                  if (step === "otp" && i === 0) completed = true;
                } else {
                  // Login Flow
                  // Step 1: "email" -> Email
                  // Step 2: "otp" -> Verify
                  if (step === "email" && i === 0) active = true;
                  if (step === "otp" && i === 1) active = true;

                  if (step === "otp" && i === 0) completed = true;
                }

                return (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${active || completed
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`${active || completed ? "text-gray-900 font-medium" : "text-gray-400"
                        }`}
                    >
                      {label}
                    </span>
                    {i < 1 && (
                      <div className="w-6 h-px bg-gray-300 mx-2" />
                    )}
                  </div>
                );
              })}
            </div>

            <h2 className="text-3xl font-bold mb-2">
              {step === "email" && "Welcome"}
              {step === "otp" && "Verify OTP"}
              {step === "register" && "Create Account"}
            </h2>

            <p className="text-gray-500 mb-8 text-sm">
              {step === "email" &&
                "Enter your email to receive a secure one-time password."}
              {step === "otp" &&
                "We’ve sent a 6-digit verification code to your email."}
              {step === "register" &&
                "Create your free account to explore verified properties."}
            </p>

            {step === "email" && (
              <div className="space-y-5">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    className="w-full pl-12 pr-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <button
                  onClick={handleEmailSubmit}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Continue"}
                </button>

                <button
                  onClick={() => {
                    setStep("register");
                    setIsRegistering(true);
                  }}
                  className="text-sm text-orange-500 hover:underline"
                >
                  New user? Create account
                </button>

                <button
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: searchParams.get("redirect") || "/",
                    })
                  }
                  className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Continue with Google
                  </span>
                </button>

              </div>
            )}

            {step === "otp" && (
              <div className="space-y-5">
                <div className="flex justify-between gap-2">
                  {/* {otpDigits.map((d, i) => (
                    <input
                    key={i}
                    ref={(el) => el && (otpRefs.current[i] = el)}
                    className="w-12 h-12 text-center border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    />
                ))} */}

                  {otpDigits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        if (el) otpRefs.current[i] = el;
                      }}
                      className="w-12 h-12 text-center border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onPaste={handleOtpPaste}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                    />
                  ))}
                </div>

                <button
                  onClick={handleOtpSubmit}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
              </div>
            )}

            {step === "register" && (
              <div className="space-y-5">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  type="tel"
                  maxLength={10}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />

                <select
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                </select>

                <button
                  onClick={handleRegister}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>

                <button
                  onClick={() => {
                    setStep("email");
                    setIsRegistering(false);
                  }}
                  className="text-sm text-orange-500 hover:underline"
                >
                  Already have an account? Login
                </button>
              </div>
            )}

            {/* Trust & Security */}
            <div className="mt-10 border-t pt-6 text-xs text-gray-500">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-gray-700">
                  Secure & Private Login
                </span>
              </div>
              <p className="leading-relaxed">
                We never share your personal information. All logins are
                protected with secure OTP-based authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
