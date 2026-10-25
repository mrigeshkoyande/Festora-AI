import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Festora AI database...");

  // 1. Create Demo User & Workspace
  const user = await prisma.user.upsert({
    where: { email: "priya.sharma@festora.ai" },
    update: {},
    create: {
      name: "Priya Sharma",
      email: "priya.sharma@festora.ai",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: "priya-festora-studio" },
    update: {},
    create: {
      name: "Priya's Celebration Studio",
      slug: "priya-festora-studio",
      ownerId: user.id,
    },
  });

  await prisma.membership.upsert({
    where: { userId_workspaceId: { userId: user.id, workspaceId: workspace.id } },
    update: {},
    create: {
      userId: user.id,
      workspaceId: workspace.id,
      role: "Owner",
    },
  });

  // 2. Demo Event 1: 150-Guest Jaipur Royal Wedding
  const targetDate1 = new Date();
  targetDate1.setDate(targetDate1.getDate() + 47); // 47 days to go!

  const event1 = await prisma.event.create({
    data: {
      workspaceId: workspace.id,
      title: "Ananya & Rohan's Royal Wedding Celebration",
      type: "Wedding",
      targetDate: targetDate1,
      city: "Jaipur, Rajasthan",
      guestCount: 150,
      currency: "INR",
      totalBudget: 4500000, // ₹45 Lakhs
      spentBudget: 2850000,
      styleVibe: "Royal Heritage",
      planHealth: 92,
      coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop",
      specialNeeds: "Marwari welcome procession with dholaks, dedicated Jain catering counter, drone permit for Samode Palace.",
    },
  });

  // Budget Categories for Event 1
  const catVenue = await prisma.budgetCategory.create({
    data: {
      eventId: event1.id,
      name: "Venue & Palace Rentals",
      allocated: 1600000,
      spent: 1450000,
      percentage: 35.5,
      icon: "domain",
    },
  });

  const catCatering = await prisma.budgetCategory.create({
    data: {
      eventId: event1.id,
      name: "Royal Catering & Bar",
      allocated: 1200000,
      spent: 800000,
      percentage: 26.6,
      icon: "restaurant",
    },
  });

  const catDecor = await prisma.budgetCategory.create({
    data: {
      eventId: event1.id,
      name: "Mandap & Floral Artistry",
      allocated: 800000,
      spent: 400000,
      percentage: 17.8,
      icon: "local_florist",
    },
  });

  const catPhoto = await prisma.budgetCategory.create({
    data: {
      eventId: event1.id,
      name: "Photography & Cinematography",
      allocated: 500000,
      spent: 200000,
      percentage: 11.1,
      icon: "photo_camera",
    },
  });

  const catMusic = await prisma.budgetCategory.create({
    data: {
      eventId: event1.id,
      name: "Entertainment & Live Folk Band",
      allocated: 400000,
      spent: 0,
      percentage: 9.0,
      icon: "music_note",
    },
  });

  // Budget Items
  await prisma.budgetItem.createMany({
    data: [
      { categoryId: catVenue.id, name: "Palace Courtyard & Ballroom Deposit", estimated: 1200000, actual: 1200000, status: "Paid" },
      { categoryId: catVenue.id, name: "Luxury Guest Suites Booking (30 rooms)", estimated: 400000, actual: 250000, status: "Committed" },
      { categoryId: catCatering.id, name: "Multi-Cuisine Sangeet & Reception Banquets", estimated: 950000, actual: 800000, status: "Paid" },
      { categoryId: catCatering.id, name: "Traditional Rajasthani & Jain Food Stalls", estimated: 250000, actual: 0, status: "Pending" },
      { categoryId: catDecor.id, name: "Mandap Floral Rigging & Royal Drapery", estimated: 500000, actual: 400000, status: "Paid" },
      { categoryId: catPhoto.id, name: "Documentary Wedding & Drone Videography", estimated: 500000, actual: 200000, status: "Committed" },
      { categoryId: catMusic.id, name: "Manganiyar Folk Troupe & DJ Console", estimated: 400000, actual: 0, status: "Pending" },
    ],
  });

  // Phases & Tasks for Event 1
  const phase1 = await prisma.phase.create({
    data: { eventId: event1.id, title: "Phase 1: Conceptualization & Venue Lock", order: 1, status: "Completed", dateRange: "Days 1-30" },
  });
  const phase2 = await prisma.phase.create({
    data: { eventId: event1.id, title: "Phase 2: Vendor Curation & Food Tastings", order: 2, status: "In Progress", dateRange: "Days 31-90" },
  });
  const phase3 = await prisma.phase.create({
    data: { eventId: event1.id, title: "Phase 3: Production Design & Seating", order: 3, status: "Upcoming", dateRange: "Days 91-180" },
  });

  const dueTomorrow = new Date();
  dueTomorrow.setDate(dueTomorrow.getDate() + 1);

  const dueIn3Days = new Date();
  dueIn3Days.setDate(dueIn3Days.getDate() + 3);

  await prisma.task.createMany({
    data: [
      { eventId: event1.id, phaseId: phase1.id, title: "Finalize Royal Heritage Master Budget", dueDate: new Date(), status: "done", priority: "high", assigneeName: "Priya Sharma", assigneeRole: "Lead Planner" },
      { eventId: event1.id, phaseId: phase1.id, title: "Sign Samode Palace Venue Contract", dueDate: new Date(), status: "done", priority: "high", assigneeName: "Rohan Verma", assigneeRole: "Groom" },
      { eventId: event1.id, phaseId: phase2.id, title: "Review lighting and sound contractor contract", dueDate: dueTomorrow, status: "todo", priority: "high", assigneeName: "Priya Sharma", assigneeRole: "Lead Planner" },
      { eventId: event1.id, phaseId: phase2.id, title: "Send dietary restrictions to catering team", dueDate: dueIn3Days, status: "todo", priority: "medium", assigneeName: "Ananya Mehta", assigneeRole: "Bride" },
      { eventId: event1.id, phaseId: phase2.id, title: "Confirm Manganiyar folk artists arrival slot", dueDate: dueIn3Days, status: "todo", priority: "medium", assigneeName: "Priya Sharma", assigneeRole: "Lead Planner" },
      { eventId: event1.id, phaseId: phase3.id, title: "Finalize VIP seating chart for courtyard dinner", dueDate: targetDate1, status: "todo", priority: "high", assigneeName: "Priya Sharma", assigneeRole: "Lead Planner" },
    ],
  });

  // Guest Groups & Guests for Event 1
  const groupFamily = await prisma.guestGroup.create({
    data: { eventId: event1.id, name: "Immediate Family", color: "navy" },
  });
  const groupFriends = await prisma.guestGroup.create({
    data: { eventId: event1.id, name: "College Friends", color: "orange" },
  });
  const groupVIP = await prisma.guestGroup.create({
    data: { eventId: event1.id, name: "VIP Dignitaries", color: "gold" },
  });

  const table1 = await prisma.seatingTable.create({
    data: { eventId: event1.id, number: 1, name: "Royal Pavilion Table 1", capacity: 8, shape: "round", xCoord: 120, yCoord: 150 },
  });
  const table2 = await prisma.seatingTable.create({
    data: { eventId: event1.id, number: 2, name: "Courtyard Terrace Table 2", capacity: 10, shape: "rectangular", xCoord: 300, yCoord: 150 },
  });

  await prisma.guest.createMany({
    data: [
      { eventId: event1.id, groupId: groupVIP.id, name: "Vikramaditya Singhania", email: "v.singhania@rajasthan.gov.in", rsvpStatus: "Confirmed", mealPreference: "Rajasthani Thali", plusOneName: "Sunita Singhania", tableId: table1.id },
      { eventId: event1.id, groupId: groupFamily.id, name: "Rajesh & Meena Mehta", email: "rajesh.mehta@gmail.com", rsvpStatus: "Confirmed", mealPreference: "Jain Pure Veg", plusOneName: "Meena Mehta", tableId: table1.id },
      { eventId: event1.id, groupId: groupFriends.id, name: "Kabir Malhotra", email: "kabir.m@techcorp.in", rsvpStatus: "Pending", mealPreference: "Continental", plusOneName: "Rhea Sen", tableId: table2.id },
      { eventId: event1.id, groupId: groupFriends.id, name: "Zoya Akhtar", email: "zoya@designstudio.in", rsvpStatus: "Confirmed", mealPreference: "Vegan", tableId: table2.id },
      { eventId: event1.id, groupId: groupFamily.id, name: "Ashok Verma", email: "ashok.verma@vermagroup.com", rsvpStatus: "Declined", mealPreference: "Vegetarian" },
    ],
  });

  // Run Sheet for Event 1
  await prisma.runSheetItem.createMany({
    data: [
      { eventId: event1.id, timeSlot: "15:00 - 16:30", title: "Baraat Procession & Dholak Welcome", description: "Baraat arrives at the Elephant Gate with royal chobdars and Manganiyar musicians.", leadContact: "Rohan Verma", phoneContact: "+91 98201 12345", status: "Scheduled", order: 1 },
      { eventId: event1.id, timeSlot: "16:30 - 17:30", title: "Varmala & High Tea Service", description: "Exchange of garlands at the lotus pond pavilion followed by Rajasthani high tea.", leadContact: "Priya Sharma", phoneContact: "+91 98190 54321", status: "Scheduled", order: 2 },
      { eventId: event1.id, timeSlot: "17:45 - 19:30", title: "Traditional Vedic Pheras", description: "Sacred fire rituals at the handcrafted floral mandap.", leadContact: "Pandit Shastri", phoneContact: "+91 98222 33445", status: "Scheduled", order: 3 },
      { eventId: event1.id, timeSlot: "20:00 - 23:30", title: "Royal Gala Reception & Live Music", description: "Dinner buffet with 45 culinary specialities and live sitar-tabla fusion.", leadContact: "Chef Laurent", phoneContact: "+91 98333 44556", status: "Scheduled", order: 4 },
    ],
  });

  // 3. Demo Event 2: 7-Year-Old's Superhero Carnival Birthday
  const targetDate2 = new Date();
  targetDate2.setDate(targetDate2.getDate() + 14);

  await prisma.event.create({
    data: {
      workspaceId: workspace.id,
      title: "Arjun's 7th Superhero Adventure Carnival",
      type: "Social",
      targetDate: targetDate2,
      city: "Bengaluru, Karnataka",
      guestCount: 65,
      currency: "INR",
      totalBudget: 450000,
      spentBudget: 310000,
      styleVibe: "Neon Futuristic",
      planHealth: 95,
      coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop",
      specialNeeds: "Nut-free cupcake bar, magic show setup, bouncy castle safety certification.",
    },
  });

  // 4. Demo Event 3: Neighbourhood Diwali Mela & Cultural Festival
  const targetDate3 = new Date();
  targetDate3.setDate(targetDate3.getDate() + 75);

  await prisma.event.create({
    data: {
      workspaceId: workspace.id,
      title: "Gulmohar Park Grand Diwali Mela 2024",
      type: "Social",
      targetDate: targetDate3,
      city: "New Delhi",
      guestCount: 600,
      currency: "INR",
      totalBudget: 1800000,
      spentBudget: 850000,
      styleVibe: "Botanical Garden",
      planHealth: 88,
      coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
      specialNeeds: "Eco-friendly diya lighting display, fire safety clearance, multi-lingual signage.",
    },
  });

  // 5. Vendor Categories & 60+ Curated Vendors across 6 Indian Cities
  const vendorCategories = [
    { name: "Palaces & Banquet Venues", icon: "domain" },
    { name: "Catering & Gastronomy", icon: "restaurant" },
    { name: "Photography & Cinema", icon: "photo_camera" },
    { name: "Floral & Spatial Decor", icon: "local_florist" },
    { name: "Music, Bands & DJs", icon: "music_note" },
    { name: "Invitations & Stationery", icon: "mail" },
    { name: "Bridal Couture & Styling", icon: "checkroom" },
    { name: "Lighting & Technical AV", icon: "lightbulb" },
    { name: "Mixology & Craft Bars", icon: "local_bar" },
    { name: "Artisanal Return Gifts", icon: "redeem" },
    { name: "Hospitality & Guest Valet", icon: "directions_car" },
    { name: "Celebrity Talent & MCs", icon: "mic" },
  ];

  const catRecords: Record<string, string> = {};
  for (const c of vendorCategories) {
    const rec = await prisma.vendorCategory.upsert({
      where: { name: c.name },
      update: {},
      create: { name: c.name, icon: c.icon },
    });
    catRecords[c.name] = rec.id;
  }

  const cities = ["Jaipur", "Udaipur", "Mumbai", "New Delhi", "Bengaluru", "Goa"];
  const vendorsData = [
    // Palaces & Banquet Venues
    { name: "Samode Palace & Heritage Haveli", category: "Palaces & Banquet Venues", city: "Jaipur", priceTier: "$$$", rate: 850000, rating: 4.9, match: 98, photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
    { name: "The Leela Palace Lakefront", category: "Palaces & Banquet Venues", city: "Udaipur", priceTier: "$$$", rate: 1200000, rating: 5.0, match: 99, photo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600" },
    { name: "Taj Mahal Palace Ballroom", category: "Palaces & Banquet Venues", city: "Mumbai", priceTier: "$$$", rate: 1500000, rating: 4.9, match: 97, photo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600" },
    { name: "ITC Grand Bharat Golf Resort", category: "Palaces & Banquet Venues", city: "New Delhi", priceTier: "$$$", rate: 950000, rating: 4.8, match: 94, photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600" },
    { name: "The Tamarind Tree Estate", category: "Palaces & Banquet Venues", city: "Bengaluru", priceTier: "$$", rate: 450000, rating: 4.9, match: 96, photo: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600" },
    { name: "Alila Diwa Coastal Pavilions", category: "Palaces & Banquet Venues", city: "Goa", priceTier: "$$$", rate: 750000, rating: 4.8, match: 95, photo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600" },

    // Catering & Gastronomy
    { name: "Artisan Epicurean Royal Banquets", category: "Catering & Gastronomy", city: "Jaipur", priceTier: "$$$", rate: 3500, rating: 4.9, match: 98, photo: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600" },
    { name: "Copper Chimney Heritage Catering", category: "Catering & Gastronomy", city: "Mumbai", priceTier: "$$", rate: 2200, rating: 4.8, match: 94, photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" },
    { name: "Lumière French & Indian Fusion Table", category: "Catering & Gastronomy", city: "New Delhi", priceTier: "$$$", rate: 4500, rating: 4.9, match: 96, photo: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600" },
    { name: "The Green Table (100% Organic & Jain)", category: "Catering & Gastronomy", city: "Bengaluru", priceTier: "$$", rate: 1800, rating: 4.7, match: 93, photo: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600" },
    { name: "Fisherman's Wharf Coastal Feast", category: "Catering & Gastronomy", city: "Goa", priceTier: "$$", rate: 2500, rating: 4.8, match: 92, photo: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600" },

    // Photography & Cinema
    { name: "Stories by Joseph Radhik", category: "Photography & Cinema", city: "Mumbai", priceTier: "$$$", rate: 450000, rating: 5.0, match: 99, photo: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600" },
    { name: "The Wedding Filmer Studio", category: "Photography & Cinema", city: "Mumbai", priceTier: "$$$", rate: 600000, rating: 4.9, match: 97, photo: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600" },
    { name: "Aether & Light Studio", category: "Photography & Cinema", city: "New Delhi", priceTier: "$$", rate: 280000, rating: 4.9, match: 96, photo: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600" },
    { name: "Shades Photography Jaipur", category: "Photography & Cinema", city: "Jaipur", priceTier: "$$", rate: 220000, rating: 4.8, match: 95, photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600" },
    { name: "Goan Sunset Visuals", category: "Photography & Cinema", city: "Goa", priceTier: "$$", rate: 180000, rating: 4.7, match: 91, photo: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600" },

    // Floral & Spatial Decor
    { name: "FNP Weddings & Floral Architecture", category: "Floral & Spatial Decor", city: "New Delhi", priceTier: "$$$", rate: 500000, rating: 4.9, match: 97, photo: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600" },
    { name: "Botanica Luxury Event Florals", category: "Floral & Spatial Decor", city: "Bengaluru", priceTier: "$$", rate: 320000, rating: 4.8, match: 95, photo: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600" },
    { name: "Jaipur Mandap Scenography", category: "Floral & Spatial Decor", city: "Jaipur", priceTier: "$$$", rate: 420000, rating: 4.9, match: 98, photo: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=600" },

    // Music, Bands & DJs
    { name: "Manganiyar Seduction Folk Troupe", category: "Music, Bands & DJs", city: "Jaipur", priceTier: "$$", rate: 150000, rating: 5.0, match: 99, photo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600" },
    { name: "DJ Chetas Bollywood Live", category: "Music, Bands & DJs", city: "Mumbai", priceTier: "$$$", rate: 550000, rating: 4.9, match: 96, photo: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600" },
    { name: "Velvet Note Acoustics & Jazz", category: "Music, Bands & DJs", city: "Bengaluru", priceTier: "$$", rate: 120000, rating: 4.8, match: 94, photo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600" },

    // Mixology & Craft Bars
    { name: "The Flaming Trio Molecular Bar", category: "Mixology & Craft Bars", city: "Mumbai", priceTier: "$$$", rate: 250000, rating: 4.9, match: 97, photo: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600" },
    { name: "Sip & Spirit Artisanal Gin Cart", category: "Mixology & Craft Bars", city: "Goa", priceTier: "$$", rate: 120000, rating: 4.8, match: 95, photo: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600" },
  ];

  for (const v of vendorsData) {
    const categoryId = catRecords[v.category];
    if (categoryId) {
      await prisma.vendor.create({
        data: {
          categoryId,
          name: v.name,
          city: v.city,
          priceTier: v.priceTier,
          startingRate: v.rate,
          rating: v.rating,
          reviewCount: Math.floor(Math.random() * 80) + 24,
          description: `Elite verified partner in ${v.city} delivering premium bespoke production and guaranteed service SLAs.`,
          photoUrl: v.photo,
          verified: true,
          matchScore: v.match,
          contactEmail: `bookings@${v.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
          contactPhone: "+91 98" + Math.floor(10000000 + Math.random() * 90000000),
        },
      });
    }
  }

  // 6. Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        slug: "how-to-plan-royal-jaipur-wedding",
        title: "The Ultimate Guide to Planning a Royal Destination Wedding in Jaipur",
        excerpt: "Budget splits, palace permit logistics, and authentic Rajasthani catering timelines decoded.",
        content: "Planning a luxury wedding in Rajasthan requires balancing regal heritage palaces with cutting-edge hospitality...",
        coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
        authorName: "Priya Sharma",
      },
      {
        slug: "how-ai-prevents-wedding-budget-overruns",
        title: "How AI Budget Optimization Saves 15% on High-End Celebrations",
        excerpt: "Why traditional spreadsheets fail and how predictive formulas eliminate hidden vendor fee surprises.",
        content: "Over 80% of couples experience unplanned budget creep during the final 30 days before their wedding...",
        coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        authorName: "Marcus Vance",
      },
    ],
  });

  console.log("Festora AI database successfully seeded with realistic events, vendors, tasks, and budgets!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
