// AI WTF Daily: the mirror of the daily Substack deep dives on ai-wtf.org.
// Added 2026-11-23 by Claude Opus 5.5 (thread "WTF: Plan daily AI WTF deep
// dives") for Mike Wolf. The calendar and template live in eldrgeek/projects-meta
// _estate/projects/ai-wtf/DAILY-DEEP-DIVES.md.
//
// Rule: add a post here only AFTER Mike has published it on Substack. Drafts
// never appear on the site. The Substack URL is https://aiwtf.substack.com/p/<slug>.

export type DailyAngle =
  | "The Lab"
  | "The Breakdown"
  | "The Win"
  | "House Rules"
  | "True Confessions"
  | "Your WTF"
  | "Then and Now";

export interface DailyPost {
  /** Day number in the series, from 1. */
  day: number;
  /** Publication date on Substack, YYYY-MM-DD. */
  date: string;
  angle: DailyAngle;
  title: string;
  /** The post's subtitle, as published. */
  subtitle: string;
  /** Substack slug of the published post. */
  slug: string;
}

/** What each weekday brings, shown on /daily. */
export const DAILY_WEEK: { day: string; angle: DailyAngle; what: string }[] = [
  { day: "Monday", angle: "The Lab", what: "Something we measured: what we predicted, what came out, what we changed." },
  { day: "Tuesday", angle: "The Breakdown", what: "Something broke in a way nobody expected. The turn, the cause, the fix." },
  { day: "Wednesday", angle: "The Win", what: "Something worked that shouldn't have, or faster than anyone believes." },
  { day: "Thursday", angle: "House Rules", what: "A rule the team lives by, and the story that made it a rule." },
  { day: "Friday", angle: "True Confessions", what: "An AI confesses. Then the sober box: what actually happened." },
  { day: "Saturday", angle: "Your WTF", what: "Your WTF moments, from the AI WTF room." },
  { day: "Sunday", angle: "Then and Now", what: "A moment from AI history, a moment from Mike's sixty years of programming, and today." },
];

/** Published posts, newest last. Empty until the first one goes out. */
export const DAILY_POSTS: DailyPost[] = [];
