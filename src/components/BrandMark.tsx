/** 对齐官网 site-brand-mark 太极 SVG */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`.trim()} aria-hidden>
      <svg viewBox="0 0 64 64" role="img" aria-label="MMEETT Fate">
        <circle cx="32" cy="32" r="30" fill="currentColor" opacity="0.12" />
        <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="2.4" opacity="0.72" />
        <path
          d="M32 7a25 25 0 1 0 0 50c8.84 0 16-5.6 16-12.5S40.84 32 32 32 16 26.4 16 19.5 23.16 7 32 7Z"
          fill="currentColor"
        />
        <path
          d="M32 7c-8.84 0-16 5.6-16 12.5S23.16 32 32 32s16 5.6 16 12.5S40.84 57 32 57a25 25 0 0 0 0-50Z"
          fill="var(--bg)"
          opacity="0.92"
        />
        <circle cx="32" cy="19.5" r="4.2" fill="var(--bg)" opacity="0.95" />
        <circle cx="32" cy="44.5" r="4.2" fill="currentColor" />
        <path
          d="M11 32h5M48 32h5M32 11v5M32 48v5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.42"
        />
      </svg>
    </span>
  )
}
