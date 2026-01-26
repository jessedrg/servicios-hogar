interface LogoProps {
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
}

export function Logo({ variant = "default", size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-sm", gap: "gap-2" },
    md: { icon: 32, text: "text-base", gap: "gap-2.5" },
    lg: { icon: 40, text: "text-lg", gap: "gap-3" },
    xl: { icon: 48, text: "text-xl", gap: "gap-3.5" },
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
      {/* Logo Servicios Hogar - Casa con herramienta */}
      <div className="relative flex-shrink-0">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fondo circular con gradiente */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#F7931E" />
            </linearGradient>
            <linearGradient id="houseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0F0F0" />
            </linearGradient>
          </defs>
          
          {/* Círculo de fondo */}
          <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
          
          {/* Casa moderna */}
          <path
            d="M24 10L10 21V36C10 36.5523 10.4477 37 11 37H19V28C19 27.4477 19.4477 27 20 27H28C28.5523 27 29 27.4477 29 28V37H37C37.5523 37 38 36.5523 38 36V21L24 10Z"
            fill="url(#houseGradient)"
          />
          
          {/* Llave/herramienta estilizada */}
          <circle cx="24" cy="19" r="4" fill="#FF6B35" />
          <rect x="22" y="22" width="4" height="8" rx="1" fill="#FF6B35" />
          
          {/* Brillo */}
          <circle cx="17" cy="15" r="2" fill="white" fillOpacity="0.3" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-black ${text} ${textColor} tracking-tight uppercase`}>
            Servicios
          </span>
          <span className={`font-black ${text} text-[#FF6B35] tracking-tight uppercase`}>
            Hogar
          </span>
        </div>
      )}
    </div>
  )
}
