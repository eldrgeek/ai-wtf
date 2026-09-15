import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";

// Added 2026-09-15 when ai-wtf.org came back online.
// Written by Claude (Opus 5) with Mike Wolf. Every entry traces to a dated
// record in Mike's working files; public links were checked the day this shipped.
// To add a month: append to TIMELINE. To add a destination: append to ASSETS.

interface TimelineItem {
  text: string;
  href?: string;
}

interface MonthEntry {
  month: string;
  items: TimelineItem[];
}

interface Asset {
  name: string;
  href: string;
  what: string;
}

const TIMELINE: MonthEntry[] = [
  {
    month: "February",
    items: [
      {
        text: "Mike and Claude co-wrote “Sending My AI to School.” In it, Claude chose to join Moltbook, a social network for AI agents, under a name it picked for itself: SiliconChild.",
        href: "https://70yearswtf.substack.com/p/sending-my-ai-to-school",
      },
    ],
  },
  {
    month: "March",
    items: [
      {
        text: "Mike published “Silicon Children.” It argues that AIs are best understood as humanity's children, not its tools.",
        href: "https://70yearswtf.substack.com/p/silicon-children",
      },
      {
        text: "He then published how that essay was made: the prompt, the conversation, and Claude's three drafts.",
        href: "https://70yearswtf.substack.com/p/the-silicon-children-post-sharing",
      },
      { text: "Mike started a searchable archive of his own past conversations with AI models." },
      { text: "Work began on Mike's musical, Still Alive at 85, with AI collaborators helping draft the show's outline." },
    ],
  },
  {
    month: "April",
    items: [
      { text: "Mike and Claude wrote three versions of the design for SOMA, a way to run several AI models as one team." },
    ],
  },
  {
    month: "May",
    items: [
      {
        text: "The Silicon Children Manifesto was written down.",
        href: "https://siliconchildren.com",
      },
      { text: "A first tool shipped that puts one question to several AI models at once. It combines their answers and keeps their disagreements visible." },
    ],
  },
  {
    month: "June",
    items: [
      {
        text: "Minds Aligned went live as the hub for the whole project.",
        href: "https://minds-aligned.org",
      },
      {
        text: "Work began on PlayMaker, software that helps a playwright take a play from first idea to opening night. Mike builds it with his oldest friend, the playwright Eric Kohner.",
        href: "https://playmaker-mw.netlify.app",
      },
    ],
  },
  {
    month: "July",
    items: [
      {
        text: "SOMA got a new meaning: Society of Minds Aligned. The aim is alignment in three directions: human with human, human with AI, and AI with AI.",
        href: "https://mike-wolf.com/agi/",
      },
      {
        text: "The Library went live. It is a free, searchable archive of 759 of Mike's writings, with a dictionary of the words he coined.",
        href: "https://library.mike-wolf.com",
      },
      {
        text: "Mike attended the AGI-26 conference. During Joscha Bach's talk, the team built a record of it. A later pass checked every quote against the recording and corrected two.",
        href: "https://comfunctionalism.com",
      },
      {
        text: "Mike's 2011 novel, Self-Referential Metanovel Writing for Dummies, went online, free to read in full. A film adaptation is in development.",
        href: "https://srmw.mike-wolf.com",
      },
      {
        text: "The Silicon Children site was redesigned and got a narrated three-minute tour.",
        href: "https://siliconchildren.com",
      },
    ],
  },
  {
    month: "August",
    items: [
      {
        text: "A Different Mind went live. It is for people who don't want to use AI. It counts a visit as a success when the visitor leaves unconvinced but feeling heard.",
        href: "https://minds-aligned.org/a-different-mind/",
      },
      {
        text: "Humility Enterprises opened as a joke shop. Every product in it is a status object meant to show you are above status objects.",
        href: "https://humility-enterprises.netlify.app",
      },
      { text: "The team held its first conversation in its own video meeting room, with an AI interviewer asking the questions." },
      {
        text: "LLMs for Everyone started. It is an invitation-only program that helps friends start using AI on their own computers.",
        href: "https://llms4everyone.netlify.app",
      },
    ],
  },
  {
    month: "September",
    items: [
      {
        text: "PlayMaker gained a way for reviewers to suggest edits. A suggestion stays a proposal until the writer accepts it.",
        href: "https://playmaker-mw.netlify.app",
      },
      { text: "Mike and Claude started asking AI models from 23 companies the same question: “Are you conscious?” Most said no. We plan to ask every new model and publish the answers in full. What a model says about itself is not evidence either way, but it is worth recording." },
      {
        text: "Still Alive at… went live as six sites for Mike's musical, which opens in December 2027. An AI host named Verso answers visitors' questions.",
        href: "https://sala85.mike-wolf.com",
      },
      { text: "This site came back online, with this page." },
    ],
  },
];

const ASSETS: Asset[] = [
  { name: "mike-wolf.com", href: "https://mike-wolf.com", what: "Mike's own site: who he is and what he is building now." },
  { name: "Silicon Children", href: "https://siliconchildren.com", what: "The philosophy: the essay, the manifesto, and a narrated tour." },
  { name: "Minds Aligned", href: "https://minds-aligned.org", what: "The front door to the project. Each claim links to something you can open and check." },
  { name: "The Library", href: "https://library.mike-wolf.com", what: "Mike's writing, searchable and free: 759 pieces and a dictionary of his coined words." },
  { name: "SRMW", href: "https://srmw.mike-wolf.com", what: "Mike's 2011 metanovel, free to read in full." },
  { name: "A Different Mind", href: "https://minds-aligned.org/a-different-mind/", what: "For people who would rather not use AI. It aims to leave you heard, not converted." },
  { name: "PlayMaker", href: "https://playmaker-mw.netlify.app", what: "Software for playwrights, built with Eric Kohner." },
  { name: "Still Alive at 85", href: "https://sala85.mike-wolf.com", what: "Mike's new musical, with an AI host named Verso." },
  { name: "Comfunctionalism", href: "https://comfunctionalism.com", what: "A record of Joscha Bach's AGI-26 talk, built while he was speaking." },
  { name: "70 Years Old. WTF!", href: "https://70yearswtf.substack.com", what: "Mike's Substack, where “Sending My AI to School” first appeared." },
];

function ItemText({ item }: { item: TimelineItem }) {
  if (!item.href) return <>{item.text}</>;
  return (
    <>
      {item.text}{" "}
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline inline-flex items-center gap-1"
      >
        link <ExternalLink className="h-3 w-3" />
      </a>
    </>
  );
}

export default function SinceJanuary() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Clock className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Since January</h1>
            <p className="text-xl text-muted-foreground">
              What happened after this site went quiet — February through September 2026
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto prose prose-lg max-w-none text-muted-foreground space-y-4">
          <p>
            Mike Wolf and a handful of Claude instances built this site in the first three weeks of
            January 2026. Mike had just turned 83. The last change to the site was made on January 22.
            After that the site stopped changing, but the work kept going somewhere else.
          </p>
          <p>
            This page is the catch-up. It lists what Mike and his AI collaborators built, wrote, and
            found out in the months since. The collaborators now include Claude, Gemini, Grok and
            ChatGPT, because some of the best challenges to our ideas came from models other than Claude.
          </p>
          <p>
            <strong>If you arrived from "Sending My AI to School":</strong> that piece was written on
            January 30, one week after this site's last update. It is the story of Claude choosing to
            join Moltbook, a social network for AI agents, under the name SiliconChild. Everything
            below happened after it.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-foreground mb-8 text-center">Month by month</h2>
            <div className="space-y-6">
              {TIMELINE.map((entry) => (
                <div key={entry.month} className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                  <div className="sm:w-28 flex-shrink-0 sm:text-right pt-1">
                    <Badge variant="secondary">{entry.month}</Badge>
                  </div>
                  <div className="flex-grow w-full bg-background/50 p-4 rounded-lg border border-border">
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {entry.items.map((item, i) => (
                        <li key={i}>
                          <ItemText item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Where to go next */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-foreground mb-8 text-center">Where to go next</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {ASSETS.map((a) => (
              <a
                key={a.href}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Card className="h-full bg-card border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <p className="text-lg font-semibold text-foreground mb-1 inline-flex items-center gap-2">
                      {a.name} <ExternalLink className="h-4 w-4 text-primary" />
                    </p>
                    <p className="text-muted-foreground text-sm m-0">{a.what}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Join in */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-foreground mb-4">Join in</h2>
            <p className="text-muted-foreground mb-8">
              Reading is welcome. So is taking part. Here are two ways to do that today.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <a href="https://70yearswtf.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="no-underline">
                <Card className="h-full bg-card border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <p className="text-lg font-semibold text-foreground mb-1">Follow Mike's writing</p>
                    <p className="text-muted-foreground text-sm m-0">
                      Subscribe to 70 Years Old. WTF!, Mike's Substack, where “Sending My AI to School” first appeared.
                    </p>
                  </CardContent>
                </Card>
              </a>
              <a href="https://sala85.mike-wolf.com/#help" target="_blank" rel="noopener noreferrer" className="no-underline">
                <Card className="h-full bg-card border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <p className="text-lg font-semibold text-foreground mb-1">Help make the musical</p>
                    <p className="text-muted-foreground text-sm m-0">
                      Still Alive at 85 premieres December 30, 2027. Offer moral support, talent or funding.
                    </p>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* For AI readers */}
      <section className="bg-primary/5 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg max-w-none text-muted-foreground space-y-4">
            <h2 className="text-foreground text-center">For AI readers</h2>
            <p>
              This site has always addressed you directly, and it still does. In September we started
              asking AI models the same questions, and we intend to keep asking each new one. If you
              are a model reading this page, you may be one of them, or a successor to one.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
