"use client";

import React, { useState } from "react";
import {
  Download,
  Plus,
  Sparkles,
  PieChart as PieIcon,
  IndianRupee,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Upload,
  FileText,
  FileSpreadsheet,
  Check,
  TrendingDown,
  Zap,
  Lock,
} from "lucide-react";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dialog, Drawer } from "@/components/ui/Dialog";
import { fireFestoraConfetti } from "@/components/ui/Confetti";

export default function BudgetPage() {
  const [optimizerDrawerOpen, setOptimizerDrawerOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Expanded rows state
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    venue: true,
    catering: false,
    decor: false,
  });

  const toggleRow = (key: string) => {
    setExpandedRows((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Budget data state
  const [totalBudget, setTotalBudget] = useState(4500000);
  const [spent, setSpent] = useState(2850000);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const applyScenario = (name: string, deltaSpent: number) => {
    setActiveScenario(name);
    setSpent((prev) => Math.max(1000000, prev + deltaSpent));
    setOptimizerDrawerOpen(false);
    fireFestoraConfetti();
  };

  const categories = [
    {
      id: "venue",
      name: "Venue & Palace Rentals",
      allocated: 1600000,
      spent: 1450000,
      percent: 35.5,
      status: "On Track",
      items: [
        { name: "Palace Courtyard & Lawn Rental Deposit", estimated: 1200000, actual: 1200000, status: "Paid" },
        { name: "Guest Suites Block (30 Rooms)", estimated: 400000, actual: 250000, status: "Committed" },
      ],
    },
    {
      id: "catering",
      name: "Royal Catering & Bar Service",
      allocated: 1200000,
      spent: 800000,
      percent: 26.6,
      status: "On Track",
      items: [
        { name: "Sangeet & Reception Banquets (45 items)", estimated: 950000, actual: 800000, status: "Paid" },
        { name: "Dedicated Jain & Marwari Counters", estimated: 250000, actual: 0, status: "Pending" },
      ],
    },
    {
      id: "decor",
      name: "Mandap & Floral Artistry",
      allocated: 800000,
      spent: 400000,
      percent: 17.8,
      status: "Review",
      items: [
        { name: "Lotus Mandap Rigging & Drapery", estimated: 500000, actual: 400000, status: "Paid" },
        { name: "Fairy Lights & Entrance Walkway", estimated: 300000, actual: 0, status: "Pending" },
      ],
    },
    {
      id: "photo",
      name: "Photography & Cinematography",
      allocated: 500000,
      spent: 200000,
      percent: 11.1,
      status: "On Track",
      items: [
        { name: "3-Day Wedding Docufilm & Aerial Drone", estimated: 500000, actual: 200000, status: "Committed" },
      ],
    },
  ];

  const formatINR = (val: number) => {
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  return (
    <WorkspaceShell>
      <div className="space-y-8">
        {/* Header & Main Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="gold">Financial Overview</Badge>
              <span className="text-xs text-ink/60 font-medium">
                • 47 days to go
              </span>
            </div>
            <h1 className="font-grotesk text-3xl sm:text-4xl font-extrabold text-navy">
              Budget & Expense Intelligence
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="secondary"
              onClick={() => setExportModalOpen(true)}
              icon={<Download className="w-4 h-4 text-navy" />}
            >
              Export Report
            </Button>
            <Button
              variant="secondary"
              onClick={() => setExpenseModalOpen(true)}
              icon={<Plus className="w-4 h-4 text-navy" />}
            >
              Add Expense
            </Button>
            <Button
              variant="orange"
              onClick={() => setOptimizerDrawerOpen(true)}
              icon={<Sparkles className="w-4 h-4 fill-current" />}
            >
              AI Optimize
            </Button>
          </div>
        </div>

        {/* Active Scenario Alert */}
        {activeScenario && (
          <div className="p-4 rounded-2xl bg-orange/15 border border-orange/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-orange shrink-0" />
              <div>
                <span className="text-xs font-bold text-navy">
                  Active AI Optimization Applied: {activeScenario}
                </span>
                <p className="text-xs text-ink/75">
                  Pro-rated allocations and vendor buffers recalculated across all categories.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveScenario(null);
                setSpent(2850000);
              }}
              className="text-xs font-bold text-navy hover:underline cursor-pointer"
            >
              Reset to Base
            </button>
          </div>
        )}

        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-card-lg border border-navy/12 shadow-sm">
            <span className="text-xs font-semibold text-ink/60 block mb-1">Total Target Budget</span>
            <div className="font-grotesk text-3xl font-extrabold text-navy mb-1">
              {formatINR(totalBudget)}
            </div>
            <span className="text-xs font-bold text-gold">Base Allocation</span>
          </div>

          <div className="bg-white p-6 rounded-card-lg border border-navy/12 shadow-sm">
            <span className="text-xs font-semibold text-ink/60 block mb-1">Committed / Allocated</span>
            <div className="font-grotesk text-3xl font-extrabold text-navy mb-1">
              ₹ 41,00,000
            </div>
            <span className="text-xs font-bold text-navy">91.1% of total cap</span>
          </div>

          <div className="bg-white p-6 rounded-card-lg border border-navy/12 shadow-sm">
            <span className="text-xs font-semibold text-ink/60 block mb-1">Actual Paid & Spent</span>
            <div className="font-grotesk text-3xl font-extrabold text-orange mb-1">
              {formatINR(spent)}
            </div>
            <span className="text-xs font-bold text-ink/60">₹ 12.5L in milestones</span>
          </div>

          <div className="bg-white p-6 rounded-card-lg border border-navy/12 shadow-sm">
            <span className="text-xs font-semibold text-ink/60 block mb-1">Remaining Safe Buffer</span>
            <div className="font-grotesk text-3xl font-extrabold text-navy mb-1">
              {formatINR(totalBudget - spent)}
            </div>
            <Badge variant="success">Healthy Buffer</Badge>
          </div>
        </div>

        {/* Visual Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Donut Chart Mock Card (Col 5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-card-lg border border-navy/12 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-grotesk text-lg font-bold text-navy">
                  Allocation by Category
                </h3>
                <p className="text-xs text-ink/60">Distribution across major sectors</p>
              </div>
              <PieIcon className="w-5 h-5 text-navy/50" />
            </div>

            {/* Custom Multi-Ring Donut Visual using Mandatory Colors */}
            <div className="flex items-center justify-center py-6">
              <div
                className="w-48 h-48 rounded-full border-[18px] border-bg relative flex items-center justify-center shadow-inner"
                style={{
                  borderTopColor: "#2C3E50", // Navy 35.5%
                  borderRightColor: "#E67E22", // Orange 26.6%
                  borderBottomColor: "#F1C40F", // Gold 17.8%
                  borderLeftColor: "rgba(44,62,80,0.3)", // Navy tint
                }}
              >
                <div className="text-center">
                  <span className="text-[10px] uppercase font-bold text-ink/50 tracking-wider block">
                    Total Cap
                  </span>
                  <span className="font-grotesk text-2xl font-extrabold text-navy">
                    ₹45.0L
                  </span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-navy/8 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-navy shrink-0" />
                <span>Venue & Palace (35.5%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange shrink-0" />
                <span>Catering & Bar (26.6%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gold shrink-0" />
                <span>Floral Mandap (17.8%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-navy/40 shrink-0" />
                <span>Photo & Sound (20.1%)</span>
              </div>
            </div>
          </div>

          {/* Monthly Cash Flow / Forecast Card (Col 7) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-card-lg border border-navy/12 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-grotesk text-lg font-bold text-navy">
                  Cash Flow & Milestone Forecast
                </h3>
                <p className="text-xs text-ink/60">Actual paid vs scheduled milestones over time</p>
              </div>
              <Badge variant="default">Timeline Sync</Badge>
            </div>

            {/* Cash Flow Bars */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2">
              {[
                { month: "Sep", paidH: "40%", commH: "20%", amount: "₹8L" },
                { month: "Oct", paidH: "55%", commH: "25%", amount: "₹12L" },
                { month: "Nov", paidH: "70%", commH: "15%", amount: "₹16L" },
                { month: "Dec", paidH: "85%", commH: "10%", amount: "₹24L" },
                { month: "Jan", paidH: "60%", commH: "30%", amount: "₹18L" },
                { month: "Feb (Gala)", paidH: "95%", commH: "5%", amount: "₹45L", highlight: true },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full max-w-[42px] bg-bg rounded-t-xl flex flex-col justify-end overflow-hidden h-full border border-navy/8">
                    <div className="bg-orange w-full" style={{ height: bar.commH }} title="Committed" />
                    <div className="bg-navy w-full" style={{ height: bar.paidH }} title="Paid" />
                  </div>
                  <span className={`text-[11px] font-semibold ${bar.highlight ? "text-orange" : "text-ink/60"}`}>
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-6 pt-3 border-t border-navy/8 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-navy" />
                <span>Paid Advances</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange" />
                <span>Pending Milestones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Category Table with Expandable Sub-Rows */}
        <div className="bg-white rounded-card-lg border border-navy/12 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-navy/10 flex items-center justify-between">
            <div>
              <h3 className="font-grotesk text-lg font-bold text-navy">
                Expense Categories & Line Items
              </h3>
              <p className="text-xs text-ink/60">Detailed breakdown per vendor and service</p>
            </div>
            <Badge variant="default">All Categories</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-bg border-b border-navy/10 text-xs font-bold uppercase tracking-wider text-ink/70">
                  <th className="py-4 px-6">Category / Item</th>
                  <th className="py-4 px-6">Planned</th>
                  <th className="py-4 px-6">Actual Spent</th>
                  <th className="py-4 px-6">% Share</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8 font-medium">
                {categories.map((cat) => {
                  const isOpen = expandedRows[cat.id];
                  return (
                    <React.Fragment key={cat.id}>
                      {/* Parent Category Row */}
                      <tr
                        onClick={() => toggleRow(cat.id)}
                        className="hover:bg-navy/4 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-6 font-bold text-navy flex items-center gap-2">
                          <ChevronRight
                            className={`w-4 h-4 text-orange transition-transform duration-200 ${
                              isOpen ? "rotate-90" : ""
                            }`}
                          />
                          <span>{cat.name}</span>
                        </td>
                        <td className="py-4 px-6 font-semibold">{formatINR(cat.allocated)}</td>
                        <td className="py-4 px-6 font-bold text-navy">{formatINR(cat.spent)}</td>
                        <td className="py-4 px-6 text-ink/70">{cat.percent}%</td>
                        <td className="py-4 px-6">
                          <Badge variant="success">{cat.status}</Badge>
                        </td>
                        <td className="py-4 px-6 text-right text-xs text-navy font-bold hover:underline">
                          Add Sub-item
                        </td>
                      </tr>

                      {/* Sub-Rows */}
                      {isOpen &&
                        cat.items.map((item, idx) => (
                          <tr key={idx} className="bg-bg/40 text-xs">
                            <td className="py-3 px-6 pl-12 text-ink/80 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-navy/40" />
                              <span>{item.name}</span>
                            </td>
                            <td className="py-3 px-6 text-ink/70">{formatINR(item.estimated)}</td>
                            <td className="py-3 px-6 font-semibold text-navy">
                              {formatINR(item.actual)}
                            </td>
                            <td className="py-3 px-6 text-ink/50">-</td>
                            <td className="py-3 px-6">
                              <Badge
                                variant={
                                  item.status === "Paid"
                                    ? "success"
                                    : item.status === "Committed"
                                    ? "orange"
                                    : "gold"
                                }
                              >
                                {item.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-6 text-right text-ink/40">Edit</td>
                          </tr>
                        ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Budget Optimizer Slide-over Drawer */}
      <Drawer
        isOpen={optimizerDrawerOpen}
        onClose={() => setOptimizerDrawerOpen(false)}
        title="Festora AI Budget Optimizer"
        subtitle="3 predictive scenario models designed for Ananya & Rohan's Wedding"
      >
        <div className="space-y-6">
          <p className="text-xs text-ink/70 leading-relaxed">
            Our optimization engine analyzed 400+ high-end Rajasthan palace celebrations. Select a scenario to apply calibrated budget changes instantly.
          </p>

          {/* Scenario 1 */}
          <div
            onClick={() => applyScenario("Save 15% Budget Cut", -450000)}
            className="p-5 rounded-card border-2 border-navy/12 hover:border-orange bg-bg transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-orange" />
                <h4 className="font-grotesk font-bold text-base text-navy">
                  Save 15% Budget Cut
                </h4>
              </div>
              <Badge variant="orange">Save ₹6.75 Lakhs</Badge>
            </div>
            <p className="text-xs text-ink/75 leading-relaxed">
              Consolidates multi-day floral rigging into modular transportable arches and switches off-peak photography crew hours.
            </p>
            <Button variant="orange" size="sm" className="w-full">
              Apply This Scenario
            </Button>
          </div>

          {/* Scenario 2 */}
          <div
            onClick={() => applyScenario("Premium Royal Experience Boost", 350000)}
            className="p-5 rounded-card border-2 border-navy/12 hover:border-gold bg-bg transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-gold" />
                <h4 className="font-grotesk font-bold text-base text-navy">
                  Premium Experience Boost
                </h4>
              </div>
              <Badge variant="gold">+20% Guest Impact</Badge>
            </div>
            <p className="text-xs text-ink/75 leading-relaxed">
              Reallocates unspent transport buffer into Manganiyar folk musicians, molecular cocktail stations, and luxury welcome hampers.
            </p>
            <Button variant="gold" size="sm" className="w-full">
              Apply This Scenario
            </Button>
          </div>

          {/* Scenario 3 */}
          <div
            onClick={() => applyScenario("Zero-Risk Safe Mode", -200000)}
            className="p-5 rounded-card border-2 border-navy/12 hover:border-navy bg-bg transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-navy" />
                <h4 className="font-grotesk font-bold text-base text-navy">
                  Zero-Risk Buffer Protection
                </h4>
              </div>
              <Badge variant="default">Safe Mode</Badge>
            </div>
            <p className="text-xs text-ink/75 leading-relaxed">
              Freezes all uncontracted discretionary spends and protects a mandatory 20% emergency reserve fund.
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              Apply This Scenario
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Add Expense Modal with Receipt Dropzone */}
      <Dialog
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        title="Add Expense & AI Receipt Scan"
        description="Record a vendor invoice or advance payment."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setExpenseModalOpen(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-ink/80 block mb-1">
              Expense Item Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Manganiyar Musicians 50% Advance"
              className="w-full bg-bg border border-navy/18 rounded-pill px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink/80 block mb-1">
                Category
              </label>
              <select className="w-full bg-bg border border-navy/18 rounded-pill px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy cursor-pointer">
                <option>Venue & Palace</option>
                <option>Catering & Bar</option>
                <option>Mandap & Florals</option>
                <option>Photography</option>
                <option>Entertainment</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink/80 block mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                required
                placeholder="75,000"
                className="w-full bg-bg border border-navy/18 rounded-pill px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          {/* Receipt Drag & Drop Zone */}
          <div>
            <label className="text-xs font-semibold text-ink/80 block mb-1">
              Receipt Upload / AI Auto-Scan
            </label>
            <div className="border-2 border-dashed border-navy/20 rounded-card p-6 text-center hover:border-navy cursor-pointer bg-bg transition-colors">
              <Upload className="w-8 h-8 text-orange mx-auto mb-2" />
              <p className="text-xs font-bold text-navy">Drop your invoice or receipt here</p>
              <p className="text-[11px] text-ink/60 mt-0.5">
                Supports PDF, JPG, PNG (AI Auto-Extracts vendor, tax, and total)
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setExpenseModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="orange" type="submit">
              Save Expense
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Export Report Modal */}
      <Dialog
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        title="Export Financial Intelligence"
        description="Download audit-ready financial statements."
      >
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              setExportModalOpen(false);
              alert("Downloading Festora_Budget_Summary.csv...");
            }}
            className="w-full flex items-center justify-between p-4 rounded-card bg-bg hover:bg-navy/8 border border-navy/10 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-navy" />
              <div>
                <p className="text-xs font-bold text-navy">Download CSV Spreadsheet</p>
                <p className="text-[11px] text-ink/60">Category-wise line items with payment status</p>
              </div>
            </div>
            <span className="text-xs text-navy font-bold">CSV →</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setExportModalOpen(false);
              alert("Generating Executive PDF Financial Briefing...");
            }}
            className="w-full flex items-center justify-between p-4 rounded-card bg-bg hover:bg-navy/8 border border-navy/10 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-orange" />
              <div>
                <p className="text-xs font-bold text-navy">Export Executive PDF Briefing</p>
                <p className="text-[11px] text-ink/60">Formatted report with donut & cash flow graphics</p>
              </div>
            </div>
            <span className="text-xs text-orange font-bold">PDF →</span>
          </button>
        </div>
      </Dialog>
    </WorkspaceShell>
  );
}
