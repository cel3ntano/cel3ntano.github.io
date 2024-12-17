import { useForm, ValidationError } from '@formspree/react';
import { toast, ToastContainer } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import { useEffect, useState, useRef } from 'react';
import validator from 'validator';
import css from './Form.module.css';
import 'react-toastify/dist/ReactToastify.css';

type Theme = 'light' | 'dark';

export default function Form() {
  const [state, handleSubmit] = useForm('mnnqkdkb');
  const [validEmail, setValidEmail] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState<Theme>(
    document.documentElement.classList.contains('light') ? 'light' : 'dark'
  );
  const [key, setKey] = useState(0);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme = document.documentElement.classList.contains('light')
        ? 'light'
        : 'dark';
      if (newTheme !== theme) {
        setTheme(newTheme);
        setKey(prev => prev + 1);
        setIsHuman(false);
      }
    };

    handleThemeChange();

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [theme]);

  function verifyEmail(email: string) {
    if (validator.isEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  useEffect(() => {
    if (state.succeeded) {
      toast.success('Email successfully sent!', {
        position: 'bottom-left',
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: 'succeeded',
      });
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <div className={css.containerSuccess}>
        <h3>Thanks for getting in touch!</h3>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
          Back to the top
        </button>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h2>Get in touch using the form below</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Email'
          id='email'
          type='email'
          name='email'
          onChange={e => {
            verifyEmail(e.target.value);
          }}
          required
        />
        <ValidationError prefix='Email' field='email' errors={state.errors} />
        <textarea
          required
          placeholder='Send a message to get started.'
          id='message'
          name='message'
          onChange={e => {
            setMessage(e.target.value);
          }}
        />
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
        />
        <div className={css.recaptchaWrapper}>
          <ReCAPTCHA
            size='normal'
            key={key}
            ref={recaptchaRef}
            sitekey='6LeA050qAAAAAKUDCt2sG4kJv4FuwxZh6MNtiAaV'
            onChange={() => setIsHuman(true)}
            theme={theme}
          />
        </div>
        <button
          type='submit'
          disabled={state.submitting || !validEmail || !message || !isHuman}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
