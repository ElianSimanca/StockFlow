import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart2, 
  PieChart, 
  TrendingUp, 
  Calendar, 
  Download, 
  Share2 
} from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Reportes
        </h1>
        <div className="flex space-x-3">
          <Button 
            variant="secondary"
            icon={<Calendar size={18} />}
          >
            Marzo 2025
          </Button>
          <Button 
            variant="secondary"
            icon={<Download size={18} />}
          >
            Exportar
          </Button>
        </div>
      </div>
      
      {/* Report types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          className="cursor-pointer transform transition hover:translate-y-[-4px]"
          icon={<BarChart2 size={24} />}
        >
          <h3 className="text-lg font-medium text-white mt-2">Inventario</h3>
          <p className="text-sm text-[#B3B3B3] mt-1">Niveles de stock por ubicación</p>
        </Card>
        
        <Card 
          className="cursor-pointer transform transition hover:translate-y-[-4px]"
          icon={<TrendingUp size={24} />}
        >
          <h3 className="text-lg font-medium text-white mt-2">Movimientos</h3>
          <p className="text-sm text-[#B3B3B3] mt-1">Entradas y salidas de productos</p>
        </Card>
        
        <Card 
          className="cursor-pointer transform transition hover:translate-y-[-4px]"
          icon={<PieChart size={24} />}
        >
          <h3 className="text-lg font-medium text-white mt-2">Categorías</h3>
          <p className="text-sm text-[#B3B3B3] mt-1">Distribución por tipo de producto</p>
        </Card>
        
        <Card 
          className="cursor-pointer transform transition hover:translate-y-[-4px]"
          icon={<Share2 size={24} />}
        >
          <h3 className="text-lg font-medium text-white mt-2">Siesa</h3>
          <p className="text-sm text-[#B3B3B3] mt-1">Integración con sistema ERP</p>
        </Card>
      </div>
      
      {/* Main report area */}
      <Card 
        title="Niveles de Inventario por Ubicación"
        className="relative"
      >
        <div className="h-80 relative">
          {/* SVG Bar chart */}
          <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
            {/* Grid lines */}
            <g stroke="#333333" strokeWidth="1">
              <line x1="0" y1="0" x2="800" y2="0" />
              <line x1="0" y1="60" x2="800" y2="60" />
              <line x1="0" y1="120" x2="800" y2="120" />
              <line x1="0" y1="180" x2="800" y2="180" />
              <line x1="0" y1="240" x2="800" y2="240" />
              <line x1="0" y1="300" x2="800" y2="300" />
            </g>
            
            {/* Y-axis labels */}
            <text x="10" y="15" fill="#B3B3B3" fontSize="12">250</text>
            <text x="10" y="75" fill="#B3B3B3" fontSize="12">200</text>
            <text x="10" y="135" fill="#B3B3B3" fontSize="12">150</text>
            <text x="10" y="195" fill="#B3B3B3" fontSize="12">100</text>
            <text x="10" y="255" fill="#B3B3B3" fontSize="12">50</text>
            <text x="10" y="295" fill="#B3B3B3" fontSize="12">0</text>
            
            {/* Bars */}
            {/* Bogotá */}
            <g transform="translate(100, 0)">
              <rect x="30" y="60" width="60" height="240" fill="#2E8B57" />
              <text x="60" y="320" textAnchor="middle" fill="#B3B3B3" fontSize="14">Bogotá</text>
              <text x="60" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="14">200</text>
            </g>
            
            {/* Medellín */}
            <g transform="translate(250, 0)">
              <rect x="30" y="120" width="60" height="180" fill="#3CB371" />
              <text x="60" y="320" textAnchor="middle" fill="#B3B3B3" fontSize="14">Medellín</text>
              <text x="60" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="14">150</text>
            </g>
            
            {/* Cali */}
            <g transform="translate(400, 0)">
              <rect x="30" y="150" width="60" height="150" fill="#228B22" />
              <text x="60" y="320" textAnchor="middle" fill="#B3B3B3" fontSize="14">Cali</text>
              <text x="60" y="140" textAnchor="middle" fill="#FFFFFF" fontSize="14">125</text>
            </g>
            
            {/* Montería */}
            <g transform="translate(550, 0)">
              <rect x="30" y="210" width="60" height="90" fill="#2E8B57" opacity="0.7" />
              <text x="60" y="320" textAnchor="middle" fill="#B3B3B3" fontSize="14">Montería</text>
              <text x="60" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="14">75</text>
            </g>
          </svg>
        </div>
        
        <div className="flex justify-end mt-4 space-x-3">
          <Button variant="secondary" size="sm">
            Detalles
          </Button>
          <Button variant="secondary" size="sm" icon={<Download size={16} />}>
            Exportar CSV
          </Button>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Movement Report */}
        <Card 
          title="Movimientos de Productos"
          footer={
            <Button variant="secondary" size="sm" fullWidth>
              Ver reporte completo
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="flex justify-between border-b border-[#333333] pb-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Entradas</span>
                <span className="text-2xl font-bold text-[#2E8B57]">145</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Salidas</span>
                <span className="text-2xl font-bold text-red-500">98</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Balance</span>
                <span className="text-2xl font-bold text-blue-500">+47</span>
              </div>
            </div>
            
            {/* Line chart */}
            <div className="h-40 relative">
              <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
                {/* Grid lines */}
                <g stroke="#333333" strokeWidth="1">
                  <line x1="0" y1="0" x2="400" y2="0" />
                  <line x1="0" y1="50" x2="400" y2="50" />
                  <line x1="0" y1="100" x2="400" y2="100" />
                  <line x1="0" y1="150" x2="400" y2="150" />
                  
                  <line x1="0" y1="0" x2="0" y2="150" />
                  <line x1="100" y1="0" x2="100" y2="150" />
                  <line x1="200" y1="0" x2="200" y2="150" />
                  <line x1="300" y1="0" x2="300" y2="150" />
                  <line x1="400" y1="0" x2="400" y2="150" />
                </g>
                
                {/* Entrada line */}
                <path
                  d="M0,100 L100,80 L200,60 L300,30 L400,40"
                  fill="none"
                  stroke="#2E8B57"
                  strokeWidth="2"
                />
                
                {/* Salida line */}
                <path
                  d="M0,120 L100,110 L200,90 L300,100 L400,70"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                />
                
                {/* Labels */}
                <text x="0" y="170" textAnchor="middle" fill="#B3B3B3" fontSize="12">1 Mar</text>
                <text x="100" y="170" textAnchor="middle" fill="#B3B3B3" fontSize="12">8 Mar</text>
                <text x="200" y="170" textAnchor="middle" fill="#B3B3B3" fontSize="12">15 Mar</text>
                <text x="300" y="170" textAnchor="middle" fill="#B3B3B3" fontSize="12">22 Mar</text>
                <text x="400" y="170" textAnchor="middle" fill="#B3B3B3" fontSize="12">29 Mar</text>
              </svg>
            </div>
          </div>
        </Card>
        
        {/* Category Distribution Report */}
        <Card 
          title="Distribución por Categoría"
          footer={
            <Button variant="secondary" size="sm" fullWidth>
              Ver reporte completo
            </Button>
          }
        >
          <div className="h-48 relative flex justify-center">
            {/* Pie chart */}
            <svg width="200" height="200" viewBox="0 0 200 200">
              {/* Pie slices */}
              <path d="M100,100 L100,0 A100,100 0 0,1 173.2,73.2 Z" fill="#2E8B57" />
              <path d="M100,100 L173.2,73.2 A100,100 0 0,1 173.2,126.8 Z" fill="#3CB371" />
              <path d="M100,100 L173.2,126.8 A100,100 0 0,1 100,200 Z" fill="#228B22" />
              <path d="M100,100 L100,200 A100,100 0 0,1 26.8,73.2 Z" fill="#146E43" />
              <path d="M100,100 L26.8,73.2 A100,100 0 0,1 100,0 Z" fill="#0A4A2E" />
              
              {/* Center circle */}
              <circle cx="100" cy="100" r="50" fill="#1E1E1E" />
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">550</text>
              <text x="100" y="120" textAnchor="middle" dominantBaseline="middle" fill="#B3B3B3" fontSize="12">Total</text>
            </svg>
            
            <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#2E8B57] mr-2"></div>
                <span className="text-sm text-white">Electrónicos (35%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#3CB371] mr-2"></div>
                <span className="text-sm text-white">Cables (25%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#228B22] mr-2"></div>
                <span className="text-sm text-white">Accesorios (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#146E43] mr-2"></div>
                <span className="text-sm text-white">Periféricos (15%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#0A4A2E] mr-2"></div>
                <span className="text-sm text-white">Otros (5%)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};