import { motion, useInView, Variants } from 'framer-motion';
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

interface Skill {
  src: string;
  alt: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const skillsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const skillItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.4 },
  },
};

const skills: readonly Skill[] = [
  { src: reactIcon, alt: 'React' },
  { src: jsIcon, alt: 'JavaScript' },
  { src: typescriptIcon, alt: 'Typescript' },
  { src: nodeIcon, alt: 'Node' },
  { src: wordpress, alt: 'Wordpress' },
  { src: htmlIcon, alt: 'Html' },
  { src: cssIcon, alt: 'Css' },
] as const;

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  return (
    <section id='about' className={`${css.container} container`} ref={ref}>
      <motion.div
        className={css.aboutText}
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}>
        <motion.h2 variants={textVariants}>About me</motion.h2>

        <motion.p variants={textVariants}>
          Welcome, and thank you for visiting my portfolio! Let me introduce
          myself briefly. My passion for technology led me to start my journey
          with the Google IT Support Professional Certificate, where I
          discovered a love for coding — and that’s why I’m here today.
        </motion.p>

        <motion.p
          variants={textVariants}
          style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          With expertise in HTML, CSS, JavaScript, React, and Node.js, I
          specialize in turning your website concepts into reality.
        </motion.p>

        <motion.p variants={textVariants}>
          Whether you need a brand-new website or a redesign, I’m here to
          collaborate with you and create digital solutions that exceed your
          expectations. Let’s build something amazing together!
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
};

export default About;
