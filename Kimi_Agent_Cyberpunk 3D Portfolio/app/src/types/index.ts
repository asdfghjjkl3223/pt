export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'business' | 'ecommerce' | 'premium';
  tags: string[];
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  id: number;
  name: string;
  price: string;
  description: string;
  features: { text: string; included: boolean }[];
  cta: string;
  highlighted?: boolean;
}
