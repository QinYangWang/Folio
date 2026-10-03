import { registryUrl } from "../lib/registry-url";
import { Button } from "@/ui/button";
import {
  ArrowRight,
  Copy,
  Box,
  Layers,
  Blocks,
  Mail,
  Lock,
  Search,
  Check,
  Plus,
  Sun,
  Moon,
  Terminal,
  Command,
  Download,
  LoaderCircle,
  SlidersHorizontal,
} from "lucide-react";
import colorTokens from "../../../../registry/styles/tokens.json";
export function Handbook({
  page,
  navigate,
  copy,
}: {
  page: string;
  navigate: (page: string) => void;
  copy: (text: string) => void;
}) {
  return (
    <section className="secondary-page docs">
      <div className="eyebrow">THE FOLIO HANDBOOK</div>
      <h1>{page}</h1>
      {page === "Installation" || page === "CLI" ? (
        <>
          <p>Add the pieces you need. Keep complete control of the code.</p>
          <h2>1. Prepare your project</h2>
          <p>
            Use a React project with Tailwind CSS v4 and a configured shadcn
            components.json.
          </p>
          <pre>npx shadcn@latest init</pre>
          <h2>2. Add Folio components</h2>
          <p>
            Start the local registry with npm run dev, then run this command in
            your application.
          </p>
          <div className="code-block">
            <pre>{`npx shadcn@latest add ${registryUrl("button")}`}</pre>
            <Button
              aria-label="Copy installation command"
              onPress={() =>
                copy(`npx shadcn@latest add ${registryUrl("button")}`)
              }
            >
              <Copy size={15} />
            </Button>
          </div>
          <h2>3. Make it yours</h2>
          <pre>
            {
              'import { Button } from "@/components/ui/button";\n\n<Button variant="primary">Create project</Button>'
            }
          </pre>
        </>
      ) : page === "Theming" ? (
        <>
          <p>
            Semantic colors for every surface, state, and interaction. Based on
            Kumo’s token reference.
          </p>
          <h2>Light and dark</h2>
          <p>
            Use the theme toggle to switch modes. Set data-mode="light" or
            data-mode="dark" on your document; tokens adapt through CSS
            light-dark(), including dialogs rendered in portals.
          </p>
          <pre>
            {
              '<html data-mode="dark">\n<div className="bg-kumo-base text-kumo-default ring-1 ring-kumo-line" />'
            }
          </pre>
          <h2>
            Token reference <span className="badge neutral">54 tokens</span>
          </h2>
          <p>
            Text and surface tokens have separate namespaces. Brand controls use
            blue; the brand text token remains orange.
          </p>
          <div className="token-table">
            <div className="token-row token-table-heading">
              <span>Token</span>
              <span>Light / Dark</span>
            </div>
            {Object.entries(colorTokens).map(([name, values]) => (
              <div className="token-row" key={name}>
                <div>
                  <span
                    className="token-chip"
                    style={{ background: `var(${name})` }}
                  />
                  <code>{name}</code>
                </div>
                <div>
                  <code>{values[0]}</code>
                  <code>{values[1]}</code>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : page === "Icons" ? (
        <>
          <p>Clear, consistent Lucide icons. Ready for any interface.</p>
          <div className="icon-grid">
            {[
              Box,
              Layers,
              Blocks,
              Mail,
              Lock,
              Search,
              Check,
              Plus,
              ArrowRight,
              Sun,
              Moon,
              Terminal,
              Command,
              Download,
              LoaderCircle,
              SlidersHorizontal,
            ].map((Icon, i) => (
              <button
                key={i}
                aria-label={`Copy icon ${Icon.displayName || i}`}
                onClick={() =>
                  copy(
                    `import { ${Icon.displayName || "Box"} } from 'lucide-react'`,
                  )
                }
              >
                <Icon size={25} />
              </button>
            ))}
          </div>
          <p>Click an icon to copy its import.</p>
        </>
      ) : page === "Changelog" ? (
        <>
          <p>A small beginning. A thoughtful foundation.</p>
          <h2>
            0.1.0 <span className="badge orange">Initial release</span>
          </h2>
          <p>
            12 interactive component previews, React Aria primitives, Tailwind
            CSS styling, a shadcn-compatible registry, and the first look at
            Folio Pro.
          </p>
        </>
      ) : page === "Roadmap" ? (
        <>
          <p>What we’re building next.</p>
          {[
            "More accessible form primitives",
            "Production-ready dashboard blocks",
            "Pro licenses and authenticated registry",
            "Additional brand theme presets",
          ].map((n) => (
            <div className="roadmap-row" key={n}>
              <span>{n}</span>
              <span className="badge neutral">Planned</span>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>
            {page === "Design principles"
              ? "Good interfaces are a collection of thoughtful decisions."
              : "A component library for people who care about the details."}
          </p>
          <h2>Accessible at the foundation</h2>
          <p>
            Our interactive primitives use React Aria for keyboard interactions
            and accessible semantics.
          </p>
          <h2>Designed to feel familiar</h2>
          <p>
            Compact 14px content, clear visual hierarchy, warm neutrals, and
            precise spacing. Inspired by Kumo’s product design approach.
          </p>
          <h2>Your code. Your decisions.</h2>
          <p>
            Install source code with the shadcn CLI, then adapt it to your
            product. All 12 components are independently installable from the
            registry.
          </p>
          <Button variant="primary" onPress={() => navigate("Installation")}>
            Get started <ArrowRight size={14} />
          </Button>
        </>
      )}
    </section>
  );
}
