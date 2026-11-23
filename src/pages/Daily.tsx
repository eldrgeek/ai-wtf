import { Layout } from "@/components/layout";
import { ExternalLink } from "lucide-react";
import { SubscribeButton } from "@/components/SubscribeButton";
import { DAILY_POSTS, DAILY_WEEK } from "@/data/daily";
import { SUBSTACK_NAME, SUBSTACK_URL, substackPostUrl } from "@/data/substackLinks";

// Added 2026-11-23 by Claude Opus 5.5 (thread "WTF: Plan daily AI WTF deep
// dives") for Mike Wolf. Lists published daily posts from src/data/daily.ts.
export default function Daily() {
  const posts = [...DAILY_POSTS].reverse();
  return (
    <Layout>
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-foreground mb-4">AI WTF Daily</h1>
            <p className="text-xl text-muted-foreground mb-8">
              One topic a day, in depth: what we learned, what we thought before, a snapshot from history, and the
              WTF moment that started it. It lands first on{" "}
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                {SUBSTACK_NAME}
              </a>
              .
            </p>
            <SubscribeButton />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-4">The week</h2>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[9rem_1fr] font-sans text-sm">
            {DAILY_WEEK.map((d) => (
              <div key={d.day} className="contents">
                <dt className="font-semibold text-foreground">
                  {d.day}: {d.angle}
                </dt>
                <dd className="m-0 text-muted-foreground">{d.what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-4">Posts</h2>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">The first daily post is on its way. Subscribe and it comes to you.</p>
          ) : (
            <ol className="list-none m-0 p-0 divide-y divide-border">
              {posts.map((p) => (
                <li key={p.slug} className="py-5">
                  <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Day {p.day} · {p.angle} · {p.date}
                  </p>
                  <h3 className="text-xl mb-1">
                    <a
                      href={substackPostUrl(p.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground no-underline hover:text-accent inline-flex items-center gap-1"
                    >
                      {p.title} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">(opens on Substack in a new tab)</span>
                    </a>
                  </h3>
                  <p className="text-muted-foreground m-0">{p.subtitle}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </Layout>
  );
}
