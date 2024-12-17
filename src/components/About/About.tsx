import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import css from './About.module.css';

import AndriiZhygalko from '@/assets/AndriiZhygalko.webp';
import wordpress from '@/assets/wordpress.svg';
import htmlIcon from '@/assets/html-icon.svg';
import cssIcon from '@/assets/css-icon.svg';
import jsIcon from '@/assets/js-icon.svg';
import nodeIcon from '@/assets/node-icon.svg';
import reactIcon from '@/assets/react-icon.svg';
import typescriptIcon from '@/assets/typescript-icon.svg';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.4 },
    },
  };

  const skills = [
    { src: reactIcon, alt: 'React' },
    { src: jsIcon, alt: 'JavaScript' },
    { src: typescriptIcon, alt: 'Typescript' },
    { src: nodeIcon, alt: 'Node' },
    { src: wordpress, alt: 'Wordpress' },
    { src: htmlIcon, alt: 'Html' },
    { src: cssIcon, alt: 'Css' },
  ];

  return (
    <section id='about' className={css.container} ref={ref}>
      <motion.div
        className={css.aboutText}
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}>
        <motion.h2 variants={textVariants}>About me</motion.h2>

        <motion.p variants={textVariants}>
          Hi! I'm Andrii, a full-stack developer dedicated to creating tailored
          online solutions. With a background in HTML, CSS, JavaScript, React,
          and Node.js, I can turn your website concepts into reality.
        </motion.p>

        <motion.p
          variants={textVariants}
          style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          My expertise includes CMS platforms like WordPress, equipping clients
          with intuitive tools to manage and update their websites effortlessly.
        </motion.p>

        <motion.p variants={textVariants}>
          Whether you're looking for a brand-new website or a redesign, I'm here
          to assist you. Let's collaborate to build a digital solution that
          surpasses your expectations!
        </motion.p>

        <motion.h3 variants={textVariants}>My core skills include:</motion.h3>

        <motion.div
          className={css.hardSkills}
          variants={skillsContainerVariants}>
          {skills.map(skill => (
            <motion.div
              key={skill.alt}
              className={css.ability}
              variants={skillItemVariants}>
              <img src={skill.src} alt={skill.alt} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={css.aboutImage}
        variants={imageVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}>
        <img src={AndriiZhygalko} alt='Andrii Zhygalko photo' />
      </motion.div>
    </section>
  );
}
