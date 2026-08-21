import type { ImageMetadata } from "astro";
import farmersCarry from "../assets/images/farmers-carry.png";
import wallBall from "../assets/images/wall-ball.png";
import carryBlur from "../assets/images/carry-blur.png";
import sandbag from "../assets/images/sandbag.png";
import training from "../assets/images/training.png";
import run from "../assets/images/hero-run.png";

export interface TransformationStory {
  id: string;
  name: string;
  lost: string;
  goal: string;
  before: {
    src: ImageMetadata;
    alt: string;
  };
  after: {
    src: ImageMetadata;
    alt: string;
  };
}

export const transformations: TransformationStory[] = [
  {
    id: "jordan",
    name: "Jordan Hale",
    lost: "−11 kg",
    goal: "Show up every week and enjoy training again",
    before: {
      src: training,
      alt: "Jordan Hale — before",
    },
    after: {
      src: run,
      alt: "Jordan Hale — after",
    },
  },
  {
    id: "sam",
    name: "Sam Okonkwo",
    lost: "−8 kg",
    goal: "Get outside, train with a crew, no pressure",
    before: {
      src: farmersCarry,
      alt: "Sam Okonkwo — before",
    },
    after: {
      src: carryBlur,
      alt: "Sam Okonkwo — after",
    },
  },
  {
    id: "riley",
    name: "Riley Novak",
    lost: "−14 kg",
    goal: "Finish a challenge and keep the energy going",
    before: {
      src: wallBall,
      alt: "Riley Novak — before",
    },
    after: {
      src: sandbag,
      alt: "Riley Novak — after",
    },
  },
];
