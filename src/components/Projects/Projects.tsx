import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getProjects } from '@/utils/supabaseClient';
import type { Project } from '@/types/project';
import css from './Projects.module.css';
import { ProjectCard } from './ProjectCard/ProjectCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadStaticProjects = async (): Promise<Project[]> => {
  try {
    const module = await import('@/data/projects');
    return module.projects;
  } catch (importErr) {
    console.error('Failed to load fallback projects:', importErr);
    return [];
  }
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProjects(): Promise<void> {
      try {
        setLoading(true);
        const projectsData = await getProjects();

        if (projectsData.length === 0) {
          console.log(
            'Supabase returned an empty array, falling back to static data'
          );
          const staticProjects = await loadStaticProjects();
          setProjects(
            staticProjects.filter(project => project.active !== false)
          );
          setUsingFallback(true);
          setError('Using cached project data.');
        } else {
          setProjects(projectsData.filter(project => project.active !== false));
          setError(null);
          setUsingFallback(false);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Using cached project data.');
        setUsingFallback(true);
        const staticProjects = await loadStaticProjects();
        setProjects(staticProjects.filter(project => project.active !== false));
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id='projects' className={`${css.container} container`}>
        <h2>My Projects</h2>
        <div className={css.loadingContainer}>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error && projects.length === 0) {
    return (
      <section id='projects' className={`${css.container} container`}>
        <h2>My Projects</h2>
        <div className={css.errorContainer}>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id='projects' className={`${css.container} container`}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        My Projects
      </motion.h2>

      <motion.ul
        className={css.projects}
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}>
        {projects.map(project => (
          <ProjectCard
            key={
              typeof project.id === 'string'
                ? project.id
                : project.slug || project.id.toString()
            }
            project={project}
          />
        ))}
      </motion.ul>
      {/* {error && (
        <div className={css.notificationBanner}>
          <p>{error}</p>
        </div>
      )} */}

      {/* {usingFallback && !error && (
        <div className={css.infoNotificationBanner}>
          <p>Using locally cached project data.</p>
        </div>
      )} */}
    </section>
  );
};

export default Projects;
