interface LogoFlowPEProps {
  size?: number
  className?: string
}

export default function LogoFlowPE({ size = 120, className = '' }: LogoFlowPEProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Flow PE logo"
      role="img"
    >
      <rect width="100" height="100" rx="18" fill="#0a0a0a" />
      {/* Yellow — large, top-left */}
      <rect x="6" y="6" width="53" height="50" rx="11" fill="#F5C800" />
      {/* Red — small, top-right */}
      <rect x="63" y="11" width="31" height="31" rx="8" fill="#D42B2B" />
      {/* Green — medium, bottom-left */}
      <rect x="6" y="61" width="41" height="33" rx="9" fill="#2DB85A" />
      {/* Olive — tiny, bottom-right */}
      <rect x="63" y="66" width="24" height="24" rx="7" fill="#6B6B00" />
    </svg>
  )
}
