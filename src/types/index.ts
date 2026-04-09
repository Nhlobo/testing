export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  href: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  description: string;
  result: string;
  resultLabel: string;
  gradient: string;
  tags: string[];
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tag: string;
  author: string;
  featured?: boolean;
}

export interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  github?: string;
  linkedin?: string;
}
