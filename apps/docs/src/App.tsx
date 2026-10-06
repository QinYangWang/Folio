import { registryUrl } from "./lib/registry-url";
import { Handbook } from "./pages/handbook";
import { BlocksPage } from "./pages/blocks";
import { catalog, componentCategories } from "./lib/catalog";
import { ComponentPage } from "./pages/component";
import { Preview } from "./examples/component-preview";
import { LazyPreview } from "./examples/lazy-preview";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { AnimatedOverlay, AnimatedModal } from "@/ui/dialog";
import { useState, useEffect, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Command,
  Copy,
  Check,
  ChevronRight,
  Sun,
  Moon,
  Github,
  Box,
  Blocks,
  BookOpen,
  SlidersHorizontal,
  Terminal,
  Sparkles,
  X,
  Menu,
} from "lucide-react";
import { Dialog, Heading } from "react-aria-components";
import { Button } from "@/ui/button";
const groups = [
  {
    title: "Get started",
    items: ["Introduction", "Installation", "Theming", "CLI"],
  },
  { title: "Library", items: ["Components", "Blocks", "Icons"] },
  { title: "Resources", items: ["Design principles", "Changelog", "Roadmap"] },
];
const items: string[] = catalog.map((item) => item.name);
const featured = [
  "Button",
  "Text Field",
  "Checkbox",
  "Switch",
  "Badge",
  "Card",
  "Tabs",
  "Dialog",
  "Select",
  "Avatar",
  "Alert",
  "Tooltip",
];
function readRoute() {
  return window.location.hash.replace(/^#\/?/, "") || "components";
}
const icons: Record<string, ReactNode> = {
  Introduction: <BookOpen />,
  Installation: <Terminal />,
  Theming: <SlidersHorizontal />,
  CLI: <Command />,
  Components: <Box />,
  Blocks: <Blocks />,
  Icons: <Sparkles />,
};

function Logo() {
  return (
    <span className="logo-mark">
      <span />
      <span />
      <span />
    </span>
  );
}

function App() {
  const reduced = useReducedMotion();
  const [route, setRoute] = useState(readRoute);
  const slug = route.startsWith("components/") ? route.slice(11) : null;
  const page = slug
    ? "Components"
    : groups
        .flatMap((group) => group.items)
        .find((name) => name.toLowerCase().replaceAll(" ", "-") === route) ||
      "Components";
  useEffect(() => {
    const update = () => {
      setRoute(readRoute());
      setMobile(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    if (!slug) document.title = `${page} · Folio UI`;
    else
      document
        .querySelector('.component-navigation [aria-current="page"]')
        ?.scrollIntoView({ block: "nearest" });
  }, [page, slug]);
  function setPage(name: string) {
    navigate(name);
  }
  function openComponent(name: string) {
    const item = catalog.find((item) => item.name === name);
    if (item) window.location.hash = `/components/${item.slug}`;
    setMobile(false);
  }

  const [category, setCategory] = useState("All components");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [mobile, setMobile] = useState(false);
  const [toast, setToast] = useState("");
  const [pro, setPro] = useState(false);
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2800);
      return () => clearTimeout(t);
    }
  }, [toast]);
  useEffect(() => {
    document.documentElement.dataset.mode = dark ? "dark" : "light";
  }, [dark]);
  function navigate(p: string) {
    const next = p.toLowerCase().replaceAll(" ", "-");
    window.location.hash = `/${next}`;
    setRoute(next);
    setQuery("");
    setMobile(false);
  }
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard");
    } catch {
      setToast("Clipboard unavailable. Select and copy the code.");
    }
  }
  const filtered = catalog
    .filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) &&
        (category === "All components" || item.category === category),
    )
    .map((item) => item.name);

  return (
    <div className="app">
      <aside className={mobile ? "sidebar open" : "sidebar"}>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("Components");
          }}
        >
          <Logo />
          folio<span>ui</span>
          <small>beta</small>
        </a>
        <button className="search-trigger" onClick={() => setSearchOpen(true)}>
          <Search size={15} /> Search <kbd>⌘ K</kbd>
        </button>
        <nav>
          {groups.map((g) => (
            <div className="nav-group" key={g.title}>
              <p>{g.title}</p>
              {g.items.map((n) => (
                <button
                  key={n}
                  className={page === n ? "nav-item active" : "nav-item"}
                  onClick={() => navigate(n)}
                >
                  {icons[n] || <span className="nav-dot" />}
                  {n}
                  {n === "Components" && (
                    <span className="nav-count">{catalog.length}</span>
                  )}
                  {n === "Blocks" && <span className="tiny-pro">PRO</span>}
                  {n === "Changelog" && <span className="new-dot" />}
                </button>
              ))}
            </div>
          ))}
          <div
            className="component-navigation"
            aria-label="Component reference"
          >
            {componentCategories.map((category) => (
              <div className="nav-group" key={category}>
                <p>{category}</p>
                {catalog
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <a
                      key={item.slug}
                      href={`#/components/${item.slug}`}
                      className={
                        slug === item.slug ? "nav-item active" : "nav-item"
                      }
                      aria-current={slug === item.slug ? "page" : undefined}
                    >
                      {item.name}
                      {item.alpha && <span className="tiny-pro">α</span>}
                    </a>
                  ))}
              </div>
            ))}
          </div>
        </nav>
        <div className="sidebar-bottom">
          <div className="pro-card">
            <div>
              <Sparkles size={16} />
              <strong>A head start, beautifully built.</strong>
            </div>
            <p>Ship faster with Folio Pro blocks.</p>
            <button onClick={() => setPro(true)}>
              Explore Pro <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="sidebar-footer">
            <span>
              <span className="status-dot" /> All systems thoughtful
            </span>
            <button
              aria-label="Toggle color theme"
              onClick={() => setDark(!dark)}
            >
              {dark ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header>
          <div className="breadcrumb">
            <button
              className="mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMobile(!mobile)}
            >
              <Menu size={19} />
            </button>
            <span>Library</span>
            <ChevronRight size={13} />
            <strong>
              {slug
                ? catalog.find((item) => item.slug === slug)?.name ||
                  "Not found"
                : page}
            </strong>
          </div>
          <div className="header-actions">
            <a
              href="https://github.com/adobe/react-spectrum"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} />
              <span>React Aria</span>
              <ArrowUpRight size={12} />
            </a>
            <span className="header-divider" />
            <button onClick={() => setPro(true)}>
              Get Folio Pro <ArrowUpRight size={14} />
            </button>
          </div>
        </header>
        <main>
          <div className="announcement">
            <span className="release-dot" /> Introducing Folio UI{" "}
            <span className="announcement-divider" /> A little less setup. A lot
            more building.
            <button onClick={() => navigate("Changelog")}>
              What’s new <ArrowRight size={13} />
            </button>
          </div>
          {slug ? (
            <ComponentPage key={slug} slug={slug} copy={copy} />
          ) : page === "Components" ? (
            <>
              <section className="hero">
                <div className="eyebrow">
                  <span /> The building blocks of better products
                </div>
                <h1>
                  Small details. <span>Better interfaces.</span>
                </h1>
                <p>
                  Thoughtfully crafted components for your next big idea.
                  <br />
                  Built with React Aria and Tailwind CSS. Accessible by default.
                  Yours to own.
                </p>
                <div className="hero-actions">
                  <Button
                    variant="primary"
                    onPress={() => navigate("Installation")}
                  >
                    Start building <ArrowRight size={15} />
                  </Button>
                  <button
                    className="install-command"
                    onClick={() =>
                      copy(`npx shadcn@latest add ${registryUrl("button")}`)
                    }
                  >
                    <span>$</span> npx shadcn add …/r/button.json{" "}
                    <Copy size={14} />
                  </button>
                </div>
                <div className="hero-benefits">
                  <span>
                    <span className="react-icon">⚛</span> React Aria
                  </span>
                  <span>
                    <span className="tailwind-icon">≈</span> Tailwind CSS
                  </span>
                  <span>
                    <Box size={14} /> shadcn compatible
                  </span>
                  <span>
                    <Check size={14} /> Open source components
                  </span>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="art-tile tile-back" />
                  <div className="art-tile tile-mid" />
                  <div className="art-tile tile-front">
                    <Logo />
                  </div>
                  <span className="art-plus plus-one">+</span>
                  <span className="art-plus plus-two">+</span>
                </div>
              </section>
              <section className="catalog">
                <div className="section-heading">
                  <div>
                    <h2>
                      Components <span>{catalog.length}</span>
                    </h2>
                    <p>The essentials, with nothing left to chance.</p>
                  </div>
                  <a
                    href="https://react-aria.adobe.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Built for accessibility <ArrowUpRight size={13} />
                  </a>
                </div>
                <div className="catalog-toolbar">
                  <LayoutGroup id="catalog-filters">
                    <div className="filters">
                      {["All components", ...componentCategories].map((c) => (
                        <button
                          key={c}
                          className={category === c ? "selected" : ""}
                          onClick={() => setCategory(c)}
                        >
                          {category === c && (
                            <motion.span
                              className="filter-indicator"
                              layoutId="active-filter"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 36,
                              }}
                            />
                          )}
                          <span>{c}</span>
                        </button>
                      ))}
                    </div>
                  </LayoutGroup>
                  <div className="filter-search">
                    <Search size={14} />
                    <input
                      aria-label="Search components"
                      placeholder="Find a component..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <kbd>/</kbd>
                  </div>
                </div>
                <motion.div layout className="component-grid">
                  {filtered.map((name) => (
                    <motion.article
                      layout="position"
                      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduced ? 0 : 0.2,
                        ease: "easeOut",
                      }}
                      className="component-card"
                      key={name}
                    >
                      <div className="component-preview">
                        {featured.includes(name) ? (
                          <Preview
                            name={name === "Text Field" ? "Input" : name}
                            setDialog={setDialog}
                            setToast={setToast}
                            setPage={setPage}
                          />
                        ) : (
                          <LazyPreview
                            slug={
                              catalog.find((item) => item.name === name)!.slug
                            }
                          />
                        )}
                      </div>
                      <a
                        className="component-caption"
                        href={`#/components/${catalog.find((item) => item.name === name)?.slug}`}
                      >
                        <div>
                          <strong>{name}</strong>
                          {["Switch", "Tabs"].includes(name) && (
                            <span className="new-label">New</span>
                          )}
                          <p>
                            {
                              catalog.find((item) => item.name === name)
                                ?.description
                            }{" "}
                          </p>
                        </div>
                        <ArrowUpRight size={16} />
                      </a>
                    </motion.article>
                  ))}
                </motion.div>
                {!filtered.length && (
                  <div className="empty">
                    No components found.{" "}
                    <button
                      onClick={() => {
                        setQuery("");
                        setCategory("All components");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </section>
              <div className="bottom-banner">
                <div className="banner-icon">
                  <Blocks size={24} />
                </div>
                <div>
                  <h3>From components to complete experiences.</h3>
                  <p>
                    Thoughtfully composed blocks. Ready for your next project.
                  </p>
                </div>
                <Button onPress={() => navigate("Blocks")}>
                  Explore blocks <ArrowRight size={14} />
                </Button>
              </div>
            </>
          ) : page === "Blocks" ? (
            <BlocksPage setPro={setPro} />
          ) : (
            <Handbook page={page} navigate={navigate} copy={copy} />
          )}
          <footer>
            <span>
              <Logo /> Made with care. Built to be yours.
            </span>
            <span>
              React Aria + Tailwind CSS <span className="footer-dot">·</span>{" "}
              Folio UI © {new Date().getFullYear()}
            </span>
          </footer>
        </main>
      </div>
      <AnimatedOverlay isOpen={searchOpen} onOpenChange={setSearchOpen}>
        <AnimatedModal className="modal search-modal">
          <Dialog aria-label="Search documentation">
            <div className="search-box">
              <Search size={20} />
              <input
                autoFocus
                placeholder="Search components and documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button variant="ghost" onPress={() => setSearchOpen(false)}>
                Esc
              </Button>
            </div>
            <div className="search-results">
              {[...groups.flatMap((g) => g.items), ...items]
                .filter((n) => n.toLowerCase().includes(query.toLowerCase()))
                .map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                      items.includes(n) ? openComponent(n) : navigate(n);
                    }}
                  >
                    <span>{n}</span>
                    <ArrowRight size={15} />
                  </button>
                ))}
            </div>
          </Dialog>
        </AnimatedModal>
      </AnimatedOverlay>
      <AnimatedOverlay isOpen={pro} onOpenChange={setPro}>
        <AnimatedModal className="modal">
          <Dialog>
            {({ close }) => (
              <>
                <div className="modal-heading">
                  <Heading slot="title">
                    <Sparkles size={22} /> Meet Folio Pro
                  </Heading>
                  <Button variant="ghost" onPress={close} aria-label="Close">
                    <X size={18} />
                  </Button>
                </div>
                <p>Complete blocks. The same attention to detail.</p>
                <div className="pro-features">
                  {[
                    "Application dashboards",
                    "Authentication flows",
                    "Team and account settings",
                    "Editable React + Tailwind source",
                  ].map((n) => (
                    <p key={n}>
                      <Check size={16} />
                      {n}
                    </p>
                  ))}
                </div>
                <div className="launch-note">
                  Coming soon · Commercial licensing and checkout are not yet
                  available.
                </div>
                <Button
                  variant="primary"
                  onPress={() => {
                    close();
                    navigate("Blocks");
                  }}
                >
                  Explore block previews <ArrowRight size={15} />
                </Button>
              </>
            )}
          </Dialog>
        </AnimatedModal>
      </AnimatedOverlay>
      <AnimatedOverlay isOpen={dialog} onOpenChange={setDialog}>
        <AnimatedModal className="modal">
          <Dialog>
            {({ close }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  close();
                  setToast("Demo project created");
                }}
              >
                <div className="modal-heading">
                  <Heading slot="title">Create a project</Heading>
                  <Button variant="ghost" onPress={close} aria-label="Close">
                    <X size={18} />
                  </Button>
                </div>
                <p>Every great idea starts somewhere.</p>
                <label className="project-label">
                  Project name
                  <input required placeholder="My next big idea" />
                </label>
                <div className="dialog-actions">
                  <Button onPress={close}>Cancel</Button>
                  <Button type="submit" variant="primary">
                    Create project
                  </Button>
                </div>
              </form>
            )}
          </Dialog>
        </AnimatedModal>
      </AnimatedOverlay>
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            className="toast"
            role="status"
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 6 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
          >
            <Check size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default App;
