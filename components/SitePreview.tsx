
import React, { useEffect, useState } from 'react';
import { QuizData, AIPageContent } from '../types';
import { generateMockupContent } from '../services/geminiService';

interface SitePreviewProps {
  quizData: QuizData;
}

const SitePreview: React.FC<SitePreviewProps> = ({ quizData }) => {
  const [content, setContent] = useState<AIPageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const data = await generateMockupContent(quizData.userName, quizData.niche, quizData.serviceType, quizData.city);
      setContent(data);
      setLoading(false);
    };
    fetchContent();
  }, [quizData]);

  if (loading) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center gap-6 border border-white/10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-xl">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-400/20 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin absolute top-0"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-cyan-400 font-black uppercase tracking-widest text-xs">IA Gerando Estratégia</p>
          <p className="text-gray-500 text-[10px] max-w-[200px]">Criando interface otimizada para o público de {quizData.city}...</p>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="w-full border border-white/10 rounded-[2.5rem] overflow-hidden bg-[#0a0a0f] shadow-2xl flex flex-col min-h-[600px]">
      {/* Barra do Navegador */}
      <div className="bg-white/[0.03] px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
        </div>
        <div className="bg-black/40 px-6 py-1.5 rounded-full text-[9px] font-mono text-gray-500 border border-white/5">
          https://{quizData.userName.toLowerCase().replace(/\s/g, '')}.com.br
        </div>
        <div className="w-12" />
      </div>

      {/* Conteúdo do Site */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Hero Section */}
        <div className="relative min-h-[350px] flex items-center px-10 overflow-hidden">
          {content.heroImage && (
            <img src={content.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
          <div className="relative z-10 max-w-lg">
            <div className="font-black text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: content.primaryColor }}>{quizData.niche} em {quizData.city}</div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-none">{content.headline}</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{content.subheadline}</p>
            <button className="px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-white shadow-xl" style={{ backgroundColor: content.primaryColor }}>
              Falar com Especialista
            </button>
          </div>
        </div>

        {/* Seção Estratégica - O VALOR REAL */}
        <div className="p-10 bg-white/[0.01]">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Diferenciais Sugeridos pela IA</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-lg font-black text-white leading-tight">Como vamos dominar o Google em {quizData.city}?</h3>
              <ul className="space-y-4">
                {content.strategy?.map((s, i) => (
                  <li key={i} className="flex gap-3 items-start group">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-[8px] font-bold text-cyan-400 border border-cyan-400/20 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                      {i + 1}
                    </span>
                    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-200">{s}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/5 bg-black/40 p-6 flex flex-col justify-center">
               <div className="text-[10px] font-black text-cyan-400 uppercase mb-4 tracking-widest">Painel de Controle Ativo</div>
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-gray-500">
                    <span>Performance em {quizData.city}</span>
                    <span className="text-green-400 font-bold">98% Otimizado</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[98%]" />
                  </div>
                  <div className="pt-4 grid grid-cols-2 gap-2">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-[8px] text-gray-500 mb-1">Visitantes Mensais</div>
                      <div className="text-sm font-black text-white">~{Math.floor(quizData.cityPopulation * 0.15)}</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-[8px] text-gray-500 mb-1">Leads Estimados</div>
                      <div className="text-sm font-black text-white">~{Math.floor(quizData.cityPopulation * 0.03)}</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default SitePreview;
