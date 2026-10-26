/**
 * Festora AI — Shared Runtime Validation Schemas (Zod)
 * Validates inputs at important trust boundaries.
 */

import { z } from "zod";

export const PlanGenerationRequestSchema = z.object({
  eventType: z.string().min(2, "Event type is required").max(50),
  title: z.string().min(2, "Event title is required").max(100),
  targetDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid target date format",
  }),
  city: z.string().min(2, "City is required").max(100),
  guestCount: z.number().int().min(1, "At least 1 guest required").max(25000, "Guest count exceeds limit"),
  totalBudget: z.number().min(1000, "Minimum budget is 1,000").max(1000000000, "Budget exceeds limit"),
  currency: z.string().min(3).max(3).default("INR"),
  styleVibe: z.string().max(100).default("Royal Heritage"),
  specialNeeds: z.string().max(500).optional().default(""),
});

export type PlanGenerationRequest = z.infer<typeof PlanGenerationRequestSchema>;

export const GuestRosterSchema = z.object({
  name: z.string().min(2, "Name required").max(100),
  side: z.enum(["Bride's Side", "Groom's Side", "Mutual", "VIP", "Corporate"]),
  dietary: z.enum(["Jain Pure Veg", "Rajasthani Vegetarian", "Non-Vegetarian", "Vegan", "Continental"]),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  rsvpStatus: z.enum(["confirmed", "pending", "declined"]).default("pending"),
});

export type GuestRosterInput = z.infer<typeof GuestRosterSchema>;

export const TaskUpdateSchema = z.object({
  taskId: z.string().min(1),
  status: z.enum(["todo", "in_progress", "completed"]),
});

export const BudgetAdjustmentSchema = z.object({
  categoryName: z.string().min(1),
  percentage: z.number().min(0).max(100),
});
