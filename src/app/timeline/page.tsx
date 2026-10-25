"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Bot,
  Plus,
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Filter,
  User,
  ChevronLeft,
  ChevronRight,
  Flag,
  Share2,
} from "lucide-react";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Dialog";
import { fireFestoraConfetti } from "@/components/ui/Confetti";

export default function TimelinePage() {
  const [activeView, setActiveView] = useState<"gantt" | "calendar" | "kanban">("gantt");
  const [selectedTask, setSelectedTask] = useState<{
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    assignee: string;
    status: string;
  } | null>(null);

  const [tasks, setTasks] = useState([
    {
      id: "t1",
      phase: "Phase 1: Conceptualization & Palace Lock",
      title: "Finalize Master Budget Allocations",
      due: "Completed",
      priority: "high",
      status: "done",
      assignee: "Priya Sharma",
      daysBefore: 90,
      description: "Reconcile royal palace venue, catering, and decor splits.",
    },
    {
      id: "t2",
      phase: "Phase 1: Conceptualization & Palace Lock",
      title: "Sign Samode Palace Venue Contract",
      due: "Completed",
      priority: "high",
      status: "done",
      assignee: "Rohan Verma",
      daysBefore: 80,
      description: "Lock dates and deposit for palace courtyard lawns.",
    },
    {
      id: "t3",
      phase: "Phase 2: Vendor Curation & Tastings",
      title: "Review Technical Lighting & Audio Rigging",
      due: "Due Tomorrow",
      priority: "high",
      status: "in_progress",
      assignee: "Priya Sharma",
      daysBefore: 45,
      description: "Review wattage and noise limits with palace curators.",
      urgent: true,
    },
    {
      id: "t4",
      phase: "Phase 2: Vendor Curation & Tastings",
      title: "Send Jain & Vegan Dietary Lists to Catering",
      due: "In 3 Days",
      priority: "medium",
      status: "in_progress",
      assignee: "Ananya Mehta",
      daysBefore: 40,
      description: "Ensure separate counter specs are locked with Chef Laurent.",
    },
    {
      id: "t5",
      phase: "Phase 3: Production Design & Seating",
      title: "Finalize Table Seating Chart Layout",
      due: "In 14 Days",
      priority: "medium",
      status: "todo",
      assignee: "Priya Sharma",
      daysBefore: 14,
      description: "Import confirmed RSVPs into banquet floor plan canvas.",
    },
    {
      id: "t6",
      phase: "Phase 3: Production Design & Seating",
      title: "Full Stage Rehearsal & Vendor Soundcheck",
      due: "Day 1 Before",
      priority: "high",
      status: "todo",
      assignee: "Stage Coordinator",
      daysBefore: 1,
      description: "Soundcheck with Manganiyar folk artists and baraat dholaks.",
    },
  ]);

  const handleTaskClick = (task: typeof tasks[0]) => {
    setSelectedTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.due,
      assignee: task.assignee,
      status: task.status,
    });
  };

  const syncGoogleCalendar = () => {
    alert("Exporting ICS event calendar synced with 6 milestone phases...");
    fireFestoraConfetti();
  };

  return (
    <WorkspaceShell>
      <div className="space-y-8">
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="orange">Production Roadmap</Badge>
              <span className="text-xs text-ink/60 font-medium">
                • 47 days to go
              </span>
            </div>
            <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
              Master Timeline & Tasks
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="secondary"
              onClick={syncGoogleCalendar}
              icon={<CalendarIcon className="w-4 h-4 text-navy" />}
            >
              Sync to Calendar (ICS)
            </Button>
            <Button
              variant="orange"
              onClick={() => {
                alert("Festora AI analyzing critical path and dates...");
                fireFestoraConfetti();
              }}
              icon={<Bot className="w-4 h-4 fill-current" />}
            >
              Regenerate with AI
            </Button>
          </div>
        </div>

        {/* Quick Metrics & View Switcher Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Quick Metrics (7-Col) */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-card border border-navy/12 shadow-sm">
              <span className="text-xs text-ink/60 font-semibold block mb-1">Total Tasks</span>
              <div className="flex items-baseline gap-2">
                <span className="font-grotesk text-2xl font-extrabold text-navy">48</span>
                <span className="text-[11px] text-orange font-bold">+4 this week</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-card border border-navy/12 shadow-sm">
              <span className="text-xs text-ink/60 font-semibold block mb-1">Needs Attention</span>
              <div className="flex items-baseline gap-2">
                <span className="font-grotesk text-2xl font-extrabold text-orange">1</span>
                <span className="text-[11px] text-ink/60 font-bold">Overdue</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-card border border-navy/12 shadow-sm">
              <span className="text-xs text-ink/60 font-semibold block mb-1">Completion</span>
              <div className="flex items-baseline gap-2">
                <span className="font-grotesk text-2xl font-extrabold text-navy">68%</span>
                <span className="text-[11px] text-navy font-bold">On track</span>
              </div>
            </div>
          </div>

          {/* View Switcher Bar (5-Col) */}
          <div className="lg:col-span-5 bg-white p-2 rounded-card border border-navy/12 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-1 w-full">
              <button
                type="button"
                onClick={() => setActiveView("gantt")}
                className={`flex-1 py-2 rounded-pill text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeView === "gantt"
                    ? "bg-navy text-bg shadow-sm"
                    : "text-ink/70 hover:text-ink hover:bg-bg"
                }`}
              >
                Gantt Roadmap
              </button>
              <button
                type="button"
                onClick={() => setActiveView("calendar")}
                className={`flex-1 py-2 rounded-pill text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeView === "calendar"
                    ? "bg-navy text-bg shadow-sm"
                    : "text-ink/70 hover:text-ink hover:bg-bg"
                }`}
              >
                Calendar Grid
              </button>
              <button
                type="button"
                onClick={() => setActiveView("kanban")}
                className={`flex-1 py-2 rounded-pill text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeView === "kanban"
                    ? "bg-navy text-bg shadow-sm"
                    : "text-ink/70 hover:text-ink hover:bg-bg"
                }`}
              >
                Kanban
              </button>
            </div>
          </div>
        </div>

        {/* VIEW 1: GANTT ROADMAP */}
        {activeView === "gantt" && (
          <div className="bg-white rounded-card-lg border border-navy/12 shadow-sm p-6 overflow-x-auto space-y-6">
            <div className="min-w-[850px] space-y-6">
              {/* Timeline Header Months */}
              <div className="grid grid-cols-12 gap-2 pb-3 border-b border-navy/10 text-xs font-bold uppercase tracking-wider text-ink/60">
                <div className="col-span-4">Milestone Tasks & Phases</div>
                <div className="text-center">Month -3</div>
                <div className="text-center">Month -2</div>
                <div className="text-center">Month -1</div>
                <div className="text-center font-bold text-orange">Week -2</div>
                <div className="text-center font-bold text-orange">Week -1</div>
                <div className="text-center col-span-3 font-bold text-navy">Gala Day</div>
              </div>

              {/* Phase 1 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-bg px-4 py-2 rounded-xl border border-navy/8">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-navy" />
                    <span className="font-grotesk font-bold text-sm text-navy">
                      Phase 1: Conceptualization & Palace Lock
                    </span>
                  </div>
                  <Badge variant="success">Completed</Badge>
                </div>
                {tasks.filter((t) => t.phase.includes("Phase 1")).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="grid grid-cols-12 gap-2 items-center p-3 rounded-2xl hover:bg-bg transition-colors cursor-pointer border border-navy/6"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <span className="text-xs font-semibold text-navy truncate">
                        {task.title}
                      </span>
                    </div>
                    <div className="col-span-8 relative h-7 bg-bg rounded-pill flex items-center px-2">
                      <div className="w-[45%] h-5 bg-navy text-bg rounded-pill flex items-center justify-between px-3 text-[10px] font-bold">
                        <span>Done</span>
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phase 2 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-bg px-4 py-2 rounded-xl border border-navy/8">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-orange" />
                    <span className="font-grotesk font-bold text-sm text-navy">
                      Phase 2: Vendor Curation & Tastings
                    </span>
                  </div>
                  <Badge variant="orange">In Progress (Days 31-90)</Badge>
                </div>
                {tasks.filter((t) => t.phase.includes("Phase 2")).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className={`grid grid-cols-12 gap-2 items-center p-3 rounded-2xl hover:bg-bg transition-colors cursor-pointer border ${
                      task.urgent ? "border-orange bg-orange/5" : "border-navy/6"
                    }`}
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <span className="text-xs font-semibold text-navy truncate">
                        {task.title}
                      </span>
                      {task.urgent && <Badge variant="orange">Urgent</Badge>}
                    </div>
                    <div className="col-span-8 relative h-7 bg-bg rounded-pill flex items-center px-2">
                      <div
                        className={`h-5 rounded-pill flex items-center justify-between px-3 text-[10px] font-bold ${
                          task.urgent ? "bg-orange text-ink w-[60%]" : "bg-gold text-ink w-[50%]"
                        }`}
                        style={{ marginLeft: "25%" }}
                      >
                        <span>{task.due}</span>
                        <Clock className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phase 3 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-bg px-4 py-2 rounded-xl border border-navy/8">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-navy/70" />
                    <span className="font-grotesk font-bold text-sm text-navy">
                      Phase 3: Production Design & Seating
                    </span>
                  </div>
                  <Badge variant="default">Upcoming</Badge>
                </div>
                {tasks.filter((t) => t.phase.includes("Phase 3")).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="grid grid-cols-12 gap-2 items-center p-3 rounded-2xl hover:bg-bg transition-colors cursor-pointer border border-navy/6"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <span className="text-xs font-semibold text-navy truncate">
                        {task.title}
                      </span>
                    </div>
                    <div className="col-span-8 relative h-7 bg-bg rounded-pill flex items-center px-2">
                      <div
                        className="w-[35%] h-5 bg-navy/20 text-navy rounded-pill flex items-center justify-between px-3 text-[10px] font-bold"
                        style={{ marginLeft: "60%" }}
                      >
                        <span>{task.due}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CALENDAR GRID (Data-dense on #F8F9FA) */}
        {activeView === "calendar" && (
          <div className="bg-bg rounded-card-lg border border-navy/15 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
              <h2 className="font-grotesk text-xl font-bold text-navy">
                February 2025 — Wedding Month
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-white border border-navy/10 text-navy">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-white border border-navy/10 text-navy">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar 7-day grid */}
            <div className="grid grid-cols-7 gap-3 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-xs font-bold uppercase tracking-wider text-ink/60 py-2">
                  {day}
                </div>
              ))}

              {[...Array(28)].map((_, idx) => {
                const dayNum = idx + 1;
                const isGalaDay = dayNum === 18;
                const hasTask = dayNum === 3 || dayNum === 10 || dayNum === 17;

                return (
                  <div
                    key={dayNum}
                    className={`h-24 p-2.5 rounded-2xl text-left flex flex-col justify-between border transition-all ${
                      isGalaDay
                        ? "bg-orange text-ink border-orange font-bold shadow-md"
                        : hasTask
                        ? "bg-white border-navy/20 shadow-sm"
                        : "bg-white/60 border-navy/8 text-ink/60"
                    }`}
                  >
                    <span className="text-xs font-bold">{dayNum}</span>
                    {isGalaDay && (
                      <div className="p-1 rounded bg-navy text-bg text-[10px] font-bold truncate">
                        Royal Nuptials
                      </div>
                    )}
                    {dayNum === 3 && (
                      <div className="p-1 rounded bg-orange/20 text-ink text-[10px] font-bold truncate">
                        AV Soundcheck
                      </div>
                    )}
                    {dayNum === 10 && (
                      <div className="p-1 rounded bg-gold/30 text-ink text-[10px] font-bold truncate">
                        Menu Tasting
                      </div>
                    )}
                    {dayNum === 17 && (
                      <div className="p-1 rounded bg-navy text-bg text-[10px] font-bold truncate">
                        Mehendi & Sangeet
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: KANBAN */}
        {activeView === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Backlog / Todo */}
            <div className="bg-white p-5 rounded-card border border-navy/12 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy/8">
                <span className="font-grotesk font-bold text-sm text-navy">To Do (Upcoming)</span>
                <Badge variant="default">2</Badge>
              </div>
              {tasks.filter((t) => t.status === "todo").map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleTaskClick(t)}
                  className="p-4 rounded-2xl bg-bg border border-navy/10 hover:border-navy/30 cursor-pointer space-y-2 transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={t.priority === "high" ? "orange" : "default"}>
                      {t.priority}
                    </Badge>
                    <span className="text-[11px] text-ink/60">{t.due}</span>
                  </div>
                  <h4 className="text-xs font-bold text-navy">{t.title}</h4>
                  <p className="text-[11px] text-ink/70 line-clamp-2">{t.description}</p>
                </div>
              ))}
            </div>

            {/* In Progress */}
            <div className="bg-white p-5 rounded-card border border-navy/12 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy/8">
                <span className="font-grotesk font-bold text-sm text-orange">In Progress</span>
                <Badge variant="orange">2</Badge>
              </div>
              {tasks.filter((t) => t.status === "in_progress").map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleTaskClick(t)}
                  className="p-4 rounded-2xl bg-bg border border-orange/40 hover:border-orange cursor-pointer space-y-2 transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="orange">Active</Badge>
                    <span className="text-[11px] font-bold text-orange">{t.due}</span>
                  </div>
                  <h4 className="text-xs font-bold text-navy">{t.title}</h4>
                  <p className="text-[11px] text-ink/70 line-clamp-2">{t.description}</p>
                </div>
              ))}
            </div>

            {/* Done */}
            <div className="bg-white p-5 rounded-card border border-navy/12 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy/8">
                <span className="font-grotesk font-bold text-sm text-navy">Done</span>
                <Badge variant="success">2</Badge>
              </div>
              {tasks.filter((t) => t.status === "done").map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleTaskClick(t)}
                  className="p-4 rounded-2xl bg-bg border border-navy/10 opacity-75 hover:opacity-100 cursor-pointer space-y-2 transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="success">Completed</Badge>
                  </div>
                  <h4 className="text-xs font-semibold text-ink line-through">{t.title}</h4>
                  <p className="text-[11px] text-ink/50 line-clamp-1">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Task Details Drawer */}
      <Drawer
        isOpen={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        title={selectedTask?.title || "Task Details"}
        subtitle={`Due: ${selectedTask?.dueDate || ""} • Assigned to: ${selectedTask?.assignee || ""}`}
      >
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ink/60 block mb-1">
              Description & Specifications
            </span>
            <p className="text-sm text-ink/80 leading-relaxed bg-bg p-4 rounded-card border border-navy/10">
              {selectedTask?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink/60 block mb-1">
                Priority
              </span>
              <Badge variant={selectedTask?.priority === "high" ? "orange" : "default"}>
                {selectedTask?.priority.toUpperCase()}
              </Badge>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink/60 block mb-1">
                Status
              </span>
              <Badge variant={selectedTask?.status === "done" ? "success" : "orange"}>
                {selectedTask?.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="pt-4 border-t border-navy/10 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setSelectedTask(null)}>
              Close
            </Button>
            <Button
              variant="orange"
              onClick={() => {
                alert("Task status updated!");
                setSelectedTask(null);
              }}
            >
              Mark Done
            </Button>
          </div>
        </div>
      </Drawer>
    </WorkspaceShell>
  );
}
