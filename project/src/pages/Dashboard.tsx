import React from 'react';
import { Card } from '../components/ui/Card';
import { Package, AlertTriangle, RefreshCw, TrendingUp, Clock, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  // Mock data for visualization
  const dummyChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [120, 190, 180, 210, 240, 250],
        color: '#2E8B57',
      },
      {
        data: [100, 160, 150, 170, 180, 230],
        color: '#3CB371',
        dashed: true,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Bienvenido, Carlos
        </h1>
        <p className="text-[#B3B3B3]">
          Última actualización: <span className="text-white">Hoy, 10:15 AM</span>
        </p>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          className="transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
          icon={<Package size={24} />}
        >
          <div className="flex flex-col">
            <span className="text-sm text-[#B3B3B3]">Stock Total</span>
            <span className="text-2xl font-bold mt-1 text-white">1,240</span>
            <span className="text-xs text-[#2E8B57] mt-2 flex items-center">
              <TrendingUp size={14} className="mr-1" /> +5% desde el mes pasado
            </span>
          </div>
        </Card>
        
        <Card 
          className="transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
          icon={<AlertTriangle size={24} className="text-yellow-500" />}
        >
          <div className="flex flex-col">
            <span className="text-sm text-[#B3B3B3]">Alertas Activas</span>
            <span className="text-2xl font-bold mt-1 text-white">3</span>
            <span className="text-xs text-yellow-500 mt-2">Stock crítico en Montería</span>
          </div>
        </Card>
        
        <Card 
          className="transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
          icon={<RefreshCw size={24} className="text-blue-500" />}
        >
          <div className="flex flex-col">
            <span className="text-sm text-[#B3B3B3]">Sincronización</span>
            <span className="text-2xl font-bold mt-1 text-white">10:15 AM</span>
            <span className="text-xs text-blue-500 mt-2 flex items-center">
              <Clock size={14} className="mr-1" /> Hace 45 minutos
            </span>
          </div>
        </Card>
        
        <Card 
          className="transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
          icon={<MapPin size={24} className="text-red-500" />}
        >
          <div className="flex flex-col">
            <span className="text-sm text-[#B3B3B3]">Ubicaciones</span>
            <span className="text-2xl font-bold mt-1 text-white">4</span>
            <span className="text-xs text-[#B3B3B3] mt-2">Bogotá, Medellín, Cali, Montería</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demand forecast chart */}
        <Card 
          title="Pronóstico de Demanda" 
          className="lg:col-span-2"
          footer={
            <div className="flex justify-between items-center">
              <span>Próximos 6 meses</span>
              <Button variant="secondary" size="sm">Ver detalles</Button>
            </div>
          }
        >
          <div className="h-64 relative">
            {/* SVG line chart visualization */}
            <svg width="100%" height="100%" viewBox="0 0 600 250" preserveAspectRatio="none">
              {/* Grid lines */}
              <g stroke="#333333" strokeWidth="1">
                <line x1="0" y1="0" x2="600" y2="0" />
                <line x1="0" y1="50" x2="600" y2="50" />
                <line x1="0" y1="100" x2="600" y2="100" />
                <line x1="0" y1="150" x2="600" y2="150" />
                <line x1="0" y1="200" x2="600" y2="200" />
                <line x1="0" y1="250" x2="600" y2="250" />
                
                <line x1="0" y1="0" x2="0" y2="250" />
                <line x1="100" y1="0" x2="100" y2="250" />
                <line x1="200" y1="0" x2="200" y2="250" />
                <line x1="300" y1="0" x2="300" y2="250" />
                <line x1="400" y1="0" x2="400" y2="250" />
                <line x1="500" y1="0" x2="500" y2="250" />
                <line x1="600" y1="0" x2="600" y2="250" />
              </g>
              
              {/* Actual data line */}
              <path
                d={`M0,${250 - dummyChartData.datasets[0].data[0]} 
                   L100,${250 - dummyChartData.datasets[0].data[1]} 
                   L200,${250 - dummyChartData.datasets[0].data[2]} 
                   L300,${250 - dummyChartData.datasets[0].data[3]} 
                   L400,${250 - dummyChartData.datasets[0].data[4]} 
                   L500,${250 - dummyChartData.datasets[0].data[5]}`}
                fill="none"
                stroke="#2E8B57"
                strokeWidth="3"
              />
              
              {/* Predicted data line (dashed) */}
              <path
                d={`M300,${250 - dummyChartData.datasets[1].data[3]} 
                   L400,${250 - dummyChartData.datasets[1].data[4]} 
                   L500,${250 - dummyChartData.datasets[1].data[5]} 
                   L600,${250 - 290}`}
                fill="none"
                stroke="#3CB371"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              
              {/* Data points */}
              {dummyChartData.datasets[0].data.map((value, index) => (
                <circle
                  key={`point-${index}`}
                  cx={index * 100}
                  cy={250 - value}
                  r="4"
                  fill="#2E8B57"
                />
              ))}
              
              {/* X-axis labels */}
              {dummyChartData.labels.map((label, index) => (
                <text
                  key={`label-${index}`}
                  x={index * 100}
                  y="270"
                  textAnchor="middle"
                  fill="#B3B3B3"
                  fontSize="12"
                >
                  {label}
                </text>
              ))}
              
              {/* Future point */}
              <circle
                cx={600}
                cy={250 - 290}
                r="4"
                fill="#3CB371"
              />
              <text
                x={600}
                y="270"
                textAnchor="middle"
                fill="#B3B3B3"
                fontSize="12"
              >
                Jul
              </text>
            </svg>
          </div>
        </Card>
        
        {/* Latest alerts */}
        <Card 
          title="Alertas Recientes"
          footer={<Button variant="secondary" size="sm" fullWidth>Ver todas las alertas</Button>}
        >
          <div className="space-y-4">
            <div className="flex items-start p-3 bg-red-500/10 rounded-md">
              <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-white font-medium">Stock Crítico</p>
                <p className="text-xs text-[#B3B3B3]">Producto #AX-205 (Baterías 9V) por debajo del mínimo (5 unidades)</p>
                <p className="text-xs text-[#2E8B57] mt-1">Montería</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-yellow-500/10 rounded-md">
              <AlertTriangle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-white font-medium">Stock Bajo</p>
                <p className="text-xs text-[#B3B3B3]">Producto #BZ-104 (Cables HDMI) próximo al mínimo (12 unidades)</p>
                <p className="text-xs text-[#2E8B57] mt-1">Bogotá</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-blue-500/10 rounded-md">
              <RefreshCw size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-white font-medium">Sincronización</p>
                <p className="text-xs text-[#B3B3B3]">Actualización de inventario con Siesa completada</p>
                <p className="text-xs text-[#2E8B57] mt-1">Todas las ubicaciones</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};