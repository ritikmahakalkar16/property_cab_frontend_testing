"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "next-auth/react";
import {
  Mail,
  Lock,
  Building2,
  X,
  User,
  Phone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const emailSchema = z.string().trim().email();
const nameSchema = z.string().trim().min(2);
const contactSchema = z.string().min(10, "Contact number must be at least 10 digits");
const otpSchema = z.string().length(6);

type Step = "email" | "otp" | "register";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStep?: Step;
}

export default function AuthModal({ isOpen, onClose, defaultStep = "register" }: AuthModalProps) {
  const { sendOtp, loginWithOtp, signUp, user } = useAuth();
  const router = useRouter();
  const requireAuth = process.env.NEXT_PUBLIC_REQUIRE_AUTH_DETAILS === "true";

  const [step, setStep] = useState<Step>(defaultStep);
  const [loading, setLoading] = useState(false);

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(defaultStep);
    }
  }, [isOpen, defaultStep]);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "user",
    contact_no: "",
  });

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<HTMLInputElement[]>([]);
  const otp = otpDigits.join("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    onClose();
    if (requireAuth && !user) {
      router.push("/");
    }
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
      toast.success("Authenticated Successfully");
      onClose(); // Close the modal on success
    }
  };

  const handleRegister = async () => {
    try {
      nameSchema.parse(formData.name);
      emailSchema.parse(formData.email);
      contactSchema.parse(formData.contact_no);
    } catch {
      return toast.error("Invalid input");
    }

    setLoading(true);
    const { error } = await signUp(
      formData.email,
      formData.name,
      formData.role,
      formData.contact_no,
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

  const GoogleLoginButton = () => (
    <button
      onClick={() => signIn("google", { callbackUrl: window.location.href })}
      className="w-full h-11 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all font-medium text-sm"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-4 h-4"
      />
      <span>Continue with Google</span>
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-[95%] max-w-[400px] bg-white p-0 overflow-hidden border-none shadow-xl rounded-xl gap-0">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-2">
          {step === "otp" ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <DialogTitle className="text-xl font-bold text-slate-900">Verify OTP</DialogTitle>
              <DialogDescription className="text-slate-500 mt-1">
                Enter the code sent to {formData.email}
              </DialogDescription>
            </div>
          ) : (
            <>
              <DialogTitle className="text-xl font-bold text-slate-900 text-left">
                Welcome to PropertyCab
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-left mt-1">
                Log in or sign up to view full property details.
              </DialogDescription>

              {/* Tabs */}
              <div className="flex items-center gap-6 mt-6 border-b border-slate-100">
                <button
                  onClick={() => setStep("email")}
                  className={`pb-3 text-sm font-medium transition-all relative ${step === "email"
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  Log In
                  {step === "email" && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-t-full" />
                  )}
                </button>
                <button
                  onClick={() => setStep("register")}
                  className={`pb-3 text-sm font-medium transition-all relative ${step === "register"
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  Sign Up
                  {step === "register" && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-t-full" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="p-6 pt-4">
          {/* Login Form */}
          {step === "email" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 ml-1">Email Address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 text-sm bg-slate-50/50"
                  autoFocus
                />
              </div>

              <button
                onClick={handleEmailSubmit}
                disabled={loading}
                className="w-full h-11 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium text-sm shadow-md shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Continue"}
              </button>

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-slate-100" /></div>
                <span className="relative bg-white px-2 text-[10px] font-medium text-slate-400 uppercase tracking-widest">Or</span>
              </div>

              <GoogleLoginButton />
            </div>
          )}

          {/* Register Form */}
          {step === "register" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 text-sm bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">Mobile</label>
                  <input
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@mail.com"
                    className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 text-sm bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">Role</label>
                  <select
                    className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all text-sm bg-slate-50/50 text-slate-700"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="user">Buyer</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full h-11 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium text-sm shadow-md shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-slate-100" /></div>
                <span className="relative bg-white px-2 text-[10px] font-medium text-slate-400 uppercase tracking-widest">Or</span>
              </div>

              <GoogleLoginButton />
            </div>
          )}

          {/* OTP Form */}
          {step === "otp" && (
            <div className="space-y-6">
              <div className="flex justify-between gap-2 px-1">
                {otpDigits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { if (el) otpRefs.current[i] = el }}
                    className="w-12 h-14 text-center text-xl font-bold border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-slate-300 text-slate-900 bg-slate-50/30"
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
                disabled={loading}
                className="w-full h-11 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium text-sm shadow-md shadow-orange-200 disabled:opacity-70"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                onClick={() => setStep("email")}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Start Over
              </button>
            </div>
          )}
        </div>

        <div className="bg-slate-50/50 p-4 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
