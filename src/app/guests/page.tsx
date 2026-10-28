"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dialog, Drawer } from "@/components/ui/Dialog";
import {
  Users,
  UserPlus,
  Send,
  Upload,
  Download,
  Filter,
  Search,
  Check,
  X,
  Clock,
  Smartphone,
  Mail,
  MessageSquare,
  QrCode,
  Sparkles,
  Utensils,
  Share2,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface Guest {
  id: string;
  name: string;
  group:
    "Immediate Family" | "College Friends" | "VIP Dignitaries" | "Bride's Side" | "Groom's Side";
  email: string;
  phone: string;
  rsvpStatus: "Confirmed" | "Pending" | "Declined";
  mealPreference: "Rajasthani Thali" | "Jain Pure Veg" | "Continental" | "Vegan";
  plusOne: string | null;
  table: string;
}

const INITIAL_GUESTS: Guest[] = [
  {
    id: "g-1",
    name: "Vikramaditya Singhania",
    group: "VIP Dignitaries",
    email: "v.singhania@rajasthan.gov.in",
    phone: "+91 98290 11223",
    rsvpStatus: "Confirmed",
    mealPreference: "Rajasthani Thali",
    plusOne: "Sunita Singhania",
    table: "Royal Pavilion Table 1",
  },
  {
    id: "g-2",
    name: "Rajesh & Meena Mehta",
    group: "Immediate Family",
    email: "rajesh.mehta@gmail.com",
    phone: "+91 98200 44556",
    rsvpStatus: "Confirmed",
    mealPreference: "Jain Pure Veg",
    plusOne: "Meena Mehta",
    table: "Royal Pavilion Table 1",
  },
  {
    id: "g-3",
    name: "Kabir Malhotra",
    group: "College Friends",
    email: "kabir.m@techcorp.in",
    phone: "+91 98111 22334",
    rsvpStatus: "Pending",
    mealPreference: "Continental",
    plusOne: "Rhea Sen",
    table: "Courtyard Terrace Table 2",
  },
  {
    id: "g-4",
    name: "Zoya Akhtar",
    group: "College Friends",
    email: "zoya@designstudio.in",
    phone: "+91 98333 77889",
    rsvpStatus: "Confirmed",
    mealPreference: "Vegan",
    plusOne: null,
    table: "Courtyard Terrace Table 2",
  },
  {
    id: "g-5",
    name: "Ashok Verma",
    group: "Immediate Family",
    email: "ashok.verma@vermagroup.com",
    phone: "+91 98450 99887",
    rsvpStatus: "Declined",
    mealPreference: "Rajasthani Thali",
    plusOne: null,
    table: "Unassigned",
  },
  {
    id: "g-6",
    name: "Col. Sanjeev Rathore",
    group: "VIP Dignitaries",
    email: "sanjeev.rathore@defence.in",
    phone: "+91 98100 88776",
    rsvpStatus: "Confirmed",
    mealPreference: "Rajasthani Thali",
    plusOne: "Dr. Aarti Rathore",
    table: "Royal Pavilion Table 1",
  },
  {
    id: "g-7",
    name: "Tara Deshmukh",
    group: "Bride's Side",
    email: "tara.desh@mumbaifilms.com",
    phone: "+91 98211 44332",
    rsvpStatus: "Pending",
    mealPreference: "Vegan",
    plusOne: null,
    table: "Courtyard Terrace Table 2",
  },
];

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [selectedRsvp, setSelectedRsvp] = useState<string>("All");
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [isSendInvitesDrawerOpen, setIsSendInvitesDrawerOpen] = useState(false);
  const [selectedGuestForRsvp, setSelectedGuestForRsvp] = useState<Guest>(INITIAL_GUESTS[2]);
  const [channelType, setChannelType] = useState<"whatsapp" | "email">("whatsapp");
  const [inviteSentToast, setInviteSentToast] = useState(false);

  // New Guest Form State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newGroup, setNewGroup] = useState<Guest["group"]>("Immediate Family");
  const [newMeal, setNewMeal] = useState<Guest["mealPreference"]>("Rajasthani Thali");
  const [newPlusOne, setNewPlusOne] = useState("");

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newGuestItem: Guest = {
      id: `g-${Date.now()}`,
      name: newName,
      group: newGroup,
      email: newEmail || "guest@festora.ai",
      phone: newPhone || "+91 98000 00000",
      rsvpStatus: "Pending",
      mealPreference: newMeal,
      plusOne: newPlusOne || null,
      table: "Unassigned",
    };
    setGuests([...guests, newGuestItem]);
    setIsAddGuestModalOpen(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewPlusOne("");
  };

  const handleSendInvites = () => {
    setIsSendInvitesDrawerOpen(false);
    setInviteSentToast(true);
    setTimeout(() => setInviteSentToast(false), 4000);
  };

  // Filter guests
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phone.includes(searchQuery);
    const matchesGroup = selectedGroup === "All" || g.group === selectedGroup;
    const matchesRsvp = selectedRsvp === "All" || g.rsvpStatus === selectedRsvp;
    return matchesSearch && matchesGroup && matchesRsvp;
  });

  const confirmedCount = guests.filter((g) => g.rsvpStatus === "Confirmed").length;
  const pendingCount = guests.filter((g) => g.rsvpStatus === "Pending").length;
  const declinedCount = guests.filter((g) => g.rsvpStatus === "Declined").length;
  const totalInvited = guests.length;

  return (
    <WorkspaceShell activeTab="guests">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy)]">
              Guest Operations
            </span>
            <span className="text-xs text-[var(--ink)]/50">•</span>
            <span className="text-xs font-semibold text-[var(--orange)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Dietary & RSVP Sync
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--navy)]">
            Guests & RSVP Intelligence
          </h1>
          <p className="text-sm text-[var(--ink)]/70 mt-1 max-w-xl">
            Real-time RSVP synchronization, digital WhatsApp dispatch, dietary constraint tracking,
            and automated follow-ups.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSendInvitesDrawerOpen(true)}
            className="border border-[var(--navy)]/15 font-bold text-[var(--navy)]"
          >
            <Send className="w-4 h-4 mr-1.5" />
            Send Invites
          </Button>

          <Button
            variant="orange"
            size="sm"
            onClick={() => setIsAddGuestModalOpen(true)}
            className="font-bold text-[var(--ink)] shadow-md"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            Add Guest
          </Button>
        </div>
      </div>

      {/* RSVP Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassSurface elevation="card" className="p-4 rounded-2xl border border-[var(--navy)]/10">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/60">
            Total Invited
          </span>
          <div className="text-3xl font-extrabold text-[var(--navy)] mt-1">{totalInvited}</div>
          <div className="text-[11px] text-[var(--ink)]/50 mt-1">150 Target Capacity</div>
        </GlassSurface>

        <GlassSurface elevation="card" className="p-4 rounded-2xl border border-[var(--navy)]/10">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--navy)] flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Confirmed
          </span>
          <div className="text-3xl font-extrabold text-[var(--navy)] mt-1">{confirmedCount}</div>
          <div className="text-[11px] text-[var(--ink)]/60 mt-1">
            {Math.round((confirmedCount / totalInvited) * 100)}% of total
          </div>
        </GlassSurface>

        <GlassSurface elevation="card" className="p-4 rounded-2xl border border-[var(--navy)]/10">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Awaiting Reply
          </span>
          <div className="text-3xl font-extrabold text-[var(--navy)] mt-1">{pendingCount}</div>
          <div className="text-[11px] text-[var(--ink)]/60 mt-1">
            {Math.round((pendingCount / totalInvited) * 100)}% pending
          </div>
        </GlassSurface>

        <GlassSurface elevation="card" className="p-4 rounded-2xl border border-[var(--navy)]/10">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--orange)] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Declined
          </span>
          <div className="text-3xl font-extrabold text-[var(--navy)] mt-1">{declinedCount}</div>
          <div className="text-[11px] text-[var(--ink)]/60 mt-1">Freeing up seats</div>
        </GlassSurface>
      </div>

      {/* Main Content Layout: Table on Left (8-col) + Live RSVP Mobile Frame on Right (4-col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Guest Table (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filter Bar */}
          <GlassSurface elevation="card" className="p-4 rounded-2xl border border-[var(--navy)]/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink)]/40" />
                <Input
                  placeholder="Search guest by name or contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-white border-[var(--navy)]/15 rounded-xl text-xs"
                />
              </div>

              <div>
                <Select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="h-10 bg-white border-[var(--navy)]/15 rounded-xl text-xs font-semibold"
                >
                  <option value="All">All Guest Groups</option>
                  <option value="Immediate Family">Immediate Family</option>
                  <option value="College Friends">College Friends</option>
                  <option value="VIP Dignitaries">VIP Dignitaries</option>
                  <option value="Bride's Side">Bride&apos;s Side</option>
                  <option value="Groom's Side">Groom&apos;s Side</option>
                </Select>
              </div>

              <div>
                <Select
                  value={selectedRsvp}
                  onChange={(e) => setSelectedRsvp(e.target.value)}
                  className="h-10 bg-white border-[var(--navy)]/15 rounded-xl text-xs font-semibold"
                >
                  <option value="All">All RSVP Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Declined">Declined</option>
                </Select>
              </div>
            </div>
          </GlassSurface>

          {/* Data Table */}
          <div className="bg-white rounded-3xl border border-[var(--navy)]/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg)] border-b border-[var(--navy)]/10 text-[var(--navy)] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Guest Name</th>
                    <th className="py-3.5 px-4">Group Side</th>
                    <th className="py-3.5 px-4">RSVP Status</th>
                    <th className="py-3.5 px-4">Meal Preference</th>
                    <th className="py-3.5 px-4">Seating Table</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--navy)]/5">
                  {filteredGuests.map((guest) => {
                    const isSelected = selectedGuestForRsvp.id === guest.id;
                    return (
                      <tr
                        key={guest.id}
                        onClick={() => setSelectedGuestForRsvp(guest)}
                        className={`hover:bg-[var(--bg)] cursor-pointer transition-colors ${
                          isSelected ? "bg-[var(--navy)]/5" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[var(--navy)]">{guest.name}</div>
                          <div className="text-[11px] text-[var(--ink)]/50">{guest.phone}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--navy)]/8 text-[var(--navy)]">
                            {guest.group}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {guest.rsvpStatus === "Confirmed" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--navy)] text-white">
                              <Check className="w-3 h-3" /> Confirmed
                            </span>
                          )}
                          {guest.rsvpStatus === "Pending" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--gold)] text-[var(--ink)]">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                          {guest.rsvpStatus === "Declined" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--orange)]/20 text-[var(--ink)]">
                              <AlertCircle className="w-3 h-3" /> Declined
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[var(--ink)]">
                            {guest.mealPreference}
                          </span>
                          {guest.plusOne && (
                            <span className="block text-[10px] text-[var(--ink)]/50">
                              +1: {guest.plusOne}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-medium text-[var(--navy)]">
                          {guest.table}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setGuests(guests.filter((g) => g.id !== guest.id));
                            }}
                            className="text-[var(--ink)]/40 hover:text-[var(--orange)] p-1.5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Live RSVP Mobile Preview Frame (4 cols) */}
        <div className="lg:col-span-4 sticky top-6">
          <div className="text-center mb-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy)]">
              Live Preview
            </span>
            <h3 className="text-sm font-bold text-[var(--ink)] mt-0.5">
              Guest-Facing Mobile RSVP Page
            </h3>
          </div>

          {/* iPhone Frame Simulator */}
          <div className="mx-auto w-[310px] bg-black rounded-[44px] p-3 shadow-2xl border-4 border-[var(--navy)]">
            {/* Notch */}
            <div className="w-28 h-4 bg-black mx-auto rounded-b-xl mb-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-neutral-900 mr-2" />
              <div className="w-8 h-1 rounded-full bg-neutral-800" />
            </div>

            {/* Phone Screen Canvas */}
            <div className="bg-[#F8F9FA] rounded-[34px] overflow-hidden p-4 space-y-4 text-left border border-[var(--navy)]/10 text-[var(--ink)]">
              {/* Event Header Card */}
              <div className="relative rounded-2xl overflow-hidden h-28 bg-[var(--navy)] text-white p-3 flex flex-col justify-end">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop"
                  alt="Wedding Palace"
                  fill
                  sizes="300px"
                  className="object-cover opacity-40"
                />
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-bold text-[var(--gold)]">
                    Royal Jaipur Celebration
                  </span>
                  <h4 className="text-sm font-extrabold leading-tight">Ananya & Rohan</h4>
                  <p className="text-[10px] text-white/80">Nov 18, 2026 • Samode Palace</p>
                </div>
              </div>

              {/* Personalized Greeting */}
              <div className="p-3 bg-white rounded-xl border border-[var(--navy)]/10 shadow-sm">
                <span className="text-[10px] text-[var(--ink)]/50 uppercase font-bold">
                  Personalized Invitation
                </span>
                <div className="font-extrabold text-sm text-[var(--navy)] mt-0.5">
                  Namaste, {selectedGuestForRsvp.name}!
                </div>
                <p className="text-[11px] text-[var(--ink)]/70 mt-1 leading-relaxed">
                  We eagerly await your presence to celebrate the sacred union at Samode Palace.
                </p>
              </div>

              {/* RSVP Interactive Selection Mock */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[var(--navy)] block">
                  Will you attend?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedGuestForRsvp.rsvpStatus === "Confirmed"
                        ? "bg-[var(--navy)] text-white border-[var(--navy)] shadow-md"
                        : "bg-white text-[var(--navy)] border-[var(--navy)]/20"
                    }`}
                  >
                    Joyfully Accept
                  </button>
                  <button
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedGuestForRsvp.rsvpStatus === "Declined"
                        ? "bg-[var(--orange)] text-[var(--ink)] border-[var(--orange)] shadow-md"
                        : "bg-white text-[var(--ink)] border-[var(--navy)]/20"
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {/* Meal Preference Selection */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--navy)] block">
                  Dietary Selection
                </label>
                <div className="p-2.5 bg-white rounded-xl border border-[var(--navy)]/10 text-xs font-semibold text-[var(--navy)] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[var(--orange)]" />
                    {selectedGuestForRsvp.mealPreference}
                  </span>
                  <span className="text-[10px] text-[var(--gold)] font-bold">✓ Selected</span>
                </div>
              </div>

              {/* Submit Button on Phone */}
              <Button
                variant="orange"
                size="sm"
                className="w-full text-xs font-bold text-[var(--ink)] shadow-md"
              >
                Confirm RSVP
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ADD GUEST MODAL */}
      <Dialog
        isOpen={isAddGuestModalOpen}
        onClose={() => setIsAddGuestModalOpen(false)}
        title="Add Guest to Master List"
        className="max-w-md"
      >
        <form onSubmit={handleAddGuest} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[var(--navy)] block mb-1">Full Name</label>
            <Input
              required
              placeholder="e.g. Vikramaditya Singhania"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="text-xs bg-[var(--bg)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="guest@festora.ai"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="text-xs bg-[var(--bg)]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                WhatsApp / Phone
              </label>
              <Input
                placeholder="+91 98000 00000"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="text-xs bg-[var(--bg)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[var(--navy)] block mb-1">Guest Group</label>
              <Select
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value as Guest["group"])}
                className="text-xs bg-[var(--bg)] font-semibold"
              >
                <option value="Immediate Family">Immediate Family</option>
                <option value="College Friends">College Friends</option>
                <option value="VIP Dignitaries">VIP Dignitaries</option>
                <option value="Bride's Side">Bride&apos;s Side</option>
                <option value="Groom's Side">Groom&apos;s Side</option>
              </Select>
            </div>
            <div>
              <label className="text-xs font-bold text-[var(--navy)] block mb-1">
                Dietary Constraint
              </label>
              <Select
                value={newMeal}
                onChange={(e) => setNewMeal(e.target.value as Guest["mealPreference"])}
                className="text-xs bg-[var(--bg)] font-semibold"
              >
                <option value="Rajasthani Thali">Rajasthani Thali</option>
                <option value="Jain Pure Veg">Jain Pure Veg</option>
                <option value="Continental">Continental</option>
                <option value="Vegan">Vegan</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--navy)] block mb-1">
              Plus-One Companion (Optional)
            </label>
            <Input
              placeholder="e.g. Spouse / Partner Name"
              value={newPlusOne}
              onChange={(e) => setNewPlusOne(e.target.value)}
              className="text-xs bg-[var(--bg)]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[var(--navy)]/10">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => setIsAddGuestModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="orange"
              size="sm"
              type="submit"
              className="font-bold text-[var(--ink)]"
            >
              Add to Guest List
            </Button>
          </div>
        </form>
      </Dialog>

      {/* SEND INVITATIONS DRAWER */}
      <Drawer
        isOpen={isSendInvitesDrawerOpen}
        onClose={() => setIsSendInvitesDrawerOpen(false)}
        title="Dispatch Digital Invitations"
        className="max-w-xl"
      >
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--navy)] block mb-2">
              Dispatch Channel
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setChannelType("whatsapp")}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  channelType === "whatsapp"
                    ? "border-[var(--navy)] bg-[var(--navy)] text-white shadow-md"
                    : "border-[var(--navy)]/15 bg-white text-[var(--navy)]"
                }`}
              >
                <Smartphone className="w-5 h-5 text-[var(--gold)]" />
                <div>
                  <div className="font-bold text-xs">WhatsApp API</div>
                  <div
                    className={`text-[10px] ${channelType === "whatsapp" ? "text-white/70" : "text-[var(--ink)]/50"}`}
                  >
                    98.4% open rate in 5 mins
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setChannelType("email")}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  channelType === "email"
                    ? "border-[var(--navy)] bg-[var(--navy)] text-white shadow-md"
                    : "border-[var(--navy)]/15 bg-white text-[var(--navy)]"
                }`}
              >
                <Mail className="w-5 h-5 text-[var(--gold)]" />
                <div>
                  <div className="font-bold text-xs">Custom Email</div>
                  <div
                    className={`text-[10px] ${channelType === "email" ? "text-white/70" : "text-[var(--ink)]/50"}`}
                  >
                    Includes calendar .ics attachment
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--navy)] block mb-2">
              Audience Segment
            </label>
            <Select className="h-10 text-xs font-semibold bg-white border-[var(--navy)]/15">
              <option>All Pending Guests ({pendingCount} recipients)</option>
              <option>All Confirmed Guests (Send Logistics Update)</option>
              <option>Immediate Family Only</option>
              <option>VIP Dignitaries Only</option>
            </Select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--navy)] block mb-2">
              Message Template
            </label>
            <div className="p-4 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/15 text-xs text-[var(--ink)] space-y-2 font-mono">
              <p>Namaste {"{{guest_name}}"}:</p>
              <p>
                Ananya & Rohan warmly invite you to their Royal Wedding at Samode Palace, Jaipur on
                Nov 18, 2026.
              </p>
              <p>
                Kindly tap the link below to confirm your RSVP, dietary preferences, and travel
                arrangements:
              </p>
              <p className="text-[var(--orange)] font-bold">
                https://festora.ai/celebration/ananya-rohan?guest_id={"{{guest_id}}"}
              </p>
            </div>
          </div>

          <div className="p-3 bg-[var(--gold)]/15 rounded-xl border border-[var(--gold)]/30 text-xs text-[var(--ink)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--navy)] flex-shrink-0" />
            <span>AI automatically follows up with gentle reminders 3 weeks prior to date.</span>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--navy)]/10">
            <Button variant="ghost" size="sm" onClick={() => setIsSendInvitesDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="orange"
              size="sm"
              onClick={handleSendInvites}
              className="font-bold text-[var(--ink)] shadow-md"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Dispatch {pendingCount} Invitations
            </Button>
          </div>
        </div>
      </Drawer>

      {/* INVITATION SENT TOAST */}
      {inviteSentToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[var(--navy)] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-bottom-4"
        >
          <Check className="w-5 h-5 text-[var(--gold)]" />
          <div>
            <div className="font-bold text-xs">Invitations Dispatched!</div>
            <div className="text-[11px] text-white/70">
              WhatsApp tracking links delivered to {pendingCount} recipients.
            </div>
          </div>
        </div>
      )}
    </WorkspaceShell>
  );
}
