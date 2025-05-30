import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category: 'ai-ml' | 'web' | 'mobile' | 'trading' | 'other';
}

export interface Certification {
  id: string;
  title: string;
  company: string;
  description: string;
  date: string;
  link: string;
  logo: string;
  color: string;
  borderColor: string;
  hoverColor: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'programming' | 'ai-ml' | 'tools' | 'soft-skills';
  icon?: string;
}

interface PortfolioState {
  // UI State
  activeSection: string;
  isMenuOpen: boolean;
  isLoading: boolean;
  currentCertification: number;

  // Data
  projects: Project[];
  certifications: Certification[];
  skills: Skill[];

  // Theme & Preferences
  theme: 'dark' | 'light';
  animationsEnabled: boolean;

  // Actions
  setActiveSection: (section: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentCertification: (index: number) => void;
  nextCertification: () => void;
  prevCertification: () => void;

  // Data actions
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addCertification: (certification: Certification) => void;
  updateCertification: (id: string, updates: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // Theme actions
  setTheme: (theme: 'dark' | 'light') => void;
  toggleAnimations: () => void;

  // Utility actions
  reset: () => void;
}

const initialState = {
  activeSection: 'home',
  isMenuOpen: false,
  isLoading: true,
  currentCertification: 0,
  projects: [],
  certifications: [],
  skills: [],
  theme: 'dark' as const,
  animationsEnabled: true,
};

export const usePortfolioStore = create<PortfolioState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // UI Actions
        setActiveSection: section => set({ activeSection: section }),
        setIsMenuOpen: isOpen => set({ isMenuOpen: isOpen }),
        setIsLoading: isLoading => set({ isLoading }),
        setCurrentCertification: index => set({ currentCertification: index }),

        nextCertification: () => {
          const { certifications, currentCertification } = get();
          set({
            currentCertification: (currentCertification + 1) % certifications.length,
          });
        },

        prevCertification: () => {
          const { certifications, currentCertification } = get();
          set({
            currentCertification:
              (currentCertification - 1 + certifications.length) % certifications.length,
          });
        },

        // Project Actions
        addProject: project => set(state => ({ projects: [...state.projects, project] })),

        updateProject: (id, updates) =>
          set(state => ({
            projects: state.projects.map(p => (p.id === id ? { ...p, ...updates } : p)),
          })),

        removeProject: id =>
          set(state => ({
            projects: state.projects.filter(p => p.id !== id),
          })),

        // Certification Actions
        addCertification: certification =>
          set(state => ({
            certifications: [...state.certifications, certification],
          })),

        updateCertification: (id, updates) =>
          set(state => ({
            certifications: state.certifications.map(c => (c.id === id ? { ...c, ...updates } : c)),
          })),

        removeCertification: id =>
          set(state => ({
            certifications: state.certifications.filter(c => c.id !== id),
          })),

        // Skill Actions
        addSkill: skill => set(state => ({ skills: [...state.skills, skill] })),

        updateSkill: (id, updates) =>
          set(state => ({
            skills: state.skills.map(s => (s.id === id ? { ...s, ...updates } : s)),
          })),

        removeSkill: id =>
          set(state => ({
            skills: state.skills.filter(s => s.id !== id),
          })),

        // Theme Actions
        setTheme: theme => set({ theme }),
        toggleAnimations: () => set(state => ({ animationsEnabled: !state.animationsEnabled })),

        // Utility Actions
        reset: () => set(initialState),
      }),
      {
        name: 'portfolio-storage',
        partialize: state => ({
          theme: state.theme,
          animationsEnabled: state.animationsEnabled,
          projects: state.projects,
          certifications: state.certifications,
          skills: state.skills,
        }),
      }
    ),
    {
      name: 'portfolio-store',
    }
  )
);
