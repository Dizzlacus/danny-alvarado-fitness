export interface Review {
  quote: string;
  name: string;
  location?: string;
}

export const reviews: Review[] = [
  {
    quote:
      "Danny broke Hyrox down station by station. My sled and wall balls finally feel like a plan, not a panic. Placeholder review — swap for a real client quote.",
    name: "A. Runner",
  },
  {
    quote:
      "The race-prep block was structured and honest. I showed up fitter and knew exactly what to expect on the course. Placeholder review — swap for a real client quote.",
    name: "B. Athlete",
  },
  {
    quote:
      "First time doing functional race training and the sessions were tough but clear. I left knowing what to work on next. Placeholder review — swap for a real client quote.",
    name: "C. Member",
  },
  {
    quote:
      "Group sessions still felt personal. Lots of coaching on form without wasting time. Placeholder review — swap for a real client quote.",
    name: "D. Client",
  },
];
