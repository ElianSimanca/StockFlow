import React from 'react';
import { 
  Home, 
  Package, 
  BarChart2, 
  Bell, 
  RefreshCw, 
  Users, 
  Wifi, 
  WifiOff 
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  // Simulate online status (in a real app, this would come from a context or hook)
  const [isOnline, setIsOnline] = React.useState(true);
  
  // Toggle online status for demo purposes
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  // Navigation items with icons
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { id: 'inventory', name: 'Gestión de Inventario', icon: <Package size={20} /> },
    { id: 'reports', name: 'Reportes', icon: <BarChart2 size={20} /> },
    { id: 'alerts', name: 'Alertas', icon: <Bell size={20} /> },
    { id: 'integration', name: 'Integración Siesa', icon: <RefreshCw size={20} /> },
    { id: 'admin', name: 'Administración', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#121212] border-r border-[#333333]">
      {/* Logo */}
      <div className="p-6 border-b border-[#333333]">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Package className="mr-2 text-[#2E8B57]" />
          <span>STOCK FLOW</span>
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                  activePage === item.id
                    ? 'bg-[#2E8B57] text-white'
                    : 'text-[#B3B3B3] hover:bg-[#1E1E1E] hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
                
                {/* Show active alert badge for the Alerts section */}
                {item.id === 'alerts' && (
                  <span className="ml-auto bg-red-500 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Connection status footer */}
      <div 
        className="p-4 border-t border-[#333333] flex items-center cursor-pointer"
        onClick={toggleOnlineStatus}
      >
        {isOnline ? (
          <>
            <Wifi size={18} className="text-[#2E8B57] mr-2" />
            <span className="text-sm text-[#B3B3B3]">Conectado</span>
          </>
        ) : (
          <>
            <WifiOff size={18} className="text-red-500 mr-2" />
            <span className="text-sm text-[#B3B3B3]">Desconectado</span>
          </>
        )}
      </div>
    </div>
  );
};