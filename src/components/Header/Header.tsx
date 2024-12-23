import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import clsx from 'clsx';
import css from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const html = document.getElementsByTagName('html')[0];
    return html.classList.contains('light');
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.getElementsByTagName('html')[0];

    if (savedTheme === 'light') {
      html.classList.add('light');
      setIsLightTheme(true);
    }
  }, []);

  function toggleTheme() {
    const html = document.getElementsByTagName('html')[0];
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
    <header className={css.header}>
      <div className={`${css.container} container`}>
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
          checked={isLightTheme}
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
          <Link to='/cv' className={clsx(css.button, 'button')}>
            View CV
          </Link>
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
      </div>
    </header>
  );
}
