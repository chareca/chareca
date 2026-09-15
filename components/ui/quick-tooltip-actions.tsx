"use client"

import * as Popover from "@radix-ui/react-popover"
import { Building2, UserRound } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const profiles = [
  { label: "personal", href: "https://github.com/chareca", icon: UserRound },
  { label: "RONUS", href: "https://github.com/ronustech", icon: Building2 },
]

export function QuickTooltipActions() {
  const [isOpen, setIsOpen] = useState(false)
  const openedByHover = useRef(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  function cancelClose() {
    clearTimeout(closeTimer.current)
  }

  function scheduleClose() {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      if (!contentRef.current?.contains(document.activeElement)) setIsOpen(false)
    }, 180)
  }

  function closeFromKeyboard() {
    cancelClose()
    openedByHover.current = false
    setIsOpen(false)
  }

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(nextOpen) => {
        cancelClose()
        setIsOpen(nextOpen)
      }}
    >
      <Popover.Trigger asChild>
        <button
          type="button"
          className="text-link -my-3 py-3 text-sm"
          aria-label="GitHub profiles"
          onPointerEnter={(event) => {
            if (event.pointerType !== "mouse") return
            cancelClose()
            openedByHover.current = true
            setIsOpen(true)
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") scheduleClose()
          }}
          onPointerDown={() => { openedByHover.current = false }}
          onKeyDown={() => { openedByHover.current = false }}
        >
          GitHub
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          ref={contentRef}
          side="top"
          align="center"
          sideOffset={8}
          collisionPadding={16}
          aria-label="GitHub profiles"
          className="quick-action-popup z-40 flex items-center gap-1 rounded-xl border border-border bg-popover p-1.5 font-mono text-popover-foreground"
          onPointerEnter={cancelClose}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") scheduleClose()
          }}
          onFocusCapture={() => { openedByHover.current = false }}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            if (!openedByHover.current) contentRef.current?.querySelector("a")?.focus()
          }}
          onCloseAutoFocus={(event) => {
            if (openedByHover.current) event.preventDefault()
          }}
          onEscapeKeyDown={closeFromKeyboard}
        >
          <TooltipProvider delayDuration={150}>
            {profiles.map(({ label, href, icon: Icon }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon" className="rounded-full hover:text-primary">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent onEscapeKeyDown={closeFromKeyboard}>{label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
