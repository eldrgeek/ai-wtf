import { Layout } from "@/components/layout";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { SubscribeButton } from "@/components/SubscribeButton";
import { ESSAYS, SUBSTACK_NAME, SUBSTACK_URL, essayCoverUrl, substackPostUrl } from "@/data/substackLinks";

// Added 2026-09-23 (redesign-verso). The essay index: every essay on the site
// with its Substack twin. Content comes from src/data/substackLinks.ts.
export default function Writing() {
  return (
    <Layout>
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-foreground mb-4">Writing</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Every essay here has a twin on{" "}
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                {SUBSTACK_NAME}
              </a>
              , our Substack. New writing lands there first.
            </p>
            <SubscribeButton />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <ol className="max-w-4xl mx-auto list-none m-0 p-0 divide-y divide-border">
          {ESSAYS.map((essay) => {
            const readHere = essay.route === "/" ? "/#welcome" : essay.route;
            return (
              <li key={essay.route} className="py-6 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-6">
                <Link to={readHere} className="mb-3 block sm:mb-0" aria-hidden="true" tabIndex={-1}>
                  <img src={essayCoverUrl(essay.slug)} alt="" width={1456} height={816} loading="lazy" className="w-full rounded-md" />
                </Link>
                <div>
                <h2 className="text-2xl md:text-2xl mb-1">
                  <Link to={readHere} className="text-foreground no-underline hover:text-accent">
                    {essay.title}
                  </Link>
                </h2>
                <p className="font-sans text-sm text-muted-foreground mb-2">By {essay.by}</p>
                <p className="text-muted-foreground mb-3">{essay.blurb}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
                  <Link to={readHere} className="inline-flex min-h-8 items-center text-accent no-underline hover:underline">
                    Read here <span aria-hidden="true">&nbsp;&rarr;</span>
                  </Link>
                  <a
                    href={substackPostUrl(essay.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center gap-1 text-accent no-underline hover:underline"
                  >
                    On Substack <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </Layout>
  );
}
