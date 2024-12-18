import { motion } from 'framer-motion';
import css from './Contacts.module.css';
import Form from '../Form/Form';
import sprite from '@/assets/sprite.svg';

export default function Contacts() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id='contacts' className={css.container}>
      <motion.header
        className={css.header}
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}>
        <motion.h2 variants={itemVariants}>Contacts</motion.h2>
        <motion.p variants={itemVariants}>
          Excited to bring your project to life? Let’s connect!
        </motion.p>
        <motion.p variants={itemVariants}>
          Don’t hesitate to contact me to discuss your ideas or ask any
          questions
        </motion.p>
      </motion.header>

      <motion.div
        className={css.contacts}
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}>
        <motion.div variants={itemVariants}>
          <motion.a
            href='mailto:contact@zhygalko.dev'
            // whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            <svg width='40' height='40'>
              <use href={`${sprite}#icon-email`}></use>
            </svg>
          </motion.a>
          <motion.a
            href='mailto:contact@zhygalko.dev'
            // whileHover={{ scale: 1.05 }}
          >
            contact@zhygalko.dev
          </motion.a>
        </motion.div>
        <motion.div variants={itemVariants}>
          <motion.a
            href='tel:+919630576848'
            // whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            <svg width='40' height='40'>
              <use href={`${sprite}#icon-phone`}></use>
            </svg>
          </motion.a>
          <motion.a
            href='tel:+919630576848'
            // whileHover={{ scale: 1.05 }}
          >
            (+39) 320 183 66 58
          </motion.a>
        </motion.div>
      </motion.div>

      <Form />
    </section>
  );
}
