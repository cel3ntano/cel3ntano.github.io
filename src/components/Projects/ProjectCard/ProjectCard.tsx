import { motion } from 'framer-motion';
import css from './ProjectCard.module.css';
import sprite from '@/assets/sprite.svg';

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    githubLink?: string;
    liveLink?: string;
    technologies: string[];
  };
}

type MouseEventHandler = (e: React.MouseEvent<HTMLLIElement>) => void;

export const projectVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handleMouseMove: MouseEventHandler = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', x.toString());
    card.style.setProperty('--y', y.toString());
  };

  const handleMouseEnter: MouseEventHandler = e => {
    e.currentTarget.setAttribute('data-glow', 'true');
  };

  const handleMouseLeave: MouseEventHandler = e => {
    e.currentTarget.setAttribute('data-glow', 'false');
  };

  return (
    <motion.li
      className={css.project}
      variants={projectVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-glow='false'>
      <article>
        <div className={css.projectHeader}>
          <svg className={css.folderIcon} width='50' height='50'>
            <use href={`${sprite}#icon-folder`}></use>
          </svg>
          <nav className={css.projectLinks}>
            {project.githubLink && (
              <motion.a
                href={project.githubLink}
                target='_blank'
                rel='noreferrer'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${project.title} source code on GitHub`}>
                <svg className={css.githubIcon} width='50' height='50'>
                  <use href={`${sprite}#icon-github`}></use>
                </svg>
              </motion.a>
            )}
            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target='_blank'
                rel='noreferrer'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Visit ${project.title} live project`}>
                <svg className={css.linkIcon} width='50' height='50'>
                  <use href={`${sprite}#icon-external-link`}></use>
                </svg>
              </motion.a>
            )}
          </nav>
        </div>

        <div className={css.projectContent}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>

        <div className={css.projectFooter}>
          <ul className={css.techList}>
            {project.technologies.map(tech => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </article>
    </motion.li>
  );
};
