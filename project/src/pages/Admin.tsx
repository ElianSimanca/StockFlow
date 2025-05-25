import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { 
  Users, 
  UserPlus,
  Settings,
  Shield,
  Eye,
  EyeOff,
  Edit,
  Trash,
  User,
  Save,
  X
} from 'lucide-react';

// Mock users data
const usersData = [
  { id: 1, name: 'Carlos Rodriguez', email: 'carlos@empresa.com', role: 'Administrador', status: 'active' },
  { id: 2, name: 'Ana Martinez', email: 'ana@empresa.com', role: 'Supervisor', status: 'active' },
  { id: 3, name: 'Juan Gomez', email: 'juan@empresa.com', role: 'Operador', status: 'active' },
  { id: 4, name: 'Maria Lopez', email: 'maria@empresa.com', role: 'Supervisor', status: 'inactive' },
  { id: 5, name: 'Diego Vargas', email: 'diego@empresa.com', role: 'Operador', status: 'active' },
];

// Role permissions data
const rolePermissions = {
  Administrador: {
    dashboard: true,
    inventory: true,
    reports: true,
    alerts: true,
    integration: true,
    admin: true
  },
  Supervisor: {
    dashboard: true,
    inventory: true,
    reports: true,
    alerts: true,
    integration: false,
    admin: false
  },
  Operador: {
    dashboard: true,
    inventory: true,
    reports: false,
    alerts: true,
    integration: false,
    admin: false
  }
};

export const Admin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [settingsTab, setSettingsTab] = useState('usuarios');
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Open user edit modal
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setAddUserModal(true);
  };
  
  // Close user modal and reset selection
  const closeUserModal = () => {
    setAddUserModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Administración
        </h1>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            icon={<Settings size={18} />}
            onClick={() => setSettingsTab('configuracion')}
          >
            Configuración
          </Button>
          <Button
            variant="primary"
            icon={<UserPlus size={18} />}
            onClick={() => setAddUserModal(true)}
          >
            Añadir Usuario
          </Button>
        </div>
      </div>
      
      {/* Settings tabs */}
      <div className="flex space-x-2 border-b border-[#333333] mb-6">
        <button 
          className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
            settingsTab === 'usuarios' 
              ? 'border-[#2E8B57] text-white' 
              : 'border-transparent text-[#B3B3B3] hover:text-white'
          }`}
          onClick={() => setSettingsTab('usuarios')}
        >
          Usuarios
        </button>
        <button 
          className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
            settingsTab === 'roles' 
              ? 'border-[#2E8B57] text-white' 
              : 'border-transparent text-[#B3B3B3] hover:text-white'
          }`}
          onClick={() => setSettingsTab('roles')}
        >
          Roles y Permisos
        </button>
        <button 
          className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
            settingsTab === 'configuracion' 
              ? 'border-[#2E8B57] text-white' 
              : 'border-transparent text-[#B3B3B3] hover:text-white'
          }`}
          onClick={() => setSettingsTab('configuracion')}
        >
          Configuración General
        </button>
      </div>
      
      {/* Users tab */}
      {settingsTab === 'usuarios' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left bg-[#1E1E1E] text-[#2E8B57]">Usuario</th>
                  <th className="py-3 px-4 text-left bg-[#1E1E1E] text-[#2E8B57]">Email</th>
                  <th className="py-3 px-4 text-left bg-[#1E1E1E] text-[#2E8B57]">Rol</th>
                  <th className="py-3 px-4 text-left bg-[#1E1E1E] text-[#2E8B57]">Estado</th>
                  <th className="py-3 px-4 text-right bg-[#1E1E1E] text-[#2E8B57]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.id} className="border-b border-[#333333]">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#2E8B57] flex items-center justify-center text-white mr-3">
                          <User size={16} />
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#B3B3B3]">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Administrador' 
                          ? 'bg-red-500/20 text-red-500'
                          : user.role === 'Supervisor'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-[#2E8B57]/20 text-[#2E8B57]'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-[#2E8B57]/20 text-[#2E8B57]'
                          : 'bg-[#333333] text-[#B3B3B3]'
                      }`}>
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Edit size={16} />}
                        className="mr-2"
                        onClick={() => handleEditUser(user)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Trash size={16} />}
                        className="text-red-500 border-red-500 hover:bg-red-500/10"
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {/* Roles tab */}
      {settingsTab === 'roles' && (
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-white">Roles del Sistema</h2>
              <Button
                variant="secondary"
                size="sm"
                icon={<Shield size={16} />}
              >
                Añadir Rol
              </Button>
            </div>
            
            <div className="space-y-4">
              {Object.keys(rolePermissions).map((role) => (
                <div key={role} className="p-4 border border-[#333333] rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-white">{role}</h3>
                      <p className="text-sm text-[#B3B3B3] mt-1">
                        {role === 'Administrador' 
                          ? 'Acceso completo a todas las funcionalidades del sistema'
                          : role === 'Supervisor'
                          ? 'Acceso a inventario, reportes y alertas'
                          : 'Acceso básico al inventario y alertas'
                        }
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<Edit size={16} />}
                      onClick={() => setEditRoleModal(true)}
                    >
                      Editar Permisos
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                    {Object.entries(rolePermissions[role as keyof typeof rolePermissions]).map(([perm, enabled]) => (
                      <div key={perm} className={`py-1 px-2 rounded text-xs text-center ${
                        enabled ? 'bg-[#2E8B57]/20 text-[#2E8B57]' : 'bg-[#333333] text-[#B3B3B3]'
                      }`}>
                        {perm === 'dashboard' ? 'Dashboard' :
                         perm === 'inventory' ? 'Inventario' :
                         perm === 'reports' ? 'Reportes' :
                         perm === 'alerts' ? 'Alertas' :
                         perm === 'integration' ? 'Integración' : 'Admin'}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      
      {/* General settings tab */}
      {settingsTab === 'configuracion' && (
        <div className="space-y-6">
          <Card title="Configuración General">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#B3B3B3] mb-2">Nombre de la Empresa</label>
                <input type="text" className="form-control" defaultValue="Empresa S.A.S." />
              </div>
              <div>
                <label className="block text-sm text-[#B3B3B3] mb-2">Correo de Contacto</label>
                <input type="email" className="form-control" defaultValue="contacto@empresa.com" />
              </div>
              <div>
                <label className="block text-sm text-[#B3B3B3] mb-2">Zona Horaria</label>
                <select className="form-control">
                  <option value="America/Bogota">America/Bogota (UTC-5)</option>
                  <option value="America/Mexico_City">America/Mexico_City (UTC-6)</option>
                  <option value="America/Santiago">America/Santiago (UTC-4)</option>
                  <option value="America/Buenos_Aires">America/Buenos_Aires (UTC-3)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#B3B3B3] mb-2">Idioma Predeterminado</label>
                <select className="form-control">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-white mb-3">Opciones de Seguridad</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Autenticación de dos factores</label>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input type="checkbox" className="opacity-0 w-0 h-0" />
                    <span className="absolute inset-0 bg-[#333333] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200"></span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Registro de actividad de usuarios</label>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                    <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Bloqueo después de 5 intentos fallidos</label>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                    <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button variant="primary" icon={<Save size={18} />}>
                Guardar Configuración
              </Button>
            </div>
          </Card>
          
          <Card title="Gestión de Copias de Seguridad">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-[#333333] rounded-md">
                <div>
                  <h4 className="font-medium text-white">Copia de seguridad automática</h4>
                  <p className="text-sm text-[#B3B3B3]">Se ejecuta todos los días a las 02:00 AM</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="p-4 border border-[#333333] rounded-md">
                <h4 className="font-medium text-white mb-2">Copias de seguridad recientes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#B3B3B3]">backup_20250325_020000.zip</span>
                    <span className="text-xs text-[#B3B3B3]">25/03/2025 02:00 AM</span>
                    <Button variant="secondary" size="sm">Descargar</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#B3B3B3]">backup_20250324_020000.zip</span>
                    <span className="text-xs text-[#B3B3B3]">24/03/2025 02:00 AM</span>
                    <Button variant="secondary" size="sm">Descargar</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#B3B3B3]">backup_20250323_020000.zip</span>
                    <span className="text-xs text-[#B3B3B3]">23/03/2025 02:00 AM</span>
                    <Button variant="secondary" size="sm">Descargar</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="primary">
                  Crear Copia de Seguridad Ahora
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Add/Edit User Modal */}
      <Modal
        isOpen={addUserModal}
        onClose={closeUserModal}
        title={selectedUser ? "Editar Usuario" : "Añadir Nuevo Usuario"}
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={closeUserModal}>
              Cancelar
            </Button>
            <Button variant="primary" icon={<Save size={18} />}>
              {selectedUser ? "Guardar Cambios" : "Crear Usuario"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Nombre Completo
            </label>
            <input 
              type="text" 
              className="form-control" 
              defaultValue={selectedUser ? selectedUser.name : ''}
              placeholder="Nombre Apellido"
            />
          </div>
          
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              className="form-control" 
              defaultValue={selectedUser ? selectedUser.email : ''}
              placeholder="correo@empresa.com"
            />
          </div>
          
          {!selectedUser && (
            <div>
              <label className="block text-sm text-[#B3B3B3] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control pr-10" 
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#B3B3B3]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#B3B3B3]" />
                  )}
                </button>
              </div>
              <p className="text-xs text-[#B3B3B3] mt-1">
                Mínimo 8 caracteres, incluyendo una letra mayúscula y un número
              </p>
            </div>
          )}
          
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Rol
            </label>
            <select 
              className="form-control"
              defaultValue={selectedUser ? selectedUser.role : ''}
            >
              <option value="Administrador">Administrador</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Operador">Operador</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Estado
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="status" 
                  value="active" 
                  defaultChecked={!selectedUser || selectedUser.status === 'active'} 
                  className="h-4 w-4 text-[#2E8B57]"
                />
                <span className="ml-2 text-sm text-white">Activo</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="status" 
                  value="inactive" 
                  defaultChecked={selectedUser && selectedUser.status === 'inactive'} 
                  className="h-4 w-4 text-[#2E8B57]"
                />
                <span className="ml-2 text-sm text-white">Inactivo</span>
              </label>
            </div>
          </div>
          
          {selectedUser && (
            <div className="mt-2 pt-2 border-t border-[#333333]">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
              >
                Restablecer Contraseña
              </Button>
            </div>
          )}
        </div>
      </Modal>
      
      {/* Edit Role Modal */}
      <Modal
        isOpen={editRoleModal}
        onClose={() => setEditRoleModal(false)}
        title="Editar Permisos del Rol"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditRoleModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary">
              Guardar Cambios
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Nombre del Rol
            </label>
            <input 
              type="text" 
              className="form-control" 
              defaultValue="Supervisor"
            />
          </div>
          
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Descripción
            </label>
            <textarea 
              className="form-control" 
              rows={2}
              defaultValue="Acceso a inventario, reportes y alertas"
            />
          </div>
          
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Permisos
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-[#1E1E1E]">
                <label className="text-sm text-white">Dashboard</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded bg-[#1E1E1E]">
                <label className="text-sm text-white">Gestión de Inventario</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded bg-[#1E1E1E]">
                <label className="text-sm text-white">Reportes</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded bg-[#1E1E1E]">
                <label className="text-sm text-white">Alertas</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute inset-0 bg-[#2E8B57] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 before:translate-x-6"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded bg-[#1E1E1E]">
                <label className="text-sm text-white">Integración Siesa</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" />
                  <span className="absolute inset-0 bg-[#333333] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded bg-[#1E1E1E]">
                <label className="text-sm text-white">Administración</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input type="checkbox" className="opacity-0 w-0 h-0" />
                  <span className="absolute inset-0 bg-[#333333] rounded-full cursor-pointer transition-all duration-200 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};