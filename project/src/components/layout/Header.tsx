import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Toggle notification dropdown
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };
  
  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  return (
    <header className="bg-[#1E1E1E] border-b border-[#333333] shadow-md">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-[#B3B3B3] hover:text-white md:hidden"
        >
          <Menu size={24} />
        </button>
        
        {/* Search bar - expands on mobile when active */}
        <div className={`${
          isSearchActive ? 'flex-1' : 'w-64'
        } relative hidden md:block`}>
          <div className="relative">
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B3B3B3]" 
            />
            <input
              type="text"
              placeholder="Buscar productos, alertas..."
              className="w-full pl-10 pr-4 py-2 bg-[#333333] rounded-md focus:ring-2 focus:ring-[#2E8B57] text-white placeholder-[#B3B3B3] outline-none"
            />
          </div>
        </div>
        
        {/* Mobile search toggle */}
        <div className="md:hidden">
          {isSearchActive ? (
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-3 pr-10 py-2 bg-[#333333] rounded-md text-white placeholder-[#B3B3B3] outline-none"
                autoFocus
              />
              <X
                size={20}
                className="absolute right-12 text-[#B3B3B3]"
                onClick={() => setIsSearchActive(false)}
              />
            </div>
          ) : (
            <button 
              onClick={() => setIsSearchActive(true)}
              className="p-2 rounded-md text-[#B3B3B3] hover:text-white"
            >
              <Search size={20} />
            </button>
          )}
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full text-[#B3B3B3] hover:text-white hover:bg-[#333333] transition-colors duration-200 relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Notification dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1E1E1E] rounded-md shadow-lg border border-[#333333] z-50">
                <div className="p-3 border-b border-[#333333]">
                  <h3 className="text-sm font-medium text-white">Notificaciones</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-[#333333] bg-[#333333]/30">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-500/20 p-2 rounded-md">
                        <Bell size={16} className="text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-[#2E8B57]">Stock Crítico</p>
                        <p className="text-sm text-white">Producto #AX-205 (Baterías 9V) por debajo del mínimo (5 unidades)</p>
                        <p className="text-xs text-[#B3B3B3] mt-1">Hace 15 minutos</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b border-[#333333]">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-yellow-500/20 p-2 rounded-md">
                        <Bell size={16} className="text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-[#2E8B57]">Pedido pendiente</p>
                        <p className="text-sm text-white">Pedido #34521 requiere aprobación</p>
                        <p className="text-xs text-[#B3B3B3] mt-1">Hace 1 hora</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-md">
                        <RefreshCw size={16} className="text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-[#2E8B57]">Sincronización</p>
                        <p className="text-sm text-white">Integración con Siesa completada</p>
                        <p className="text-xs text-[#B3B3B3] mt-1">Hace 3 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-[#333333] text-center">
                  <button className="text-sm text-[#2E8B57] hover:text-[#3CB371]">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 p-2 rounded-full text-[#B3B3B3] hover:text-white hover:bg-[#333333] transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-[#2E8B57] flex items-center justify-center text-white">
                <User size={18} />
              </div>
            </button>
            
            {/* Profile dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1E1E1E] rounded-md shadow-lg border border-[#333333] z-50">
                <div className="p-3 border-b border-[#333333]">
                  <p className="text-sm font-medium text-white">Carlos Rodriguez</p>
                  <p className="text-xs text-[#B3B3B3]">Administrador</p>
                </div>
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-[#B3B3B3] hover:bg-[#333333] hover:text-white">
                    Perfil
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-[#B3B3B3] hover:bg-[#333333] hover:text-white">
                    Configuración
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-red-500 hover:bg-[#333333]">
                    Cerrar sesión
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};