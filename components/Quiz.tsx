
import React, { useState } from 'react';
import { QuizData } from '../types';

interface QuizProps {
  onComplete: (data: QuizData) => void;
  onCancel: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>({
    id: '', 
    userName: '',
    niche: '',
    city: '',
    state: '',
    cityPopulation: 8000,
    hasSite: 'no',
    goal: 'all',
    budget: 200,
    serviceType: 'site'
  });

  const steps = [
    {
      title: "Vamos começar o diagnóstico",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Nome da Empresa</label>
              <input 
                type="text" 
                placeholder="Ex: Pizzaria do Zé"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none text-white text-sm"
                value={data.userName}
                onChange={e => setData({...data, userName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Nicho</label>
              <input 
                type="text" 
                placeholder="Ex: Restaurante, Advocacia"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none text-white text-sm"
                value={data.niche}
                onChange={e => setData({...data, niche: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Cidade</label>
              <input 
                type="text" 
                placeholder="Ex: Florianópolis"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none text-white text-sm"
                value={data.city}
                onChange={e => setData({...data, city: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Estado (UF)</label>
              <input 
                type="text" 
                maxLength={2}
                placeholder="Ex: SC"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none text-white text-sm uppercase"
                value={data.state}
                onChange={e => setData({...data, state: e.target.value.toUpperCase()})}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Qual o tamanho da sua região?",
      content: (
        <div className="space-y-6">
          <p className="text-gray-400 text-sm">Aproximadamente quantos habitantes existem no seu raio de atuação?</p>
          <div className="grid grid-cols-2 gap-4">
            {[8000, 50000, 200000, 1000000].map(pop => (
              <button
                key={pop}
                onClick={() => {
                  setData({...data, cityPopulation: pop});
                  setStep(3);
                }}
                className={`p-6 rounded-2xl border transition-all text-left ${data.cityPopulation === pop ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/10 hover:border-white/30'}`}
              >
                <div className="text-lg font-bold mb-1 text-white">{pop.toLocaleString()} hab.</div>
                <div className="text-xs text-gray-400">{pop <= 10000 ? 'Cidade Pequena' : 'Grande Centro'}</div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "O que você precisa agora?",
      content: (
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: 'site', title: 'Landing Page / Site Institucional', desc: 'Gerar autoridade e ser encontrado', icon: '🌐' },
            { id: 'ecommerce', title: 'Loja Online / E-commerce', desc: 'Venda seus produtos 24h', icon: '🛒' },
            { id: 'system', title: 'Sistema Web / Gestão', desc: 'Pedidos, estoque, agendamentos', icon: '⚙️' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                setData({...data, serviceType: opt.id as any});
                setStep(4);
              }}
              className={`flex items-center gap-4 p-6 rounded-2xl border transition-all text-left ${data.serviceType === opt.id ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/10 hover:border-white/30'}`}
            >
              <span className="text-4xl">{opt.icon}</span>
              <div>
                <div className="text-lg font-bold text-white">{opt.title}</div>
                <div className="text-sm text-gray-400">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Qual seu orçamento aproximado?",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[200, 500, 1200, 5000].map(price => (
              <button
                key={price}
                onClick={() => setData({...data, budget: price})}
                className={`p-6 rounded-2xl border transition-all text-left ${data.budget === price ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/10 hover:border-white/30'}`}
              >
                <div className="text-lg font-bold text-white">A partir de R$ {price}</div>
                <div className="text-xs text-gray-400">{price <= 500 ? 'Essencial' : 'Profissional'}</div>
              </button>
            ))}
          </div>
        </div>
      )
    }
  ];

  const handleSubmit = () => {
    // Geração de ID único estilo ticket
    const uniqueId = `FD-${Math.floor(Math.random() * 9000 + 1000)}`;
    const finalData = {...data, id: uniqueId};
    
    // Salva no analytics local para o AdminDashboard
    const existingLeads = JSON.parse(localStorage.getItem('fd_leads') || '[]');
    localStorage.setItem('fd_leads', JSON.stringify([...existingLeads, finalData]));

    onComplete(finalData);
  };

  const currentStep = steps[step - 1];

  return (
    <div className="fixed inset-0 z-[60] bg-[#030712]/95 backdrop-blur-xl flex items-center justify-center p-6 text-white">
      <div className="max-w-2xl w-full glass rounded-[2.5rem] p-8 md:p-12 relative">
        <div className="absolute top-0 left-0 h-1.5 bg-cyan-500 transition-all duration-500 rounded-full" style={{ width: `${(step / steps.length) * 100}%` }} />
        
        <button onClick={onCancel} className="absolute top-8 right-8 text-gray-400 hover:text-white">✕</button>

        <div className="mb-10">
          <span className="text-cyan-400 font-bold text-[10px] tracking-[0.2em] uppercase mb-2 block">Diagnóstico FD Developer Web</span>
          <h2 className="text-3xl md:text-4xl font-extrabold">{currentStep.title}</h2>
        </div>

        <div className="min-h-[320px]">{currentStep.content}</div>

        <div className="mt-12 flex justify-between items-center">
          <button 
            onClick={() => setStep(s => s - 1)} 
            disabled={step === 1}
            className={`text-gray-400 font-bold hover:text-white ${step === 1 ? 'opacity-0' : ''}`}
          >
            ← Voltar
          </button>
          
          {step === steps.length ? (
            <button 
              onClick={handleSubmit}
              disabled={!data.userName || !data.city || !data.state}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all shadow-2xl disabled:opacity-30"
            >
              Gerar Diagnóstico Único ⚡
            </button>
          ) : (
            <button 
              onClick={() => setStep(s => s + 1)}
              className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              Próximo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
