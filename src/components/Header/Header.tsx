import { useState, useLayoutEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import css from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light';
  });

  useLayoutEffect(() => {
    if (isLightTheme) {
      document.documentElement.classList.add('light');
    }
  }, []);

  useLayoutEffect(() => {
    const observerOptions = {
      rootMargin: '-40% 0px -50% 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const newTheme = html.classList.contains('light') ? 'dark' : 'light';

    if (newTheme === 'light') {
      html.classList.add('light');
      setIsLightTheme(true);
    } else {
      html.classList.remove('light');
      setIsLightTheme(false);
    }

    localStorage.setItem('theme', newTheme);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <motion.header
      className={css.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}>
      <div className={`${css.container} container`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}>
          <HashLink smooth to='#home' className={css.logo}>
            <span className={css.symbol}>{'<'}</span>
            <span>{'Andrii'}</span>
            <span className={css.surname}>{'Zhygalko'}</span>
            <span className={css.symbol}>{'/>'}</span>
          </HashLink>
        </motion.div>

        <input
          onChange={toggleTheme}
          className={css.themeToggle}
          type='checkbox'
          id='switch'
          name='mode'
          checked={isLightTheme}
        />
        <label htmlFor='switch' className={css.themeLabel}>
          Toggle
        </label>

        <motion.nav
          className={clsx('nav', css.nav, menuOpen && css.active)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}>
          <HashLink
            smooth
            to='#home'
            onClick={closeMenu}
            className={clsx(activeSection === 'home' && css.activeLink)}>
            Home
          </HashLink>
          <HashLink
            smooth
            to='#about'
            onClick={closeMenu}
            className={clsx(activeSection === 'about' && css.activeLink)}>
            About me
          </HashLink>
          <HashLink
            smooth
            to='#projects'
            onClick={closeMenu}
            className={clsx(activeSection === 'projects' && css.activeLink)}>
            Projects
          </HashLink>
          <HashLink
            smooth
            to='#contacts'
            onClick={closeMenu}
            className={clsx(activeSection === 'contacts' && css.activeLink)}>
            Contacts
          </HashLink>
          <Link to='/cv' className={clsx(css.button, 'button')}>
            View CV
          </Link>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-haspopup='true'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className={clsx(
            'menuButton',
            css.menuButton,
            menuOpen && ['active', css.menuActive]
          )}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>
    </motion.header>
  );
}
