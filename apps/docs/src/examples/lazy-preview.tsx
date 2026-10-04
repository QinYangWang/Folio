import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

const modules = import.meta.glob<{ default: ComponentType }>(
  "./components/*.tsx",
);
const examples = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => [
    path.split("/").pop()!.replace(".tsx", ""),
    lazy(loader),
  ]),
);

class PreviewBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p role="alert">Preview could not load. Refresh to try again.</p>
    ) : (
      this.props.children
    );
  }
}

/** Mount once near the viewport; keep state when the user scrolls away. */
export function LazyPreview({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!window.IntersectionObserver) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const Example = examples[slug];
  return (
    <div ref={ref} className="catalog-example" data-preview={slug}>
      {visible ? (
        <PreviewBoundary>
          <Suspense fallback={<p role="status">Loading preview…</p>}>
            <div data-preview-ready={slug}>
              <Example />
            </div>
          </Suspense>
        </PreviewBoundary>
      ) : (
        <p className="preview-pending">Scroll to preview</p>
      )}
    </div>
  );
}
