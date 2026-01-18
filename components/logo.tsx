interface LogoProps {
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ variant = "default", size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 22, text: "text-base", gap: "gap-2" },
    md: { icon: 28, text: "text-lg", gap: "gap-2.5" },
    lg: { icon: 36, text: "text-xl", gap: "gap-3" },
  }

  const textColors = {
    default: "text-foreground",
    light: "text-white",
    dark: "text-foreground",
  }

  const { icon, text, gap } = sizes[size]
  const textColor = textColors[variant]

  return (
    <div className={`flex items-center ${gap}`}>
      {/* Icono de casa estilizado */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Casa con forma moderna */}
        <path
          d="M16 3L3 14V28C3 28.5523 3.44772 29 4 29H12V20C12 19.4477 12.4477 19 13 19H19C19.5523 19 20 19.4477 20 20V29H28C28.5523 29 29 28.5523 29 28V14L16 3Z"
          fill="#10B981"
        />
        {/* Punto de luz */}
        <circle cx="16" cy="12" r="3" fill="white" />
      </svg>

      {showText && (
        <span className={`font-bold ${text} ${textColor} tracking-tight`}>
          HOGAR<span className="text-emerald-500">YA</span>
        </span>
      )}
    </div>
  )
}
