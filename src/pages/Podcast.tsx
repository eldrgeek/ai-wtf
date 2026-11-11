import { Layout } from "@/components/layout";
import { ExternalLink } from "lucide-react";
import { SubscribeButton } from "@/components/SubscribeButton";
import {
  EPISODES,
  PODCAST_COVER,
  PODCAST_CREDIT,
  PODCAST_NAME,
  PODCAST_PROMISE,
  PODCAST_TAGLINE,
  SEGMENTS,
} from "@/data/podcast";

// Added 2026-11-11 by Claude Opus 5.5 (thread "WTF: Brand the podcast and
// intro sting") for Mike Wolf. Content lives in src/data/podcast.ts.
export default function Podcast() {
  return (
    <Layout>
      <section className="bg-[#0d1d37] text-[#f5f0e6] py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,22rem)_1fr] items-center">
            <img
              src={PODCAST_COVER}
              alt={`${PODCAST_NAME} podcast cover: the split question mark, amber and cyan, above the words AI WTF`}
              width={1400}
              height={1400}
              className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
            />
            <div>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-[#9fb3cf] mb-3">The podcast</p>
              <h1 className="text-[#f5f0e6] mb-4">
                <span className="text-[#22c3df]">AI</span> <span className="text-[#f5a524]">WTF</span>
              </h1>
              <p className="text-2xl text-[#f5f0e6] mb-4">{PODCAST_TAGLINE}.</p>
              <p className="text-lg text-[#cdd6e3] mb-6">{PODCAST_PROMISE}</p>
              <SubscribeButton tone="solid">Subscribe for the first episode</SubscribeButton>
              <p className="font-sans text-sm text-[#9fb3cf] mt-4 mb-0">{PODCAST_CREDIT}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6">What's in an episode</h2>
          <ol className="list-none m-0 p-0 grid gap-6 sm:grid-cols-2">
            {SEGMENTS.map((s, i) => (
              <li key={s.name} className="rounded-lg border border-border p-6 bg-card">
                <p className="font-sans text-sm text-muted-foreground mb-1">
                  {i + 1}. {s.minutes}
                </p>
                <h3 className="text-xl mb-2">{s.name}</h3>
                <p className="text-muted-foreground mb-0">{s.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-6">Episodes</h2>
            {EPISODES.length === 0 ? (
              <p className="text-lg text-muted-foreground">
                The first episode is in production. Subscribe on Substack and it will arrive in your inbox, with the
                feed for Apple Podcasts and Spotify.
              </p>
            ) : (
              <ol className="list-none m-0 p-0 divide-y divide-border">
                {EPISODES.map((ep) => (
                  <li key={ep.number} className="py-6">
                    <p className="font-sans text-sm text-muted-foreground mb-1">
                      Episode {ep.number}
                      {ep.date ? ` · ${ep.date}` : ""}
                    </p>
                    <h3 className="text-2xl mb-2">{ep.title}</h3>
                    <p className="text-muted-foreground mb-3">{ep.blurb}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
                      {ep.listenUrl && (
                        <a href={ep.listenUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1 text-accent no-underline hover:underline">
                          Listen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      )}
                      {ep.watchUrl && (
                        <a href={ep.watchUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1 text-accent no-underline hover:underline">
                          Watch <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
