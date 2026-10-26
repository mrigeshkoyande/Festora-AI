"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Mail, Lock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("Priya Sharma");
  const [email, setEmail] = useState("priya.sharma@festora.ai");
  const [password, setPassword] = useState("••••••••••••");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-center items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-card-lg border border-navy/12 shadow-2xl overflow-hidden relative my-auto">
        {/* Top Visual Luxury Banner */}
        <div className="relative w-full h-28 sm:h-32 bg-navy overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop"
            alt="Luxury Event Setup"
            fill
            sizes="(max-width: 640px) 100vw, 450px"
            className="object-cover brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

          {/* Elegant Status Bar */}
          <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-bg">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gold">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Festora AI Concierge</span>
            </div>
            <span className="text-[11px] text-bg/80 font-medium">Secured Access</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-white p-1 border border-navy/10 flex items-center justify-center shadow-xs">
                <Image
                  src="/brand/logo.png"
                  alt="Festora Logo"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              <span className="font-grotesk font-extrabold text-base text-navy group-hover:text-orange transition-colors">
                Festora AI
              </span>
            </Link>

            {/* Pill Tab Switcher */}
            <div className="flex bg-navy/8 p-1 rounded-pill border border-navy/10 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`px-3.5 py-1 rounded-pill transition-all cursor-pointer ${
                  !isSignUp ? "bg-navy text-bg shadow-sm" : "text-ink/60 hover:text-ink"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`px-3.5 py-1 rounded-pill transition-all cursor-pointer ${
                  isSignUp ? "bg-navy text-bg shadow-sm" : "text-ink/60 hover:text-ink"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div>
            <h1 className="font-grotesk text-2xl font-extrabold text-navy">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-xs text-ink/70 mt-1">
              {isSignUp
                ? "Start planning extraordinary celebrations with AI."
                : "Enter your credentials to access your celebrations."}
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-pill bg-bg hover:bg-navy/8 border border-navy/12 text-xs font-semibold text-ink transition-colors cursor-pointer"
            >
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-pill bg-bg hover:bg-navy/8 border border-navy/12 text-xs font-semibold text-ink transition-colors cursor-pointer"
            >
              <span>Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-navy/12 flex-1" />
            <span className="text-[10px] uppercase font-bold text-ink/50 tracking-wider">
              or continue with email
            </span>
            <div className="h-[1px] bg-navy/12 flex-1" />
          </div>

          {/* Input Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink/80">Full Name</label>
                <div className="relative flex items-center">
                  <UserIcon className="w-4 h-4 text-ink/40 absolute left-4" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-bg border border-navy/18 rounded-pill pl-11 pr-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy"
                    placeholder="Priya Sharma"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink/80">Email address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-ink/40 absolute left-4" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg border border-navy/18 rounded-pill pl-11 pr-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy"
                  placeholder="priya@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink/80">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-ink/40 absolute left-4" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg border border-navy/18 rounded-pill pl-11 pr-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-ink/70 cursor-pointer pt-0.5">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 accent-navy rounded mt-0.5 cursor-pointer"
              />
              <span>
                I agree to Festora AI&apos;s{" "}
                <Link href="/terms" className="text-navy font-semibold underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-navy font-semibold underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <Button
              variant="orange"
              size="md"
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              {isSubmitting ? "Authenticating..." : isSignUp ? "Get Started" : "Sign In to Festora"}
            </Button>
          </form>

          <div className="flex flex-col items-center gap-2 pt-1 border-t border-navy/8">
            <p className="text-center text-xs text-ink/70">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-orange font-bold hover:underline cursor-pointer ml-1"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
            <Link
              href="/"
              className="text-xs text-ink/50 hover:text-navy transition-colors font-medium"
            >
              ← Back to Festora AI Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
