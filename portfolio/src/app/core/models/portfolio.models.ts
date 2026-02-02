// ============================================
// PORTFOLIO DATA MODELS
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: Date;
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  readingTime: number; // in minutes
  tags: string[];
  published: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
  read?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  location: string;
  avatar: string;
  resumeUrl?: string;
  bio: string;
  socialLinks: SocialLink[];
}

export interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
  exact?: boolean;
}

export type Theme = 'dark' | 'light';

export interface AppState {
  theme: Theme;
  isMenuOpen: boolean;
  isLoading: boolean;
}
