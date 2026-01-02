
import { GoogleGenAI, Type } from "@google/genai";
import { AIPageContent, QuizData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Função auxiliar para garantir que o JSON seja limpo de blocos de código markdown
const cleanJsonResponse = (text: string) => {
  return text.replace(/```json\n?|```/g, "").trim();
};

export const generateImage = async (prompt: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ text: `A professional commercial photograph of ${prompt}. Premium aesthetics, cinematic lighting, 4k.` }],
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
  }
  return undefined;
};

export const getMarketAnalysis = async (niche: string, city: string, state: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o mercado de ${niche} em ${city}, ${state}. 
      Responda EXCLUSIVAMENTE em formato JSON com estes campos:
      {
        "demanda": "texto curto",
        "concorrentes": ["nome 1", "nome 2"],
        "oportunidade": "texto curto",
        "ticketMedio": "R$ valor"
      }
      Foque na realidade local desta cidade específica.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });
    
    const cleanedText = cleanJsonResponse(response.text || "{}");
    const analysis = JSON.parse(cleanedText);
    
    // Garantir que concorrentes seja um array
    if (analysis.concorrentes && !Array.isArray(analysis.concorrentes)) {
      analysis.concorrentes = [String(analysis.concorrentes)];
    }

    return {
      text: analysis,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (e) {
    console.error("Erro na análise de mercado:", e);
    return { 
      text: {
        demanda: "Alta procura por serviços digitais na região.",
        concorrentes: ["Empresas tradicionais locais", "Negócios sem presença online"],
        oportunidade: "Domine o Google Maps em sua cidade antes da concorrência.",
        ticketMedio: "Sob consulta"
      }, 
      sources: [] 
    };
  }
};

export const generateMockupContent = async (businessName: string, niche: string, type: 'site' | 'ecommerce' | 'system', city: string): Promise<AIPageContent> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Gere conteúdo para um ${type} da empresa "${businessName}" em ${city}. Nicho: ${niche}.
    Inclua um "Estratégia de Sucesso" com 3 passos específicos para dominar o mercado local.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          headline: { type: Type.STRING },
          subheadline: { type: Type.STRING },
          primaryColor: { type: Type.STRING },
          secondaryColor: { type: Type.STRING },
          heroImagePrompt: { type: Type.STRING },
          modules: { type: Type.ARRAY, items: { type: Type.STRING } },
          strategy: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 passos para o sucesso local" },
          dashboardStats: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, trend: { type: Type.STRING } }
            }
          }
        },
        required: ["title", "headline", "subheadline", "strategy"]
      }
    }
  });

  const cleanedText = cleanJsonResponse(response.text || "{}");
  const content = JSON.parse(cleanedText);
  content.heroImage = await generateImage(`${niche} business premium website in ${city}`);
  return content as AIPageContent;
};

export const updateContentWithChat = async (currentContent: AIPageContent, userRequest: string, locationContext: string): Promise<AIPageContent> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `O usuário está em ${locationContext}. 
    CONTEÚDO ATUAL: ${JSON.stringify(currentContent)}. 
    PEDIDO: "${userRequest}". 
    Retorne o JSON atualizado.`,
    config: { responseMimeType: "application/json" }
  });
  const cleanedText = cleanJsonResponse(response.text || "{}");
  return JSON.parse(cleanedText) as AIPageContent;
};
