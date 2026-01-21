
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  BarChart3, 
  Table as TableIcon, 
  Search, 
  ArrowRightLeft,
  Info,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { SELECTED_CITIES, DISTANCE_MATRIX, CITIES } from './data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'stats' | 'calc'>('matrix');
  const [origin, setOrigin] = useState('Madrid');
  const [destination, setDestination] = useState('Barcelona');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const getDistance = (cityA: string, cityB: string) => {
    if (cityA === cityB) return 0;
    return DISTANCE_MATRIX[cityA]?.[cityB] || DISTANCE_MATRIX[cityB]?.[cityA] || "N/A";
  };

  const chartData = useMemo(() => {
    return SELECTED_CITIES.map(city => {
      const distances = Object.values(DISTANCE_MATRIX[city]).filter(d => typeof d === 'number');
      const avg = distances.reduce((a, b) => a + b, 0) / distances.length;
      return {
        name: city,
        avg: Math.round(avg),
      };
    }).sort((a, b) => b.avg - a.avg);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Mobile Toggle */}
      <div className="md:hidden bg-indigo-700 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Building2 size={24} />
          <span className="font-bold tracking-tight">Asociados Ficticios Inc.</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 transition duration-200 ease-in-out
        w-64 bg-indigo-900 text-white flex flex-col z-40
      `}>
        <div className="p-6 hidden md:flex flex-col gap-2">
          <div className="flex items-center gap-2 text-indigo-300">
            <Building2 size={32} />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest font-semibold">Operaciones</span>
              <span className="font-bold text-lg leading-none text-white">Logística VIP</span>
            </div>
          </div>
          <div className="h-px bg-indigo-800 mt-4"></div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 md:mt-0">
          <button 
            onClick={() => { setActiveTab('matrix'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'matrix' ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
          >
            <TableIcon size={20} />
            <span className="font-medium">Matriz de Distancias</span>
          </button>
          <button 
            onClick={() => { setActiveTab('calc'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'calc' ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
          >
            <Navigation size={20} />
            <span className="font-medium">Calculadora de Rutas</span>
          </button>
          <button 
            onClick={() => { setActiveTab('stats'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'stats' ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Análisis y Estadísticas</span>
          </button>
        </nav>

        <div className="p-4 bg-indigo-950/50 mt-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs">AF</div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">Asociados Ficticios Inc.</span>
              <span className="text-[10px] text-indigo-400">v2.4 Logística</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50 p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Panel de Operaciones Logísticas</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Info size={16} /> 
            Datos oficiales extraídos del registro maestro de distancias interurbanas.
          </p>
        </header>

        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <TableIcon className="text-indigo-600" size={20} />
                  Visualización de Matriz (Kilómetros)
                </h2>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium uppercase tracking-wider">Maestra</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium uppercase tracking-wider">Verificada</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 font-bold text-slate-400 text-xs uppercase sticky left-0 bg-slate-50 z-10 border-r border-slate-200">Ciudad / Ciudad</th>
                      {SELECTED_CITIES.map(city => (
                        <th key={city} className="p-4 text-xs font-bold text-slate-600 uppercase tracking-wider min-w-[120px] text-center">{city}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SELECTED_CITIES.map((rowCity) => (
                      <tr key={rowCity} className="border-b border-slate-100 hover:bg-indigo-50/30 transition group">
                        <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white group-hover:bg-indigo-50 border-r border-slate-100 z-10">
                          {rowCity}
                        </td>
                        {SELECTED_CITIES.map((colCity) => {
                          const dist = getDistance(rowCity, colCity);
                          return (
                            <td key={colCity} className={`p-4 text-center text-sm font-medium ${dist === 0 ? 'text-slate-300' : 'text-slate-600'}`}>
                              {dist === 0 ? '-' : `${dist} km`}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl text-white shadow-lg">
                <Truck className="mb-4 text-indigo-200" size={32} />
                <h3 className="text-sm font-medium text-indigo-100 mb-1">Total Cobertura</h3>
                <p className="text-2xl font-bold">47 Ciudades</p>
                <div className="mt-4 pt-4 border-t border-indigo-500/30 text-xs text-indigo-200">
                  Red nacional completa gestionada por Asociados Ficticios Inc.
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <ArrowRightLeft className="mb-4 text-indigo-600" size={32} />
                <h3 className="text-sm font-medium text-slate-500 mb-1">Rutas Únicas</h3>
                <p className="text-2xl font-bold text-slate-800">1,081 Combinaciones</p>
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                  Base de datos de distancias calculada vía satélite.
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <MapPin className="mb-4 text-indigo-600" size={32} />
                <h3 className="text-sm font-medium text-slate-500 mb-1">Sede Central</h3>
                <p className="text-2xl font-bold text-slate-800">Madrid, España</p>
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                  Km 0: Nodo principal de distribución.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calc' && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-8 md:p-12 text-center bg-slate-50/50 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Calculadora de Distancias de Operación</h2>
                <p className="text-slate-500 max-w-lg mx-auto">Selecciona los puntos de origen y destino para obtener el kilometraje exacto según nuestros registros corporativos.</p>
              </div>
              
              <div className="p-8 md:p-12 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Origen
                    </label>
                    <select 
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:outline-none bg-white text-lg font-semibold text-slate-800 shadow-sm transition"
                    >
                      {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center justify-center md:absolute md:left-1/2 md:top-[60%] md:-translate-x-1/2 md:-translate-y-1/2 z-10">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md text-indigo-600">
                      <ArrowRightLeft size={24} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Destino
                    </label>
                    <select 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:outline-none bg-white text-lg font-semibold text-slate-800 shadow-sm transition"
                    >
                      {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-8 text-center flex flex-col items-center justify-center border border-indigo-100">
                  <span className="text-indigo-500 text-sm font-bold uppercase tracking-widest mb-2">Distancia Registrada</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-indigo-900 leading-none">
                      {getDistance(origin, destination)}
                    </span>
                    <span className="text-2xl font-bold text-indigo-400">km</span>
                  </div>
                  <div className="mt-4 flex gap-4 text-xs font-semibold text-indigo-600/60 uppercase">
                    <span>Tiempo Est. (80km/h): {typeof getDistance(origin, destination) === 'number' ? Math.round((getDistance(origin, destination) as number) / 80) : '--'} h</span>
                    <span className="w-1 h-1 bg-indigo-200 rounded-full my-auto"></span>
                    <span>Consumo Est. (30L/100km): {typeof getDistance(origin, destination) === 'number' ? Math.round(((getDistance(origin, destination) as number) / 100) * 30) : '--'} L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="text-indigo-600" size={20} />
                  Distancia Media por Ciudad (km)
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="name" type="category" width={100} stroke="#475569" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                      />
                      <Bar dataKey="avg" radius={[0, 4, 4, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index < 3 ? '#4f46e5' : '#818cf8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex-1">
                   <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Navigation className="text-emerald-600" size={20} />
                    Densidad de Ruta: Nodos Principales
                  </h3>
                  <div className="space-y-4">
                    {[
                      { city: 'Madrid', type: 'Hub Central', flow: '98%' },
                      { city: 'Barcelona', type: 'Hub Portuario', flow: '85%' },
                      { city: 'Valencia', type: 'Hub Logístico', flow: '72%' },
                      { city: 'Bilbao', type: 'Nodo Norte', flow: '68%' },
                    ].map((hub, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 border border-slate-100 group-hover:scale-110 transition">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{hub.city}</p>
                            <p className="text-xs text-slate-500">{hub.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-indigo-600">{hub.flow}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-tighter font-bold">Flujo Activo</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-3xl text-white shadow-lg overflow-hidden relative">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Informe de Eficiencia</h3>
                    <p className="text-emerald-100 text-sm mb-6">Optimización de rutas basada en la matriz oficial de distancias.</p>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-black">15%</span>
                      <span className="text-lg font-medium text-emerald-200 mb-1">Ahorro Est.</span>
                    </div>
                  </div>
                  <Truck className="absolute -bottom-4 -right-4 opacity-10 rotate-12" size={160} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
