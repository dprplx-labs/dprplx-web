type Props = {
  width?: number
  className?: string
  stoneCount?: 1 | 2 | 3
}

// Cairn: three stacked elliptical stones, outline only.
// Top (smallest) = white → middle = #87B1FF → bottom (largest) = IBM blue #0F62FE
// stoneCount controls how many stones are visible (for the staged reveal animation).
export default function LogoMark({ width = 80, className, stoneCount = 3 }: Props) {
  return (
    <svg
      viewBox="0 0 62 58"
      width={width}
      height={Math.round((width * 58) / 62)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {/* Bottom stone — IBM blue, widest (always first to appear) */}
      <ellipse
        cx="31" cy="42" rx="27" ry="9"
        stroke="#0F62FE" strokeWidth="2"
        style={{ opacity: stoneCount >= 1 ? 1 : 0, transition: 'opacity 0.35s ease-out' }}
      />

      {/* Middle stone — exact midpoint between white and IBM blue */}
      <ellipse
        cx="31" cy="26" rx="20" ry="7"
        stroke="#87B1FF" strokeWidth="2"
        style={{ opacity: stoneCount >= 2 ? 1 : 0, transition: 'opacity 0.35s ease-out' }}
      />

      {/* Top stone — white, narrowest */}
      <ellipse
        cx="31" cy="13" rx="13" ry="6"
        stroke="#FFFFFF" strokeWidth="2"
        style={{ opacity: stoneCount >= 3 ? 1 : 0, transition: 'opacity 0.35s ease-out' }}
      />
    </svg>
  )
}
