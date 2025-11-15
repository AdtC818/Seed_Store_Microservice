export function ImprosvitaLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 50 50" className="w-full h-full">
          {/* Green Circle */}
          <circle cx="25" cy="12" r="8" fill="#8bc34a" />
          
          {/* Main Shape - Stylized Plant/Flame */}
          <path
            d="M 15 20 Q 10 25 12 35 L 18 45 Q 20 48 25 45 Q 30 48 32 45 L 38 35 Q 40 25 35 20 Q 30 15 25 25 Q 20 15 15 20 Z"
            fill="#8bc34a"
          />
          
          {/* Orange accent on left */}
          <ellipse cx="15" cy="30" rx="5" ry="8" fill="#ff9800" />
          
          {/* Yellow/Orange curved element */}
          <path
            d="M 20 35 Q 15 38 18 42 L 22 40 Z"
            fill="#ffc107"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="tracking-wider">IMPROSVITA</span>
        <span className="text-xs text-gray-400">SOFTWARE DE GESTIÓN</span>
      </div>
    </div>
  );
}
