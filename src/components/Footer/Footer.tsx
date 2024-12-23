import css from './Footer.module.css';
import reactIcon from '../../assets/react-icon.svg';
import linkedin from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github.svg';
import whatsapp from '../../assets/whatsapp.svg';
import telegram from '../../assets/telegram.svg';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={css.footer}>
      <div className={`${css.container} container`}>
        <a href='https://projects.zhygalko.dev' className={css.logo}>
          <span>projects.zhygalko.dev</span>
        </a>

        <div className={css.content}>
          <p>
            This website is made with <img src={reactIcon} alt='React' />
            {currentYear}
          </p>
        </div>

        <div className={css.socialMedia}>
          <a
            href='https://www.linkedin.com/in/andrii-zhygalko'
            target='_blank'
            rel='noreferrer'>
            <img src={linkedin} alt='Linkedin' />
          </a>
          <a
            href='https://github.com/cel3ntano/'
            target='_blank'
            rel='noreferrer'>
            <img src={githubIcon} alt='GitHub' />
          </a>
          <a
            href='https://api.whatsapp.com/send/?phone=%2B393201836658&text=Hello+Andrii'
            target='_blank'
            rel='noreferrer'>
            <img src={whatsapp} alt='Whatsapp' />
          </a>
          <a href='https://t.me/cel3ntano' target='_blank' rel='noreferrer'>
            <img src={telegram} alt='Telegram' />
          </a>
        </div>
      </div>
    </footer>
  );
}
