import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import css from './NotFound.module.css';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.getElementsByTagName('html')[0];

    if (savedTheme === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
  }, []);

  return (
    <section className={css.container}>
      <motion.div
        className={css.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <HashLink smooth to='/' className={`${css.button} button`}>
          Back to Home
        </HashLink>
      </motion.div>
    </section>
  );
}
