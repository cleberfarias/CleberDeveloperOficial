
export interface CustomSection {
  id: string;
  title: string;
  text: string;
  imageUrl?: string;
  imagePosition: 'left' | 'right' | 'full';
}

export interface QuizData {
  id: string; // ID único do lead
  userName: string;
  niche: string;
  city: string;
  state: string;
  cityPopulation: number;
  hasSite: 'yes' | 'no';
  goal: 'sales' | 'brand' | 'system' | 'all';
  budget: number;
  serviceType: 'site' | 'ecommerce' | 'system';
  aiContent?: AIPageContent; // Armazena o conteúdo gerado para persistência
}

export interface AIPageContent {
  title: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  headline: string;
  subheadline: string;
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  aboutTitle?: string;
  aboutText?: string;
  services?: string[];
  testimonial?: {
    name: string;
    text: string;
  };
  products?: {
    name: string;
    price: string;
    description: string;
    imageUrl?: string;
    image?: string;
  }[];
  dashboardStats?: {
    label: string;
    value: string;
    trend: string;
  }[];
  sidebarItems?: string[];
  features?: { title: string; icon: string; description: string }[];
  modules?: string[];
  customSections?: CustomSection[];
  strategy?: string[];
}

export interface TemplateDefinition {
  id: string;
  name: string;
  preview: string;
  description: string;
  initialContent: Partial<AIPageContent>;
}

export interface ROIResult {
  estimatedReach: number;
  potentialConversion: number;
  estimatedRevenue: string;
  packageRecommended: string;
  priceStart: number;
}
