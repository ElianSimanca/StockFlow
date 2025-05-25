import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { 
  RefreshCw, 
  Check, 
  AlertTriangle, 
  Clock, 
  Database,
  ArrowRightLeft,
  Settings,
  Loader2,
  FileJson,
  Download,
  Upload
} from 'lucide-react';

export const Integration: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [configModal, setConfigModal] = useState(false);
  const [mappingModal, setMappingModal] = useState(false);
  const [logModal, setLogModal] = useState(false);
  
  // Start sync simulation
  const startSync = () => {
    setSyncStatus('syncing');
    
    // Simulate sync completion after 3 seconds
    setTimeout(() => {
      // Randomly success or error (80% success)
      setSyncStatus(Math.random() > 0.2 ? 'success' : 'error');
    }, 3000);
  };
  
  // Get status indicators based on sync status
  const getStatusIndicator = () => {
    switch (syncStatus) {
      case 'syncing':
        return { 
          icon: <Loader2 size={20} className="text-blue-500 animate-spin" />, 
          text: 'Sincronizando...',
          color: 'text-blue-500'
        };
      case 'success':
        return { 
          icon: <Check size={20} className="text-[#2E8B57]" />, 
          text: 'Última sincronización exitosa',
          color: 'text-[#2E8B57]'
        };
      case 'error':
        return { 
          icon: <AlertTriangle size={20} className="text-red-500" />, 
          text: 'Error en la última sincronización',
          color: 'text-red-500'
        };
      default:
        return { 
          icon: <Clock size={20} className="text-[#B3B3B3]" />, 
          text: 'Esperando sincronización',
          color: 'text-[#B3B3B3]'
        };
    }
  };
  
  const statusIndicator = getStatusIndicator();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Integración Siesa
        </h1>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            icon={<Settings size={18} />}
            onClick={() => setConfigModal(true)}
          >
            Configuración
          </Button>
          <Button
            variant="primary"
            icon={<RefreshCw size={18} />}
            onClick={startSync}
            disabled={syncStatus === 'syncing'}
          >
            {syncStatus === 'syncing' ? 'Sincronizando...' : 'Sincronizar Ahora'}
          </Button>
        </div>
      </div>
      
      {/* Status card */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-[#1E1E1E] rounded-lg">
              <Database size={24} className="text-[#2E8B57]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Estado de Conexión: Siesa ERP</h3>
              <div className="flex items-center mt-1">
                {statusIndicator.icon}
                <span className={`text-sm ml-2 ${statusIndicator.color}`}>
                  {statusIndicator.text}
                </span>
                {syncStatus !== 'syncing' && (
                  <span className="text-xs text-[#B3B3B3] ml-3">
                    Última actualización: Hoy, 10:15 AM
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {syncStatus === 'error' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLogModal(true)}
            >
              Ver Detalles
            </Button>
          )}
        </div>
      </Card>
      
      {/* Integration options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer transform transition hover:translate-y-[-4px]"
          icon={<ArrowRightLeft size={24} />}
          onClick={() => setMappingModal(true)}
        >
          <h3 className="text-lg font-medium text-white mt-2">Mapeo de Campos</h3>
          <p className="text-sm text-[#B3B3B3] mt-1">Configura la correspondencia entre campos de STOCK FLOW y Siesa</p>
        </Card>
        
        <Card 
          className="cursor-pointer transform transition hover:translate-y-[-4px]"
          icon={<Clock size={24} />}
        >
          <h3 className="text-lg font-medium text-white mt-2">Programación</h3>
          <p className="text-sm text-[#B3B3B3] mt-1">Establece sincronizaciones automáticas periódicas</p>
        </Card>
        
        <Card 
          className="cursor-pointer transform transition hover:translate-y-[-4px]"
          icon={<FileJson size={24} />}
          onClick={() => setLogModal(true)}
        >
          <h3 className="text-lg font-medium text-white mt-2">Registros</h3>
          <p className="text-sm text-[#B3B3B3] mt-1">Consulta el historial de sincronizaciones y errores</p>
        </Card>
      </div>
      
      {/* Sync statistics */}
      <Card
        title="Estadísticas de Sincronización"
        footer={
          <div className="flex justify-between">
            <span>Actualizado: Hace 45 minutos</span>
            <Button variant="secondary" size="sm">Ver detalles</Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-sm text-[#B3B3B3]">Productos Sincronizados</h4>
            <p className="text-3xl font-bold text-white mt-2">547</p>
          </div>
          <div className="text-center p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-sm text-[#B3B3B3]">Cambios Detectados</h4>
            <p className="text-3xl font-bold text-[#2E8B57] mt-2">32</p>
          </div>
          <div className="text-center p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-sm text-[#B3B3B3]">Errores</h4>
            <p className="text-3xl font-bold text-red-500 mt-2">0</p>
          </div>
          <div className="text-center p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-sm text-[#B3B3B3]">Tiempo</h4>
            <p className="text-3xl font-bold text-blue-500 mt-2">45s</p>
          </div>
        </div>
      </Card>
      
      {/* Configuration Modal */}
      <Modal
        isOpen={configModal}
        onClose={() => setConfigModal(false)}
        title="Configuración de Integración"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfigModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary">
              Guardar Configuración
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-white mb-3">Conexión a Siesa ERP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#B3B3B3] mb-2">Servidor</label>
                <input type="text" className="form-control" defaultValue="erp.empresa.com" />
              </div>
              <div>
                <label className="block text-sm text-[#B3B3B3] mb-2">Puerto</label>
                <input type="text" className="form-control" defaultValue="8080" />
              </div>
              <div>
                <label className="block text-sm text-[#B3B3B3] mb-2">Usuario API</label>
                <input type="text" className="form-control" defaultValue="api_stockflow" />
              </div>
              <div>
                <label className="block text-sm text-[#B3B3B3] mb-2">Contraseña API</label>
                <input type="password" className="form-control" defaultValue="••••••••" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-white mb-3">Opciones de Sincronización</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Sincronización automática</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Notificaciones de errores</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Registro detallado</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Modo bidireccional</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" />
                  <span className="absolute inset-0 bg-[#333333] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200"></span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm text-[#B3B3B3] mb-2">Frecuencia de sincronización</label>
              <select className="form-control">
                <option value="15">Cada 15 minutos</option>
                <option value="30">Cada 30 minutos</option>
                <option value="60" selected>Cada hora</option>
                <option value="360">Cada 6 horas</option>
                <option value="720">Cada 12 horas</option>
                <option value="1440">Diariamente</option>
              </select>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-white mb-3">Acciones Avanzadas</h3>
            <div className="flex space-x-3">
              <Button 
                variant="secondary" 
                size="sm"
                icon={<Download size={16} />}
              >
                Exportar Configuración
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                icon={<Upload size={16} />}
              >
                Importar Configuración
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                icon={<RefreshCw size={16} />}
              >
                Reiniciar Conexión
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      
      {/* Field Mapping Modal */}
      <Modal
        isOpen={mappingModal}
        onClose={() => setMappingModal(false)}
        title="Mapeo de Campos"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setMappingModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary">
              Guardar Mapeo
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-[#B3B3B3]">
            Configura la correspondencia entre los campos de STOCK FLOW y Siesa ERP.
          </p>
          
          <div className="bg-[#1E1E1E] p-4 rounded-md border border-[#333333]">
            <h4 className="text-md font-medium text-white mb-3">Productos</h4>
            
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo STOCK FLOW</label>
                  <input type="text" className="form-control" value="id" disabled />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo Siesa</label>
                  <select className="form-control">
                    <option value="product_id">product_id</option>
                    <option value="sku">sku</option>
                    <option value="item_code">item_code</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                    <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo STOCK FLOW</label>
                  <input type="text" className="form-control" value="name" disabled />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo Siesa</label>
                  <select className="form-control">
                    <option value="product_name">product_name</option>
                    <option value="description">description</option>
                    <option value="item_name">item_name</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                    <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo STOCK FLOW</label>
                  <input type="text" className="form-control" value="stock" disabled />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo Siesa</label>
                  <select className="form-control">
                    <option value="quantity">quantity</option>
                    <option value="stock">stock</option>
                    <option value="on_hand">on_hand</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                    <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo STOCK FLOW</label>
                  <input type="text" className="form-control" value="location" disabled />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo Siesa</label>
                  <select className="form-control">
                    <option value="warehouse">warehouse</option>
                    <option value="location">location</option>
                    <option value="site">site</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                    <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                  </label>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                size="sm"
                className="mt-2"
              >
                Añadir Campo
              </Button>
            </div>
          </div>
          
          <div className="bg-[#1E1E1E] p-4 rounded-md border border-[#333333]">
            <h4 className="text-md font-medium text-white mb-3">Transacciones</h4>
            
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo STOCK FLOW</label>
                  <input type="text" className="form-control" value="transaction_id" disabled />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-[#B3B3B3] mb-1">Campo Siesa</label>
                  <select className="form-control">
                    <option value="transaction_id">transaction_id</option>
                    <option value="id">id</option>
                    <option value="movement_id">movement_id</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                    <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                  </label>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                size="sm"
                className="mt-2"
              >
                Añadir Campo
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      
      {/* Log Modal */}
      <Modal
        isOpen={logModal}
        onClose={() => setLogModal(false)}
        title="Registro de Sincronización"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button variant="secondary" size="sm">Todos</Button>
              <Button variant="secondary" size="sm">Info</Button>
              <Button variant="secondary" size="sm">Advertencia</Button>
              <Button variant="secondary" size="sm">Error</Button>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              icon={<Download size={16} />}
            >
              Descargar Logs
            </Button>
          </div>
          
          <div className="bg-[#121212] p-4 rounded-md font-mono text-sm h-96 overflow-y-auto">
            <div className="space-y-2">
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:15:32</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Iniciando sincronización con Siesa ERP</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:15:33</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Conectando a erp.empresa.com:8080</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:15:34</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Conexión establecida correctamente</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:15:35</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Obteniendo productos actualizados desde Siesa</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:15:40</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Recibidos 547 productos</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:15:42</span>
                <span className="text-yellow-500 min-w-[80px]">WARN</span>
                <span className="text-white">Campo "category" no mapeado en 12 productos</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:15:45</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Actualizando base de datos local</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:15:50</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Actualizados 32 productos en la base de datos local</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:16:00</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Enviando datos de movimientos a Siesa</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:16:10</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Enviados 15 movimientos</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:16:15</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Sincronización completada exitosamente</span>
              </div>
              <div className="flex">
                <span className="text-[#B3B3B3] min-w-[120px]">10:16:17</span>
                <span className="text-[#2E8B57] min-w-[80px]">INFO</span>
                <span className="text-white">Tiempo total de sincronización: 45 segundos</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};