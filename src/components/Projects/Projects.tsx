import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import css from './Projects.module.css';
import sprite from '@/assets/sprite.svg';

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

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
          <motion.li
            key={project.id}
            className={css.project}
            variants={projectVariants}>
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
        ))}
      </motion.ul>
    </section>
  );
}
