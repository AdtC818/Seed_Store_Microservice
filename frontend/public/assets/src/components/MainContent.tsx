import { Settings, Menu } from 'lucide-react';
import improscolLogo from 'figma:asset/53494fdac768070aec5912fee6f405b1f695339f.png';

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-gray-200 px-6 py-3 flex items-center justify-between border-b border-gray-300">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-200"></div>
          </div>
          <span className="text-gray-700">ADMINISTRADOR</span>
          <button className="text-gray-600 hover:text-gray-800">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-300 hover:bg-gray-400 rounded text-gray-700">
          <span>Exit</span>
          <Menu className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-auto bg-white">
        <div className="max-w-4xl">
          {/* Title */}
          <h1 className="mb-6 text-gray-800">IMPROSVITA</h1>

          {/* Description */}
          <div className="mb-8 space-y-4 text-gray-800">
            <p>
              Este sistema ha sido diseñado para apoyar la gestión integral de
              Improscol S.A.S, facilitando el control digital de cada clave de su
              empresa. A través de sus diferentes módulos:
            </p>
            <p>
              Improsvita reemplaza los registros manuales por un sistema centralizado
              y seguro, reduciendo pérdidas de información y optimizando la toma de
              decisiones.
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center mt-12">
            <img 
              src={improscolLogo} 
              alt="Improscol S.A.S - Impulsamos el Progreso Social Colombiano" 
              className="max-w-md w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
