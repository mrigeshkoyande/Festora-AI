"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  IndianRupee,
  Users,
  Store,
  Calendar,
  Armchair,
  Timer,
  Activity,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Utensils,
  Camera,
  Music,
} from "lucide-react";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Dialog } from "@/components/ui/Dialog";

export default function DashboardPage() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finalize floral arrangement palette with Botanica", done: true, due: "Done" },
    {
      id: 2,
      title: "Review lighting and sound technical rider",
      done: false,
      due: "Due Tomorrow",
      urgent: true,
    },
    { id: 3, title: "Send Jain & Vegan dietary counts to catering", done: false, due: "In 3 days" },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTaskTitle.trim(), done: false, due: "In 7 days" },
    ]);
    setNewTaskTitle("");
    setTaskModalOpen(false);
  };

  return (
    <WorkspaceShell>
      <div className="space-y-8">
        {/* Welcome Header & Top Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="default">Event Dashboard</Badge>
              <span className="text-xs text-ink/60 font-medium">
                • Ananya &amp; Rohan&apos;s Wedding
              </span>
            </div>
            <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
              Good evening, Priya — 47 days to go
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/ai-assistant">
              <Button variant="orange" icon={<Sparkles className="w-4 h-4 fill-current" />}>
                Ask AI Assistant
              </Button>
            </Link>
            <Button
              variant="secondary"
              onClick={() => setTaskModalOpen(true)}
              icon={<Plus className="w-4 h-4 text-navy" />}
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* Quick Action Pills Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <Link href="/budget">
            <button className="flex items-center gap-2 px-4 py-2 rounded-pill bg-white hover:bg-navy/6 border border-navy/12 text-xs font-semibold text-ink transition-colors whitespace-nowrap cursor-pointer">
              <IndianRupee className="w-4 h-4 text-orange" />
              <span>Log Expense</span>
            </button>
          </Link>
          <Link href="/guests">
            <button className="flex items-center gap-2 px-4 py-2 rounded-pill bg-white hover:bg-navy/6 border border-navy/12 text-xs font-semibold text-ink transition-colors whitespace-nowrap cursor-pointer">
              <Users className="w-4 h-4 text-navy" />
              <span>Import Guests</span>
            </button>
          </Link>
          <Link href="/vendors">
            <button className="flex items-center gap-2 px-4 py-2 rounded-pill bg-white hover:bg-navy/6 border border-navy/12 text-xs font-semibold text-ink transition-colors whitespace-nowrap cursor-pointer">
              <Store className="w-4 h-4 text-navy" />
              <span>Contact Vendors</span>
            </button>
          </Link>
          <Link href="/timeline">
            <button className="flex items-center gap-2 px-4 py-2 rounded-pill bg-white hover:bg-navy/6 border border-navy/12 text-xs font-semibold text-ink transition-colors whitespace-nowrap cursor-pointer">
              <Calendar className="w-4 h-4 text-navy" />
              <span>View Timeline</span>
            </button>
          </Link>
          <Link href="/seating">
            <button className="flex items-center gap-2 px-4 py-2 rounded-pill bg-white hover:bg-navy/6 border border-navy/12 text-xs font-semibold text-ink transition-colors whitespace-nowrap cursor-pointer">
              <Armchair className="w-4 h-4 text-navy" />
              <span>Seating Chart</span>
            </button>
          </Link>
        </div>

        {/* Bento Grid Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Countdown (Col 4) */}
          <div className="md:col-span-4 bg-white rounded-card-lg p-6 border border-navy/12 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
                Countdown
              </span>
              <Timer className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-grotesk text-6xl font-extrabold text-navy">47</span>
                <span className="font-grotesk text-lg font-bold text-ink/60">Days Left</span>
              </div>
              <p className="text-xs text-ink/70 mt-1">
                Event date: February 18, 2025 at Samode Palace, Jaipur.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy/8 flex items-center justify-between text-xs">
              <span className="text-ink/70">Target Milestones</span>
              <span className="font-bold text-navy">12 of 15 completed</span>
            </div>
          </div>

          {/* Card 2: Plan Health Score Ring (Col 4) */}
          <div className="md:col-span-4 bg-white rounded-card-lg p-6 border border-navy/12 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
                Plan Health
              </span>
              <Activity className="w-5 h-5 text-navy" />
            </div>
            <div className="flex items-center gap-5 my-1">
              <ProgressRing value={92} size={88} strokeWidth={8} accentColor="#2C3E50" />
              <div>
                <h3 className="font-grotesk text-lg font-bold text-navy">Excellent Status</h3>
                <p className="text-xs text-ink/70 mt-0.5 leading-relaxed">
                  All critical-path vendors contracted and budget allocation on target.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-navy/8 flex items-center justify-between text-xs">
              <span className="text-ink/70">Risk Assessment</span>
              <Badge variant="success">Low Risk</Badge>
            </div>
          </div>

          {/* Card 3: Budget Overview (Col 4) */}
          <div className="md:col-span-4 bg-white rounded-card-lg p-6 border border-navy/12 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
                Budget Overview
              </span>
              <IndianRupee className="w-5 h-5 text-orange" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[11px] text-ink/60 block">Total Spent</span>
                  <span className="font-grotesk text-2xl font-extrabold text-navy">
                    ₹28.5 Lakhs
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-ink/60 block">Allocated Cap</span>
                  <span className="font-grotesk text-lg font-bold text-ink/70">₹45.0 Lakhs</span>
                </div>
              </div>
              {/* Progress bar */}
              <div
                role="img"
                aria-label="Budget spend is 28.5 Lakhs of a 45 Lakh allocation, or 63.3 percent"
                className="w-full bg-navy/10 h-3 rounded-full overflow-hidden flex"
              >
                <div className="bg-navy h-full rounded-full" style={{ width: "63.3%" }} />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-navy/8 flex items-center justify-between text-xs">
              <span className="text-ink/70">Remaining Safe Buffer</span>
              <span className="font-bold text-orange">₹16.5 Lakhs</span>
            </div>
          </div>

          {/* Card 4: AI Recommendations Feed (Col 6) */}
          <div className="md:col-span-6 bg-white rounded-card-lg p-6 border border-navy/12 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange" />
                  <h3 className="font-grotesk text-lg font-bold text-navy">
                    Festora AI Recommendations
                  </h3>
                </div>
                <Badge variant="orange">2 New</Badge>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-bg border border-navy/10 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-navy">Catering Menu Addendum Pending</h4>
                    <p className="text-xs text-ink/70 mt-0.5">
                      Chef Laurent has prepared the Jain counter menu specifications. Send reminder
                      to approve?
                    </p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-bg border border-navy/10 flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-navy">
                      RSVP Surge Expected This Weekend
                    </h4>
                    <p className="text-xs text-ink/70 mt-0.5">
                      Based on past guest patterns, expect ~25 responses. Table 03 capacity may need
                      +2 seats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-navy/8 flex justify-end">
              <Link
                href="/ai-assistant"
                className="text-xs font-bold text-navy hover:underline flex items-center gap-1"
              >
                <span>View all AI insights</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 5: RSVP Progress Bar (Col 6) */}
          <div className="md:col-span-6 bg-white rounded-card-lg p-6 border border-navy/12 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
                  RSVP Tracking
                </span>
                <Users className="w-5 h-5 text-navy" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-grotesk text-2xl font-extrabold text-navy">
                  114 Confirmed
                </span>
                <span className="text-xs text-ink/60">150 Invited Guests</span>
              </div>
              {/* Progress bar breakdown */}
              <div
                role="img"
                aria-label="RSVP status: 114 confirmed, 24 pending, and 12 declined out of 150 invited guests"
                className="w-full bg-navy/10 h-3 rounded-full overflow-hidden flex mb-4"
              >
                <div className="bg-navy h-full" style={{ width: "76%" }} title="Confirmed" />
                <div className="bg-gold h-full" style={{ width: "16%" }} title="Pending" />
                <div className="bg-orange h-full" style={{ width: "8%" }} title="Declined" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-bg border border-navy/8">
                  <span className="text-[10px] text-ink/60 uppercase font-bold block">
                    Confirmed
                  </span>
                  <span className="font-grotesk text-base font-extrabold text-navy">114</span>
                </div>
                <div className="p-2.5 rounded-xl bg-bg border border-navy/8">
                  <span className="text-[10px] text-ink/60 uppercase font-bold block">Pending</span>
                  <span className="font-grotesk text-base font-extrabold text-gold">24</span>
                </div>
                <div className="p-2.5 rounded-xl bg-bg border border-navy/8">
                  <span className="text-[10px] text-ink/60 uppercase font-bold block">
                    Declined
                  </span>
                  <span className="font-grotesk text-base font-extrabold text-orange">12</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-navy/8 flex items-center justify-between text-xs">
              <span className="text-ink/70">Courtyard banquet capacity</span>
              <span className="font-bold text-navy">150 Max Capacity</span>
            </div>
          </div>

          {/* Card 6: Upcoming Tasks (Col 6) */}
          <div className="md:col-span-6 bg-white rounded-card-lg p-6 border border-navy/12 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-grotesk text-lg font-bold text-navy">Upcoming Tasks</h3>
                <Link href="/timeline" className="text-xs font-bold text-navy hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-bg hover:bg-navy/6 transition-colors cursor-pointer border border-navy/8"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 accent-navy rounded cursor-pointer"
                      />
                      <span
                        className={`text-xs font-medium ${
                          task.done ? "line-through text-ink/40" : "text-ink"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <Badge variant={task.done ? "success" : task.urgent ? "orange" : "default"}>
                      {task.due}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-navy/8 flex items-center justify-between text-xs">
              <span className="text-ink/60">3 critical tasks this week</span>
              <button
                type="button"
                onClick={() => setTaskModalOpen(true)}
                className="font-bold text-navy hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add custom task
              </button>
            </div>
          </div>

          {/* Card 7: Vendor Booking Status (Col 6) */}
          <div className="md:col-span-6 bg-white rounded-card-lg p-6 border border-navy/12 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-grotesk text-lg font-bold text-navy">Key Vendor Bookings</h3>
                <Link href="/vendors" className="text-xs font-bold text-navy hover:underline">
                  Manage all
                </Link>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-bg border border-navy/8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-navy shrink-0">
                      <Utensils className="w-4 h-4 text-navy" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy">Artisan Epicurean Catering</h4>
                      <p className="text-[11px] text-ink/60">Rajasthani & Jain Feast</p>
                    </div>
                  </div>
                  <Badge variant="success">Deposit Paid</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-bg border border-navy/8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange/15 flex items-center justify-center text-ink shrink-0">
                      <Camera className="w-4 h-4 text-ink" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy">Aether & Light Studio</h4>
                      <p className="text-[11px] text-ink/60">Documentary Cinema & Drone</p>
                    </div>
                  </div>
                  <Badge variant="orange">Contract Signed</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-bg border border-navy/8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold/25 flex items-center justify-center text-ink shrink-0">
                      <Music className="w-4 h-4 text-ink" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy">Manganiyar Folk Troupe</h4>
                      <p className="text-[11px] text-ink/60">Royal Procession Artists</p>
                    </div>
                  </div>
                  <Badge variant="gold">Awaiting Contract</Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-navy/8 flex justify-end">
              <Link href="/vendors" className="text-xs font-bold text-navy hover:underline">
                Explore 24+ more vendors →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Task Modal */}
      <Dialog
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        title="Add New Event Task"
        description="Schedule a task or milestone for Ananya & Rohan's Wedding."
      >
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-ink/80 block mb-1">Task Title</label>
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Schedule final soundcheck with DJ"
              className="w-full bg-bg border border-navy/18 rounded-pill px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="orange" type="submit">
              Save Task
            </Button>
          </div>
        </form>
      </Dialog>
    </WorkspaceShell>
  );
}
