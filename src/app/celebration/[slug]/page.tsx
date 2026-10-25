"use client";

import React, { useState } from "react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Check,
  Utensils,
  Music,
  Share2,
  Download,
  AlertCircle
} from "lucide-react";

export default function CelebrationMicrositePage() {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestName, setGuestName] = useState("");
  const [dietary, setDietary] = useState("Rajasthani Thali");
  const [songRequest, setSongRequest] = useState("");

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName) return;
    setRsvpSubmitted(true);
  };

  const scheduleEvents = [
    {
      day: "Day 1: Friday, Nov 17",
      title: "Mehendi, Sangeet & Sufi Mehfil",
      time: "17:00 onwards",
      venue: "Courtyard & Fountain Gardens, Samode Palace",
      dressCode: "Festive Vibrant / Jewel Tones",
      desc: "An evening of vibrant music, handcrafted henna artistry, live Manganiyar Sufi folk music, and Rajasthani chaat stalls."
    },
    {
      day: "Day 2: Saturday, Nov 18",
      title: "Royal Baraat & Sacred Vedic Pheras",
      time: "15:00 - 19:30",
      venue: "Elephant Gate & Mandap by Lotus Pond",
      dressCode: "Traditional Royal Heritage",
      desc: "Baraat procession with royal chobdars and dholaks, followed by sunset varmala and holy Vedic pheras."
    },
    {
      day: "Day 2: Saturday, Nov 18",
      title: "Royal Gala Dinner & Fusion Concert",
      time: "20:00 - Late",
      venue: "Grand Durbar Ballroom & Terrace",
      dressCode: "Black Tie / Formal Bandhgala",
      desc: "Gourmet banquet with 45 culinary specialities, artisanal cocktails, and live fusion orchestra."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)] font-sans selection:bg-[var(--gold)]/30">
      {/* Floating Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
        <GlassSurface
          elevation="floating"
          className="px-6 py-3.5 rounded-full flex items-center justify-between border border-white/60 shadow-xl"
        >
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-[var(--navy)]">
              Ananya & Rohan
            </span>
            <span className="text-xs text-[var(--ink)]/40">•</span>
            <span className="text-xs font-bold text-[var(--orange)]">Nov 18, 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#schedule"
              className="text-xs font-bold text-[var(--navy)] hover:text-[var(--orange)] transition-colors hidden sm:block"
            >
              Schedule
            </a>
            <a
              href="#story"
              className="text-xs font-bold text-[var(--navy)] hover:text-[var(--orange)] transition-colors hidden sm:block"
            >
              Our Story
            </a>
            <a
              href="#rsvp"
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-[var(--orange)] text-[var(--ink)] shadow hover:brightness-105 transition-all"
            >
              RSVP Now
            </a>
          </div>
        </GlassSurface>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Background Image with Rich Navy Tint Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop"
            alt="Samode Palace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--navy)]/60 to-[var(--navy)]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[var(--gold)] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Royal Wedding Celebration
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white">
            Ananya & Rohan
          </h1>

          <p className="text-base sm:text-xl font-light text-white/90 max-w-xl mx-auto leading-relaxed">
            Invite you to join them in celebrating their sacred vows under the golden Rajasthan skies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white/80 pt-4">
            <span className="flex items-center gap-2 font-bold">
              <Calendar className="w-4 h-4 text-[var(--gold)]" /> November 18, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-2 font-bold">
              <MapPin className="w-4 h-4 text-[var(--gold)]" /> Samode Palace, Jaipur
            </span>
            <span>•</span>
            <span className="flex items-center gap-2 font-bold text-[var(--gold)]">
              <Clock className="w-4 h-4" /> 47 Days to Go
            </span>
          </div>
        </div>
      </section>

      {/* Love Story Narrative Section */}
      <section id="story" className="py-24 px-6 max-w-4xl mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--orange)]">A Decade in the Making</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)]">Our Story</h2>
        </div>

        <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed max-w-2xl mx-auto">
          From first crossing paths in a quiet library in Mumbai to sharing countless sunsets across the globe, our journey has been built on shared laughter, deep companionship, and endless adventure. On November 18th, we seal our lifelong commitment in the timeless heritage of Samode Palace, surrounded by the people who mean the world to us.
        </p>
      </section>

      {/* Multi-Day Itinerary / Schedule */}
      <section id="schedule" className="py-20 px-6 bg-[var(--navy)] text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--gold)]">The Royal Festivities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Celebration Schedule</h2>
            <p className="text-xs text-white/70">Kindly arrive 15 minutes before ceremony commencement.</p>
          </div>

          <div className="space-y-6">
            {scheduleEvents.map((evt, idx) => (
              <GlassSurface
                key={idx}
                elevation="card"
                className="p-6 rounded-3xl border border-white/20 text-white space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">{evt.day}</span>
                    <h3 className="text-lg font-bold text-white">{evt.title}</h3>
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white w-fit">
                    {evt.time}
                  </span>
                </div>

                <p className="text-xs text-white/80 leading-relaxed">{evt.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 text-white/70">
                  <div><strong>Venue:</strong> {evt.venue}</div>
                  <div><strong>Dress Code:</strong> {evt.dressCode}</div>
                </div>
              </GlassSurface>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 px-6 max-w-2xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--orange)]">Kindly Reply</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)]">RSVP Confirmation</h2>
          <p className="text-xs text-[var(--ink)]/60">
            Please let us know your attendance plans by October 31, 2026.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[var(--navy)]/10 shadow-xl">
          {rsvpSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[var(--navy)] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--navy)]">Dhanyavaad, {guestName}!</h3>
              <p className="text-xs text-[var(--ink)]/70 max-w-sm mx-auto">
                {attending === "yes"
                  ? "Your attendance and dietary preferences have been confirmed with Samode Palace hospitality."
                  : "We are deeply saddened you cannot make it, but we hold your blessings close to our hearts."}
              </p>
              <Button
                variant="navy"
                size="sm"
                onClick={() => setRsvpSubmitted(false)}
                className="mt-4"
              >
                Update Response
              </Button>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-[var(--navy)] block mb-1">Your Full Name</label>
                <Input
                  required
                  placeholder="e.g. Vikramaditya Singhania"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--navy)] block mb-2">Will you attend the celebrations?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                      attending === "yes"
                        ? "bg-[var(--navy)] text-white border-[var(--navy)] shadow-md"
                        : "bg-white text-[var(--navy)] border-[var(--navy)]/20"
                    }`}
                  >
                    Joyfully Attend
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                      attending === "no"
                        ? "bg-[var(--orange)] text-[var(--ink)] border-[var(--orange)] shadow-md"
                        : "bg-white text-[var(--ink)] border-[var(--navy)]/20"
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attending === "yes" && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[var(--navy)] block mb-1">Dietary Requirements</label>
                    <Select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="text-xs font-semibold bg-[var(--bg)] border-[var(--navy)]/15"
                    >
                      <option value="Rajasthani Thali">Rajasthani Royal Banquet</option>
                      <option value="Jain Pure Veg">Pure Jain Vegetarian (No root vegetables)</option>
                      <option value="Vegan">Vegan Only</option>
                      <option value="Continental">Continental / Global</option>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--navy)] block mb-1">Favorite Song for Sangeet Dance Floor</label>
                    <Input
                      placeholder="e.g. Kesariya / London Thumakda"
                      value={songRequest}
                      onChange={(e) => setSongRequest(e.target.value)}
                      className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                    />
                  </div>
                </>
              )}

              <Button
                variant="orange"
                size="md"
                type="submit"
                className="w-full font-bold text-[var(--ink)] shadow-lg mt-4"
              >
                Submit My RSVP
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--navy)]/10 text-center text-xs text-[var(--ink)]/60 space-y-2">
        <p className="font-bold text-[var(--navy)]">Ananya & Rohan • November 18, 2026 • Samode Palace</p>
        <p>Crafted with elegance via Festora AI Celebration Platform</p>
      </footer>
    </div>
  );
}
