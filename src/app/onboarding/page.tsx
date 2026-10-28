"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  PartyPopper,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Loader2,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge, Chip } from "@/components/ui/Badge";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { fireFestoraConfetti } from "@/components/ui/Confetti";

export default function OnboardingWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [eventType, setEventType] = useState("Wedding");
  const [title, setTitle] = useState("Ananya & Rohan's Royal Wedding Celebration");
  const [targetDate, setTargetDate] = useState("2025-02-18");
  const [city, setCity] = useState("Jaipur, Rajasthan");
  const [guestCount, setGuestCount] = useState(150);
  const [budget, setBudget] = useState(4500000); // ₹45 Lakhs
  const [styleVibe, setStyleVibe] = useState("Royal Heritage");
  const [specialNeeds, setSpecialNeeds] = useState(
    "Marwari welcome ritual with dholaks, separate Jain catering counter, drone permit required.",
  );
  const [valetRequired, setValetRequired] = useState(true);
  const [kidsArea, setKidsArea] = useState(false);

  // Loading & Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState(0);

  const styleChips = [
    "Royal Heritage",
    "Boho Chic",
    "Minimalist Elegance",
    "Neon Futuristic",
    "Botanical Garden",
    "Art Deco Glamour",
    "Rustic Vintage",
  ];

  const handleNext = async () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    if (currentStep === 6) {
      // Move to Step 7: AI Processing Engine
      setCurrentStep(7);
      setIsGenerating(true);

      // Simulate multi-stage visual synthesis
      setTimeout(() => setGenerationPhase(1), 800);
      setTimeout(() => setGenerationPhase(2), 1600);
      setTimeout(() => setGenerationPhase(3), 2400);

      try {
        const res = await fetch("/api/ai/generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType,
            title,
            targetDate,
            city,
            guestCount,
            totalBudget: budget,
            currency: "INR",
            styleVibe,
            specialNeeds: `${specialNeeds} ${valetRequired ? "[Valet Parking Required]" : ""} ${kidsArea ? "[Dedicated Kids Area]" : ""}`,
          }),
        });

        const data = await res.json();
        // Fire celebration milestone confetti!
        fireFestoraConfetti();

        // Redirect smoothly to dashboard with new event
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } catch (err) {
        console.error("Error creating plan:", err);
        fireFestoraConfetti();
        router.push("/dashboard");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && !isGenerating) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Crores`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  const progressPercent = (currentStep / totalSteps) * 100;

  const loadDemoPlan = () => {
    setEventType("Wedding");
    setTitle("Demo Jaipur Heritage Wedding");
    setTargetDate("2027-02-18");
    setCity("Jaipur, Rajasthan");
    setGuestCount(150);
    setBudget(4500000);
    setStyleVibe("Royal Heritage");
    setSpecialNeeds("Demo data: Marwari welcome ritual and separate Jain catering counter.");
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      {/* Top Thin Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-navy/10 z-50">
        <div
          className="h-full bg-orange transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Header Bar */}
      <header className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-navy/10 bg-white/70 backdrop-blur-md sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center shadow-sm border border-navy/10">
            <Image
              src="/brand/logo.png"
              alt="Festora Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-grotesk font-extrabold text-lg text-navy">Festora AI</span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-semibold text-ink/70">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <button
            type="button"
            onClick={loadDemoPlan}
            className="min-h-11 rounded-pill border border-navy/20 px-3 text-navy hover:bg-navy/5 focus:outline-none focus:ring-2 focus:ring-navy"
          >
            Load demo plan
          </button>
          <Link href="/dashboard" className="text-navy hover:underline">
            Exit to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Wizard Form Body */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 flex flex-col justify-between">
        <div className="min-h-[480px] flex flex-col justify-center">
          {/* STEP 1: EVENT TYPE */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
                  Step 01 / 07
                </span>
                <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
                  What kind of extraordinary celebration are we crafting?
                </h1>
                <p className="text-ink/70 text-sm mt-2">
                  Select the primary archetype for your upcoming gathering.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Option 1: Wedding */}
                <div
                  onClick={() => setEventType("Wedding")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setEventType("Wedding");
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`group cursor-pointer rounded-card-lg p-6 relative overflow-hidden flex flex-col justify-between h-72 border-2 transition-all ${
                    eventType === "Wedding"
                      ? "border-orange bg-white shadow-xl scale-[1.02]"
                      : "border-navy/12 bg-white hover:border-navy/30"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:blur-sm group-hover:scale-105 transition-all duration-500 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600')",
                    }}
                  />
                  <div className="relative z-10 flex justify-between items-start">
                    <Heart className="w-8 h-8 text-orange" />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        eventType === "Wedding" ? "border-orange bg-orange" : "border-navy/30"
                      }`}
                    >
                      {eventType === "Wedding" && <CheckCircle className="w-4 h-4 text-ink" />}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-grotesk text-xl font-bold text-navy">Grand Wedding</h3>
                    <p className="text-xs text-ink/70 mt-1 leading-relaxed">
                      Multi-day nuptials, sangeet, mehendi, pheras, and lavish banquets.
                    </p>
                  </div>
                </div>

                {/* Option 2: Milestone Birthday */}
                <div
                  onClick={() => setEventType("Birthday")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setEventType("Birthday");
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`group cursor-pointer rounded-card-lg p-6 relative overflow-hidden flex flex-col justify-between h-72 border-2 transition-all ${
                    eventType === "Birthday"
                      ? "border-orange bg-white shadow-xl scale-[1.02]"
                      : "border-navy/12 bg-white hover:border-navy/30"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:blur-sm group-hover:scale-105 transition-all duration-500 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600')",
                    }}
                  />
                  <div className="relative z-10 flex justify-between items-start">
                    <PartyPopper className="w-8 h-8 text-navy" />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        eventType === "Birthday" ? "border-orange bg-orange" : "border-navy/30"
                      }`}
                    >
                      {eventType === "Birthday" && <CheckCircle className="w-4 h-4 text-ink" />}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-grotesk text-xl font-bold text-navy">Milestone Birthday</h3>
                    <p className="text-xs text-ink/70 mt-1 leading-relaxed">
                      Decade birthdays, anniversaries, family dinners, and themed parties.
                    </p>
                  </div>
                </div>

                {/* Option 3: Private Milestone */}
                <div
                  onClick={() => setEventType("Community")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setEventType("Community");
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`group cursor-pointer rounded-card-lg p-6 relative overflow-hidden flex flex-col justify-between h-72 border-2 transition-all ${
                    eventType === "Community"
                      ? "border-orange bg-white shadow-xl scale-[1.02]"
                      : "border-navy/12 bg-white hover:border-navy/30"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:blur-sm group-hover:scale-105 transition-all duration-500 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600')",
                    }}
                  />
                  <div className="relative z-10 flex justify-between items-start">
                    <PartyPopper className="w-8 h-8 text-gold" />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        eventType === "Community" ? "border-orange bg-orange" : "border-navy/30"
                      }`}
                    >
                      {eventType === "Community" && <CheckCircle className="w-4 h-4 text-ink" />}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-grotesk text-xl font-bold text-navy">
                      Community Celebration
                    </h3>
                    <p className="text-xs text-ink/70 mt-1 leading-relaxed">
                      Birthdays, anniversaries, community festivals, and themed soirées.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FUNDAMENTALS */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fadeIn max-w-xl mx-auto w-full">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
                  Step 02 / 07
                </span>
                <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
                  Let&apos;s lock in the fundamentals
                </h1>
                <p className="text-ink/70 text-sm mt-2">
                  Provide the foundational parameters for schedule and scale.
                </p>
              </div>

              <div className="bg-white p-8 rounded-card-lg border border-navy/12 shadow-sm space-y-6">
                <div>
                  <label className="text-xs font-semibold text-ink/80 block mb-1.5">
                    Celebration Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-bg border border-navy/18 rounded-pill px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy font-medium"
                    placeholder="e.g. Ananya & Rohan's Royal Wedding"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-ink/80 block mb-1.5">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full bg-bg border border-navy/18 rounded-pill px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink/80 block mb-1.5">
                      City / Destination
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-bg border border-navy/18 rounded-pill px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy font-medium"
                      placeholder="e.g. Jaipur, Rajasthan"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-ink/80">
                      Estimated Guest Count
                    </label>
                    <Badge variant="orange">{guestCount} Guests</Badge>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="1500"
                    step="10"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-navy/15 rounded-pill appearance-none cursor-pointer accent-navy"
                  />
                  <div className="flex justify-between text-[11px] text-ink/50 mt-1">
                    <span>30 Intimate</span>
                    <span>500 Grand</span>
                    <span>1,500+ Mega</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET IN INR */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fadeIn max-w-xl mx-auto w-full">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
                  Step 03 / 07
                </span>
                <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
                  What is your target investment allocation?
                </h1>
                <p className="text-ink/70 text-sm mt-2">
                  Set total target budget in Indian Rupees (₹).
                </p>
              </div>

              <div className="bg-white p-8 rounded-card-lg border border-navy/12 shadow-sm text-center space-y-6">
                <div>
                  <div className="font-grotesk text-5xl font-extrabold text-navy my-2">
                    {formatINR(budget)}
                  </div>
                  <p className="text-xs text-orange font-bold uppercase tracking-wider">
                    {budget >= 10000000
                      ? "Imperial Ultra-Luxury Tier"
                      : budget >= 3500000
                        ? "Premium Bespoke Experience"
                        : "Curated Elegance Tier"}
                  </p>
                </div>

                <input
                  type="range"
                  min="500000"
                  max="20000000"
                  step="250000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-3 bg-navy/15 rounded-pill appearance-none cursor-pointer accent-navy"
                />

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBudget(1500000)}
                    className="py-2.5 rounded-pill border border-navy/15 text-xs font-semibold hover:bg-navy/8 transition-colors"
                  >
                    ₹ 15 Lakhs
                  </button>
                  <button
                    type="button"
                    onClick={() => setBudget(4500000)}
                    className="py-2.5 rounded-pill border border-navy/15 text-xs font-semibold hover:bg-navy/8 transition-colors"
                  >
                    ₹ 45 Lakhs
                  </button>
                  <button
                    type="button"
                    onClick={() => setBudget(10000000)}
                    className="py-2.5 rounded-pill border border-navy/15 text-xs font-semibold hover:bg-navy/8 transition-colors"
                  >
                    ₹ 1 Crore+
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: STYLE & VIBE */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto w-full">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
                  Step 04 / 07
                </span>
                <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
                  Define your aesthetic and palette
                </h1>
                <p className="text-ink/70 text-sm mt-2">
                  Select mood keywords that reflect your design vision.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {styleChips.map((chip) => (
                  <Chip key={chip} active={styleVibe === chip} onClick={() => setStyleVibe(chip)}>
                    {chip}
                  </Chip>
                ))}
              </div>

              <div className="p-6 rounded-card bg-white border border-navy/12 flex items-center justify-between max-w-md mx-auto shadow-sm">
                <div>
                  <h4 className="font-grotesk font-bold text-base text-navy">
                    Curated Signature Palette
                  </h4>
                  <p className="text-xs text-ink/70">Mandatory 5-color harmony system</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-navy border border-white" title="Navy" />
                  <span
                    className="w-6 h-6 rounded-full bg-orange border border-white"
                    title="Orange"
                  />
                  <span className="w-6 h-6 rounded-full bg-gold border border-white" title="Gold" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: EXPERIENTIAL PRIORITIES */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-fadeIn max-w-xl mx-auto w-full">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
                  Step 05 / 07
                </span>
                <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
                  Rank your experiential priorities
                </h1>
                <p className="text-ink/70 text-sm mt-2">
                  Festora AI allocates budget weighting according to your highest values.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-card bg-white border border-navy/12 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-grotesk font-extrabold text-base text-orange">01</span>
                    <span className="text-sm font-semibold text-ink">
                      Culinary Experience & Gastronomy
                    </span>
                  </div>
                  <GripVertical className="w-4 h-4 text-ink/40" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-card bg-white border border-navy/12 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-grotesk font-extrabold text-base text-gold">02</span>
                    <span className="text-sm font-semibold text-ink">
                      Immersive Decor, Mandap & Lighting
                    </span>
                  </div>
                  <GripVertical className="w-4 h-4 text-ink/40" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-card bg-white border border-navy/12 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-grotesk font-extrabold text-base text-navy">03</span>
                    <span className="text-sm font-semibold text-ink">
                      Live Music, Band & Cultural Entertainment
                    </span>
                  </div>
                  <GripVertical className="w-4 h-4 text-ink/40" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-card bg-white border border-navy/12 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-grotesk font-extrabold text-base text-navy/70">04</span>
                    <span className="text-sm font-semibold text-ink">
                      Guest Hospitality & Valet Coordination
                    </span>
                  </div>
                  <GripVertical className="w-4 h-4 text-ink/40" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: SPECIAL REQUIREMENTS */}
          {currentStep === 6 && (
            <div className="space-y-8 animate-fadeIn max-w-xl mx-auto w-full">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
                  Step 06 / 07
                </span>
                <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
                  Cultural rituals & dietary requirements
                </h1>
                <p className="text-ink/70 text-sm mt-2">
                  Festora AI factors authentic traditions and accessibility needs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-card-lg border border-navy/12 shadow-sm space-y-5">
                <div>
                  <label className="text-xs font-semibold text-ink/80 block mb-1.5">
                    Custom Rituals, Traditions or Special Requests
                  </label>
                  <textarea
                    rows={4}
                    value={specialNeeds}
                    onChange={(e) => setSpecialNeeds(e.target.value)}
                    className="w-full bg-bg border border-navy/18 rounded-card p-4 text-sm focus:outline-none focus:ring-2 focus:ring-navy font-medium leading-relaxed"
                    placeholder="e.g. Marwari welcome dholaks, separate Jain counter, drone permit, wheelchair ramp..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-pill bg-bg border border-navy/10 cursor-pointer hover:border-navy/30">
                    <input
                      type="checkbox"
                      checked={valetRequired}
                      onChange={(e) => setValetRequired(e.target.checked)}
                      className="w-4 h-4 accent-navy rounded cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-ink">Valet Parking Service</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-pill bg-bg border border-navy/10 cursor-pointer hover:border-navy/30">
                    <input
                      type="checkbox"
                      checked={kidsArea}
                      onChange={(e) => setKidsArea(e.target.checked)}
                      className="w-4 h-4 accent-navy rounded cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-ink">Dedicated Kids Play Area</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: ANIMATED PROCESSING ENGINE */}
          {currentStep === 7 && (
            <div className="text-center space-y-8 animate-fadeIn max-w-md mx-auto py-12">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-navy/15 border-t-orange animate-spin" />
                <Sparkles className="w-12 h-12 text-gold animate-pulse" />
              </div>

              <div className="space-y-2">
                <h1 className="font-grotesk text-3xl font-extrabold text-navy">
                  Festora AI is crafting your plan...
                </h1>
                <p className="text-xs text-ink/70">
                  Synthesizing vendors, drafting intelligent milestones, and calculating exact
                  budget splits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-card-lg border border-navy/12 text-left space-y-3.5 shadow-sm">
                <div className="flex items-center gap-3 text-xs font-medium">
                  <CheckCircle
                    className={`w-4 h-4 ${generationPhase >= 1 ? "text-navy" : "text-navy/30"}`}
                  />
                  <span className={generationPhase >= 1 ? "text-ink" : "text-ink/40"}>
                    Allocated budget across 5 categories ({formatINR(budget)})
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <CheckCircle
                    className={`w-4 h-4 ${generationPhase >= 2 ? "text-navy" : "text-navy/30"}`}
                  />
                  <span className={generationPhase >= 2 ? "text-ink" : "text-ink/40"}>
                    Shortlisted verified vendors in {city}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium">
                  {generationPhase >= 3 ? (
                    <CheckCircle className="w-4 h-4 text-navy" />
                  ) : (
                    <Loader2 className="w-4 h-4 text-orange animate-spin" />
                  )}
                  <span className={generationPhase >= 3 ? "text-ink" : "text-orange font-bold"}>
                    Generated 3-phase production roadmap & run sheet
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Bottom Navigation Buttons */}
        {currentStep < 7 && (
          <div className="pt-8 border-t border-navy/10 flex items-center justify-between mt-12">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>

            <Button
              variant="orange"
              size="lg"
              onClick={handleNext}
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              {currentStep === 6 ? "Generate AI Master Plan" : "Continue"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
