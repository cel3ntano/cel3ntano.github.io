import { FC } from 'react';
import { motion, Variants } from 'framer-motion';
import css from './Contacts.module.css';
import Form from '../Form/Form';
import sprite from '@/assets/sprite.svg';

interface ContactsVariants {
  containerVariants: Variants;
  itemVariants: Variants;
}

interface ContactInfo {
  type: 'email' | 'phone';
  href: string;
  icon: string;
  display: string;
}

interface ContactsProps {}

const variants: ContactsVariants = {
  containerVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
};

const contactDetails: ContactInfo[] = [
  {
    type: 'email',
    href: 'mailto:contact@zhygalko.dev',
    icon: `${sprite}#icon-email`,
    display: 'contact@zhygalko.dev',
  },
  {
    type: 'phone',
    href: 'tel:+393201836658',
    icon: `${sprite}#icon-phone`,
    display: '(+39) 320 183 66 58',
  },
];

const Contacts: FC<ContactsProps> = () => {
  return (
    <section id='contacts' className={`${css.container} container`}>
      <motion.header
        className={css.header}
        variants={variants.containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}>
        <motion.h2 variants={variants.itemVariants}>Contacts</motion.h2>
        <motion.p variants={variants.itemVariants}>
          Excited to bring your project to life? Let's connect!
        </motion.p>
        <motion.p variants={variants.itemVariants}>
          Don't hesitate to contact me to discuss your ideas or ask any
          questions
        </motion.p>
      </motion.header>

      <motion.div
        className={css.contacts}
        variants={variants.containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}>
        {contactDetails.map(contact => (
          <motion.div key={contact.type} variants={variants.itemVariants}>
            <motion.a href={contact.href} whileTap={{ scale: 0.95 }}>
              <svg width='40' height='40'>
                <use href={contact.icon}></use>
              </svg>
            </motion.a>
            <motion.a href={contact.href}>{contact.display}</motion.a>
          </motion.div>
        ))}
      </motion.div>

      <Form />
    </section>
  );
};

export default Contacts;
