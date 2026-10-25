"use client";

import React, { useState } from "react";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dialog } from "@/components/ui/Dialog";
import { Drawer } from "@/components/ui/Drawer";
import {
  Search,
  Filter,
  Star,
  MapPin,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
  Plus,
  SlidersHorizontal,
  X,
  Phone,
  Mail,
  Calendar,
  AlertCircle
} from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviewsCount: number;
  startingPrice: string;
  matchScore: number;
  status: "Shortlisted" | "Contacted" | "Quote Received" | "Booked" | "Paid";
  image: string;
  description: string;
  features: string[];
  packages: { name: string; price: string; details: string }[];
}

const INITIAL_VENDORS: Vendor[] = [
  {
    id: "v-1",
    name: "Samode Palace & Heritage Estates",
    category: "Palaces & Banquet Venues",
    city: "Jaipur, Rajasthan",
    rating: 4.9,
    reviewsCount: 142,
    startingPrice: "₹12,00,000",
    matchScore: 98,
    status: "Booked",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    description: "475-year-old regal heritage palace with ornate courtyards, mirror-work Durbar halls, and Mughal royal gardens.",
    features: ["45 Luxury Guest Suites", "Private Helipad", "Mughal Fountain Courtyard", "All-night music clearance"],
    packages: [
      { name: "Royal Courtyard Ceremony", price: "₹12,00,000", details: "Exclusive access to Sheesh Mahal, courtyard, and fountain gardens for 18 hours." },
      { name: "Full Palace Takeover (2 Days)", price: "₹28,00,000", details: "Complete buyout including all 45 luxury suites, private dining halls, and bridal prep villas." }
    ]
  },
  {
    id: "v-2",
    name: "Khyber Royal Rajasthani Gastronomy",
    category: "Catering & Gastronomy",
    city: "Jaipur, Rajasthan",
    rating: 4.9,
    reviewsCount: 98,
    startingPrice: "₹2,400 / plate",
    matchScore: 96,
    status: "Paid",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    description: "Multi-generation culinary masters crafting authentic Rajputana feasts, pure Jain banquet spreads, and artisanal live chaat counters.",
    features: ["Pure Jain Kitchen Line", "Live Sigri & Clay Tandoor Stalls", "Silver Platter Royal Service", "Custom Degustation Menus"],
    packages: [
      { name: "Royal Rajputana Feast", price: "₹2,400 / plate", details: "6 welcome drinks, 12 live appetizers, 18 main courses, 8 artisanal desserts." },
      { name: "Grand Maharaja Spread", price: "₹3,500 / plate", details: "Expanded gourmet seafood/mutton delicacies, imported truffle pasta counter, dedicated Jain section." }
    ]
  },
  {
    id: "v-3",
    name: "Stories by Joseph Radhik Studios",
    category: "Photography & Cinema",
    city: "Mumbai / Jaipur",
    rating: 5.0,
    reviewsCount: 215,
    startingPrice: "₹5,00,000",
    matchScore: 95,
    status: "Quote Received",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format&fit=crop",
    description: "Internationally acclaimed wedding cinematography team documenting candid emotional intimacy with cinematic documentary craftsmanship.",
    features: ["Drone Cinematography", "Same-Day Edit Highlight Reel", "Fine Art Leather Heirloom Albums", "Dual 8K Cine Cameras"],
    packages: [
      { name: "Signature 3-Day Wedding Chronicle", price: "₹5,00,000", details: "4 senior photographers, 2 drone pilots, teaser trailer, full feature film, 800 retouched stills." },
      { name: "Royal Cinema Edition", price: "₹8,50,000", details: "Includes Joseph Radhik on-site directing, pre-wedding destination shoot, same-night ceremony teaser." }
    ]
  },
  {
    id: "v-4",
    name: "Devika Narain Floral & Spatial Art",
    category: "Floral & Spatial Decor",
    city: "New Delhi / Jaipur",
    rating: 4.8,
    reviewsCount: 88,
    startingPrice: "₹8,00,000",
    matchScore: 94,
    status: "Booked",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop",
    description: "Sustainable luxury botanical architecture, hand-strung marigold chandeliers, and hand-carved stone mandap rigging.",
    features: ["100% Eco-Friendly Materials", "Handmade Brass Lanterns", "Architectural 3D Pre-visualization", "Temple Floral Fragrance Styling"],
    packages: [
      { name: "Imperial Mandap & Sangeet Spatial Design", price: "₹8,00,000", details: "Custom structural mandap over pool, floral chandeliers, stage backdrop, VIP lounge setups." }
    ]
  },
  {
    id: "v-5",
    name: "Manganiyar Sitar & Folk Fusion Troupe",
    category: "Music, Bands & DJs",
    city: "Jodhpur / Jaipur",
    rating: 4.9,
    reviewsCount: 64,
    startingPrice: "₹3,50,000",
    matchScore: 92,
    status: "Contacted",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop",
    description: "Thar desert generational masters blending classic Sufi poetry, Rajasthani khartal percussion, and contemporary electronic fusion.",
    features: ["12 Folk Virtuosos", "Acoustic Sunset Mehfil", "Dholak Baraat Procession", "Wireless Sound System Support"],
    packages: [
      { name: "Sunset Mehfil & Baraat Ensemble", price: "₹3,50,000", details: "4-hour continuous performance for guest welcome, varmala procession, and dinner soundtrack." }
    ]
  },
  {
    id: "v-6",
    name: "The Wedding Filmer — Vishal Punjabi",
    category: "Photography & Cinema",
    city: "Mumbai",
    rating: 4.9,
    reviewsCount: 180,
    startingPrice: "₹7,50,000",
    matchScore: 91,
    status: "Shortlisted",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop",
    description: "Pioneers of Indian wedding cinema. Creating timeless films with original recorded soundtracks composed for the couple.",
    features: ["Original Musical Score", "4K Dolby Vision Color Grade", "Confessional Booth Recording", "International Crew"],
    packages: [
      { name: "Classic Love Anthem Film", price: "₹7,50,000", details: "Exclusive original song composed and recorded in studio, 15-minute documentary film." }
    ]
  },
  {
    id: "v-7",
    name: "The Barmecide Craft Cocktail Collective",
    category: "Mixology & Craft Bars",
    city: "New Delhi / Jaipur",
    rating: 4.8,
    reviewsCount: 52,
    startingPrice: "₹2,50,000",
    matchScore: 90,
    status: "Shortlisted",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop",
    description: "Experimental mixology bar featuring bespoke botanical syrups, smoked dry-ice gin potions, and personalized couple cocktails.",
    features: ["Custom Monogram Ice Blocks", "Zero-Proof Mocktail Menu", "Speed Flair Bartenders", "Mobile Polished Brass Bar"],
    packages: [
      { name: "Bespoke Royal Speakeasy", price: "₹2,50,000", details: "4 signature cocktails, 3 craft mocktails, custom ice stamps, 4 flair mixologists for 6 hours." }
    ]
  },
  {
    id: "v-8",
    name: "Vogue Luxury Invitation Atelier",
    category: "Invitations & Stationery",
    city: "Jaipur, Rajasthan",
    rating: 4.7,
    reviewsCount: 77,
    startingPrice: "₹1,20,000",
    matchScore: 89,
    status: "Paid",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
    description: "Handcrafted foil-pressed invitations, gold leaf seals, Pichwai paintings, and personalized wax monogram stamps.",
    features: ["Handmade Cotton Paper", "Real 24k Gold Foil Stamp", "Digital WhatsApp Animated Teasers", "Calligraphy Guest Addressing"],
    packages: [
      { name: "Royal Heritage Invitation Suite (150 Boxes)", price: "₹1,20,000", details: "Rigid gift box, velvet interior, 3 gold-foil ceremony cards, sweet treats jar, custom envelope seals." }
    ]
  }
];

export default function VendorsPage() {
  const [activeTab, setActiveTab] = useState<"directory" | "pipeline">("directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [compareList, setCompareList] = useState<Vendor[]>([]);
  const [selectedVendorForModal, setSelectedVendorForModal] = useState<Vendor | null>(null);
  const [quoteVendor, setQuoteVendor] = useState<Vendor | null>(null);
  const [quoteSent, setQuoteSent] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  // Filter vendors
  const filteredVendors = INITIAL_VENDORS.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || v.category === selectedCategory;
    const matchesCity = selectedCity === "All" || v.city.includes(selectedCity);
    return matchesSearch && matchesCategory && matchesCity;
  });

  const categories = ["All", ...Array.from(new Set(INITIAL_VENDORS.map((v) => v.category)))];
  const cities = ["All", "Jaipur", "Mumbai", "New Delhi", "Jodhpur"];

  const toggleCompare = (vendor: Vendor) => {
    if (compareList.find((v) => v.id === vendor.id)) {
      setCompareList(compareList.filter((v) => v.id !== vendor.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 vendors simultaneously.");
        return;
      }
      setCompareList([...compareList, vendor]);
    }
  };

  const getStatusBadge = (status: Vendor["status"]) => {
    switch (status) {
      case "Booked":
      case "Paid":
        return <Badge variant="navy" className="px-3 py-1 font-semibold"><Check className="w-3.5 h-3.5 mr-1" /> {status}</Badge>;
      case "Quote Received":
      case "Contacted":
        return <Badge variant="orange" className="px-3 py-1 font-semibold">{status}</Badge>;
      case "Shortlisted":
      default:
        return <Badge variant="gold" className="px-3 py-1 font-semibold">{status}</Badge>;
    }
  };

  return (
    <WorkspaceShell activeTab="vendors">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy)]">Vendor Management</span>
            <span className="text-xs text-[var(--ink)]/50">•</span>
            <span className="text-xs font-semibold text-[var(--orange)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 60+ Verified Vendors
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--navy)]">
            Marketplace & Booking Pipeline
          </h1>
          <p className="text-sm text-[var(--ink)]/70 mt-1 max-w-xl">
            Discover top-tier curated wedding and celebration artisans. Compare quotes, lock contracts, and sync logistics directly to your event roadmap.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-[var(--navy)]/8 p-1 rounded-full flex items-center border border-[var(--navy)]/10">
            <button
              onClick={() => setActiveTab("directory")}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${
                activeTab === "directory"
                  ? "bg-[var(--navy)] text-[#F8F9FA] shadow-md"
                  : "text-[var(--navy)] hover:text-[var(--ink)]"
              }`}
            >
              Discover Vendors
            </button>
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${
                activeTab === "pipeline"
                  ? "bg-[var(--navy)] text-[#F8F9FA] shadow-md"
                  : "text-[var(--navy)] hover:text-[var(--ink)]"
              }`}
            >
              My Checklist Pipeline
            </button>
          </div>

          {compareList.length > 0 && (
            <Button
              variant="orange"
              size="sm"
              onClick={() => setIsCompareDrawerOpen(true)}
              className="relative shadow-md"
            >
              <Layers className="w-4 h-4 mr-1.5" />
              Compare ({compareList.length})
            </Button>
          )}
        </div>
      </div>

      {/* DIRECTORY VIEW */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <GlassSurface elevation="card" className="p-4 border border-[var(--navy)]/10 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="relative md:col-span-2">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink)]/40" />
                <Input
                  placeholder="Search vendor name, category, or specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-white border-[var(--navy)]/15 rounded-xl text-sm"
                />
              </div>

              <div>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-11 bg-white border-[var(--navy)]/15 rounded-xl text-xs font-semibold"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                  ))}
                </Select>
              </div>

              <div>
                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="h-11 bg-white border-[var(--navy)]/15 rounded-xl text-xs font-semibold"
                >
                  {cities.map((ct) => (
                    <option key={ct} value={ct}>{ct === "All" ? "All Locations" : ct}</option>
                  ))}
                </Select>
              </div>
            </div>
          </GlassSurface>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => {
              const isCompared = compareList.some((v) => v.id === vendor.id);
              return (
                <div
                  key={vendor.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-[var(--navy)]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header with Badge Overlay */}
                    <div className="relative h-52 w-full overflow-hidden bg-[var(--navy)]/10">
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="bg-[var(--gold)] text-[var(--ink)] font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> {vendor.matchScore}% AI Match
                        </span>

                        <button
                          onClick={() => toggleCompare(vendor)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-full backdrop-blur-md transition-all ${
                            isCompared
                              ? "bg-[var(--orange)] text-[var(--ink)] shadow"
                              : "bg-white/80 text-[var(--ink)] hover:bg-white"
                          }`}
                        >
                          {isCompared ? "✓ Selected" : "+ Compare"}
                        </button>
                      </div>

                      {/* Bottom Info on Image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                          {vendor.category}
                        </span>
                        <h3 className="text-lg font-bold text-white line-clamp-1">{vendor.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-white/80 mt-0.5">
                          <span className="flex items-center gap-1 font-semibold text-white">
                            <Star className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]" />
                            {vendor.rating} ({vendor.reviewsCount})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {vendor.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-4">
                      <p className="text-xs text-[var(--ink)]/70 line-clamp-2 leading-relaxed">
                        {vendor.description}
                      </p>

                      {/* Highlight Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {vendor.features.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium bg-[var(--bg)] text-[var(--ink)] px-2.5 py-1 rounded-lg border border-[var(--navy)]/10"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0 border-t border-[var(--navy)]/8 flex items-center justify-between mt-4">
                    <div>
                      <span className="text-[10px] text-[var(--ink)]/50 uppercase font-bold block">Starting From</span>
                      <span className="text-base font-extrabold text-[var(--navy)]">{vendor.startingPrice}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedVendorForModal(vendor)}
                        className="text-xs font-bold text-[var(--navy)] hover:bg-[var(--navy)]/5"
                      >
                        Profile
                      </Button>
                      <Button
                        variant="orange"
                        size="sm"
                        onClick={() => setQuoteVendor(vendor)}
                        className="text-xs font-bold text-[var(--ink)]"
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CHECKLIST PIPELINE VIEW */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {(["Shortlisted", "Contacted", "Quote Received", "Booked", "Paid"] as Vendor["status"][]).map((stage) => {
              const vendorsInStage = INITIAL_VENDORS.filter((v) => v.status === stage);
              return (
                <div key={stage} className="bg-white rounded-2xl p-4 border border-[var(--navy)]/10 shadow-sm flex flex-col h-full">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--navy)]/10 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--navy)]">{stage}</span>
                    <span className="text-xs font-bold bg-[var(--navy)]/8 text-[var(--navy)] px-2 py-0.5 rounded-full">
                      {vendorsInStage.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {vendorsInStage.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVendorForModal(v)}
                        className="p-3 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10 hover:border-[var(--navy)]/30 cursor-pointer transition-all shadow-sm group"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <img src={v.image} alt={v.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[var(--navy)] truncate group-hover:text-[var(--orange)] transition-colors">
                              {v.name}
                            </h4>
                            <span className="text-[10px] text-[var(--ink)]/60 truncate block">{v.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span className="font-extrabold text-[var(--navy)]">{v.startingPrice}</span>
                          <span className="font-bold text-[var(--gold)] flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-[var(--gold)]" /> {v.rating}
                          </span>
                        </div>
                      </div>
                    ))}

                    {vendorsInStage.length === 0 && (
                      <div className="h-32 flex flex-col items-center justify-center text-center p-3 text-[var(--ink)]/40 border border-dashed border-[var(--navy)]/15 rounded-xl">
                        <span className="text-xs">No vendors in this stage</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VENDOR PROFILE MODAL */}
      {selectedVendorForModal && (
        <Dialog
          isOpen={true}
          onClose={() => setSelectedVendorForModal(null)}
          title={selectedVendorForModal.name}
          className="max-w-3xl"
        >
          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <img
                src={selectedVendorForModal.image}
                alt={selectedVendorForModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold text-[var(--gold)] uppercase">{selectedVendorForModal.category}</span>
                  <h2 className="text-2xl font-bold">{selectedVendorForModal.name}</h2>
                  <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedVendorForModal.city}
                  </p>
                </div>
                <div className="text-right">
                  <span className="bg-[var(--gold)] text-[var(--ink)] font-black text-xs px-3 py-1 rounded-full shadow">
                    ★ {selectedVendorForModal.rating} ({selectedVendorForModal.reviewsCount} verified reviews)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[var(--navy)] mb-2">About the Studio</h4>
              <p className="text-xs text-[var(--ink)]/80 leading-relaxed">{selectedVendorForModal.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[var(--navy)] mb-3">Available Package Tiers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedVendorForModal.packages.map((pkg, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[var(--navy)]/15 bg-[var(--bg)] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="text-xs font-bold text-[var(--navy)]">{pkg.name}</h5>
                        <span className="text-xs font-black text-[var(--navy)]">{pkg.price}</span>
                      </div>
                      <p className="text-[11px] text-[var(--ink)]/70 mt-1">{pkg.details}</p>
                    </div>
                    <Button
                      variant="orange"
                      size="sm"
                      onClick={() => {
                        setSelectedVendorForModal(null);
                        setQuoteVendor(selectedVendorForModal);
                      }}
                      className="mt-4 text-xs font-bold text-[var(--ink)]"
                    >
                      Book Package
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--navy)]/10">
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedVendorForModal.status)}
                <span className="text-xs text-[var(--ink)]/60">Verified Festora Artisan</span>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={() => setSelectedVendorForModal(null)}>
                  Close
                </Button>
                <Button
                  variant="orange"
                  size="sm"
                  onClick={() => {
                    setSelectedVendorForModal(null);
                    setQuoteVendor(selectedVendorForModal);
                  }}
                  className="font-bold text-[var(--ink)]"
                >
                  <Mail className="w-4 h-4 mr-1.5" /> Request Official Quote
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {/* REQUEST QUOTE MODAL */}
      {quoteVendor && (
        <Dialog
          isOpen={true}
          onClose={() => {
            setQuoteVendor(null);
            setQuoteSent(false);
          }}
          title={`Request Quote: ${quoteVendor.name}`}
          className="max-w-lg"
        >
          {quoteSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-[var(--navy)] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[var(--navy)]">Quote Request Dispatched!</h3>
              <p className="text-xs text-[var(--ink)]/70 max-w-sm mx-auto">
                We have notified {quoteVendor.name} with your event date, estimated guest count, and catering preferences. Average response time is under 4 hours.
              </p>
              <Button
                variant="navy"
                size="sm"
                onClick={() => {
                  setQuoteVendor(null);
                  setQuoteSent(false);
                }}
                className="mt-4"
              >
                Back to Marketplace
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[var(--ink)]/70">
                Send an automated RFQ directly to {quoteVendor.name} with your verified event blueprint.
              </p>
              <div>
                <label className="text-xs font-bold text-[var(--navy)] block mb-1">Target Event Date</label>
                <Input defaultValue="Nov 18, 2026 (Royal Jaipur Wedding)" disabled className="bg-[var(--bg)] text-xs" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--navy)] block mb-1">Estimated Guest Count</label>
                <Input defaultValue="150 Guests" disabled className="bg-[var(--bg)] text-xs" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--navy)] block mb-1">Special Inquiries or Requests</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Please provide separate quote for Sangeet night lighting and Marwari folk ensemble..."
                  className="w-full p-3 bg-white border border-[var(--navy)]/15 rounded-xl text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--navy)]"
                />
              </div>

              <div className="p-3 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10 text-[11px] text-[var(--ink)]/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--navy)] flex-shrink-0" />
                <span>Protected by Festora Escrow: zero commission markups on direct quotes.</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setQuoteVendor(null)}>Cancel</Button>
                <Button variant="orange" size="sm" onClick={() => setQuoteSent(true)} className="font-bold text-[var(--ink)]">
                  Submit RFQ
                </Button>
              </div>
            </div>
          )}
        </Dialog>
      )}

      {/* COMPARISON DRAWER (UP TO 3 VENDORS) */}
      <Drawer
        isOpen={isCompareDrawerOpen}
        onClose={() => setIsCompareDrawerOpen(false)}
        title="Side-by-Side Vendor Comparison"
        className="max-w-4xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {compareList.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-2xl p-4 border border-[var(--navy)]/15 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleCompare(vendor)}
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] font-bold uppercase text-[var(--gold)]">{vendor.category}</span>
                  <h4 className="text-sm font-bold text-[var(--navy)] line-clamp-1">{vendor.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-[var(--gold)] font-bold mt-1">
                    ★ {vendor.rating} <span className="text-[var(--ink)]/50 font-normal">({vendor.reviewsCount})</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[var(--navy)]/8 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[var(--ink)]/50 block">Pricing</span>
                      <span className="font-extrabold text-[var(--navy)]">{vendor.startingPrice}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[var(--ink)]/50 block">AI Match Score</span>
                      <span className="font-bold text-[var(--orange)]">{vendor.matchScore}% Match</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[var(--ink)]/50 block">Specialties</span>
                      <ul className="list-disc pl-4 text-[11px] text-[var(--ink)]/70 space-y-0.5 mt-1">
                        {vendor.features.slice(0, 3).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  variant="orange"
                  size="sm"
                  onClick={() => {
                    setIsCompareDrawerOpen(false);
                    setQuoteVendor(vendor);
                  }}
                  className="w-full mt-4 text-xs font-bold text-[var(--ink)]"
                >
                  Select & Request Quote
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </WorkspaceShell>
  );
}
