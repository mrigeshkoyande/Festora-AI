import { z } from "zod";

export interface PlanGenerationInput {
  eventType: string; // "Wedding" | "Corporate" | "Social"
  title: string;
  targetDate: string;
  city: string;
  guestCount: number;
  totalBudget: number;
  currency: string;
  styleVibe: string;
  priorities?: string[];
  specialNeeds?: string;
}

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
        })
      ),
    })
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
        })
      ),
    })
  ),
  recommendedVendors: z.array(
    z.object({
      category: z.string(),
      name: z.string(),
      estimatedCost: z.number(),
      matchScore: z.number(),
      reason: z.string(),
    })
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
    })
  ),
});

export type GeneratedPlan = z.infer<typeof GeneratedPlanSchema>;

export async function generateEventPlan(input: PlanGenerationInput): Promise<GeneratedPlan> {
  const apiKey = process.env.GEMINI_API_KEY;

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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      if (response.ok) {
        const jsonRes = await response.json();
        const rawText = jsonRes.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          const validated = GeneratedPlanSchema.safeParse(parsed);
          if (validated.success) {
            return validated.data;
          }
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to deterministic planning engine:", err);
    }
  }

  // High-fidelity deterministic generative engine
  return generateDeterministicPlan(input);
}

function generateDeterministicPlan(input: PlanGenerationInput): GeneratedPlan {
  const b = input.totalBudget;
  const isWedding = input.eventType.toLowerCase().includes("wedding");
  const isCorporate = input.eventType.toLowerCase().includes("corporate");

  // Dynamic percentage allocation summing exactly to 100%
  const budgetCategories = isWedding
    ? [
        {
          name: "Venue & Palace Pavilions",
          percentage: 35,
          allocated: Math.round(b * 0.35),
          icon: "domain",
          items: [
            { name: "Courtyard & Banquet Lawn Hire", estimated: Math.round(b * 0.25), status: "Pending" },
            { name: "Guest Accommodation Block", estimated: Math.round(b * 0.10), status: "Pending" },
          ],
        },
        {
          name: "Culinary Banquets & Bar Service",
          percentage: 28,
          allocated: Math.round(b * 0.28),
          icon: "restaurant",
          items: [
            { name: "Grand Multi-Cuisine Wedding Feast", estimated: Math.round(b * 0.20), status: "Pending" },
            { name: "Live Chaat & Regional Specialty Counters", estimated: Math.round(b * 0.08), status: "Pending" },
          ],
        },
        {
          name: "Floral Architecture & Mandap Scenography",
          percentage: 18,
          allocated: Math.round(b * 0.18),
          icon: "local_florist",
          items: [
            { name: "Vedic Mandap with Fresh Lotus & Marigolds", estimated: Math.round(b * 0.12), status: "Pending" },
            { name: "Ambient Fairy Light Tunnel & Entry Archway", estimated: Math.round(b * 0.06), status: "Pending" },
          ],
        },
        {
          name: "Cinematic Photography & Drones",
          percentage: 11,
          allocated: Math.round(b * 0.11),
          icon: "photo_camera",
          items: [
            { name: "3-Day Wedding Docufilm & Aerial Drone Unit", estimated: Math.round(b * 0.08), status: "Pending" },
            { name: "Fine-Art Couple Portrait Sessions", estimated: Math.round(b * 0.03), status: "Pending" },
          ],
        },
        {
          name: "Live Entertainment & Sound",
          percentage: 8,
          allocated: Math.round(b * 0.08),
          icon: "music_note",
          items: [
            { name: "Sangeet DJ & Audio Rigging", estimated: Math.round(b * 0.05), status: "Pending" },
            { name: "Traditional Folk Musicians & Shehnai Troupe", estimated: Math.round(b * 0.03), status: "Pending" },
          ],
        },
      ]
    : isCorporate
    ? [
        {
          name: "Keynote Auditorium & Exhibition Halls",
          percentage: 38,
          allocated: Math.round(b * 0.38),
          icon: "domain",
          items: [
            { name: "Main Stage & Breakout Rooms", estimated: Math.round(b * 0.30), status: "Pending" },
            { name: "VIP Lounge & Speaker Suite", estimated: Math.round(b * 0.08), status: "Pending" },
          ],
        },
        {
          name: "Corporate Hospitality & Gala Dinner",
          percentage: 30,
          allocated: Math.round(b * 0.30),
          icon: "restaurant",
          items: [
            { name: "Plated 3-Course Executive Dinner", estimated: Math.round(b * 0.22), status: "Pending" },
            { name: "Continuous Coffee & Networking Breaks", estimated: Math.round(b * 0.08), status: "Pending" },
          ],
        },
        {
          name: "Technical Production & Stage AV",
          percentage: 20,
          allocated: Math.round(b * 0.20),
          icon: "lightbulb",
          items: [
            { name: "LED Wall & Stage Projection Mapping", estimated: Math.round(b * 0.15), status: "Pending" },
            { name: "Livestream & Recording Unit", estimated: Math.round(b * 0.05), status: "Pending" },
          ],
        },
        {
          name: "Attendee Swag & Return Gifting",
          percentage: 12,
          allocated: Math.round(b * 0.12),
          icon: "redeem",
          items: [
            { name: "Artisanal Premium Attendee Kits", estimated: Math.round(b * 0.12), status: "Pending" },
          ],
        },
      ]
    : [
        {
          name: "Venue & Atmosphere",
          percentage: 40,
          allocated: Math.round(b * 0.40),
          icon: "domain",
          items: [
            { name: "Private Lounge or Villa Reservation", estimated: Math.round(b * 0.40), status: "Pending" },
          ],
        },
        {
          name: "Food, Cake & Craft Beverages",
          percentage: 35,
          allocated: Math.round(b * 0.35),
          icon: "restaurant",
          items: [
            { name: "Bespoke Dessert Station & Multi-Tier Cake", estimated: Math.round(b * 0.15), status: "Pending" },
            { name: "Artisanal Finger Food & Mocktail Bar", estimated: Math.round(b * 0.20), status: "Pending" },
          ],
        },
        {
          name: "Themed Decor & Photo Installations",
          percentage: 15,
          allocated: Math.round(b * 0.15),
          icon: "local_florist",
          items: [
            { name: "Interactive Photo Booth & Neon Balloon Arch", estimated: Math.round(b * 0.15), status: "Pending" },
          ],
        },
        {
          name: "Entertainment & Activities",
          percentage: 10,
          allocated: Math.round(b * 0.10),
          icon: "music_note",
          items: [
            { name: "DJ Console or Live Magic Show", estimated: Math.round(b * 0.10), status: "Pending" },
          ],
        },
      ];

  const phases = [
    {
      title: "Phase 1: Foundation & Contracts",
      order: 1,
      tasks: [
        { title: "Finalize Master Budget Allocations", priority: "high" as const, daysBeforeEvent: 90, assigneeRole: "Lead Coordinator" },
        { title: "Review & Sign Venue Contract", priority: "high" as const, daysBeforeEvent: 80, assigneeRole: "Owner" },
        { title: "Confirm Catering Menu Tastings", priority: "medium" as const, daysBeforeEvent: 60, assigneeRole: "Hospitality Lead" },
      ],
    },
    {
      title: "Phase 2: Creative & Production Lock",
      order: 2,
      tasks: [
        { title: "Finalize Spatial Decor Mockups", priority: "medium" as const, daysBeforeEvent: 45, assigneeRole: "Decor Stylist" },
        { title: "Dispatch Save-the-Date Invitations", priority: "high" as const, daysBeforeEvent: 40, assigneeRole: "Communications" },
        { title: "Confirm Technical AV & Sound Rigging", priority: "medium" as const, daysBeforeEvent: 30, assigneeRole: "Production Lead" },
      ],
    },
    {
      title: "Phase 3: Final Countdown & Day-Of Run Sheet",
      order: 3,
      tasks: [
        { title: "Reconcile Final Guest RSVP Counts", priority: "high" as const, daysBeforeEvent: 14, assigneeRole: "Guest Relations" },
        { title: "Lock Table Seating Chart", priority: "medium" as const, daysBeforeEvent: 7, assigneeRole: "Lead Coordinator" },
        { title: "Conduct Full Rehearsal & Vendor Soundcheck", priority: "high" as const, daysBeforeEvent: 1, assigneeRole: "Stage Manager" },
      ],
    },
  ];

  const recommendedVendors = [
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

  const themeMoodboard = {
    paletteNames: ["Imperial Navy", "Celebration Sunset Orange", "Royal Gold", "Warm Pearl"],
    colorHexes: ["#2C3E50", "#E67E22", "#F1C40F", "#F8F9FA"],
    decorConcept: `${input.styleVibe} aesthetic featuring layered tactile textures, floating candles, brass artifacts, and warm lighting.`,
    signatureCocktailOrMenu: "Saffron Rose Spritz paired with royal smoked appetizers.",
  };

  const riskMatrix = [
    {
      risk: "Weather disruption for outdoor lawns",
      level: "medium" as const,
      contingency: "Pre-contracted transparent marquee pavilion on standby with 24-hour trigger window.",
    },
    {
      risk: "Peak season vendor availability crunch",
      level: "high" as const,
      contingency: "Automated booking locks secured with 20% token advances across all critical path vendors.",
    },
    {
      risk: "Special dietary clashes (Jain / Vegan)",
      level: "medium" as const,
      contingency: "Dedicated separated prep zone and clearly marked color-coded allergen signage.",
    },
  ];

  return {
    title: input.title,
    summary: `A high-caliber ${input.styleVibe} celebration designed for ${input.guestCount} guests in ${input.city}. Optimized for effortless logistics and unforgettable memories.`,
    planHealth: 94,
    budgetCategories,
    phases,
    recommendedVendors,
    themeMoodboard,
    riskMatrix,
  };
}
