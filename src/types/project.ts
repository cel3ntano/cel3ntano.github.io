export type Project = {
  id: string | number;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  technologies: string[];
  order?: number;
  active?: boolean;
  slug?: string;
  featured?: boolean;
  created_at?: string;
};
