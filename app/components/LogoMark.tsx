type Props = {
  width?: number
  className?: string
}

// Cairn: three stacked elliptical stones, outline only.
// Top (smallest) = white → middle = #87B1FF → bottom (largest) = IBM blue #0F62FE
// Each stone sits exactly on the one below.
export default function LogoMark({ width = 80, className }: Props) {
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
      {/* Bottom stone — IBM blue, widest */}
      <ellipse cx="31" cy="42" rx="27" ry="9"  stroke="#0F62FE" strokeWidth="2" />

      {/* Middle stone — exact midpoint between white and IBM blue */}
      <ellipse cx="31" cy="26" rx="20" ry="7"  stroke="#87B1FF" strokeWidth="2" />

      {/* Top stone — white, narrowest */}
      <ellipse cx="31" cy="13" rx="13" ry="6"  stroke="#FFFFFF"  strokeWidth="2" />
    </svg>
  )
}
