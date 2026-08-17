import type { ImageMetadata } from "astro";
import sledPush from "../assets/images/sled-push.jpg";
import farmersCarry from "../assets/images/farmers-carry.jpg";
import raceDay from "../assets/images/race-day.jpg";
import training from "../assets/images/training.jpg";
import celebration from "../assets/images/celebration.jpg";
import strength from "../assets/images/strength.jpg";
import coach from "../assets/images/coach.jpg";

export interface GalleryItem {
  id: string;
  src: ImageMetadata;
  alt: string;
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "sled-push",
    src: sledPush,
    alt: "Danny Alvarado pushing a weighted sled in a Hyrox race",
    caption: "Sled push",
  },
  {
    id: "farmers-carry",
    src: farmersCarry,
    alt: "Danny Alvarado carrying kettlebells during a farmer's carry",
    caption: "Farmer's carry",
  },
  {
    id: "race-day",
    src: raceDay,
    alt: "Danny Alvarado mid-station during a Hyrox race",
    caption: "Race day",
  },
  {
    id: "training",
    src: training,
    alt: "Danny Alvarado during a high-intensity training session",
    caption: "Engine work",
  },
  {
    id: "celebration",
    src: celebration,
    alt: "Danny Alvarado celebrating after a race effort",
    caption: "Finish",
  },
  {
    id: "strength",
    src: strength,
    alt: "Danny Alvarado in a strength session with battle ropes",
    caption: "Strength",
  },
  {
    id: "coach",
    src: coach,
    alt: "Danny Alvarado posing in athletic training kit",
    caption: "Coach",
  },
];
