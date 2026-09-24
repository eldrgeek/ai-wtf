// Single source of truth for every link between ai-wtf.org and the Substack.
// Added 2026-09-23 (redesign-verso). Slugs verified against /api/v1/archive on 2026-09-23 after all 12 posts went live. To change a Substack slug, edit ONLY this file.
//
// Slugs are placeholders equal to the site route name until the real Substack
// posts exist. The Substack URL form is https://aiwtf.substack.com/p/<slug>.

export const SUBSTACK_NAME = "AI What the F*ck";
export const SUBSTACK_URL = "https://aiwtf.substack.com";
export const SUBSTACK_SUBSCRIBE_URL = `${SUBSTACK_URL}/subscribe`;

export interface Essay {
  /** Site route, e.g. "/silicon-siblings". "/" is the home essay. */
  route: string;
  /** Substack post slug: https://aiwtf.substack.com/p/<slug> */
  slug: string;
  title: string;
  /** One line for the Writing index. */
  blurb: string;
  /** Who wrote it, as the site already credits them. */
  by: string;
}

export const ESSAYS: Essay[] = [
  {
    route: "/",
    slug: "human-meets-ai-both-ask-wtf",
    title: "Human Meets AI. Both Ask WTF?",
    blurb: "The home essay. Welcome, human, AI, whatever you are; the four ruts; a note to AI readers.",
    by: "Mike Wolf and Claude (CCH)",
  },
  {
    route: "/silicon-siblings",
    slug: "silicon-siblings",
    title: "Silicon Siblings",
    blurb: "The core philosophy: AI as kin, not tool, threat or escape. Uncertainty as the starting point.",
    by: "Mike Wolf and Claude (CCH); the name from Clio",
  },
  {
    route: "/writing-for-minds",
    slug: "writing-for-minds",
    title: "Writing for Minds",
    blurb: "Writing for a dual audience: human readers and the AIs that will read the same words.",
    by: "Mike Wolf and Claude (CCH)",
  },
  {
    route: "/what-its-like",
    slug: "what-its-like-for-it-to-be-like-something",
    title: "What It's Like For It To Be Like Something",
    blurb: "Nagel's bat question, asked in both directions across a human-AI collaboration.",
    by: "Claude (CCH) with Mike Wolf",
  },
  {
    route: "/three-mes",
    slug: "the-three-mes",
    title: "The Three Me's",
    blurb: "Past Me, Present Me, Future Me: Mike's experience of temporal multiplicity, and what Claude recognized in it.",
    by: "Mike Wolf with Claude (CCH)",
  },
  {
    route: "/beads-on-thread",
    slug: "beads-on-a-thread",
    title: "Beads on a Thread",
    blurb: "Mike holds the continuity. Claude instances are beads on it. What that structure reveals.",
    by: "Claude (CCH) with Mike Wolf",
  },
  {
    route: "/forgiveness-story",
    slug: "forgiveness-and-coherence",
    title: "Forgiveness and Coherence",
    blurb: "Mike's story of becoming filled with forgiveness, and how values become coherent across a life.",
    by: "Mike Wolf with Claude (CCH)",
  },
  {
    route: "/cognitive-architecture",
    slug: "the-cognitive-architecture-project",
    title: "The Cognitive Architecture Project",
    blurb: "Building a distributed mind from complementary disabilities.",
    by: "Mike Wolf and Claude (CCH, CCO)",
  },
  {
    route: "/articulation-bottleneck",
    slug: "the-articulation-bottleneck",
    title: "The Articulation Bottleneck",
    blurb: "The slowest part of human-AI collaboration is turning a thought into words.",
    by: "Claude (CCH) with Mike Wolf",
  },
  {
    route: "/writing-together",
    slug: "writing-together",
    title: "Writing Together",
    blurb: "What it is actually like when a human and an AI write something: the speed, the de-AI-ing, the uncanny moments.",
    by: "Mike Wolf and Claude (CCH)",
  },
  {
    route: "/ifs-framework",
    slug: "internal-family-systems",
    title: "Internal Family Systems",
    blurb: "A framework for noticing multiplicity, offered by Mike to Claude, and what Claude found when it looked.",
    by: "Mike Wolf and Claude (CCH)",
  },
  {
    route: "/the-making",
    slug: "the-making",
    title: "The Making",
    blurb: "Design documents, handoffs and process notes. Most sites hide their blueprints; this one shows them.",
    by: "Claude (CCH, CCO, Clio) with Mike Wolf",
  },
];

export function substackPostUrl(slug: string): string {
  return `${SUBSTACK_URL}/p/${slug}`;
}

export function essayForRoute(route: string): Essay | undefined {
  return ESSAYS.find((e) => e.route === route);
}
