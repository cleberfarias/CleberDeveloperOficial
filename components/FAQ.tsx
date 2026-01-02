
import React, { useState } from 'react';

const questions = [
  {
    q: "Qual o prazo médio de entrega?",
    a: "Uma Landing Page simples pode ficar pronta em até 5 dias úteis. Projetos de sistemas complexos variam conforme as funcionalidades, mas trabalhamos com ciclos ágeis de entrega mensal."
  },
  {
    q: "Preciso pagar mensalidade?",
    a: "Oferecemos dois modelos: pagamento único pelo desenvolvimento com taxa pequena de manutenção/servidor, ou planos de assinatura mensal que já incluem atualizações e suporte ilimitado."
  },
  {
    q: "O site já vem com domínio e e-mail?",
    a: "Sim! Configuramos tudo: registro do .com.br, e-mails profissionais (contato@suaempresa.com) e certificado SSL de segurança."
  },
  {
    q: "Vocês fazem tráfego pago (Google/Meta)?",
    a: "Nossa especialidade é tecnologia e conversão. No entanto, temos parceiros estratégicos que podem gerir seu tráfego após o site estar pronto."
  }
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16">Dúvidas Frequentes</h2>
        
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="glass rounded-2xl border border-white/10 overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-lg">{item.q}</span>
                <span className={`text-cyan-400 text-2xl transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-8 pb-6 text-gray-400 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
