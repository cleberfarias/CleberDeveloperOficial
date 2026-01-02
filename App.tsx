
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import QuizResults from './components/QuizResults';
import Packages from './components/Packages';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import TemplateEditor from './components/TemplateEditor';
import TemplateSelector from './components/TemplateSelector';
import AdminDashboard from './components/AdminDashboard';
import { QuizData, TemplateDefinition } from './types';

const App: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizData | null>(null);
  const [selectedPlanForEditor, setSelectedPlanForEditor] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDefinition | null>(null);

  // Analytics & Initial State
  useEffect(() => {
    // Track Page Views
    const currentViews = parseInt(localStorage.getItem('fd_views') || '0');
    localStorage.setItem('fd_views', (currentViews + 1).toString());

    const params = new URLSearchParams(window.location.search);
    
    // Admin Check
    if (params.get('admin') === 'true') {
      setShowAdmin(true);
    }

    // Lead Recovery from URL
    const leadData = params.get('lead');
    if (leadData) {
      try {
        const decodedStr = decodeURIComponent(escape(atob(leadData)));
        const decoded = JSON.parse(decodedStr);
        setQuizResults(decoded);
      } catch (e) {
        console.error("Erro ao recuperar lead da URL:", e);
      }
    }
  }, []);

  const handleQuizComplete = (data: QuizData) => {
    setQuizResults(data);
    setShowQuiz(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanForEditor(planName);
  };

  const handleTemplateChosen = (template: TemplateDefinition) => {
    setSelectedTemplate(template);
  };

  const scrollToTop = () => {
    setQuizResults(null);
    const baseUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, '', baseUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showAdmin) {
    return <AdminDashboard onClose={() => {
      setShowAdmin(false);
      const baseUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', baseUrl);
    }} />;
  }

  if (selectedPlanForEditor && !selectedTemplate) {
    return (
      <TemplateSelector 
        planName={selectedPlanForEditor} 
        onSelect={handleTemplateChosen} 
        onCancel={() => setSelectedPlanForEditor(null)} 
      />
    );
  }

  if (selectedPlanForEditor && selectedTemplate) {
    const locationStr = quizResults ? `${quizResults.city} - ${quizResults.state}` : "Brasil";
    return (
      <TemplateEditor 
        planName={selectedPlanForEditor} 
        initialTemplate={selectedTemplate}
        locationContext={locationStr}
        onClose={() => {
          setSelectedTemplate(null);
          setSelectedPlanForEditor(null);
        }} 
      />
    );
  }

  if (quizResults) {
    return (
      <div className="min-h-screen bg-[#030712] text-white">
        <Header />
        <QuizResults data={quizResults} onClose={() => setQuizResults(null)} />
        <footer className="py-20 text-center border-t border-white/5 text-gray-500 text-sm">
          <div className="mb-8">
            <button 
              onClick={scrollToTop}
              className="text-cyan-400 font-bold hover:underline"
            >
              ← Voltar para a Página Inicial
            </button>
          </div>
          <p>© 2024 FD Developer Web. Todos os direitos reservados.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-400 selection:text-black scroll-smooth">
      <Header />
      
      <main>
        <Hero onStartQuiz={() => {
          setShowQuiz(true);
          // Track Quiz Start
          const currentStarts = parseInt(localStorage.getItem('fd_quiz_starts') || '0');
          localStorage.setItem('fd_quiz_starts', (currentStarts + 1).toString());
        }} />
        
        <section className="py-20 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-2xl font-black tracking-tighter">A MAISNDICADA</span>
              <span className="text-2xl font-black tracking-tighter">CHATGURU</span>
              <span className="text-2xl font-black tracking-tighter">FFLIP</span>
              <span className="text-2xl font-black tracking-tighter">DOCTORASSISTANT IA</span>
              <span className="text-2xl font-black tracking-tighter">FD DEV WEB</span>
            </div>
          </div>
        </section>

        <Portfolio />
        <Packages onSelectPlan={handleSelectPlan} />
        <FAQ />
        
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center border border-cyan-400/20 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Vamos construir o seu <br /><span className="text-cyan-400">sucesso digital?</span></h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">Não perca mais tempo com sites lentos e sem resultados. Comece hoje mesmo sua transformação com quem entende do negócio.</p>
            <button 
              onClick={() => {
                setShowQuiz(true);
                const currentStarts = parseInt(localStorage.getItem('fd_quiz_starts') || '0');
                localStorage.setItem('fd_quiz_starts', (currentStarts + 1).toString());
              }}
              className="bg-white text-[#030712] px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
            >
              Fazer meu Diagnóstico Grátis
            </button>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-xl">FD</div>
              <span className="text-xl font-extrabold">Developer <span className="text-cyan-400">Web</span></span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6">Criando o futuro da web com tecnologias escaláveis e design que converte. Especialistas em sistemas sob medida e e-commerce.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowAdmin(true)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer text-[10px] font-black tracking-widest">ADMIN</button>
              <a href="https://wa.me/5548999019525" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer italic font-serif">w</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-500">Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-cyan-400 transition-colors">Home</button></li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfólio</a></li>
              <li><a href="#packages" className="hover:text-cyan-400 transition-colors">Planos</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-500">Contato</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>+55 48 99901-9525</li>
              <li>Cleber Delgado</li>
              <li className="break-all">cleber.fdelgado@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          © 2024 FD Developer Web. Feito com paixão pelo desenvolvimento.
        </div>
      </footer>

      {showQuiz && (
        <Quiz 
          onComplete={handleQuizComplete} 
          onCancel={() => setShowQuiz(false)} 
        />
      )}
    </div>
  );
};

export default App;
