import React, { useState } from 'react';
import { Table } from '../components/ui/Table';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Search, Filter, Plus, Package, ScanBarcode as BarcodeScan, X, AlertTriangle } from 'lucide-react';

// Mock data for inventory
const inventoryData = [
  { id: 'AX-205', name: 'Baterías 9V', stock: 5, location: 'Montería', status: 'critical' },
  { id: 'BZ-104', name: 'Cables HDMI', stock: 12, location: 'Bogotá', status: 'warning' },
  { id: 'CL-320', name: 'Teclados Inalámbricos', stock: 47, location: 'Medellín', status: 'normal' },
  { id: 'DM-431', name: 'Mouse Óptico', stock: 65, location: 'Cali', status: 'normal' },
  { id: 'EQ-512', name: 'Audífonos Bluetooth', stock: 23, location: 'Bogotá', status: 'normal' },
  { id: 'FS-601', name: 'Adaptadores USB-C', stock: 31, location: 'Medellín', status: 'normal' },
  { id: 'GT-703', name: 'Cargadores Portátiles', stock: 8, location: 'Cali', status: 'warning' },
  { id: 'HV-815', name: 'Webcams HD', stock: 42, location: 'Montería', status: 'normal' },
  { id: 'IW-927', name: 'Discos SSD 500GB', stock: 17, location: 'Bogotá', status: 'normal' },
  { id: 'JX-038', name: 'Tarjetas de Memoria', stock: 54, location: 'Medellín', status: 'normal' },
];

// Column definition for the inventory table
const columns = [
  { 
    header: 'ID', 
    accessor: 'id' as const,
    sortable: true 
  },
  { 
    header: 'Producto', 
    accessor: 'name' as const,
    sortable: true 
  },
  { 
    header: 'Stock', 
    accessor: 'stock' as const,
    sortable: true,
    cell: (value: number, row: any) => (
      <div className="flex items-center">
        <span>{value}</span>
        {row.status === 'critical' && (
          <AlertTriangle size={16} className="ml-2 text-red-500" />
        )}
        {row.status === 'warning' && (
          <AlertTriangle size={16} className="ml-2 text-yellow-500" />
        )}
      </div>
    )
  },
  { 
    header: 'Ubicación', 
    accessor: 'location' as const,
    sortable: true
  },
  {
    header: 'Acciones',
    accessor: 'id' as const,
    cell: () => (
      <div className="flex space-x-1">
        <button className="p-1 text-[#B3B3B3] hover:text-[#2E8B57] rounded">
          Ver
        </button>
        <button className="p-1 text-[#B3B3B3] hover:text-[#2E8B57] rounded">
          Editar
        </button>
      </div>
    )
  }
];

export const Inventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [scannerModal, setScannerModal] = useState(false);
  const [productDetail, setProductDetail] = useState<any>(null);
  
  // Handle row click to show product detail
  const handleRowClick = (row: any) => {
    setProductDetail(row);
  };
  
  // Filter data based on search query
  const filteredData = inventoryData.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle add product modal
  const toggleAddProductModal = () => {
    setAddProductModal(!addProductModal);
  };
  
  // Toggle barcode scanner modal
  const toggleScannerModal = () => {
    setScannerModal(!scannerModal);
  };
  
  // Close product detail panel
  const closeProductDetail = () => {
    setProductDetail(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Gestión de Inventario
        </h1>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={toggleAddProductModal}
        >
          Añadir Producto
        </Button>
      </div>
      
      {/* Search and filter bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B3B3B3]" 
            />
            <input
              type="text"
              placeholder="Buscar por ID, nombre o ubicación..."
              className="form-control pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              icon={<Filter size={18} />}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filtros
            </Button>
            <Button
              variant="secondary"
              icon={<BarcodeScan size={18} />}
              onClick={toggleScannerModal}
            >
              Escanear
            </Button>
          </div>
        </div>
        
        {/* Filters panel */}
        {filterOpen && (
          <div className="mt-4 p-4 border-t border-[#333333] grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#B3B3B3] mb-2">Ubicación</label>
              <select className="form-control">
                <option value="">Todas</option>
                <option value="Bogotá">Bogotá</option>
                <option value="Medellín">Medellín</option>
                <option value="Cali">Cali</option>
                <option value="Montería">Montería</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#B3B3B3] mb-2">Estado</label>
              <select className="form-control">
                <option value="">Todos</option>
                <option value="critical">Crítico</option>
                <option value="warning">Advertencia</option>
                <option value="normal">Normal</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="primary" fullWidth>Aplicar Filtros</Button>
            </div>
          </div>
        )}
      </Card>
      
      {/* Inventory table */}
      <Card>
        <Table 
          columns={columns} 
          data={filteredData}
          onRowClick={handleRowClick}
        />
      </Card>
      
      {/* Floating action button for mobile */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button 
          className="w-14 h-14 rounded-full bg-[#2E8B57] flex items-center justify-center shadow-lg"
          onClick={toggleAddProductModal}
        >
          <Plus size={24} className="text-white" />
        </button>
      </div>
      
      {/* Add Product Modal */}
      <Modal
        isOpen={addProductModal}
        onClose={toggleAddProductModal}
        title="Añadir Nuevo Producto"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={toggleAddProductModal}>
              Cancelar
            </Button>
            <Button variant="primary">
              Guardar Producto
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              ID del Producto
            </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ej. AB-123"
            />
          </div>
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Nombre del Producto
            </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ej. Teclado Inalámbrico"
            />
          </div>
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Cantidad
            </label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Ubicación
            </label>
            <select className="form-control">
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
              <option value="Montería">Montería</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Descripción
            </label>
            <textarea 
              className="form-control" 
              placeholder="Descripción del producto..."
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Stock Mínimo
            </label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-[#B3B3B3] mb-2">
              Stock Máximo
            </label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="0"
              min="0"
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <Button 
              variant="secondary"
              icon={<BarcodeScan size={18} />}
              onClick={toggleScannerModal}
            >
              Escanear Código de Barras
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Barcode Scanner Modal */}
      <Modal
        isOpen={scannerModal}
        onClose={toggleScannerModal}
        title="Escanear Código de Barras"
        size="md"
      >
        <div className="space-y-4">
          <div className="relative aspect-video bg-black/50 rounded-md flex items-center justify-center border-2 border-dashed border-[#2E8B57]/50">
            <div className="text-center">
              <BarcodeScan size={48} className="text-[#2E8B57] mx-auto mb-2" />
              <p className="text-[#B3B3B3]">Posiciona el código de barras frente a la cámara</p>
            </div>
            {/* Scan animation line */}
            <div className="absolute left-0 right-0 h-0.5 bg-[#2E8B57] top-1/2 transform -translate-y-1/2 pulse"></div>
          </div>
          
          <div>
            <p className="text-sm text-[#B3B3B3] mb-2">También puedes ingresar el código manualmente:</p>
            <div className="flex space-x-2">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ingresar código..."
              />
              <Button variant="primary">Buscar</Button>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Button 
              variant="primary"
              size="lg"
              onClick={toggleScannerModal}
            >
              Cerrar Escáner
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Product Detail Panel */}
      {productDetail && (
        <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-[#1E1E1E] shadow-xl z-40 border-l border-[#333333] transform transition-transform duration-300 overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-[#333333]">
            <h3 className="text-lg font-medium text-white">Detalles del Producto</h3>
            <button 
              onClick={closeProductDetail}
              className="text-[#B3B3B3] hover:text-white p-1 rounded-full hover:bg-[#333333]"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-[#333333] rounded-md flex items-center justify-center">
                <Package size={32} className="text-[#2E8B57]" />
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-medium text-white">{productDetail.name}</h4>
                <p className="text-[#B3B3B3]">ID: {productDetail.id}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-[#282828]">
                <span className="text-sm text-[#B3B3B3]">Stock Actual</span>
                <div className="text-xl font-bold mt-1 text-white">{productDetail.stock}</div>
              </div>
              <div className="card bg-[#282828]">
                <span className="text-sm text-[#B3B3B3]">Ubicación</span>
                <div className="text-xl font-bold mt-1 text-white">{productDetail.location}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-md font-medium text-white border-b border-[#333333] pb-2">Información Adicional</h5>
              
              <div>
                <span className="text-sm text-[#B3B3B3]">Estado:</span>
                <span className="ml-2 text-sm">
                  {productDetail.status === 'critical' && (
                    <span className="text-red-500 flex items-center">
                      <AlertTriangle size={14} className="mr-1" /> Crítico
                    </span>
                  )}
                  {productDetail.status === 'warning' && (
                    <span className="text-yellow-500 flex items-center">
                      <AlertTriangle size={14} className="mr-1" /> Advertencia
                    </span>
                  )}
                  {productDetail.status === 'normal' && (
                    <span className="text-green-500">Normal</span>
                  )}
                </span>
              </div>
              
              <div>
                <span className="text-sm text-[#B3B3B3]">Stock Mínimo:</span>
                <span className="ml-2 text-sm text-white">10</span>
              </div>
              
              <div>
                <span className="text-sm text-[#B3B3B3]">Stock Máximo:</span>
                <span className="ml-2 text-sm text-white">100</span>
              </div>
              
              <div>
                <span className="text-sm text-[#B3B3B3]">Última Actualización:</span>
                <span className="ml-2 text-sm text-white">Hoy, 10:15 AM</span>
              </div>
              
              <div>
                <span className="text-sm text-[#B3B3B3]">Descripción:</span>
                <p className="mt-1 text-sm text-white">
                  {productDetail.name} de alta calidad para uso en oficinas y hogares.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-md font-medium text-white border-b border-[#333333] pb-2">Historial de Movimientos</h5>
              
              <div className="space-y-2">
                <div className="p-2 rounded bg-[#282828]">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#2E8B57]">Entrada</span>
                    <span className="text-xs text-[#B3B3B3]">10/03/2025</span>
                  </div>
                  <p className="text-sm text-white">+15 unidades</p>
                </div>
                
                <div className="p-2 rounded bg-[#282828]">
                  <div className="flex justify-between">
                    <span className="text-xs text-red-500">Salida</span>
                    <span className="text-xs text-[#B3B3B3]">05/03/2025</span>
                  </div>
                  <p className="text-sm text-white">-8 unidades</p>
                </div>
                
                <div className="p-2 rounded bg-[#282828]">
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-500">Ajuste</span>
                    <span className="text-xs text-[#B3B3B3]">01/03/2025</span>
                  </div>
                  <p className="text-sm text-white">+3 unidades (Inventario)</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex space-x-3">
              <Button variant="secondary" fullWidth>
                Editar
              </Button>
              <Button variant="primary" fullWidth>
                Registrar Movimiento
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};