"use client"

import { useState, useCallback } from "react"
import { Brush } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterState {
  priceMin: number
  priceMax: number
  sizes: number[]
  tags: string[]
  isNew: boolean | null
  ratingMin: number
}

interface ProductFilterProps {
  onChange?: (filters: FilterState) => void
  className?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PRICE_MIN = 0
const PRICE_MAX = 500_000
const PRICE_STEP = 5_000

// format a naira value — e.g. 250000 → ₦250k
const formatNaira = (v: number) =>
  v >= 1_000 ? `₦${(v / 1_000).toFixed(0)}k` : `₦${v}`

const AVAILABLE_SIZES = [
  4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13,
]

const AVAILABLE_TAGS = [
  "running",
  "basketball",
  "lifestyle",
  "training",
  "hiking",
  "casual",
  "limited",
]

const DEFAULT_FILTERS: FilterState = {
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
  sizes: [],
  tags: [],
  isNew: null,
  ratingMin: 0,
}

// ─── FilterSection ────────────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
      >
        {title}
        <span className="text-base leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  )
}

// ─── StarPicker ───────────────────────────────────────────────────────────────

function StarPicker({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  const display = hovered || value

  return (
    <div className="flex flex-col gap-2.5">
      {/* Interactive star row */}
      <div
        className="flex items-center gap-1"
        onMouseLeave={() => setHovered(0)}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const star = i + 1
          const filled = star <= display
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onClick={() => onChange(value === star ? 0 : star)}
              className="group transition-transform hover:scale-110 active:scale-95"
              aria-label={`Minimum rating ${star}`}
            >
              <svg
                viewBox="0 0 20 20"
                className={cn(
                  "w-6 h-6 transition-colors duration-100",
                  filled
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-transparent text-border",
                )}
                stroke="currentColor"
                strokeWidth={filled ? 0 : 1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </button>
          )
        })}
      </div>

      {/* Label below stars */}
      <p className="text-xs text-muted-foreground">
        {value > 0 ? (
          <>
            Showing{" "}
            <span className="font-semibold text-foreground">{value}★ & up</span>
          </>
        ) : (
          "Tap a star to set minimum rating"
        )}
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductFilter({ onChange, className }: ProductFilterProps) {
  // draft = what's shown in the UI, not yet committed
  const [draft, setDraft] = useState<FilterState>(DEFAULT_FILTERS)

  const patch = useCallback((p: Partial<FilterState>) => {
    setDraft((prev) => ({ ...prev, ...p }))
  }, [])

  const toggleSize = (size: number) => {
    patch({
      sizes: draft.sizes.includes(size)
        ? draft.sizes.filter((s) => s !== size)
        : [...draft.sizes, size],
    })
  }

  const toggleTag = (tag: string) => {
    patch({
      tags: draft.tags.includes(tag)
        ? draft.tags.filter((t) => t !== tag)
        : [...draft.tags, tag],
    })
  }

  const reset = () => {
    setDraft(DEFAULT_FILTERS)
    onChange?.(DEFAULT_FILTERS)
  }

  const apply = () => onChange?.(draft)

  const hasActiveFilters =
    draft.priceMin > PRICE_MIN ||
    draft.priceMax < PRICE_MAX ||
    draft.sizes.length > 0 ||
    draft.tags.length > 0 ||
    draft.isNew !== null ||
    draft.ratingMin > 0

  return (
    <aside className={cn("flex flex-col w-full", className)}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="text-base font-bold tracking-tight">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Brush className="w-3.5 h-3.5" />
            Clear all
          </button>
        )}
      </div>

      {/* ── Price ── */}
      <FilterSection title="Price">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{formatNaira(draft.priceMin)}</span>
            <span className="text-xs text-muted-foreground">—</span>
            <span className="text-sm font-semibold">{formatNaira(draft.priceMax)}</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-6 text-[10px] text-muted-foreground shrink-0">Min</label>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={draft.priceMin}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v <= draft.priceMax) patch({ priceMin: v })
              }}
              className="w-full accent-primary h-1 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-6 text-[10px] text-muted-foreground shrink-0">Max</label>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={draft.priceMax}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v >= draft.priceMin) patch({ priceMax: v })
              }}
              className="w-full accent-primary h-1 cursor-pointer"
            />
          </div>
        </div>
      </FilterSection>

      {/* ── Sizes ── */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                "h-8 min-w-10 px-2 rounded-full border text-xs font-medium transition-all",
                draft.sizes.includes(size)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background text-foreground hover:border-foreground/40",
              )}
            >
              {size % 1 === 0 ? size : size.toFixed(1)}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* ── Tags ── */}
      <FilterSection title="Category">
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                "h-7 px-3 rounded-full border text-xs font-medium capitalize transition-all",
                draft.tags.includes(tag)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background text-foreground hover:border-foreground/40",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* ── Availability ── */}
      <FilterSection title="Availability">
        <div className="flex gap-2">
          {(
            [
              { label: "All", value: null },
              { label: "New Arrivals", value: true },
            ] as { label: string; value: boolean | null }[]
          ).map(({ label, value }) => (
            <button
              key={label}
              onClick={() => patch({ isNew: value })}
              className={cn(
                "h-7 px-3 rounded-full border text-xs font-medium transition-all",
                draft.isNew === value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background text-foreground hover:border-foreground/40",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* ── Rating ── */}
      <FilterSection title="Rating">
        <StarPicker
          value={draft.ratingMin}
          onChange={(v) => patch({ ratingMin: v })}
        />
      </FilterSection>

      {/* ── Apply button ── */}
      <div className="pt-4 mt-auto">
        <button
          onClick={apply}
          className="w-full h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide transition-opacity hover:opacity-80 active:opacity-70"
        >
          Apply Filters
        </button>
      </div>

    </aside>
  )
}
