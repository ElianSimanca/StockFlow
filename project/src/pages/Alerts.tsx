import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  AlertTriangle, 
  Bell, 
  Check,
  Zap,
  Clock,
  Package,
  RefreshCw,
  X,
  Filter,
  ChevronDown
} from 'lucide-react';

// Mock data for alerts
const alertsData = [
  {
    id: 1,
    type: 'critical',
    title: 'Stock Crítico',
    message: 'Producto #AX-205 (Baterías 9V) por debajo del mínimo (5 unidades).',
    location: 'Montería',
    timestamp: 'Hace 15 minutos',
    resolved: false
  },
  {
    id: 2,
    type: 'warning',
    title: 'Stock Bajo',
    message: 'Producto #BZ-104 (Cables HDMI) próximo al mínimo (12 unidades).',
    location: 'Bogotá',
    timestamp: 'Hace 1 hora',
    resolved: false
  },
  {
    id: 3,
    type: 'sync',
    title: 'Sincronización',
    message: 'Integración con Siesa completada exitosamente.',
    location: 'Todas las ubicaciones',
    timestamp: 'Hace 3 horas',
    resolved: true
  },
  {
    id: 4,
    type: 'warning',
    title: 'Stock Bajo',
    message: 'Producto #GT-703 (Cargadores Portátiles) próximo al mínimo (8 unidades).',
    location: 'Cali',
    timestamp: 'Hace 5 horas',
    resolved: false
  },
  {
    id: 5,
    type: 'critical',
    title: 'Error de Sincronización',
    message: 'Falló la integración automática con Siesa. Reintentando...',
    location: 'Sistema',
    timestamp: 'Hace 12 horas',
    resolved: true
  },
  {
    id: 6,
    type: 'info',
    title: 'Mantenimiento Programado',
    message: 'El sistema estará en mantenimiento el 15/04/2025 de 22:00 a 23:00.',
    location: 'Sistema',
    timestamp: 'Hace 1 día',
    resolved: false
  }
];

export const Alerts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  
  // Filter alerts based on active filter
  const filteredAlerts = alertsData.filter(alert => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'critical') return alert.type === 'critical' && !alert.resolved;
    if (activeFilter === 'warning') return alert.type === 'warning' && !alert.resolved;
    if (activeFilter === 'resolved') return alert.resolved;
    return true;
  });
  
  // Render icon based on alert type
  const renderAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case 'sync':
        return <RefreshCw size={20} className="text-blue-500" />;
      case 'info':
        return <Bell size={20} className="text-[#2E8B57]" />;
      default:
        return <Bell size={20} />;
    }
  };
  
  // Get background color based on alert type
  const getAlertBgColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500/10';
      case 'warning':
        return 'bg-yellow-500/10';
      case 'sync':
        return 'bg-blue-500/10';
      case 'info':
        return 'bg-[#2E8B57]/10';
      default:
        return 'bg-[#333333]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Alertas
        </h1>
        <div className="flex space-x-3">
          <Button
            variant="primary"
            icon={<Check size={18} />}
            onClick={() => {}}
          >
            Marcar Todo como Leído
          </Button>
          <Button
            variant="secondary"
            icon={<Filter size={18} />}
            onClick={() => setShowSettings(!showSettings)}
          >
            Configuración
            <ChevronDown size={16} className="ml-1" />
          </Button>
        </div>
      </div>
      
      {/* Filter tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
        <Button
          variant={activeFilter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveFilter('all')}
        >
          Todas ({alertsData.length})
        </Button>
        <Button
          variant={activeFilter === 'critical' ? 'primary' : 'secondary'}
          size="sm"
          icon={<Zap size={16} />}
          onClick={() => setActiveFilter('critical')}
        >
          Críticas ({alertsData.filter(a => a.type === 'critical' && !a.resolved).length})
        </Button>
        <Button
          variant={activeFilter === 'warning' ? 'primary' : 'secondary'}
          size="sm"
          icon={<AlertTriangle size={16} />}
          onClick={() => setActiveFilter('warning')}
        >
          Advertencias ({alertsData.filter(a => a.type === 'warning' && !a.resolved).length})
        </Button>
        <Button
          variant={activeFilter === 'resolved' ? 'primary' : 'secondary'}
          size="sm"
          icon={<Check size={16} />}
          onClick={() => setActiveFilter('resolved')}
        >
          Resueltas ({alertsData.filter(a => a.resolved).length})
        </Button>
      </div>
      
      {/* Settings panel */}
      {showSettings && (
        <Card className="mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Configuración de Alertas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-md font-medium text-[#B3B3B3]">Notificaciones</h4>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Alertas críticas</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Alertas de advertencia</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Sincronización con Siesa</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Información del sistema</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#333333] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200"></span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-md font-medium text-[#B3B3B3]">Límites de Stock</h4>
              
              <div>
                <label className="block text-sm text-white mb-1">Umbral crítico (%)</label>
                <input type="number" className="form-control" defaultValue="10" min="1" max="100" />
              </div>
              
              <div>
                <label className="block text-sm text-white mb-1">Umbral de advertencia (%)</label>
                <input type="number" className="form-control" defaultValue="20" min="1" max="100" />
              </div>
              
              <Button variant="primary" className="mt-2">
                Guardar Configuración
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Alerts list */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => (
            <Card 
              key={alert.id} 
              className={`${getAlertBgColor(alert.type)} border-l-4 ${
                alert.type === 'critical' ? 'border-l-red-500' : 
                alert.type === 'warning' ? 'border-l-yellow-500' :
                alert.type === 'sync' ? 'border-l-blue-500' : 'border-l-[#2E8B57]'
              } transition duration-200 hover:shadow-lg`}
            >
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  {renderAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">{alert.title}</h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-[#B3B3B3] flex items-center">
                        <Clock size={14} className="mr-1" /> {alert.timestamp}
                      </span>
                      {alert.resolved ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-[#2E8B57]/20 text-[#2E8B57]">
                          Resuelto
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-500">
                          Activo
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-[#B3B3B3] mt-1">{alert.message}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-[#2E8B57] flex items-center">
                      <Package size={14} className="mr-1" /> {alert.location}
                    </span>
                    
                    <div className="flex space-x-2">
                      {!alert.resolved && (
                        <Button 
                          variant="secondary"
                          size="sm"
                          icon={<Check size={16} />}
                        >
                          Resolver
                        </Button>
                      )}
                      <Button 
                        variant="secondary"
                        size="sm"
                        icon={<X size={16} />}
                      >
                        Ignorar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="py-10">
            <div className="text-center">
              <Check size={48} className="mx-auto mb-4 text-[#2E8B57] opacity-50" />
              <h3 className="text-xl font-medium text-white mb-2">Todo en orden</h3>
              <p className="text-[#B3B3B3]">No hay alertas que mostrar en este momento.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};