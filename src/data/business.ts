export const business = {
  name: "Danny Alvarado Fitness",
  legalName: "Danny Alvarado Fitness",
  description:
    "Danny Alvarado Fitness — Hyrox and functional race-prep personal training. One-to-one coaching, race blocks, and group sessions.",
  telephone: "00000 000000",
  email: "hello@example.com",
  instagram: {
    handle: "@dannyalvarado",
    url: "https://www.instagram.com/dannyalvarado/",
  },
  address: {
    streetAddress: "Studio TBD",
    addressLocality: "City TBD",
    postalCode: "00000",
    addressCountry: "GB",
  },
  mapsUrl: "https://www.google.com/maps",
  coach: {
    name: "Danny Alvarado",
    bio: "Hyrox coach focused on race-ready strength, endurance, and station work. Placeholder bio — swap in the real story.",
    instagram: {
      handle: "@dannyalvarado",
      url: "https://www.instagram.com/dannyalvarado/",
    },
  },
} as const;

export const businessInstagram = business.instagram;
export const coachInstagram = business.coach.instagram;
