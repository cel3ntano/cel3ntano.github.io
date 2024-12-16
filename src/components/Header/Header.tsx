import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import clsx from 'clsx';
import css from './Header.module.css';
import Resume from '@/assets/Andrii_Zhygalko_FS_Developer.pdf';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  function toggleTheme() {
    let html = document.getElementsByTagName('html')[0];
    html.classList.toggle('light');
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
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

  return (
    <header className={`${css.container} header header-fixed`}>
      <Router>
        <HashLink smooth to='#home' className={css.logo}>
          <span className={css.symbol}>{'<'}</span>
          <span>{'Andrii'}</span>
          <span className={css.surname}>{'Zhygalko'}</span>
          <span className={css.symbol}>{'/>'}</span>
        </HashLink>

        <input
          onChange={toggleTheme}
          className={css.themeToggle}
          type='checkbox'
          id='switch'
          name='mode'
        />
        <label htmlFor='switch' className={css.themeLabel}>
          Toggle
        </label>

        <nav className={clsx('nav', css.nav, menuOpen && css.active)}>
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
          <a href={Resume} download className={clsx(css.button, 'button')}>
            Download CV
          </a>
        </nav>

        <div
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
      </Router>
    </header>
  );
}
