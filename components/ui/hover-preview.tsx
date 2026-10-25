import { useState, type ReactNode } from "react"

const PREVIEW_WIDTH = 280

// Shows the image in the data-preview attribute of the hovered element next to the pointer.
export function HoverPreview({ children }: { children: ReactNode }) {
  const [src, setSrc] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <div
      onMouseOver={(e) => {
        const target = (e.target as Element).closest<HTMLElement>("[data-preview]")
        if (target) setSrc(target.dataset.preview ?? null)
        setIsVisible(Boolean(target))
      }}
      onMouseMove={(e) =>
        setPosition({ x: Math.min(e.clientX + 20, window.innerWidth - PREVIEW_WIDTH - 16), y: e.clientY - 100 })
      }
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {/* The preview needs a pointer that can hover, so touch screens do not show it. */}
      {/* The preview stays mounted, so the first hover also fades in. */}
      <div
        aria-hidden="true"
        className="project-preview pointer-events-none fixed top-0 left-0 z-50 hidden overflow-hidden rounded-xl bg-secondary shadow-2xl [@media(hover:hover)]:block"
        style={{
          width: PREVIEW_WIDTH,
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
      >
        <img
          src={src ?? undefined}
          alt=""
          className="block h-auto w-full transition-all duration-500 ease-out"
          style={{ scale: isVisible ? 1 : 1.1, filter: isVisible ? "none" : "blur(10px)" }}
        />
      </div>
    </div>
  )
}
