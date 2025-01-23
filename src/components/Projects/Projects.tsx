import { motion, Variants } from 'framer-motion';
import { projects } from '@/data/projects';
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

const Projects: React.FC = () => {
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
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.ul>
    </section>
  );
};

export default Projects;
