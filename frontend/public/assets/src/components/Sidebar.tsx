import { Tractor, Sprout, Users, Calendar, Coins } from 'lucide-react';
import { ImprosvitaLogo } from './ImprosvitaLogo';

const menuItems = [
  { icon: Tractor, label: 'Gestionar Siembra', color: 'text-green-400' },
  { icon: Sprout, label: 'Gestionar Semillas', color: 'text-orange-400' },
  { icon: Users, label: 'Gestionar Clientes', color: 'text-blue-400' },
  { icon: Calendar, label: 'Gestionar Reservas', color: 'text-white' },
  { icon: Coins, label: 'Gestionar Ventas', color: 'text-yellow-400' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#1a1a1a] text-white flex flex-col">
      {/* Logo Header */}
      <div className="p-6 border-b border-gray-800">
        <ImprosvitaLogo />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-800 transition-colors"
          >
            <item.icon className={`w-6 h-6 ${item.color}`} />
            <span className="text-white">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
