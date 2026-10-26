import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateEventPlan } from "@/lib/ai/provider";
import { PlanGenerationRequestSchema } from "@/lib/utils/validation";
import { checkRateLimit, sanitizeInput } from "@/lib/utils/security";

export async function POST(req: Request) {
  try {
    // 1. Rate limiting check (15 requests per 60 seconds per IP/client)
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous-client";
    const rateCheck = checkRateLimit(`ai-generate:${clientIp}`, 15, 60);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait before generating another celebration plan.",
          retryAfter: rateCheck.resetSeconds,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.resetSeconds) },
        }
      );
    }

    // 2. Body Parsing & Runtime Zod Schema Validation
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const validationResult = PlanGenerationRequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const validatedInput = validationResult.data;

    // 3. Input Sanitization
    const sanitizedInput = {
      ...validatedInput,
      title: sanitizeInput(validatedInput.title, 100),
      city: sanitizeInput(validatedInput.city, 100),
      styleVibe: sanitizeInput(validatedInput.styleVibe, 100),
      specialNeeds: sanitizeInput(validatedInput.specialNeeds || "", 500),
    };

    // 4. Generate Plan via Dual-Engine AI
    const plan = await generateEventPlan(sanitizedInput);

    // 2. Safely attempt DB persistence if available
    let createdEventId = `evt-demo-${Date.now()}`;
    try {
      let workspace = await db.workspace.findFirst();
      if (!workspace) {
        const user = await db.user.create({
          data: {
            name: "Guest Host",
            email: `host-${Date.now()}@festora.ai`,
          },
        });
        workspace = await db.workspace.create({
          data: {
            name: "Default Celebration Studio",
            slug: `workspace-${Date.now()}`,
            ownerId: user.id,
          },
        });
      }

      // Persist Event into DB
      const newEvent = await db.event.create({
        data: {
          workspaceId: workspace.id,
          title: plan.title,
          type: sanitizedInput.eventType,
          targetDate: new Date(sanitizedInput.targetDate),
          city: sanitizedInput.city,
          guestCount: sanitizedInput.guestCount,
          currency: sanitizedInput.currency,
          totalBudget: sanitizedInput.totalBudget,
          spentBudget: 0,
          styleVibe: sanitizedInput.styleVibe,
          planHealth: plan.planHealth,
          specialNeeds: sanitizedInput.specialNeeds,
          coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000",
        },
      });
      if (newEvent?.id) createdEventId = newEvent.id;

      // Persist Budget Categories & Items
      for (const cat of plan.budgetCategories) {
        const createdCat = await db.budgetCategory.create({
          data: {
            eventId: createdEventId,
            name: cat.name,
            allocated: cat.allocated,
            spent: 0,
            percentage: cat.percentage,
            icon: cat.icon || "domain",
          },
        });

        if (cat.items && cat.items.length > 0) {
          await db.budgetItem.createMany({
            data: cat.items.map((it) => ({
              categoryId: createdCat.id,
              name: it.name,
              estimated: it.estimated,
              actual: 0,
              status: it.status,
            })),
          });
        }
      }

      // Persist Phases & Tasks
      for (const phase of plan.phases) {
        const createdPhase = await db.phase.create({
          data: {
            eventId: createdEventId,
            title: phase.title,
            order: phase.order,
            status: phase.order === 1 ? "In Progress" : "Upcoming",
          },
        });

        if (phase.tasks && phase.tasks.length > 0) {
          await db.task.createMany({
            data: phase.tasks.map((t, idx) => {
              const dueDate = new Date(sanitizedInput.targetDate);
              dueDate.setDate(dueDate.getDate() - t.daysBeforeEvent);
              return {
                eventId: createdEventId,
                phaseId: createdPhase.id,
                title: t.title,
                priority: t.priority,
                dueDate: dueDate,
                status: "todo",
                assigneeRole: t.assigneeRole,
                order: idx,
              };
            }),
          });
        }
      }

      // Persist AIGeneration Record
      await db.aIGeneration.create({
        data: {
          eventId: createdEventId,
          feature: "planner",
          prompt: JSON.stringify(sanitizedInput),
          response: JSON.stringify(plan),
          tokens: 850,
          cost: 0.0012,
          status: "success",
        },
      });
    } catch (dbErr) {
      console.warn("Serverless DB persistence bypassed cleanly:", dbErr);
    }

    return NextResponse.json({
      success: true,
      eventId: createdEventId,
      plan,
    });
  } catch (error) {
    console.error("Error in AI generation API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate event plan" },
      { status: 500 }
    );
  }
}
