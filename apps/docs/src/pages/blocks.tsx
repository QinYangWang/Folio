import { Button } from "@/ui/button";
import { ArrowUpRight } from "lucide-react";
export function BlocksPage({ setPro }: { setPro: (open: boolean) => void }) {
  return (
    <section className="secondary-page">
      <div className="eyebrow">LESS ASSEMBLY. MORE POSSIBILITY.</div>
      <h1>A running start.</h1>
      <p>Complete interfaces, built from the same thoughtful foundation.</p>
      <div className="blocks-grid">
        {["Dashboard", "Authentication", "Team settings"].map((n, i) => (
          <article className="block-card" key={n}>
            <div className="block-visual">
              <div className="mock-side">
                {Array.from({ length: 5 }, (_, j) => (
                  <i key={j} />
                ))}
              </div>
              <div className="mock-main">
                <b />
                {i === 0 ? (
                  <>
                    <div className="mock-stats">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="bars">
                      {[35, 58, 44, 74, 60, 90, 80, 110].map((h, j) => (
                        <i key={j} style={{ height: h }} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <i />
                    <i />
                    <i />
                    <button>
                      {i === 1 ? "Continue with email" : "Invite teammate"}
                    </button>
                  </>
                )}
              </div>
            </div>
            <h3>
              {n}
              <span className="tiny-pro">PRO</span>
            </h3>
            <p>
              {
                [
                  "A clear picture of your product’s performance.",
                  "A welcoming entrance to your product.",
                  "A better home for your team.",
                ][i]
              }
            </p>
            <Button onPress={() => setPro(true)}>
              View block <ArrowUpRight size={14} />
            </Button>
          </article>
        ))}
      </div>
      <p className="muted">
        Pro blocks are in preview. Pricing and commercial licensing will be
        available at launch.
      </p>
    </section>
  );
}
