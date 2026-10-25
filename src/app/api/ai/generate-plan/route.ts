import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateEventPlan } from "@/lib/ai/provider";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      eventType = "Wedding",
      title = "New Celebration",
      targetDate = new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
      city = "Jaipur, Rajasthan",
      guestCount = 150,
      totalBudget = 4500000,
      currency = "INR",
      styleVibe = "Royal Heritage",
      specialNeeds = "",
    } = body;

    // 1. Generate Plan via AI
    const plan = await generateEventPlan({
      eventType,
      title,
      targetDate,
      city,
      guestCount,
      totalBudget,
      currency,
      styleVibe,
      specialNeeds,
    });

    // 2. Fetch or create default workspace
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

    // 3. Persist Event into DB
    const newEvent = await db.event.create({
      data: {
        workspaceId: workspace.id,
        title: plan.title,
        type: eventType,
        targetDate: new Date(targetDate),
        city,
        guestCount,
        currency,
        totalBudget,
        spentBudget: 0,
        styleVibe,
        planHealth: plan.planHealth,
        specialNeeds,
        coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000",
      },
    });

    // 4. Persist Budget Categories & Items
    for (const cat of plan.budgetCategories) {
      const createdCat = await db.budgetCategory.create({
        data: {
          eventId: newEvent.id,
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

    // 5. Persist Phases & Tasks
    for (const phase of plan.phases) {
      const createdPhase = await db.phase.create({
        data: {
          eventId: newEvent.id,
          title: phase.title,
          order: phase.order,
          status: phase.order === 1 ? "In Progress" : "Upcoming",
        },
      });

      if (phase.tasks && phase.tasks.length > 0) {
        await db.task.createMany({
          data: phase.tasks.map((t, idx) => {
            const dueDate = new Date(targetDate);
            dueDate.setDate(dueDate.getDate() - t.daysBeforeEvent);
            return {
              eventId: newEvent.id,
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

    // 6. Persist AIGeneration Record
    await db.aIGeneration.create({
      data: {
        eventId: newEvent.id,
        feature: "planner",
        prompt: JSON.stringify(body),
        response: JSON.stringify(plan),
        tokens: 850,
        cost: 0.0012,
        status: "success",
      },
    });

    return NextResponse.json({
      success: true,
      eventId: newEvent.id,
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
