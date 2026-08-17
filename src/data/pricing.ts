export const pricingGroups = [
  {
    id: "one-to-one",
    label: "1:1 coaching",
    items: [
      {
        name: "Single session",
        note: "60-minute Hyrox-focused personal training",
        price: "TBD",
      },
      {
        name: "4-session block",
        note: "Weekly 1:1 plus programming between sessions",
        price: "TBD",
      },
      {
        name: "8-session block",
        note: "Race-prep block with station and running work",
        price: "TBD",
      },
    ],
  },
  {
    id: "race-prep",
    label: "Race prep & groups",
    items: [
      { name: "Hyrox race-prep programme", note: "8–12 week plan", price: "TBD" },
      { name: "Group session", note: "Small-group station work", price: "TBD" },
      { name: "Intro consult", note: "Goals, current fitness, and a first plan", price: "TBD" },
    ],
  },
] as const;
