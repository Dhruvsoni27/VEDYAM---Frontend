export type HealthConcernId =
  | 'digestion'
  | 'respiratory'
  | 'immunity'
  | 'joint-bone'
  | 'stress-sleep'
  | 'skin-hair'
  | 'heart-health'
  | 'liver-health'
  | 'womens-wellness'
  | 'mens-wellness'
  | 'child-care'
  | 'kidney-renal'
  | 'general-wellness';

export interface KeyIngredient {
  name: string;
  botanical: string;
  role: string;
}

export interface ProductVariant {
  size: string;
  price: number;
  mrp: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  healthConcern: HealthConcernId;
  shortBenefit: string;
  rating: number;
  reviewCount: number;
  price: number;
  mrp: number;
  discountPercent: number;
  inStock: boolean;
  image: string;
  galleryImages: string[];
  variants: ProductVariant[];
  selectedVariantIndex?: number;
  classicalTextRef: string;
  description: string;
  keyIngredients: KeyIngredient[];
  benefits: string[];
  dosage: string;
  anupana: string; // Traditional vehicle e.g., warm water, cow's ghee, honey
  precautions: string;
  storage: string;
  faqs: { question: string; answer: string }[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface WellnessCombo {
  id: string;
  name: string;
  category: string;
  shortBenefit: string;
  description: string;
  price: number;
  mrp: number;
  discountPercent: number;
  image: string;
  includedItems: string[];
  healthConcern: HealthConcernId;
}

export interface HealthConcern {
  id: HealthConcernId;
  title: string;
  shortDesc: string;
  iconName: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  healthFocus: string;
  productUsed: string;
  rating: number;
  quote: string;
  verifiedCustomer: boolean;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  excerpt: string;
  image: string;
  content: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Ayurveda Basics' | 'Usage & Dosage' | 'Consultation' | 'Shipping & Quality';
}

export type ViewMode = 'home' | 'shop' | 'pdp' | 'about' | 'ayurveda' | 'journal' | 'contact';
