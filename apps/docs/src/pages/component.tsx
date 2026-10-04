import {
  Component,
  Suspense,
  lazy,
  useEffect,
  type ReactNode,
  type ComponentType,
} from "react";
import { ArrowLeft, ArrowRight, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/ui/button";
import { catalog, type ComponentEntry } from "../lib/catalog";
import { registryUrl } from "../lib/registry-url";

const modules = import.meta.glob<{ default: ComponentType }>(
  "../examples/components/*.tsx",
);
const sources = import.meta.glob<string>("../examples/components/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});
const examples = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => [
    path.split("/").pop()!.replace(".tsx", ""),
    lazy(loader),
  ]),
);

class ExampleBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <p role="alert">
        This example could not load. Refresh the page to try again.
      </p>
    ) : (
      this.props.children
    );
  }
}

export function ComponentPage({
  slug,
  copy,
}: {
  slug: string;
  copy: (text: string) => void;
}) {
  const entry = catalog.find((item) => item.slug === slug);
  useEffect(() => {
    document.title = `${entry?.name ?? "Component not found"} · Folio UI`;
    document.getElementById("component-title")?.focus({ preventScroll: true });
  }, [entry]);
  if (!entry)
    return (
      <section className="component-doc">
        <h1 id="component-title" tabIndex={-1}>
          Component not found
        </h1>
        <p>This component does not exist.</p>
        <a href="#/components">Back to all components</a>
      </section>
    );
  const Example = examples[slug];
  const source = sources[`../examples/components/${slug}.tsx`].replaceAll(
    "@/ui/",
    "@/components/ui/",
  );
  // Examples compose primitives from other independently installable registry items.
  const dependencies = [
    ...new Set(
      Array.from(
        source.matchAll(/@\/components\/ui\/([^'"]+)/g),
        (match) => match[1],
      ),
    ),
  ];
  const command = `npx shadcn@latest add ${dependencies.map(registryUrl).join(" ")}`;
  const index = catalog.indexOf(entry);
  return (
    <article className="component-doc">
      <a className="doc-back" href="#/components">
        <ArrowLeft size={14} />
        All components
      </a>
      <div className="doc-eyebrow">
        {entry.category}{" "}
        {entry.alpha && <span className="doc-alpha">Alpha</span>}
      </div>
      <h1 id="component-title" tabIndex={-1}>
        {entry.name}
      </h1>
      <p className="doc-description">{entry.description}</p>
      <div className="doc-links">
        {entry.api && (
          <a
            href={`https://react-aria.adobe.com/${entry.api}`}
            target="_blank"
            rel="noreferrer"
          >
            React Aria API <ExternalLink size={13} />
          </a>
        )}
        <a
          href={`https://github.com/QinYangWang/Folio/blob/main/registry/ui/${slug}.tsx`}
          target="_blank"
          rel="noreferrer"
        >
          Component source <ExternalLink size={13} />
        </a>
        <a href={registryUrl(slug)} target="_blank" rel="noreferrer">
          Registry JSON <ExternalLink size={13} />
        </a>
      </div>
      {entry.alpha && (
        <p className="doc-note">
          Toast uses React Aria’s unstable API. Upstream API changes may require
          updates.
        </p>
      )}
      <section className="doc-section" aria-labelledby="preview-title">
        <h2 id="preview-title">Preview</h2>
        <div className="doc-preview" data-component={slug}>
          <ExampleBoundary key={slug}>
            <Suspense fallback={<p role="status">Loading example…</p>}>
              <div className="doc-example">
                <Example />
              </div>
            </Suspense>
          </ExampleBoundary>
        </div>
      </section>
      <section className="doc-section" aria-labelledby="install-title">
        <h2 id="install-title">Installation</h2>
        <p>Install this component independently:</p>
        <Code text={`npx shadcn@latest add ${registryUrl(slug)}`} copy={copy} />
        {dependencies.some((name) => name !== slug) && (
          <>
            <p>To run the complete example, install its composed components:</p>
            <Code text={command} copy={copy} />
          </>
        )}
        <p>
          Requires React, React Aria Components 1.21.1 or later, and Tailwind
          CSS 4. <a href="#/installation">Set up your project →</a>
        </p>
      </section>
      <section className="doc-section" aria-labelledby="usage-title">
        <h2 id="usage-title">Usage</h2>
        <p>The source below powers the preview above.</p>
        <Code text={source} copy={copy} />
      </section>
      <section className="doc-section" aria-labelledby="api-title">
        <h2 id="api-title">Key props</h2>
        <p>
          Common properties for this component. See the linked React Aria API
          for the complete contract and compound parts.
        </p>
        <div className="doc-table-scroll">
          <table className="doc-props">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {entry.props.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                  </td>
                  <td>
                    <code>{prop.type}</code>
                  </td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="doc-section">
        <h2>Accessibility</h2>
        <p>{accessibility(entry)}</p>
        <p>
          Keep visible labels or an accessible name on interactive controls.
          Folio preserves React Aria’s focus management, keyboard interactions,
          and state attributes. Custom content still needs meaningful labels and
          sufficient contrast.
        </p>
      </section>
      <nav className="doc-pagination" aria-label="Adjacent components">
        {index > 0 ? (
          <a href={`#/components/${catalog[index - 1].slug}`}>
            <ArrowLeft size={15} />
            {catalog[index - 1].name}
          </a>
        ) : (
          <span />
        )}
        {index < catalog.length - 1 && (
          <a href={`#/components/${catalog[index + 1].slug}`}>
            {catalog[index + 1].name}
            <ArrowRight size={15} />
          </a>
        )}
      </nav>
    </article>
  );
}
function Code({ text, copy }: { text: string; copy: (text: string) => void }) {
  return (
    <div className="doc-code">
      <Button variant="ghost" aria-label="Copy code" onPress={() => copy(text)}>
        <Copy size={14} />
      </Button>
      <pre tabIndex={0}>
        <code>{text}</code>
      </pre>
    </div>
  );
}
function accessibility(entry: ComponentEntry) {
  if (entry.category === "Overlays")
    return "Use a keyboard to open the trigger and Escape to dismiss the overlay. Modal dialogs contain focus and restore it to the trigger when dismissed.";
  if (entry.category === "Collections")
    return "Use arrow keys to navigate collection items. Selection behavior depends on the component’s selectionMode; disabled items are skipped.";
  if (entry.category === "Date & time")
    return "Date and time fields use localized segments. Use arrow keys to edit segments or navigate calendar dates, and Enter or Space to select a date.";
  if (entry.category === "Color")
    return "Color controls expose accessible channel names and values. Adjustable controls support arrow keys as an alternative to dragging.";
  if (entry.category === "Actions")
    return "Interactive actions support keyboard activation and visible focus. Toggle buttons expose their pressed state to assistive technology.";
  return "Use Tab to move between focusable controls. React Aria exposes labels, descriptions, validation, and selection or expanded state to assistive technology where applicable.";
}
