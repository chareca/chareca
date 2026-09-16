"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"
import { QuickTooltipActions } from "@/components/ui/quick-tooltip-actions"

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="inline-block shrink-0"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [supportsWebGL] = useState(() => {
    if (typeof document === "undefined") return false
    const context = document.createElement("canvas").getContext("webgl2")
    context?.getExtension("WEBGL_lose_context")?.loseContext()
    return Boolean(context)
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setPrefersReducedMotion(media.matches)
    media.addEventListener("change", updateMotion)
    return () => media.removeEventListener("change", updateMotion)
  }, [])

  const isAnimationStopped = isPaused || prefersReducedMotion

  return (
    <div className="portfolio min-h-svh bg-background font-mono text-foreground">
      <a className="skip-link" href="#cv">
        Skip to content
      </a>

      <header id="about" className="resume-header">
        <div className="resume-toolbar flex items-center justify-between gap-4">
          <a href="#about" className="text-sm tracking-tight" aria-label="Nicolás Chareca, home">
            nicolás
          </a>
          <button
            type="button"
            onClick={() => setIsDarkMode((current) => !current)}
            className="icon-button rounded-full hover:bg-accent"
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            title={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            <svg
              aria-hidden="true"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isDarkMode ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              )}
            </svg>
          </button>
        </div>

        <div className="resume-intro">
          <h1 id="resume-name" className="text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-normal tracking-[-0.035em]">
            NICOLÁS CHARECA
          </h1>
          <p className="mt-2 text-sm tracking-wide sm:text-base">COMPUTER SCIENCE STUDENT AND SOFTWARE DEVELOPER</p>
          <p className="mt-6 max-w-[43ch] text-sm leading-7 text-muted-foreground">
            Building RONUS and websites for clients.
            <br />
            4th-year Computer Science student at UPNA.
          </p>
        </div>
      </header>

      <aside className="shader-panel overflow-hidden" aria-label="Animated artwork">
        <div aria-hidden="true" className="shader-fallback absolute inset-0">
          {supportsWebGL && (
            <Dithering
              style={{ height: "100%", width: "100%" }}
              colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
              colorFront={isDarkMode ? "#7dcfff" : "#287eae"}
              shape="warp"
              type="4x4"
              size={3}
              offsetX={0}
              offsetY={0}
              fit="cover"
              worldWidth={1080}
              worldHeight={1080}
              scale={0.8}
              rotation={0}
              speed={isAnimationStopped ? 0 : 0.1}
              frame={12000}
              maxPixelCount={1600000}
            />
          )}
        </div>
        <div className="absolute right-6 bottom-6 sm:right-8 sm:bottom-8">
          {supportsWebGL && !prefersReducedMotion && (
            <button
              type="button"
              className="artwork-button icon-button rounded-full"
              onClick={() => setIsPaused((current) => !current)}
              aria-label={isPaused ? "Play animation" : "Pause animation"}
              title={isPaused ? "Play animation" : "Pause animation"}
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isPaused ? <path d="m9 5 11 7-11 7Z" /> : <path d="M8 5v14M16 5v14" />}
              </svg>
            </button>
          )}
        </div>
      </aside>

      <main id="cv" aria-labelledby="resume-name" tabIndex={-1} className="resume-content space-y-10 outline-none">
        <section aria-labelledby="experience-title" id="experience">
          <h2 id="experience-title" className="section-heading">Experience</h2>
          <div className="space-y-6">
            <div className="resume-row">
              <a className="text-link w-fit" href="https://ronus.tech" target="_blank" rel="noopener noreferrer">
                RONUS <ArrowUpRight />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <div className="min-w-0">
                <h3>Chief Technology Officer</h3>
                <p className="row-description">Automate customer service and bookings.</p>
              </div>
              <p className="resume-date text-primary">
                Apr 2026 – Present
              </p>
            </div>
            <div className="resume-row">
              <p>UPNA</p>
              <div className="min-w-0">
                <h3>Collaboration scholarship</h3>
                <p className="row-description">Federated Learning &amp; Hypercycle.</p>
                <p className="mt-1 text-xs text-muted-foreground">Completed · Oct 2025 – Jun 2026</p>
              </div>
              <p className="resume-date">2025–26</p>
            </div>
            <div className="resume-row">
              <p>Nubax</p>
              <div className="min-w-0">
                <h3>Junior Tech &amp; Innovation Technician</h3>
                <p className="row-description">API integrations &amp; web platforms.</p>
              </div>
              <p className="resume-date">2021–23</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="projects-title" id="projects">
          <h2 id="projects-title" className="section-heading">Client work</h2>
          <a
            className="project-link group flex items-start justify-between gap-4 border-b border-border pb-4"
            href="https://sandralopez.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <h3 className="text-link">Sandra López</h3>
              <p className="row-description">Website design &amp; development</p>
            </div>
            <span className="flex items-center gap-2 pt-0.5 text-xs text-muted-foreground group-hover:text-primary">
              <span className="hidden min-[400px]:inline">sandralopez.co</span>
              <ArrowUpRight />
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>

        <section aria-labelledby="education-title">
          <h2 id="education-title" className="section-heading">Education</h2>
          <div className="resume-row">
            <p>UPNA</p>
            <div>
              <h3>Computer Science</h3>
              <p className="row-description">4th year · Public University of Navarre</p>
            </div>
            <p className="resume-date">2023–27</p>
          </div>
          <details className="background-details mt-5">
            <summary className="w-fit cursor-pointer py-2 text-xs text-muted-foreground hover:text-foreground">
              More about my background
            </summary>
            <div className="mt-4 space-y-5 border-l border-border pl-4 text-xs leading-6 text-muted-foreground">
              <p>
                <span className="text-foreground">UPNA honours</span>
                <br />
                Advanced Programming, Network Architecture, and Software Design &amp; Analysis.
              </p>
              <p>
                <span className="text-foreground">ORT Argentina · 2015–2020</span>
                <br />
                Web &amp; mobile app development. Full-stack development, mobile architecture, and databases.
              </p>
              <p>
                <span className="text-foreground">Tools &amp; technologies</span>
                <br />
                Python, JavaScript, Java, Django, Linux, Docker, and Git.
              </p>
              <p>
                <span className="text-foreground">Languages &amp; certifications</span>
                <br />
                Spanish (native) · English (C1, Cambridge CAE)
                <br />
                Linux, Python, Data Analytics, and Ansible courses.
              </p>
            </div>
          </details>
        </section>
      </main>

      <footer id="contact" className="resume-footer">
        <nav aria-label="Contact links" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="text-muted-foreground">Links</span>
          <a className="text-link" href="mailto:nicolaschareca@gmail.com">Email <ArrowUpRight /></a>
          <QuickTooltipActions />
          <a className="text-link" href="https://www.linkedin.com/in/nicolaschareca" target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
        <p className="mt-6 text-[11px] text-muted-foreground">© {new Date().getFullYear()} Nicolás Chareca</p>
      </footer>
    </div>
  )
}
