"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Mail, Phone, MapPin, Clock, Sparkles, Check, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Royal Destination Wedding");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Header */}
        <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--navy)]/8 border border-[var(--navy)]/10 text-xs font-bold text-[var(--navy)]">
            <MessageSquare className="w-3.5 h-3.5 text-[var(--orange)]" /> Concierge Advisory
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--navy)] max-w-3xl mx-auto">
            Let’s discuss your vision.
          </h1>

          <p className="text-base text-[var(--ink)]/70 max-w-xl mx-auto">
            Whether you are planning a 1,000-guest heritage wedding or need an agency partnership,
            our planning directors are here to assist.
          </p>
        </section>

        {/* Main Split: Form on Left (7 cols) + Contact Details on Right (5 cols) */}
        <section className="py-12 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[var(--navy)]/10 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[var(--navy)] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--navy)]">Message Dispatched!</h3>
                  <p className="text-xs text-[var(--ink)]/70 max-w-sm mx-auto">
                    Thank you, {name}. A senior celebration architect from our concierge team will
                    reach out within 4 business hours.
                  </p>
                  <Button
                    variant="navy"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-extrabold text-[var(--navy)] mb-2">
                    Send an Inquiry
                  </h3>

                  <div>
                    <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                      Your Full Name
                    </label>
                    <Input
                      required
                      placeholder="e.g. Priya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                        Work or Personal Email
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="priya@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                        Celebration Scale
                      </label>
                      <Select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="text-xs font-semibold bg-[var(--bg)] border-[var(--navy)]/15"
                      >
                        <option value="Royal Destination Wedding">Royal Destination Wedding</option>
                        <option value="Corporate Gala / Summit">Corporate Gala / Summit</option>
                        <option value="Milestone Birthday (50th / 21st)">Milestone Birthday</option>
                        <option value="Agency / Planner Partnership">Agency Partnership</option>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                      Tell us about your target date and requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="e.g. Planning a 150-guest destination wedding at Samode Palace in Nov 2026. Looking for catering and decor vendor matching..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-[var(--bg)] border border-[var(--navy)]/15 rounded-xl text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--navy)]"
                    />
                  </div>

                  <Button
                    variant="orange"
                    size="md"
                    type="submit"
                    className="w-full font-bold text-[var(--ink)] shadow-md"
                  >
                    <Send className="w-4 h-4 mr-1.5" /> Dispatch Inquiry
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <GlassSurface
                elevation="card"
                className="p-6 rounded-3xl border border-[var(--navy)]/10 space-y-6"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--gold)]">
                    Headquarters
                  </span>
                  <h3 className="text-lg font-bold text-[var(--navy)] mt-0.5">
                    Festora Celebration Studios
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[var(--navy)]">Jaipur Heritage Atelier</div>
                      <p className="text-[var(--ink)]/70 mt-0.5">
                        Civil Lines, C-Scheme, Jaipur, Rajasthan 302006
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[var(--navy)]">Mumbai Design Studio</div>
                      <p className="text-[var(--ink)]/70 mt-0.5">
                        BKC Financial District, Bandra East, Mumbai 400051
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[var(--navy)]">Direct Concierge Email</div>
                      <a
                        href="mailto:concierge@festora.ai"
                        className="text-[var(--navy)] hover:underline mt-0.5 block"
                      >
                        concierge@festora.ai
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[var(--navy)]">Toll-Free Priority Line</div>
                      <p className="text-[var(--ink)]/70 mt-0.5">
                        +91 (0) 141 889 2000 (Mon–Sat 9AM–8PM IST)
                      </p>
                    </div>
                  </div>
                </div>
              </GlassSurface>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
