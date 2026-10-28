/**
 * Festora AI — Dual-Engine Celebration Blueprint Generator
 * Coordinates a configured Gemini model (online) and a culturally authentic deterministic engine (offline/fallback).
 * Strictly guarantees mathematical 100% budget sums across Weddings, Birthdays, and Community events.
 */

import { z } from "zod";
import { reconcileBudgetAllocations } from "@/lib/utils/budget";
import { getServerEnv } from "@/lib/env";
import { type PlanGenerationRequest } from "@/lib/utils/validation";

/**
 * Input parameters required to synthesize an autonomous celebration blueprint.
 */
export type PlanGenerationInput = PlanGenerationRequest;

/**
 * Strict schema for the complete celebration blueprint.
 */
export const GeneratedPlanSchema = z.object({
  title: z.string(),
  summary: z.string(),
  planHealth: z.number().min(0).max(100),
  budgetCategories: z.array(
    z.object({
      name: z.string(),
      percentage: z.number(),
      allocated: z.number(),
      icon: z.string().optional(),
      items: z.array(
        z.object({
          name: z.string(),
          estimated: z.number(),
          status: z.string(),
        }),
      ),
    }),
  ),
  phases: z.array(
    z.object({
      title: z.string(),
      order: z.number(),
      tasks: z.array(
        z.object({
          title: z.string(),
          priority: z.enum(["high", "medium", "low"]),
          daysBeforeEvent: z.number(),
          assigneeRole: z.string(),
        }),
      ),
    }),
  ),
  recommendedVendors: z.array(
    z.object({
      category: z.string(),
      name: z.string(),
      estimatedCost: z.number(),
      matchScore: z.number(),
      reason: z.string(),
    }),
  ),
  themeMoodboard: z.object({
    paletteNames: z.array(z.string()),
    colorHexes: z.array(z.string()),
    decorConcept: z.string(),
    signatureCocktailOrMenu: z.string(),
  }),
  riskMatrix: z.array(
    z.object({
      risk: z.string(),
      level: z.enum(["high", "medium", "low"]),
      contingency: z.string(),
    }),
  ),
});

export type GeneratedPlan = z.infer<typeof GeneratedPlanSchema>;

/**
 * Generates an end-to-end celebration plan using Google Gemini 1.5 Flash when available,
 * or gracefully cascades to the high-fidelity deterministic engine.
 *
 * @param input - Client event intake parameters
 * @returns Fully validated and mathematically reconciled GeneratedPlan
 * @complexity O(N) Time | O(N) Space
 */
export async function generateEventPlan(input: PlanGenerationInput): Promise<GeneratedPlan> {
  const env = getServerEnv();
  const apiKey = env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const prompt = `You are Festora AI, the world's most elite celebration architect.
Generate a structured JSON blueprint for this event:
Type: ${input.eventType}
Title: ${input.title}
Target Date: ${input.targetDate}
City: ${input.city}
Guests: ${input.guestCount}
Budget: ${input.currency} ${input.totalBudget}
Style: ${input.styleVibe}
Special Needs: ${input.specialNeeds || "None"}

Ensure budget categories sum exactly to 100% of ${input.totalBudget}.
Output strictly valid JSON conforming to the requested schema.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.GEMINI_MODEL)}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(8000),
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        },
      );

      if (response.ok) {
        const jsonRes = await response.json();
        const rawText = jsonRes.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          const validated = GeneratedPlanSchema.safeParse(parsed);
          if (validated.success) {
            const reconciledCategories = reconcileBudgetAllocations(
              input.totalBudget,
              validated.data.budgetCategories,
            );
            return {
              ...validated.data,
              budgetCategories: reconciledCategories,
            };
          }
        }
      }
    } catch {
      console.warn("Gemini API call failed, falling back to deterministic planning engine");
    }
  }

  // High-fidelity deterministic generative engine
  return generateDeterministicPlan(input);
}

/**
 * Deterministic generative fallback providing culturally authentic, mathematically guaranteed blueprints
 * tailored across Weddings, Milestone Birthdays, Community Celebrations, and Corporate Summits.
 *
 * @param input - Plan intake specifications
 * @returns Schema-compliant GeneratedPlan with exact 100% category allocation sums
 */
function generateDeterministicPlan(input: PlanGenerationInput): GeneratedPlan {
  const b = input.totalBudget;
  const evtLower = input.eventType.toLowerCase();
  const isWedding = evtLower.includes("wedding");
  const isBirthday =
    evtLower.includes("birthday") ||
    evtLower.includes("jubilee") ||
    evtLower.includes("anniversary");
  const isCommunity =
    evtLower.includes("community") ||
    evtLower.includes("festival") ||
    evtLower.includes("milan") ||
    evtLower.includes("diwali") ||
    evtLower.includes("holi");
  const isCorporate =
    evtLower.includes("corporate") ||
    evtLower.includes("summit") ||
    evtLower.includes("conference");

  let rawBudgetCategories;
  let phases;
  let recommendedVendors;
  let themeMoodboard;
  let riskMatrix;

  if (isWedding) {
    rawBudgetCategories = [
      {
        name: "Venue & Palace Pavilions",
        percentage: 35,
        allocated: Math.round(b * 0.35),
        icon: "domain",
        items: [
          {
            name: "Courtyard & Banquet Lawn Hire",
            estimated: Math.round(b * 0.25),
            status: "Pending",
          },
          { name: "Guest Accommodation Block", estimated: Math.round(b * 0.1), status: "Pending" },
        ],
      },
      {
        name: "Culinary Banquets & Bar Service",
        percentage: 28,
        allocated: Math.round(b * 0.28),
        icon: "restaurant",
        items: [
          {
            name: "Grand Multi-Cuisine Wedding Feast",
            estimated: Math.round(b * 0.2),
            status: "Pending",
          },
          {
            name: "Live Chaat & Regional Specialty Counters",
            estimated: Math.round(b * 0.08),
            status: "Pending",
          },
        ],
      },
      {
        name: "Floral Architecture & Mandap Scenography",
        percentage: 18,
        allocated: Math.round(b * 0.18),
        icon: "local_florist",
        items: [
          {
            name: "Vedic Mandap with Fresh Lotus & Marigolds",
            estimated: Math.round(b * 0.12),
            status: "Pending",
          },
          {
            name: "Ambient Fairy Light Tunnel & Entry Archway",
            estimated: Math.round(b * 0.06),
            status: "Pending",
          },
        ],
      },
      {
        name: "Cinematic Photography & Drones",
        percentage: 11,
        allocated: Math.round(b * 0.11),
        icon: "photo_camera",
        items: [
          {
            name: "3-Day Wedding Docufilm & Aerial Drone Unit",
            estimated: Math.round(b * 0.08),
            status: "Pending",
          },
          {
            name: "Fine-Art Couple Portrait Sessions",
            estimated: Math.round(b * 0.03),
            status: "Pending",
          },
        ],
      },
      {
        name: "Live Entertainment & Sound",
        percentage: 8,
        allocated: Math.round(b * 0.08),
        icon: "music_note",
        items: [
          {
            name: "Sangeet DJ & Audio Rigging",
            estimated: Math.round(b * 0.05),
            status: "Pending",
          },
          {
            name: "Traditional Folk Musicians & Shehnai Troupe",
            estimated: Math.round(b * 0.03),
            status: "Pending",
          },
        ],
      },
    ];

    phases = [
      {
        title: "Phase 1: Foundation & Vedic Mandap Locks",
        order: 1,
        tasks: [
          {
            title: "Finalize Master Budget Allocations",
            priority: "high" as const,
            daysBeforeEvent: 90,
            assigneeRole: "Lead Coordinator",
          },
          {
            title: "Review & Sign Heritage Palace Contract",
            priority: "high" as const,
            daysBeforeEvent: 80,
            assigneeRole: "Host",
          },
          {
            title: "Confirm Catering Menu Tastings & Pure Jain Counters",
            priority: "medium" as const,
            daysBeforeEvent: 60,
            assigneeRole: "Hospitality Lead",
          },
        ],
      },
      {
        title: "Phase 2: Sangeet Rehearsals & Production Lock",
        order: 2,
        tasks: [
          {
            title: "Finalize Mandap Spatial Scenography",
            priority: "medium" as const,
            daysBeforeEvent: 45,
            assigneeRole: "Decor Stylist",
          },
          {
            title: "Dispatch Royal Wax-Sealed Invitations",
            priority: "high" as const,
            daysBeforeEvent: 40,
            assigneeRole: "Communications",
          },
          {
            title: "Choreograph Family Sangeet Dance Segments",
            priority: "medium" as const,
            daysBeforeEvent: 30,
            assigneeRole: "Choreographer",
          },
        ],
      },
      {
        title: "Phase 3: Baraat Arrival & Day-Of Run Sheet",
        order: 3,
        tasks: [
          {
            title: "Reconcile Final Guest RSVP Counts",
            priority: "high" as const,
            daysBeforeEvent: 14,
            assigneeRole: "Guest Relations",
          },
          {
            title: "Lock Table Seating & VIP Enclaves",
            priority: "medium" as const,
            daysBeforeEvent: 7,
            assigneeRole: "Lead Coordinator",
          },
          {
            title: "Baraat Procession & Shehnai Soundcheck",
            priority: "high" as const,
            daysBeforeEvent: 1,
            assigneeRole: "Stage Manager",
          },
        ],
      },
    ];

    recommendedVendors = [
      {
        category: "Catering",
        name: "Artisan Epicurean Banquets",
        estimatedCost: Math.round(b * 0.25),
        matchScore: 98,
        reason: `Signature ${input.styleVibe} culinary expertise matched for ${input.guestCount} guests in ${input.city}.`,
      },
      {
        category: "Photography",
        name: "Aether & Light Studio",
        estimatedCost: Math.round(b * 0.08),
        matchScore: 96,
        reason: "Acclaimed fine-art framing and high-contrast ambient ceremony coverage.",
      },
      {
        category: "Decor",
        name: "Botanica Luxury Event Florals",
        estimatedCost: Math.round(b * 0.15),
        matchScore: 95,
        reason: "Custom structural installations using sustainable seasonal botanicals.",
      },
    ];

    themeMoodboard = {
      paletteNames: ["Imperial Navy", "Celebration Sunset Orange", "Royal Gold", "Warm Pearl"],
      colorHexes: ["#2C3E50", "#E67E22", "#F1C40F", "#F8F9FA"],
      decorConcept: `${input.styleVibe} aesthetic featuring layered tactile textures, floating candles, brass artifacts, and warm lighting.`,
      signatureCocktailOrMenu: "Saffron Rose Spritz paired with royal smoked appetizers.",
    };

    riskMatrix = [
      {
        risk: "Weather disruption for outdoor lawns",
        level: "medium" as const,
        contingency:
          "Pre-contracted transparent marquee pavilion on standby with 24-hour trigger window.",
      },
      {
        risk: "Peak season vendor availability crunch",
        level: "high" as const,
        contingency:
          "Automated booking locks secured with 20% token advances across all critical path vendors.",
      },
      {
        risk: "Special dietary clashes (Jain / Vegan)",
        level: "medium" as const,
        contingency:
          "Dedicated separated prep zone and clearly marked color-coded allergen signage.",
      },
    ];
  } else if (isBirthday) {
    rawBudgetCategories = [
      {
        name: "Celebration Venue & Private Lounge",
        percentage: 36,
        allocated: Math.round(b * 0.36),
        icon: "domain",
        items: [
          {
            name: "Boutique Terrace or Private Villa Booking",
            estimated: Math.round(b * 0.28),
            status: "Pending",
          },
          {
            name: "VIP Speakeasy Lounge Access",
            estimated: Math.round(b * 0.08),
            status: "Pending",
          },
        ],
      },
      {
        name: "Artisanal Dining & Mixology Bar",
        percentage: 30,
        allocated: Math.round(b * 0.3),
        icon: "restaurant",
        items: [
          {
            name: "Live Gourmet Grazing Table & Small Plates",
            estimated: Math.round(b * 0.2),
            status: "Pending",
          },
          {
            name: "Bespoke Multi-Tier Celebration Cake",
            estimated: Math.round(b * 0.1),
            status: "Pending",
          },
        ],
      },
      {
        name: "Interactive Decor & Memory Installations",
        percentage: 16,
        allocated: Math.round(b * 0.16),
        icon: "local_florist",
        items: [
          {
            name: "Neon Monogram & Retro Balloon Arch",
            estimated: Math.round(b * 0.1),
            status: "Pending",
          },
          {
            name: "Nostalgia Memory Wall & Photo Display",
            estimated: Math.round(b * 0.06),
            status: "Pending",
          },
        ],
      },
      {
        name: "Live Music & DJ Sound Stage",
        percentage: 10,
        allocated: Math.round(b * 0.1),
        icon: "music_note",
        items: [
          {
            name: "Live Acoustic Set & Headline DJ",
            estimated: Math.round(b * 0.1),
            status: "Pending",
          },
        ],
      },
      {
        name: "Personalized Return Gifting & Favors",
        percentage: 8,
        allocated: Math.round(b * 0.08),
        icon: "redeem",
        items: [
          {
            name: "Customized Keepsake Hampers for Guests",
            estimated: Math.round(b * 0.08),
            status: "Pending",
          },
        ],
      },
    ];

    phases = [
      {
        title: "Phase 1: Concept, Guest List & Venue Booking",
        order: 1,
        tasks: [
          {
            title: "Define Milestone Celebration Theme & Vibe",
            priority: "high" as const,
            daysBeforeEvent: 45,
            assigneeRole: "Host",
          },
          {
            title: "Secure Private Villa or Rooftop Venue",
            priority: "high" as const,
            daysBeforeEvent: 35,
            assigneeRole: "Lead Planner",
          },
          {
            title: "Dispatch Digital Video Invitations",
            priority: "medium" as const,
            daysBeforeEvent: 30,
            assigneeRole: "Host",
          },
        ],
      },
      {
        title: "Phase 2: Custom Cake & Memory Timeline Curation",
        order: 2,
        tasks: [
          {
            title: "Order Bespoke Sculpture Cake with Patisserie Chef",
            priority: "high" as const,
            daysBeforeEvent: 20,
            assigneeRole: "Host",
          },
          {
            title: "Curate Lifetime Video Montage & Childhood Photo Reels",
            priority: "medium" as const,
            daysBeforeEvent: 15,
            assigneeRole: "Media Producer",
          },
          {
            title: "Lock Signature Cocktail Recipes & Tasting",
            priority: "low" as const,
            daysBeforeEvent: 10,
            assigneeRole: "Mixologist",
          },
        ],
      },
      {
        title: "Phase 3: The Celebration Countdown",
        order: 3,
        tasks: [
          {
            title: "Finalize Surprise Toasts & Speech Order",
            priority: "medium" as const,
            daysBeforeEvent: 5,
            assigneeRole: "MC / Host",
          },
          {
            title: "Inspect Audio Lighting & Photo Lounge Rigging",
            priority: "high" as const,
            daysBeforeEvent: 1,
            assigneeRole: "Sound Tech",
          },
        ],
      },
    ];

    recommendedVendors = [
      {
        category: "Patisserie & Cake",
        name: "La Crème Haute Patisserie",
        estimatedCost: Math.round(b * 0.08),
        matchScore: 99,
        reason: "Renowned for architectural multi-tier celebration cakes and dessert tables.",
      },
      {
        category: "Live Music",
        name: "RetroWave Live Trio & DJ",
        estimatedCost: Math.round(b * 0.12),
        matchScore: 97,
        reason: "Masters of nostalgic milestone hits and high-energy party anthems.",
      },
      {
        category: "Decor & Lighting",
        name: "Lumina Celestial Installations",
        estimatedCost: Math.round(b * 0.16),
        matchScore: 95,
        reason:
          "Specialized in neon photo installations, balloon arches, and warm bistro lighting.",
      },
    ];

    themeMoodboard = {
      paletteNames: ["Champagne Gold", "Velvet Midnight Navy", "Warm Pearl", "Vibrant Amber"],
      colorHexes: ["#F1C40F", "#2C3E50", "#F8F9FA", "#E67E22"],
      decorConcept: `${input.styleVibe} celebration highlighting a lifetime of milestones with floating warm globes, retro brass cocktail carts, and interactive Polaroid memories.`,
      signatureCocktailOrMenu: "Sparkling Gold Leaf Bellini paired with artisanal canapés.",
    };

    riskMatrix = [
      {
        risk: "Guest late arrivals during surprise toast window",
        level: "low" as const,
        contingency: "Schedule 45-minute welcome cocktail buffer prior to highlight cake cutting.",
      },
      {
        risk: "Cake transit damage in warm climate",
        level: "medium" as const,
        contingency: "Climate-controlled refrigerated transit with on-site pastry chef assembly.",
      },
    ];
  } else if (isCommunity) {
    rawBudgetCategories = [
      {
        name: "Community Grounds & Stage Infrastructure",
        percentage: 32,
        allocated: Math.round(b * 0.32),
        icon: "domain",
        items: [
          {
            name: "Public Pavilion or Stadium Grounds Permit",
            estimated: Math.round(b * 0.22),
            status: "Pending",
          },
          {
            name: "Main Stage & Crowd Control Barricades",
            estimated: Math.round(b * 0.1),
            status: "Pending",
          },
        ],
      },
      {
        name: "Communal Banquet & Prasad/Festive Sweets",
        percentage: 30,
        allocated: Math.round(b * 0.3),
        icon: "restaurant",
        items: [
          {
            name: "Large-Batch Community Feast (Langar / Bhojan)",
            estimated: Math.round(b * 0.22),
            status: "Pending",
          },
          {
            name: "Festive Sweets, Mithai & Beverage Stations",
            estimated: Math.round(b * 0.08),
            status: "Pending",
          },
        ],
      },
      {
        name: "Traditional Lighting, Torans & Rangoli Decor",
        percentage: 18,
        allocated: Math.round(b * 0.18),
        icon: "local_florist",
        items: [
          {
            name: "Diyas, Marigold Torans & Community Rangoli",
            estimated: Math.round(b * 0.12),
            status: "Pending",
          },
          {
            name: "High-Lumen Perimeter Festoon Lighting",
            estimated: Math.round(b * 0.06),
            status: "Pending",
          },
        ],
      },
      {
        name: "Cultural Performances & Sound Rigging",
        percentage: 14,
        allocated: Math.round(b * 0.14),
        icon: "music_note",
        items: [
          {
            name: "Folk Dance Troupe & Classical Performers",
            estimated: Math.round(b * 0.09),
            status: "Pending",
          },
          {
            name: "High-Decibel PA System & Wireless Mics",
            estimated: Math.round(b * 0.05),
            status: "Pending",
          },
        ],
      },
      {
        name: "Safety, Sanitation & Eco-Firework Display",
        percentage: 6,
        allocated: Math.round(b * 0.06),
        icon: "shield",
        items: [
          {
            name: "Eco-Friendly Low-Smoke Firework Finale",
            estimated: Math.round(b * 0.04),
            status: "Pending",
          },
          {
            name: "First Aid & Recycling Clean-Up Squad",
            estimated: Math.round(b * 0.02),
            status: "Pending",
          },
        ],
      },
    ];

    phases = [
      {
        title: "Phase 1: Municipal Permits, Security & Volunteer Marshals",
        order: 1,
        tasks: [
          {
            title: "File Municipal Grounds & Fire Safety Clearances",
            priority: "high" as const,
            daysBeforeEvent: 60,
            assigneeRole: "Civic Liaison",
          },
          {
            title: "Convene Community Volunteer Steering Committee",
            priority: "high" as const,
            daysBeforeEvent: 45,
            assigneeRole: "Committee Chair",
          },
          {
            title: "Broadcast Community Newsletter & RSVP Link",
            priority: "medium" as const,
            daysBeforeEvent: 35,
            assigneeRole: "Publicity Officer",
          },
        ],
      },
      {
        title: "Phase 2: Cultural Performance Schedules & Catering Setup",
        order: 2,
        tasks: [
          {
            title: "Audit Large-Batch Pure Veg Commercial Kitchens",
            priority: "high" as const,
            daysBeforeEvent: 20,
            assigneeRole: "Catering Head",
          },
          {
            title: "Rehearse Community Youth Cultural Performances",
            priority: "medium" as const,
            daysBeforeEvent: 14,
            assigneeRole: "Cultural Secretary",
          },
          {
            title: "Install Electrical Generators & Sound Towers",
            priority: "high" as const,
            daysBeforeEvent: 3,
            assigneeRole: "Technical Lead",
          },
        ],
      },
      {
        title: "Phase 3: Festival Day Coordination & Crowd Logistics",
        order: 3,
        tasks: [
          {
            title: "Verify Volunteer Marshals at All Gate Checkpoints",
            priority: "high" as const,
            daysBeforeEvent: 1,
            assigneeRole: "Security Chief",
          },
          {
            title: "Execute Eco-Friendly Firework Finale & Site Clean-Up",
            priority: "medium" as const,
            daysBeforeEvent: 0,
            assigneeRole: "Safety Team",
          },
        ],
      },
    ];

    recommendedVendors = [
      {
        category: "Festive Catering",
        name: "Maharaja Community Bhojan Services",
        estimatedCost: Math.round(b * 0.28),
        matchScore: 98,
        reason: `Proven track record cooking authentic festive banquets for ${input.guestCount} guests in ${input.city}.`,
      },
      {
        category: "Festive Production",
        name: "Utsav Cultural Rigging & Sound",
        estimatedCost: Math.round(b * 0.14),
        matchScore: 96,
        reason: "Permit-ready festival sound systems with directional acoustic barriers.",
      },
      {
        category: "Lighting & Rangoli",
        name: "Rangoli Heritage Artisans",
        estimatedCost: Math.round(b * 0.12),
        matchScore: 95,
        reason: "Organic flower petals and biodegradable dyes crafted by traditional artisans.",
      },
    ];

    themeMoodboard = {
      paletteNames: [
        "Deep Terracotta",
        "Celebration Sunset Orange",
        "Royal Gold",
        "Pristine Canvas",
      ],
      colorHexes: ["#2C3E50", "#E67E22", "#F1C40F", "#F8F9FA"],
      decorConcept: `${input.styleVibe} celebration with marigold festoons, brass deepams, handcrafted torans, and grand community dining spaces.`,
      signatureCocktailOrMenu:
        "Traditional Kesar Thandai & Masala Chai paired with artisanal festive samosas.",
    };

    riskMatrix = [
      {
        risk: "Crowd surge during headline cultural performance",
        level: "high" as const,
        contingency: "Staggered queue management and separate barricaded family seating enclosure.",
      },
      {
        risk: "Power overload from concurrent stage lighting & food warmers",
        level: "medium" as const,
        contingency: "Dual redundant silent diesel generators with auto-synchronization switch.",
      },
    ];
  } else {
    // Corporate or Generic Social Gala
    rawBudgetCategories = isCorporate
      ? [
          {
            name: "Keynote Auditorium & Exhibition Halls",
            percentage: 38,
            allocated: Math.round(b * 0.38),
            icon: "domain",
            items: [
              {
                name: "Main Stage & Breakout Rooms",
                estimated: Math.round(b * 0.3),
                status: "Pending",
              },
              {
                name: "VIP Lounge & Speaker Suite",
                estimated: Math.round(b * 0.08),
                status: "Pending",
              },
            ],
          },
          {
            name: "Corporate Hospitality & Gala Dinner",
            percentage: 30,
            allocated: Math.round(b * 0.3),
            icon: "restaurant",
            items: [
              {
                name: "Plated 3-Course Executive Dinner",
                estimated: Math.round(b * 0.22),
                status: "Pending",
              },
              {
                name: "Continuous Coffee & Networking Breaks",
                estimated: Math.round(b * 0.08),
                status: "Pending",
              },
            ],
          },
          {
            name: "Technical Production & Stage AV",
            percentage: 20,
            allocated: Math.round(b * 0.2),
            icon: "lightbulb",
            items: [
              {
                name: "LED Wall & Stage Projection Mapping",
                estimated: Math.round(b * 0.15),
                status: "Pending",
              },
              {
                name: "Livestream & Recording Unit",
                estimated: Math.round(b * 0.05),
                status: "Pending",
              },
            ],
          },
          {
            name: "Attendee Swag & Return Gifting",
            percentage: 12,
            allocated: Math.round(b * 0.12),
            icon: "redeem",
            items: [
              {
                name: "Artisanal Premium Attendee Kits",
                estimated: Math.round(b * 0.12),
                status: "Pending",
              },
            ],
          },
        ]
      : [
          {
            name: "Venue & Atmosphere",
            percentage: 40,
            allocated: Math.round(b * 0.4),
            icon: "domain",
            items: [
              {
                name: "Private Lounge or Villa Reservation",
                estimated: Math.round(b * 0.4),
                status: "Pending",
              },
            ],
          },
          {
            name: "Food, Cake & Craft Beverages",
            percentage: 35,
            allocated: Math.round(b * 0.35),
            icon: "restaurant",
            items: [
              {
                name: "Bespoke Dessert Station & Multi-Tier Cake",
                estimated: Math.round(b * 0.15),
                status: "Pending",
              },
              {
                name: "Artisanal Finger Food & Mocktail Bar",
                estimated: Math.round(b * 0.2),
                status: "Pending",
              },
            ],
          },
          {
            name: "Themed Decor & Photo Installations",
            percentage: 15,
            allocated: Math.round(b * 0.15),
            icon: "local_florist",
            items: [
              {
                name: "Interactive Photo Booth & Neon Balloon Arch",
                estimated: Math.round(b * 0.15),
                status: "Pending",
              },
            ],
          },
          {
            name: "Entertainment & Activities",
            percentage: 10,
            allocated: Math.round(b * 0.1),
            icon: "music_note",
            items: [
              {
                name: "DJ Console or Live Magic Show",
                estimated: Math.round(b * 0.1),
                status: "Pending",
              },
            ],
          },
        ];

    phases = [
      {
        title: "Phase 1: Foundation & Contracts",
        order: 1,
        tasks: [
          {
            title: "Finalize Master Budget Allocations",
            priority: "high" as const,
            daysBeforeEvent: 90,
            assigneeRole: "Lead Coordinator",
          },
          {
            title: "Review & Sign Venue Contract",
            priority: "high" as const,
            daysBeforeEvent: 80,
            assigneeRole: "Owner",
          },
          {
            title: "Confirm Catering Menu Tastings",
            priority: "medium" as const,
            daysBeforeEvent: 60,
            assigneeRole: "Hospitality Lead",
          },
        ],
      },
      {
        title: "Phase 2: Creative & Production Lock",
        order: 2,
        tasks: [
          {
            title: "Finalize Spatial Decor Mockups",
            priority: "medium" as const,
            daysBeforeEvent: 45,
            assigneeRole: "Decor Stylist",
          },
          {
            title: "Dispatch Save-the-Date Invitations",
            priority: "high" as const,
            daysBeforeEvent: 40,
            assigneeRole: "Communications",
          },
          {
            title: "Confirm Technical AV & Sound Rigging",
            priority: "medium" as const,
            daysBeforeEvent: 30,
            assigneeRole: "Production Lead",
          },
        ],
      },
      {
        title: "Phase 3: Final Countdown & Day-Of Run Sheet",
        order: 3,
        tasks: [
          {
            title: "Reconcile Final Guest RSVP Counts",
            priority: "high" as const,
            daysBeforeEvent: 14,
            assigneeRole: "Guest Relations",
          },
          {
            title: "Lock Table Seating Chart",
            priority: "medium" as const,
            daysBeforeEvent: 7,
            assigneeRole: "Lead Coordinator",
          },
          {
            title: "Conduct Full Rehearsal & Vendor Soundcheck",
            priority: "high" as const,
            daysBeforeEvent: 1,
            assigneeRole: "Stage Manager",
          },
        ],
      },
    ];

    recommendedVendors = [
      {
        category: "Catering",
        name: "Artisan Epicurean Banquets",
        estimatedCost: Math.round(b * 0.25),
        matchScore: 98,
        reason: `Signature ${input.styleVibe} culinary expertise matched for ${input.guestCount} guests in ${input.city}.`,
      },
      {
        category: "Photography",
        name: "Aether & Light Studio",
        estimatedCost: Math.round(b * 0.08),
        matchScore: 96,
        reason: "Acclaimed fine-art framing and high-contrast ambient coverage.",
      },
      {
        category: "Decor",
        name: "Botanica Luxury Event Florals",
        estimatedCost: Math.round(b * 0.15),
        matchScore: 95,
        reason: "Custom structural installations using sustainable seasonal botanicals.",
      },
    ];

    themeMoodboard = {
      paletteNames: ["Imperial Navy", "Celebration Sunset Orange", "Royal Gold", "Warm Pearl"],
      colorHexes: ["#2C3E50", "#E67E22", "#F1C40F", "#F8F9FA"],
      decorConcept: `${input.styleVibe} aesthetic featuring layered tactile textures, floating candles, brass artifacts, and warm lighting.`,
      signatureCocktailOrMenu: "Saffron Rose Spritz paired with artisanal appetizers.",
    };

    riskMatrix = [
      {
        risk: "Weather disruption for outdoor lawns",
        level: "medium" as const,
        contingency:
          "Pre-contracted transparent marquee pavilion on standby with 24-hour trigger window.",
      },
      {
        risk: "Peak season vendor availability crunch",
        level: "high" as const,
        contingency:
          "Automated booking locks secured with 20% token advances across all critical path vendors.",
      },
    ];
  }

  const budgetCategories = reconcileBudgetAllocations(b, rawBudgetCategories);

  return {
    title: input.title,
    summary: `A high-caliber ${input.styleVibe} celebration designed for ${input.guestCount} guests in ${input.city}. Optimized for effortless logistics and unforgettable memories.`,
    planHealth: 95,
    budgetCategories,
    phases,
    recommendedVendors,
    themeMoodboard,
    riskMatrix,
  };
}
