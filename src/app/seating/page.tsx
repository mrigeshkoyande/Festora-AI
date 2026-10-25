"use client";

import React, { useState } from "react";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dialog } from "@/components/ui/Dialog";
import {
  Users,
  Plus,
  Sparkles,
  Download,
  AlertCircle,
  Check,
  Search,
  Move,
  Maximize2,
  Trash2,
  Utensils
} from "lucide-react";

interface Table {
  id: string;
  name: string;
  shape: "round" | "rectangular";
  capacity: number;
  x: number;
  y: number;
  guests: { id: string; name: string; group: string; meal: string }[];
}

const INITIAL_TABLES: Table[] = [
  {
    id: "t-1",
    name: "Royal Pavilion Table 1 (VIP)",
    shape: "round",
    capacity: 8,
    x: 80,
    y: 60,
    guests: [
      { id: "g-1", name: "Vikramaditya Singhania", group: "VIP Dignitaries", meal: "Rajasthani Thali" },
      { id: "g-1-2", name: "Sunita Singhania", group: "VIP Dignitaries", meal: "Rajasthani Thali" },
      { id: "g-2", name: "Rajesh Mehta", group: "Immediate Family", meal: "Jain Pure Veg" },
      { id: "g-2-2", name: "Meena Mehta", group: "Immediate Family", meal: "Jain Pure Veg" },
      { id: "g-6", name: "Col. Sanjeev Rathore", group: "VIP Dignitaries", meal: "Rajasthani Thali" },
      { id: "g-6-2", name: "Dr. Aarti Rathore", group: "VIP Dignitaries", meal: "Rajasthani Thali" }
    ]
  },
  {
    id: "t-2",
    name: "Courtyard Terrace Table 2",
    shape: "rectangular",
    capacity: 10,
    x: 420,
    y: 60,
    guests: [
      { id: "g-3", name: "Kabir Malhotra", group: "College Friends", meal: "Continental" },
      { id: "g-3-2", name: "Rhea Sen", group: "College Friends", meal: "Continental" },
      { id: "g-4", name: "Zoya Akhtar", group: "College Friends", meal: "Vegan" },
      { id: "g-7", name: "Tara Deshmukh", group: "Bride's Side", meal: "Vegan" }
    ]
  },
  {
    id: "t-3",
    name: "Lotus Fountain Table 3",
    shape: "round",
    capacity: 8,
    x: 80,
    y: 320,
    guests: []
  },
  {
    id: "t-4",
    name: "Durbar Lawn Table 4",
    shape: "rectangular",
    capacity: 10,
    x: 420,
    y: 320,
    guests: []
  }
];

const UNASSIGNED_GUESTS = [
  { id: "u-1", name: "Aman Singhal", group: "College Friends", meal: "Vegetarian" },
  { id: "u-2", name: "Neha Singhal", group: "College Friends", meal: "Vegetarian" },
  { id: "u-3", name: "Devendra Verma", group: "Immediate Family", meal: "Jain Pure Veg" },
  { id: "u-4", name: "Sarita Verma", group: "Immediate Family", meal: "Jain Pure Veg" }
];

export default function SeatingPage() {
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [unassigned, setUnassigned] = useState(UNASSIGNED_GUESTS);
  const [selectedTable, setSelectedTable] = useState<Table | null>(tables[0]);
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAiAutoArrange = () => {
    setIsAiOptimizing(true);
    setTimeout(() => {
      // Auto-distribute unassigned guests to tables based on family vs friends
      const updatedTables = [...tables];
      // Assign Aman and Neha to Table 2 (friends)
      updatedTables[1].guests.push(
        { id: "u-1", name: "Aman Singhal", group: "College Friends", meal: "Vegetarian" },
        { id: "u-2", name: "Neha Singhal", group: "College Friends", meal: "Vegetarian" }
      );
      // Assign Devendra and Sarita to Table 3 (family)
      updatedTables[2].guests.push(
        { id: "u-3", name: "Devendra Verma", group: "Immediate Family", meal: "Jain Pure Veg" },
        { id: "u-4", name: "Sarita Verma", group: "Immediate Family", meal: "Jain Pure Veg" }
      );

      setTables(updatedTables);
      setUnassigned([]);
      setIsAiOptimizing(false);
      showToast("AI Auto-Arranger grouped guests by side and dietary requirements!");
    }, 1200);
  };

  const addTable = (shape: "round" | "rectangular") => {
    const newNum = tables.length + 1;
    const newTable: Table = {
      id: `t-${Date.now()}`,
      name: `Table ${newNum} (${shape === "round" ? "Round" : "Banquet"})`,
      shape,
      capacity: shape === "round" ? 8 : 10,
      x: 250,
      y: 200,
      guests: []
    };
    setTables([...tables, newTable]);
    setSelectedTable(newTable);
    showToast(`Added ${newTable.name}`);
  };

  return (
    <WorkspaceShell activeTab="seating">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy)]">Floor Logistics</span>
            <span className="text-xs text-[var(--ink)]/50">•</span>
            <span className="text-xs font-semibold text-[var(--gold)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Harmony Engine
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--navy)]">
            Seating Planner & Floor Layout
          </h1>
          <p className="text-sm text-[var(--ink)]/70 mt-1">
            Design reception floor plans, assign guests to VIP and banquet tables, and resolve social seating constraints.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addTable("round")}
            className="border border-[var(--navy)]/15 font-bold text-[var(--navy)]"
          >
            <Plus className="w-4 h-4 mr-1.5" /> + Round Table
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => addTable("rectangular")}
            className="border border-[var(--navy)]/15 font-bold text-[var(--navy)]"
          >
            <Plus className="w-4 h-4 mr-1.5" /> + Banquet Table
          </Button>

          <Button
            variant="orange"
            size="sm"
            onClick={handleAiAutoArrange}
            disabled={isAiOptimizing || unassigned.length === 0}
            className="font-bold text-[var(--ink)] shadow-md"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            {isAiOptimizing ? "Arranging..." : "AI Auto-Arrange"}
          </Button>
        </div>
      </div>

      {/* Main Split: 2D Interactive Canvas (8 cols) + Table & Unassigned Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 2D Interactive Canvas */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[var(--navy)]/10 shadow-sm p-6 overflow-hidden min-h-[620px] relative flex flex-col justify-between">
          {/* Canvas Header / Stage Marker */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--navy)]/10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[var(--navy)] text-white text-[11px] font-bold rounded-full">
                Samode Palace Courtyard
              </span>
              <span className="text-xs text-[var(--ink)]/50">150 Target Capacity</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-[var(--navy)] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--navy)]" /> Occupied
              </span>
              <span className="flex items-center gap-1.5 text-[var(--ink)]/60 font-bold ml-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--bg)] border border-[var(--navy)]/30" /> Available
              </span>
            </div>
          </div>

          {/* Handcrafted Stage Indicator */}
          <div className="w-64 h-8 mx-auto my-2 bg-[var(--navy)]/8 rounded-full border border-dashed border-[var(--navy)]/30 flex items-center justify-center text-[11px] font-bold text-[var(--navy)] uppercase tracking-wider">
            Mandap & Bridal Stage (Fountain View)
          </div>

          {/* Interactive Table Grid / Canvas */}
          <div className="grid grid-cols-2 gap-8 py-8 flex-1 items-center justify-items-center">
            {tables.map((table) => {
              const isSelected = selectedTable?.id === table.id;
              const isFull = table.guests.length >= table.capacity;

              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(table)}
                  className={`relative p-5 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                    table.shape === "round"
                      ? "w-52 h-52 rounded-full"
                      : "w-64 h-40 rounded-2xl"
                  } ${
                    isSelected
                      ? "border-2 border-[var(--orange)] shadow-xl bg-[var(--bg)]"
                      : "border border-[var(--navy)]/20 shadow-sm bg-white hover:border-[var(--navy)]/40"
                  }`}
                >
                  {/* Table Label */}
                  <div className="text-center">
                    <h4 className="text-xs font-bold text-[var(--navy)] line-clamp-1">{table.name}</h4>
                    <div className="text-[11px] font-bold text-[var(--orange)] mt-0.5">
                      {table.guests.length} / {table.capacity} Seated
                    </div>
                  </div>

                  {/* Seat Nodes Display */}
                  <div className="flex flex-wrap gap-1 mt-2 justify-center max-w-[140px]">
                    {Array.from({ length: table.capacity }).map((_, seatIdx) => {
                      const isOccupied = seatIdx < table.guests.length;
                      return (
                        <span
                          key={seatIdx}
                          className={`w-3 h-3 rounded-full transition-all ${
                            isOccupied
                              ? "bg-[var(--navy)]"
                              : "bg-[var(--bg)] border border-[var(--navy)]/30"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {isFull && (
                    <span className="absolute -top-2 bg-[var(--navy)] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                      Full
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Canvas Footer */}
          <div className="pt-4 border-t border-[var(--navy)]/10 flex justify-between items-center text-xs text-[var(--ink)]/60">
            <span>Click any table to view seated guests and dietary requirements.</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => showToast("Exporting Seating Chart to high-res PDF...")}
              className="text-xs font-bold text-[var(--navy)]"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Export Seating PDF
            </Button>
          </div>
        </div>

        {/* Right: Table Inspector & Unassigned Guests (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Selected Table Details */}
          {selectedTable ? (
            <GlassSurface elevation="card" className="p-5 rounded-2xl border border-[var(--navy)]/10 space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-[var(--navy)]/10">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--gold)]">Selected Table</span>
                  <h3 className="text-base font-extrabold text-[var(--navy)] leading-tight">{selectedTable.name}</h3>
                  <p className="text-xs text-[var(--ink)]/60 mt-0.5">
                    {selectedTable.shape === "round" ? "8-Seater Round" : "10-Seater Banquet"} • {selectedTable.guests.length} Seated
                  </p>
                </div>
                <Badge variant={selectedTable.guests.length >= selectedTable.capacity ? "navy" : "gold"}>
                  {selectedTable.capacity - selectedTable.guests.length} seats free
                </Badge>
              </div>

              {/* Guest Roster for this table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--navy)] uppercase tracking-wider block">
                  Seated Guests ({selectedTable.guests.length})
                </span>

                {selectedTable.guests.map((g) => (
                  <div
                    key={g.id}
                    className="p-2.5 bg-white rounded-xl border border-[var(--navy)]/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-[var(--navy)]">{g.name}</div>
                      <div className="text-[10px] text-[var(--ink)]/50 flex items-center gap-1.5 mt-0.5">
                        <span>{g.group}</span>
                        <span>•</span>
                        <span className="text-[var(--orange)] font-semibold">{g.meal}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        // Unassign guest back to unassigned list
                        setTables(
                          tables.map((t) =>
                            t.id === selectedTable.id
                              ? { ...t, guests: t.guests.filter((item) => item.id !== g.id) }
                              : t
                          )
                        );
                        setSelectedTable({
                          ...selectedTable,
                          guests: selectedTable.guests.filter((item) => item.id !== g.id)
                        });
                        setUnassigned([...unassigned, { id: g.id, name: g.name, group: g.group, meal: g.meal }]);
                      }}
                      className="text-[var(--ink)]/40 hover:text-[var(--orange)] p-1 text-[11px] font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {selectedTable.guests.length === 0 && (
                  <div className="p-6 text-center text-xs text-[var(--ink)]/40 border border-dashed border-[var(--navy)]/15 rounded-xl">
                    No guests assigned to this table yet.
                  </div>
                )}
              </div>
            </GlassSurface>
          ) : null}

          {/* Unassigned Guests Card */}
          <div className="bg-white rounded-2xl p-5 border border-[var(--navy)]/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--navy)] uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[var(--orange)]" />
                Unassigned Guests ({unassigned.length})
              </span>
            </div>

            <div className="space-y-2">
              {unassigned.map((u) => (
                <div
                  key={u.id}
                  className="p-2.5 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[var(--navy)]">{u.name}</div>
                    <div className="text-[10px] text-[var(--ink)]/50 mt-0.5">{u.group} • {u.meal}</div>
                  </div>

                  {selectedTable && selectedTable.guests.length < selectedTable.capacity && (
                    <Button
                      variant="orange"
                      size="sm"
                      onClick={() => {
                        const updatedGuests = [...selectedTable.guests, u];
                        setTables(
                          tables.map((t) => (t.id === selectedTable.id ? { ...t, guests: updatedGuests } : t))
                        );
                        setSelectedTable({ ...selectedTable, guests: updatedGuests });
                        setUnassigned(unassigned.filter((item) => item.id !== u.id));
                      }}
                      className="h-7 px-2.5 text-[10px] font-bold text-[var(--ink)]"
                    >
                      + Assign
                    </Button>
                  )}
                </div>
              ))}

              {unassigned.length === 0 && (
                <div className="p-4 text-center text-xs text-[var(--navy)] font-semibold bg-[var(--navy)]/5 rounded-xl">
                  ✓ All confirmed guests have been seated!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--navy)] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-bottom-4 text-xs font-bold">
          <Check className="w-4 h-4 text-[var(--gold)]" />
          {toastMessage}
        </div>
      )}
    </WorkspaceShell>
  );
}
