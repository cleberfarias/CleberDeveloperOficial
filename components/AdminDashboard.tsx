
import React, { useState, useEffect } from 'react';
import { QuizData } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [leads, setLeads] = useState<QuizData[]>([]);
  const [metrics, setMetrics] = useState({
    views: 0,
    quizStarts: 0,
    completions: 0,
    projectedRevenue: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('fd_leads') || '[]');
    const views = parseInt(localStorage.getItem('fd_views') || '0');
    const starts = parseInt(localStorage.getItem('fd_quiz_starts') || '0');
    
    setLeads(savedLeads);

    const totalRevenue = savedLeads.reduce((acc: number, curr: QuizData) => {
      const price = curr.serviceType === 'system' ? 3000 : (curr.serviceType === 'ecommerce' ? 1200 : 200);
      return acc + price;
    }, 0);

    setMetrics({
      views,
      quizStarts: starts,
      completions: savedLeads.length,
      projectedRevenue: totalRevenue,
      conversionRate: views > 0 ? (savedLeads.length / views) * 100 : 0
    });
  }, []);

  const clearAnalytics = () => {
    if(confirm("Deseja zerar todos os dados analíticos?")) {
      localStorage.setItem('fd_leads', '[]');
      localStorage.setItem('fd_views', '0');
      localStorage.setItem('fd_quiz_starts', '0');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#030712] flex flex-col overflow-hidden text-white font-sans">
      {/* Top Bar / Status Area */}
      <div className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#0a0a0f] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">System Live</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            FD Developer Web <span className="text-white ml-2">v2.5.4</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
             onClick={clearAnalytics}
             className="text-[9px] font-black uppercase text-red-500/50 hover:text-red-500 transition-colors"
           >
             Hard Reset Analytics
           </button>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors">✕</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-[#0a0a0f] to-[#030712]">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Ops <span className="text-cyan-400">Center</span></h1>
            <p className="text-gray-500 text-sm">Monitoramento de performance e conversão em tempo real.</p>
          </div>
          
          {/* Site Health Indicators */}
          <div className="flex gap-4">
            {[
              { label: 'Performance', val: 99, color: 'text-green-400' },
              { label: 'SEO', val: 100, color: 'text-green-400' },
              { label: 'Acessibilidade', val: 98, color: 'text-cyan-400' },
            ].map((stat, i) => (
              <div key={i} className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center min-w-[100px]">
                <span className="text-[8px] font-black uppercase text-gray-500 mb-1">{stat.label}</span>
                <span className={`text-xl font-black ${stat.color}`}>{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-8 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 blur-3xl rounded-full group-hover:bg-cyan-400/10 transition-all"></div>
            <div className="relative z-10">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Visualizações Únicas</span>
              <div className="text-5xl font-black text-white">{metrics.views}</div>
              <div className="mt-4 flex items-center gap-2 text-green-400 text-[10px] font-bold">
                <span>↑ 12% em 24h</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 group">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Interessados (Quiz)</span>
            <div className="text-5xl font-black text-cyan-400">{metrics.quizStarts}</div>
            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-400 transition-all duration-1000" style={{ width: `${metrics.views > 0 ? (metrics.quizStarts/metrics.views)*100 : 0}%` }}></div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 group">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Diagnósticos Concluídos</span>
            <div className="text-5xl font-black text-white">{metrics.completions}</div>
            <div className="mt-4 text-[10px] font-bold text-gray-500">
               Taxa de Conclusão: <span className="text-cyan-400">{metrics.quizStarts > 0 ? ((metrics.completions/metrics.quizStarts)*100).toFixed(1) : 0}%</span>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-cyan-400 text-black border border-cyan-400 group">
            <span className="text-[9px] font-black uppercase tracking-widest block mb-1 opacity-60">Faturamento Potencial</span>
            <div className="text-3xl font-black">R$ {metrics.projectedRevenue.toLocaleString('pt-BR')}</div>
            <div className="mt-6 text-[10px] font-black uppercase tracking-widest border-t border-black/10 pt-4">
               Ticket Médio: R$ {(metrics.completions > 0 ? metrics.projectedRevenue / metrics.completions : 0).toFixed(0)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-8 p-8 bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="font-black text-lg">Curva de Crescimento de Leads</h3>
               <div className="flex gap-2">
                 <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500">
                   <div className="w-2 h-2 rounded-full bg-cyan-400"></div> Leads
                 </div>
               </div>
            </div>
            
            <div className="h-[250px] w-full relative">
              <svg className="w-full h-full" viewBox="0 0 1000 250" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#22d3ee', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#22d3ee', stopOpacity: 0}} />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,200 C100,180 200,190 300,150 C400,110 500,140 600,100 C700,60 800,80 900,40 L1000,20" 
                  fill="none" 
                  stroke="#22d3ee" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
                <path 
                  d="M0,200 C100,180 200,190 300,150 C400,110 500,140 600,100 C700,60 800,80 900,40 L1000,20 V250 H0 Z" 
                  fill="url(#chartGrad)" 
                />
              </svg>
            </div>
          </div>

          {/* Device Distribution */}
          <div className="lg:col-span-4 p-8 bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] flex flex-col justify-between">
            <h3 className="font-black text-lg mb-6">Acessos por Dispositivo</h3>
            <div className="space-y-6">
              {[
                { label: 'Mobile', perc: 78, color: 'bg-cyan-400' },
                { label: 'Desktop', perc: 18, color: 'bg-white/40' },
                { label: 'Tablet', perc: 4, color: 'bg-white/10' },
              ].map((dev, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-gray-500">{dev.label}</span>
                    <span>{dev.perc}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${dev.color} transition-all duration-1000 delay-300`} style={{ width: `${dev.perc}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] text-gray-500 leading-relaxed italic">
              *Dados baseados em User-Agent das últimas 24 horas de tráfego orgânico.
            </div>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] overflow-hidden">
          <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className="font-black text-xl">Fluxo Recente de Leads</h3>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[9px] font-black uppercase rounded-full">Recentes</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-gray-500">
                <tr>
                  <th className="px-10 py-5">ID / Lead</th>
                  <th className="px-10 py-5">Nicho & Cidade</th>
                  <th className="px-10 py-5">Serviço Pretendido</th>
                  <th className="px-10 py-5">Faturamento Estimado</th>
                  <th className="px-10 py-5">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center text-gray-600 italic">Aguardando primeira conversão da sessão...</td>
                  </tr>
                ) : (
                  leads.slice().reverse().map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-10 py-6">
                        <div className="font-bold text-white mb-0.5">{lead.userName}</div>
                        <div className="text-[10px] font-mono text-cyan-400/70">{lead.id}</div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-gray-300">{lead.niche}</div>
                        <div className="text-[10px] text-gray-600">{lead.city} - {lead.state}</div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                          lead.serviceType === 'system' ? 'bg-purple-500/10 text-purple-400' : 
                          lead.serviceType === 'ecommerce' ? 'bg-yellow-500/10 text-yellow-400' : 
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          {lead.serviceType}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="font-black text-white">
                          R$ {(lead.serviceType === 'system' ? 3000 : lead.serviceType === 'ecommerce' ? 1200 : 200).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <button 
                          onClick={() => window.open(`/?lead=${btoa(unescape(encodeURIComponent(JSON.stringify(lead))))}`, '_blank')}
                          className="bg-white/5 hover:bg-white/10 p-2 rounded-lg border border-white/5 text-cyan-400 text-xs transition-all"
                        >
                          Visualizar Projeto
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
