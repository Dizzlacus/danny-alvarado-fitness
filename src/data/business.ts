export const business = {
  name: "The Playground",
  legalName: "The Playground",
  tagline: "LIFT-RUN-PLAY",
  kicker: "Training is better together.",
  description:
    "The Playground is a training community — group workouts, outdoor sessions, challenges and events. Come for the training. Stay for the community.",
  telephone: "00000 000000",
  email: "hello@example.com",
  instagram: {
    handle: "@dannyalvarado90",
    url: "https://www.instagram.com/dannyalvarado90/",
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
    bio: "Danny holds The Playground together — group sessions, outdoor work, and the kind of energy that makes people want to come back. No egos. Just a reason to show up.",
    instagram: {
      handle: "@dannyalvarado90",
      url: "https://www.instagram.com/dannyalvarado90/",
    },
  },
} as const;

export const businessInstagram = business.instagram;
export const coachInstagram = business.coach.instagram;
