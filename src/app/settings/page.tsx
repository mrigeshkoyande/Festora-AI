"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dialog } from "@/components/ui/Dialog";
import {
  Settings as SettingsIcon,
  Users,
  Bell,
  CreditCard,
  ShieldAlert,
  Mail,
  UserPlus,
  Check,
  Smartphone,
  Trash2,
  Sparkles,
  Lock,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Collaborator" | "Vendor" | "Guest-view";
  avatar: string;
}

const SETTINGS_TABS = ["details", "team", "notifications", "billing"] as const;
type SettingsTab = (typeof SETTINGS_TABS)[number];

const TEAM_ROLES = ["Owner", "Collaborator", "Vendor", "Guest-view"] as const;
type TeamRole = (typeof TEAM_ROLES)[number];

function isTeamRole(value: string): value is TeamRole {
  return TEAM_ROLES.includes(value as TeamRole);
}

const INITIAL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Priya Sharma",
    email: "priya.sharma@festora.ai",
    role: "Owner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
  },
  {
    id: "tm-2",
    name: "Rohan Verma",
    email: "rohan.verma@gmail.com",
    role: "Collaborator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
  },
  {
    id: "tm-3",
    name: "Chef Laurent",
    email: "chef@khybergastronomy.in",
    role: "Vendor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("details");
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Collaborator");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Event Details
  const [eventTitle, setEventTitle] = useState("Ananya & Rohan's Royal Wedding Celebration");
  const [eventCity, setEventCity] = useState("Jaipur, Rajasthan");
  const [guestCount, setGuestCount] = useState("150");
  const [budgetVal, setBudgetVal] = useState("4500000");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop",
    };
    setTeam([...team, newMember]);
    setIsInviteModalOpen(false);
    setInviteEmail("");
    showToast(`Invitation dispatched to ${inviteEmail}!`);
  };

  return (
    <WorkspaceShell activeTab="settings">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy)]">
              Administration
            </span>
            <span className="text-xs text-[var(--ink)]/50">•</span>
            <span className="text-xs font-semibold text-[var(--navy)]">Workspace & Security</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--navy)]">
            Collaboration & Event Settings
          </h1>
          <p className="text-sm text-[var(--ink)]/70 mt-1">
            Configure event fundamentals, invite family & vendor collaborators, and manage AI credit
            usage.
          </p>
        </div>

        <Button
          variant="orange"
          size="sm"
          onClick={() => showToast("Event configuration updated successfully!")}
          className="font-bold text-[var(--ink)] shadow-md"
        >
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-[var(--navy)]/10 pb-3">
        {[
          { id: "details", label: "Event Details", icon: SettingsIcon },
          { id: "team", label: "Team & Roles", icon: Users },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "billing", label: "Plan & AI Credits", icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? "bg-[var(--navy)] text-white shadow-md"
                  : "bg-white text-[var(--navy)] border border-[var(--navy)]/15 hover:bg-[var(--navy)]/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: EVENT DETAILS */}
      {activeTab === "details" && (
        <div className="max-w-3xl space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[var(--navy)]/10 shadow-sm space-y-5">
            <h3 className="text-base font-extrabold text-[var(--navy)]">Event Fundamentals</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                  Event Celebration Title
                </label>
                <Input
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                    Target Date
                  </label>
                  <Input
                    type="date"
                    defaultValue="2026-11-18"
                    className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                    Destination City
                  </label>
                  <Input
                    value={eventCity}
                    onChange={(e) => setEventCity(e.target.value)}
                    className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                    Guest Count
                  </label>
                  <Input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                    Total Budget (INR ₹)
                  </label>
                  <Input
                    type="number"
                    value={budgetVal}
                    onChange={(e) => setBudgetVal(e.target.value)}
                    className="text-xs bg-[var(--bg)] border-[var(--navy)]/15"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 bg-white rounded-3xl border border-[var(--orange)]/30 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-[var(--orange)] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[var(--orange)]" />
              Event Archival & Deletion
            </h4>
            <p className="text-xs text-[var(--ink)]/70">
              Archiving this celebration will make the shared links read-only. Permanent deletion
              purges all guest data and budgets.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-[var(--orange)] border border-[var(--orange)]/30 hover:bg-[var(--orange)]/10"
            >
              Archive Event
            </Button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: TEAM & ROLES */}
      {activeTab === "team" && (
        <div className="max-w-3xl space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[var(--navy)]/10 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-extrabold text-[var(--navy)]">Collaborator Roster</h3>
                <p className="text-xs text-[var(--ink)]/60">
                  Invite wedding party, family coordinators, or verified vendors.
                </p>
              </div>
              <Button
                variant="orange"
                size="sm"
                onClick={() => setIsInviteModalOpen(true)}
                className="font-bold text-[var(--ink)]"
              >
                <UserPlus className="w-4 h-4 mr-1.5" /> Invite Member
              </Button>
            </div>

            <div className="divide-y divide-[var(--navy)]/5">
              {team.map((member) => (
                <div key={member.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--navy)]/10"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[var(--navy)]">{member.name}</h4>
                      <p className="text-[11px] text-[var(--ink)]/50">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      value={member.role}
                      onChange={(e) => {
                        const nextRole = e.target.value;
                        if (isTeamRole(nextRole)) {
                          setTeam(
                            team.map((t) => (t.id === member.id ? { ...t, role: nextRole } : t)),
                          );
                        }
                        showToast(`Updated role for ${member.name}`);
                      }}
                      className="text-xs font-bold bg-[var(--bg)] border-[var(--navy)]/15 h-8"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Collaborator">Collaborator</option>
                      <option value="Vendor">Vendor</option>
                      <option value="Guest-view">Guest-view</option>
                    </Select>

                    {member.role !== "Owner" && (
                      <button
                        onClick={() => {
                          setTeam(team.filter((t) => t.id !== member.id));
                          showToast(`Removed ${member.name} from event team`);
                        }}
                        className="text-[var(--ink)]/40 hover:text-[var(--orange)] p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="max-w-2xl bg-white rounded-3xl p-6 border border-[var(--navy)]/10 shadow-sm space-y-6">
          <h3 className="text-base font-extrabold text-[var(--navy)]">Communication Preferences</h3>

          <div className="space-y-4">
            <div className="p-4 bg-[var(--bg)] rounded-2xl border border-[var(--navy)]/10 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[var(--navy)]">
                  WhatsApp Real-Time RSVP Alerts
                </h4>
                <p className="text-[11px] text-[var(--ink)]/60">
                  Receive instant WhatsApp ping when a VIP guest responds.
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[var(--navy)] cursor-pointer"
              />
            </div>

            <div className="p-4 bg-[var(--bg)] rounded-2xl border border-[var(--navy)]/10 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[var(--navy)]">Weekly AI Health Digest</h4>
                <p className="text-[11px] text-[var(--ink)]/60">
                  Automated summary of critical upcoming tasks and budget safety.
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[var(--navy)] cursor-pointer"
              />
            </div>

            <div className="p-4 bg-[var(--bg)] rounded-2xl border border-[var(--navy)]/10 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[var(--navy)]">Vendor Quote Notifications</h4>
                <p className="text-[11px] text-[var(--ink)]/60">
                  Email alert whenever a shortlisted vendor submits a custom proposal.
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[var(--navy)] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: BILLING & AI CREDITS */}
      {activeTab === "billing" && (
        <div className="max-w-2xl space-y-6">
          <GlassSurface
            elevation="card"
            className="p-6 rounded-3xl border border-[var(--navy)]/10 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--gold)]">
                  Active Subscription
                </span>
                <h3 className="text-xl font-extrabold text-[var(--navy)]">Festora Pro Plan</h3>
                <p className="text-xs text-[var(--ink)]/60 mt-0.5">$49 / month (Billed Annually)</p>
              </div>
              <Badge variant="navy">Active</Badge>
            </div>

            <div className="pt-3 border-t border-[var(--navy)]/10 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[var(--navy)]">AI Generation Credits</span>
                <span className="text-[var(--orange)]">4,280 / 5,000 used (85%)</span>
              </div>
              <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--navy)]/10">
                <div className="h-full bg-[var(--navy)] rounded-full w-[85%]" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-bold text-[var(--navy)] border border-[var(--navy)]/15"
              >
                Manage Payment Method
              </Button>
            </div>
          </GlassSurface>
        </div>
      )}

      {/* INVITE COLLABORATOR MODAL */}
      <Dialog
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Collaborator"
        className="max-w-md"
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[var(--navy)] block mb-1">Email Address</label>
            <Input
              type="email"
              required
              placeholder="e.g. rohan.verma@gmail.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="text-xs bg-[var(--bg)]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--navy)] block mb-1">Access Role</label>
            <Select
              value={inviteRole}
              onChange={(e) => {
                if (isTeamRole(e.target.value) && e.target.value !== "Owner") {
                  setInviteRole(e.target.value);
                }
              }}
              className="text-xs font-bold bg-[var(--bg)]"
            >
              <option value="Collaborator">Collaborator (Can edit tasks, budget, seating)</option>
              <option value="Vendor">Vendor (Can view timeline & run sheet only)</option>
              <option value="Guest-view">Guest-view (Read-only)</option>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[var(--navy)]/10">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="orange"
              size="sm"
              type="submit"
              className="font-bold text-[var(--ink)]"
            >
              Send Invite
            </Button>
          </div>
        </form>
      </Dialog>

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[var(--navy)] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-bottom-4 text-xs font-bold"
        >
          <Check className="w-4 h-4 text-[var(--gold)]" />
          {toastMessage}
        </div>
      )}
    </WorkspaceShell>
  );
}
