
import React from 'react';

const packages = [
  {
    name: "Site Essencial",
    price: "200",
    desc: "Perfeito para quem está começando agora.",
    features: [
      "Landing Page de Alta Conversão",
      "Otimizado para Celular",
      "Integração com WhatsApp",
      "Domínio Próprio",
      "Hospedagem Premium"
    ],
    popular: false
  },
  {
    name: "E-commerce Pro",
    price: "1.200",
    desc: "Venda seus produtos 24h por dia, sem parar.",
    features: [
      "Catálogo de Produtos Ilimitado",
      "Pagamentos Online (Pix/Cartão)",
      "Cálculo de Frete e Entrega",
      "Verificação de Idade (18+)",
      "Painel de Vendas"
    ],
    popular: true
  },
  {
    name: "Sistema Custom",
    price: "3.000",
    desc: "Automação total para o seu modelo de negócio.",
    features: [
      "Dashboard Administrativo",
      "Gestão de Pedidos/Estoque",
      "Sistema de Agendamentos",
      "Multi-usuários",
      "Relatórios de Faturamento"
    ],
    popular: false
  }
];

interface PackagesProps {
  onSelectPlan?: (planName: string) => void;
}

const Packages: React.FC<PackagesProps> = ({ onSelectPlan }) => {
  return (
    <section id="packages" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Investimento que se <span className="text-cyan-400">paga sozinho</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Valores a partir de uma pequena parcela mensal que traz resultados exponenciais para o seu faturamento.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`relative p-8 rounded-[2.5rem] border transition-all hover:-translate-y-2 ${pkg.popular ? 'bg-white/5 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.1)]' : 'border-white/10 bg-white/[0.02]'}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-400 text-[#030712] text-xs font-black uppercase rounded-full">
                  Mais Recomendado
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm">{pkg.desc}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-gray-500">A partir de</span>
                  <span className="text-4xl font-extrabold">R$ {pkg.price}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Pagamento único ou mensalidade</div>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onSelectPlan?.(pkg.name)}
                className={`w-full py-4 rounded-2xl font-bold text-center block transition-all ${pkg.popular ? 'bg-cyan-400 text-[#030712] hover:bg-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}
              >
                Montar meu Site Agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
