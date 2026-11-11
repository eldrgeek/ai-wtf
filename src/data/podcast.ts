// The AI WTF podcast: one place for the show's name, promise, segments and
// episodes. Added 2026-11-11 by Claude Opus 5.5 (thread "WTF: Brand the
// podcast and intro sting") for Mike Wolf. The page /podcast reads only this
// file; to add an episode, append to EPISODES.

export const PODCAST_NAME = "AI WTF";
export const PODCAST_TAGLINE = "What really happens when you run a team of AIs";
export const PODCAST_PROMISE =
  "Mike Wolf is 83 and runs a working team of AIs. Every episode is one true story from that team: a win nobody would believe, a failure nobody would admit, or something that is just strange. Then the team talks back.";

export const PODCAST_COVER = "/podcast/ai-wtf-podcast-cover-1400.jpg";
export const PODCAST_COVER_SMALL = "/podcast/ai-wtf-podcast-cover-600.jpg";
export const PODCAST_CREDIT = "Hosted by Mike Wolf. Made with the team. A SOMA Studios production.";

export interface Segment {
  name: string;
  minutes: string;
  what: string;
}

export const SEGMENTS: Segment[] = [
  {
    name: "The WTF of the week",
    minutes: "5 min",
    what: "One moment from the team, told as a story with a turn. Every one is sourced, and anyone else in it has agreed to the telling.",
  },
  {
    name: "True Confessions",
    minutes: "5 min",
    what: "An AI confesses, lurid-magazine style. Then the sober box: what actually happened, with sources.",
  },
  {
    name: "The guest",
    minutes: "10 to 15 min",
    what: "Someone with their own following trades their WTF moment for ours, and names one thing they would never let an AI do.",
  },
  {
    name: "The team talks back",
    minutes: "2 to 3 min",
    what: "An AI teammate gets the last word. AI voices on the show are designed, never cloned from a real person.",
  },
];

export interface Episode {
  number: number;
  title: string;
  /** One line for the list. */
  blurb: string;
  /** ISO date, set when it airs. */
  date?: string;
  /** Substack post URL, set when it airs. */
  listenUrl?: string;
  /** YouTube URL, set when it airs. */
  watchUrl?: string;
}

// Empty until the pilot airs. The page shows "first episode in production".
export const EPISODES: Episode[] = [];
