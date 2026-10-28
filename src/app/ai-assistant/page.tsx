"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Send,
  Mic,
  Paperclip,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Check,
  Calendar,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Users,
  Utensils,
  MapPin,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface BudgetDeltaWidget {
  category: string;
  previousAllocated: string;
  newAllocated: string;
  offsetCategory: string;
  savings: string;
  reason: string;
}

interface CatererWidget {
  name: string;
  rating: number;
  price: string;
  match: number;
}

interface TaskWidget {
  title: string;
  due: string;
  assignee: string;
}

interface InvitationWidget {
  content: string;
}

type WidgetData = Record<string, string | number> | CatererWidget[];

interface Message {
  id: string;
  sender: "user" | "ai";
  timestamp: string;
  text: string;
  interactiveWidget?: "budget-delta" | "caterer-shortlist" | "task-created" | "invitation-draft";
  widgetData?: WidgetData;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m-1",
    sender: "ai",
    timestamp: "10:30 AM",
    text: "Namaste Priya! I am your Festora AI Planning Copilot. I'm actively analyzing **Ananya & Rohan's Royal Wedding** (47 days remaining). How can I assist your logistics today? I can adjust your budget allocations, resolve vendor scheduling clashes, or draft bilingual invitation wording.",
  },
  {
    id: "m-2",
    sender: "user",
    timestamp: "10:32 AM",
    text: "Can we review our catering budget? We need to add a dedicated Jain pure-vegetarian counter for 40 elders without increasing our total ₹45,00,000 budget.",
  },
  {
    id: "m-3",
    sender: "ai",
    timestamp: "10:33 AM",
    text: "Certainly! I recalculated your line items. By shifting ₹1,50,000 from discretionary printed collateral to catering and locking an off-peak rate with Khyber Gastronomy, we can add the Jain culinary station without changing your ₹45 Lakhs ceiling.",
    interactiveWidget: "budget-delta",
    widgetData: {
      category: "Royal Catering & Bar",
      previousAllocated: "₹12,00,000",
      newAllocated: "₹13,50,000",
      offsetCategory: "Stationery & Gift Boxes",
      savings: "₹1,50,000",
      reason: "Dedicated Jain kitchen counter with separate silver cutlery and clay sigris.",
    },
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [budgetApplied, setBudgetApplied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: prompt,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt("");
    setIsTyping(true);

    // Contextual responses based on prompt
    setTimeout(() => {
      let aiResponse: Message;

      if (prompt.toLowerCase().includes("cater") || prompt.toLowerCase().includes("food")) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: "Here is the top-rated catering shortlist for Samode Palace in Jaipur, filtered for authentic Rajputana banquet and pure Jain separation:",
          interactiveWidget: "caterer-shortlist",
          widgetData: [
            {
              name: "Khyber Royal Rajasthani Gastronomy",
              price: "₹2,400 / plate",
              rating: 4.9,
              match: 96,
            },
            { name: "Marwar Palace Caterers", price: "₹2,200 / plate", rating: 4.8, match: 92 },
            { name: "Saffron Spices Jaipur", price: "₹2,800 / plate", rating: 4.7, match: 89 },
          ],
        };
      } else if (
        prompt.toLowerCase().includes("task") ||
        prompt.toLowerCase().includes("timeline") ||
        prompt.toLowerCase().includes("schedule")
      ) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: "I have added a new high-priority production task to Phase 2 with automatic due dates and assignee alerts.",
          interactiveWidget: "task-created",
          widgetData: {
            title: "Confirm Manganiyar Folk Band Arrival & Sound Check",
            phase: "Phase 2: Vendor Curation",
            due: "In 3 Days (Nov 15)",
            assignee: "Priya Sharma (Lead Planner)",
          },
        };
      } else if (
        prompt.toLowerCase().includes("invit") ||
        prompt.toLowerCase().includes("wording")
      ) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: "Here is an editorial bilingual royal invitation wording tailored for Samode Palace:",
          interactiveWidget: "invitation-draft",
          widgetData: {
            tone: "Royal Heritage",
            content:
              "Under the golden Rajasthan skies, Shri & Smt. Rajesh Mehta request the pleasure of your company at the wedding celebrations of their daughter Ananya with Rohan, son of Shri & Smt. Ashok Verma. Samode Palace, Jaipur.",
          },
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: `I have analyzed your request regarding "${prompt}". I cross-referenced this against your 150-guest parameters and current budget allocations. All constraints remain within safe buffers.`,
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const suggestionChips = [
    "Catering & Jain counter options",
    "Add sound check task to timeline",
    "Draft formal bilingual wedding invitation",
    "Check rain contingency at Samode Palace",
  ];

  return (
    <WorkspaceShell activeTab="ai-assistant">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy)]">
              AI Intelligence
            </span>
            <span className="text-xs text-[var(--ink)]/50">•</span>
            <span className="text-xs font-semibold text-[var(--gold)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Gemini 1.5 Flash Copilot Active
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--navy)]">
            AI Planning Assistant
          </h1>
          <p className="text-sm text-[var(--ink)]/70 mt-1">
            Generative context-aware copilot with real-time tool calling: modify budgets, schedule
            tasks, and curate vendors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="navy" className="px-3 py-1 font-bold">
            Live Plan Sync: 100%
          </Badge>
        </div>
      </div>

      {/* Main Workspace Split: Chat Area (8 cols) + Context Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-[calc(100vh-220px)] min-h-[600px]">
        {/* Left: Chat Area */}
        <div className="lg:col-span-8 flex flex-col h-full bg-white rounded-3xl border border-[var(--navy)]/10 shadow-sm overflow-hidden">
          {/* Active Context Banner */}
          <div className="px-6 py-3 bg-[var(--bg)] border-b border-[var(--navy)]/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--orange)] animate-pulse" />
              <span className="font-bold text-[var(--navy)]">
                Ananya &amp; Rohan&apos;s Royal Wedding
              </span>
              <span className="text-[var(--ink)]/40">•</span>
              <span className="text-[var(--ink)]/60">Jaipur (47 days remaining)</span>
            </div>
            <span className="text-[11px] font-bold text-[var(--navy)]">₹45L Budget Allocated</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => {
              const isAI = msg.sender === "ai";
              const widget = !Array.isArray(msg.widgetData) ? msg.widgetData : undefined;
              const caterers = Array.isArray(msg.widgetData) ? msg.widgetData : [];
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3.5 ${isAI ? "items-start" : "items-start flex-row-reverse"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md ${
                      isAI
                        ? "bg-[var(--navy)] text-[var(--gold)] border border-[var(--gold)]/30"
                        : "bg-[var(--orange)] text-[var(--ink)]"
                    }`}
                  >
                    {isAI ? <Sparkles className="w-4 h-4" /> : "PS"}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[80%] space-y-2 ${isAI ? "" : "text-right"}`}>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--ink)]/50 px-1">
                      <span className="font-bold text-[var(--navy)]">
                        {isAI ? "Festora AI Copilot" : "Priya Sharma"}
                      </span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        isAI
                          ? "bg-[var(--bg)] text-[var(--ink)] border border-[var(--navy)]/10 text-left"
                          : "bg-[var(--navy)] text-white text-left font-medium shadow-md"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {/* Interactive Widget: Budget Delta */}
                      {msg.interactiveWidget === "budget-delta" && msg.widgetData && (
                        <div className="mt-4 p-4 bg-white rounded-xl border border-[var(--navy)]/15 shadow-sm space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-[var(--navy)]/10">
                            <span className="text-[11px] font-bold text-[var(--navy)] uppercase flex items-center gap-1.5">
                              <DollarSign className="w-3.5 h-3.5 text-[var(--orange)]" />
                              Budget Reallocation Proposal
                            </span>
                            <Badge variant="gold" className="text-[10px]">
                              Pending Approval
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-[10px] text-[var(--ink)]/50 block">
                                Increase Allocation
                              </span>
                              <div className="font-bold text-[var(--navy)]">{widget?.category}</div>
                              <div className="text-[11px] text-[var(--orange)] font-extrabold mt-0.5">
                                {widget?.previousAllocated} → {widget?.newAllocated}
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] text-[var(--ink)]/50 block">
                                Offset Savings
                              </span>
                              <div className="font-bold text-[var(--navy)]">
                                {widget?.offsetCategory}
                              </div>
                              <div className="text-[11px] font-bold text-[var(--navy)] mt-0.5">
                                -{widget?.savings}
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-[var(--ink)]/70 italic">
                            &ldquo;{widget?.reason}&rdquo;
                          </p>

                          <div className="pt-2 flex justify-end gap-2">
                            {budgetApplied ? (
                              <span className="text-xs font-bold text-[var(--navy)] flex items-center gap-1">
                                <Check className="w-4 h-4 text-[var(--navy)]" /> Approved & Synced
                                with Budget
                              </span>
                            ) : (
                              <Button
                                variant="orange"
                                size="sm"
                                onClick={() => setBudgetApplied(true)}
                                className="text-xs font-bold text-[var(--ink)] shadow"
                              >
                                Apply to Master Budget
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Interactive Widget: Caterer Shortlist */}
                      {msg.interactiveWidget === "caterer-shortlist" && msg.widgetData && (
                        <div className="mt-4 space-y-2">
                          {caterers.map((caterer, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-white rounded-xl border border-[var(--navy)]/10 flex items-center justify-between shadow-sm"
                            >
                              <div>
                                <h5 className="font-bold text-xs text-[var(--navy)]">
                                  {caterer.name}
                                </h5>
                                <div className="text-[11px] text-[var(--ink)]/60 flex items-center gap-2 mt-0.5">
                                  <span>★ {caterer.rating}</span>
                                  <span>•</span>
                                  <span className="font-semibold text-[var(--navy)]">
                                    {caterer.price}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[11px] font-bold text-[var(--orange)]">
                                {caterer.match}% Match
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Interactive Widget: Task Created */}
                      {msg.interactiveWidget === "task-created" && msg.widgetData && (
                        <div className="mt-4 p-3 bg-white rounded-xl border border-[var(--navy)]/15 shadow-sm flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-[10px] uppercase font-bold text-[var(--navy)]">
                              ✓ Task Scheduled
                            </span>
                            <h5 className="text-xs font-bold text-[var(--navy)]">
                              {widget?.title}
                            </h5>
                            <p className="text-[11px] text-[var(--ink)]/60">
                              {widget?.due} • {widget?.assignee}
                            </p>
                          </div>
                          <Badge variant="navy">Phase 2</Badge>
                        </div>
                      )}

                      {/* Interactive Widget: Invitation Draft */}
                      {msg.interactiveWidget === "invitation-draft" && msg.widgetData && (
                        <div className="mt-4 p-4 bg-white rounded-xl border border-[var(--navy)]/15 shadow-sm space-y-2">
                          <span className="text-[10px] uppercase font-bold text-[var(--gold)]">
                            Royal Heritage Wording
                          </span>
                          <p className="text-xs italic text-[var(--ink)] leading-relaxed">
                            &ldquo;{widget?.content}&rdquo;
                          </p>
                          <div className="pt-2 flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => alert("Copied wording to clipboard!")}
                              className="text-xs text-[var(--navy)] font-bold"
                            >
                              <Copy className="w-3.5 h-3.5 mr-1" /> Copy Draft
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* AI Toolbar */}
                    {isAI && (
                      <div className="flex items-center gap-3 px-1 text-[var(--ink)]/40 text-[11px]">
                        <button className="hover:text-[var(--navy)] flex items-center gap-1 transition-colors">
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                        <button className="hover:text-[var(--navy)] flex items-center gap-1 transition-colors">
                          <RotateCcw className="w-3 h-3" /> Refine
                        </button>
                        <button className="hover:text-[var(--navy)] transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button className="hover:text-[var(--navy)] transition-colors">
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 items-center text-xs text-[var(--ink)]/60">
                <div className="w-8 h-8 rounded-full bg-[var(--navy)] text-[var(--gold)] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <span>Festora AI is thinking and running scenario computations...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-6 py-2 bg-[var(--bg)] border-t border-[var(--navy)]/8 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-3 py-1 bg-white hover:bg-[var(--navy)] hover:text-white rounded-full text-[11px] font-semibold text-[var(--navy)] border border-[var(--navy)]/15 transition-all shadow-sm"
              >
                + {chip}
              </button>
            ))}
          </div>

          {/* Chat Composer */}
          <div className="p-4 bg-white border-t border-[var(--navy)]/10">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Festora AI anything about your plan, budget, or vendors..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full h-12 pl-4 pr-24 bg-[var(--bg)] border border-[var(--navy)]/15 rounded-2xl text-xs text-[var(--ink)] placeholder:text-[var(--ink)]/40 focus:outline-none focus:border-[var(--navy)] focus:ring-1 focus:ring-[var(--navy)]"
              />

              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-xl transition-all ${
                    isRecording
                      ? "bg-[var(--orange)] text-[var(--ink)] animate-pulse"
                      : "text-[var(--ink)]/50 hover:text-[var(--navy)]"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>

                <Button
                  variant="orange"
                  size="sm"
                  onClick={() => handleSendMessage()}
                  disabled={!inputPrompt.trim()}
                  className="h-9 px-4 rounded-xl font-bold text-[var(--ink)] shadow"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Plan Context Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Event Summary */}
          <GlassSurface
            elevation="card"
            className="p-4 rounded-2xl border border-[var(--navy)]/10 space-y-4"
          >
            <div className="relative h-32 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop"
                alt="Samode Palace"
                fill
                sizes="(max-width: 1024px) 100vw, 350px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold text-[var(--gold)]">
                  Royal Heritage
                </span>
                <h3 className="text-sm font-bold leading-tight">Ananya & Rohan</h3>
                <p className="text-[10px] text-white/80">Nov 18, 2026 • Jaipur</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-[var(--navy)]/10">
                <span className="text-[10px] text-[var(--ink)]/50 block font-bold">
                  Total Budget
                </span>
                <span className="font-extrabold text-[var(--navy)]">₹45,00,000</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[var(--navy)]/10">
                <span className="text-[10px] text-[var(--ink)]/50 block font-bold">
                  Health Score
                </span>
                <span className="font-extrabold text-[var(--navy)]">92 / 100</span>
              </div>
            </div>
          </GlassSurface>

          {/* Pinned Context Flags */}
          <div className="bg-white rounded-2xl p-4 border border-[var(--navy)]/10 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[var(--navy)] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[var(--navy)]" />
              Contextual Risk Guardrails
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10">
                <div className="font-bold text-[var(--navy)]">Sunset Timing: 17:48 IST</div>
                <div className="text-[11px] text-[var(--ink)]/60">
                  Varmala outdoor photography scheduled at 16:30 for golden hour.
                </div>
              </div>

              <div className="p-2.5 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10">
                <div className="font-bold text-[var(--orange)]">Jain Dietary Allocation</div>
                <div className="text-[11px] text-[var(--ink)]/60">
                  40 guests identified with strict pure-vegetarian dietary needs.
                </div>
              </div>

              <div className="p-2.5 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10">
                <div className="font-bold text-[var(--navy)]">Drone Flight Clearance</div>
                <div className="text-[11px] text-[var(--ink)]/60">
                  Samode heritage district aerial permit approved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
