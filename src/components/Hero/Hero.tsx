import { motion } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import css from './Hero.module.css';
import computerCoding from '@/assets/computer_coding.webp';
import linkedin from '@/assets/linkedin.svg';
import githubIcon from '@/assets/github.svg';
import whatsapp from '@/assets/whatsapp.svg';
import Hello from '@/assets/Hello.gif';
import telegram from '@/assets/telegram.svg';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id='home' className={css.container}>
      <motion.div
        className={css.heroText}
        variants={container}
        initial='hidden'
        animate='show'>
        <motion.p variants={item}>
          Hello <img src={Hello} alt='Hello' width='20px' />, I'm
        </motion.p>
        <motion.h1 variants={item}>Andrii</motion.h1>
        <motion.div variants={item} className={`${css.button} button`}>
          <BrowserRouter>
            <HashLink smooth to='#contacts'>
              Contact
            </HashLink>
          </BrowserRouter>
        </motion.div>

        <motion.div className={css.socialMedia} variants={item}>
          <a
            href='https://github.com/cel3ntano/'
            target='_blank'
            rel='noreferrer'>
            <img src={githubIcon} alt='GitHub' />
          </a>
          <a
            href='https://www.linkedin.com/in/andrii-zhygalko'
            target='_blank'
            rel='noreferrer'>
            <img src={linkedin} alt='Linkedin' />
          </a>
          <a href='https://t.me/cel3ntano' target='_blank' rel='noreferrer'>
            <img src={telegram} alt='telegram' />
          </a>
          <a
            href='https://api.whatsapp.com/send/?phone=%2B393201836658&text=Hello+Andrii'
            target='_blank'
            rel='noreferrer'>
            <img src={whatsapp} alt='Whatsapp' />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className={css.specializationText}>
        <motion.p variants={item} className={css.experience}>
          I have one year of experience as a
        </motion.p>
        <motion.h3 variants={item}>Full Stack Developer</motion.h3>
      </motion.div>
    </section>
  );
}
