
import React, { useState, useEffect, useRef } from 'react';
import { QuizData, ROIResult } from '../types';
import SitePreview from './SitePreview';
import { getMarketAnalysis } from '../services/geminiService';
import * as htmlToImage from 'html-to-image';

interface QuizResultsProps {
  data: QuizData;
  onClose: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ data, onClose }) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMarketAnalysis(data.niche, data.city, data.state).then(res => setAnalysis(res));
  }, [data]);

  const calculateROI = (d: QuizData): ROIResult => {
    const cityMultiplier = d.cityPopulation < 15000 ? 0.35 : 0.15;
    const estimatedReach = Math.floor(d.cityPopulation * cityMultiplier * 0.4);
    let potentialConversion = d.serviceType === 'system' ? 0.08 : (d.serviceType === 'ecommerce' ? 0.04 : 0.03);
    
    const avgTickets: Record<string, number> = { 'site': 250, 'ecommerce': 150, 'system': 900 };
    const avgTicket = avgTickets[d.serviceType] || 200;
    
    const revenue = estimatedReach * potentialConversion * avgTicket;
    const estimatedRevenue = revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let packageRec = d.serviceType === 'system' ? "Sistema Web Gestão" : (d.serviceType === 'ecommerce' ? "E-commerce Pro" : "Landing Page Premium");
    let priceStart = d.serviceType === 'system' ? 3000 : (d.serviceType === 'ecommerce' ? 1200 : 200);

    return { estimatedReach, potentialConversion: potentialConversion * 100, estimatedRevenue, packageRecommended: packageRec, priceStart };
  };

  const roi = calculateROI(data);

  const handleCaptureAndSend = async () => {
    if (!reportRef.current) return;
    
    setIsCapturing(true);
    try {
      // Pequeno delay para garantir que tudo renderizou
      await new Promise(r => setTimeout(r, 500));
      
      const dataUrl = await htmlToImage.toPng(reportRef.current, {
        backgroundColor: '#030712',
        quality: 1,
        pixelRatio: 2
      });

      // Baixa a imagem
      const link = document.createElement('a');
      link.download = `diagnostico-${data.userName.toLowerCase().replace(/\s/g, '-')}.png`;
      link.href = dataUrl;
      link.click();

      // Prepara a mensagem curta do WhatsApp
      const message = [
        `Olá Cleber! 🚀`,
        `Acabei de gerar meu diagnóstico oficial na FD Developer Web.`,
        ``,
        `*RESUMO DO PROJETO:*`,
        `🏢 Empresa: ${data.userName}`,
        `📍 Local: ${data.city} - ${data.state}`,
        `💼 Nicho: ${data.niche}`,
        `🆔 ID: ${data.id}`,
        ``,
        `Estou te enviando o *PRINT* do relatório completo que acabei de baixar.`,
        `Podemos conversar sobre esses números?`
      ].join('\n');

      // Abre o WhatsApp
      window.open(`https://wa.me/5548999019525?text=${encodeURIComponent(message)}`, '_blank');
      
    } catch (error) {
      console.error('Erro ao capturar diagnóstico:', error);
      alert('Houve um erro ao gerar a imagem. Você pode tirar um print manual da tela e enviar para o Cleber!');
    } finally {
      setIsCapturing(false);
    }
  };

  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712] p-10 text-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-black animate-pulse">Sincronizando Diagnóstico {data.id}...</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">Preparando o ambiente personalizado para {data.userName}.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 bg-[#030712]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12" id="full-results">
        
        {/* COLUNA DE DADOS E ESTRATÉGIA */}
        <div className="lg:col-span-5 space-y-8" ref={reportRef}>
          <div className="p-8 bg-[#030712] rounded-[2.5rem] border border-white/10 space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                Relatório Estratégico Oficial
              </div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                REF: <span className="text-white">{data.id}</span>
              </div>
            </div>

            <h2 className="text-4xl font-black leading-tight tracking-tighter">
              Diagnóstico de <br /><span className="text-cyan-400">{data.userName}</span>
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-6 relative overflow-hidden">
                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div>
                      <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Alcance Estimado</div>
                      <div className="text-2xl font-black text-white">{roi.estimatedReach} <span className="text-xs text-gray-500">hab/mês</span></div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Impacto Digital</div>
                      <div className="text-2xl font-black text-green-400">+{roi.potentialConversion}%</div>
                    </div>
                </div>
                
                <div className="pt-6 border-t border-white/5 relative z-10">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Faturamento Projetado</div>
                  <div className="text-4xl font-black text-white">{roi.estimatedRevenue}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">📊 Cenário em {data.city}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{analysis.text.demanda}</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-blue-600/10 border border-cyan-400/20">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-2">💡 Plano de Ação</h4>
                  <p className="text-sm text-gray-200 leading-relaxed">{analysis.text.oportunidade}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs">FD</div>
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">FD Developer Web</span>
            </div>
          </div>
        </div>

        {/* COLUNA DO PROTÓTIPO E BOTÕES */}
        <div className="lg:col-span-7 space-y-8">
           <div className="sticky top-24 space-y-8">
              <div className="space-y-4">
                <button 
                  onClick={handleCaptureAndSend}
                  disabled={isCapturing}
                  className="w-full bg-cyan-400 text-black py-6 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-[0_20px_50px_rgba(6,182,212,0.2)] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isCapturing ? 'Gerando Print...' : 'Enviar Print p/ Cleber ⚡'}
                </button>
                <p className="text-center text-xs text-gray-500">
                  O sistema irá baixar a imagem do relatório. <br /> 
                  Basta anexar a foto na conversa do WhatsApp que será aberta!
                </p>
              </div>

              <div className="border border-white/10 rounded-[2.5rem] overflow-hidden bg-[#0a0a0f] shadow-2xl">
                 <SitePreview quizData={data} />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default QuizResults;
