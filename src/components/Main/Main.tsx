import { useEffect, useState, Suspense, lazy } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import css from './Main.module.css';
import wordpress from '@/assets/wordpress.svg';
import htmlIcon from '@/assets/html-icon.svg';
import cssIcon from '@/assets/css-icon.svg';
import jsIcon from '@/assets/js-icon.svg';
import nodeIcon from '@/assets/node-icon.svg';
import reactIcon from '@/assets/react-icon.svg';
import vscodeIcon from '@/assets/vscode-icon.svg';
import typescriptIcon from '@/assets/typescript-icon.svg';
import {
  type Engine,
  type ISourceOptions,
  RecursivePartial,
  IShapeValues,
} from '@tsparticles/engine';

const Hero = lazy(() => import('../Hero/Hero'));
const About = lazy(() => import('../About/About'));
const Projects = lazy(() => import('../Projects/Projects'));
const Contacts = lazy(() => import('../Contacts/Contacts'));

interface ParticleImageSource {
  src: string;
}

interface MainProps {
  className?: string;
}

const Main: React.FC<MainProps> = ({ className }) => {
  const [isEngineReady, setIsEngineReady] = useState<boolean>(false);

  useEffect(() => {
    const initEngine = async (): Promise<void> => {
      await initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      });
      setIsEngineReady(true);
    };

    initEngine().catch(console.error);
  }, []);

  const particleImages: ParticleImageSource[] = [
    { src: cssIcon },
    { src: vscodeIcon },
    { src: wordpress },
    { src: htmlIcon },
    { src: jsIcon },
    { src: nodeIcon },
    { src: reactIcon },
    { src: typescriptIcon },
  ];

  const options: ISourceOptions = {
    fullScreen: {
      enable: true,
      zIndex: 1,
    },
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: ['repulse', 'bubble'],
          parallax: {
            enable: false,
            force: 30,
            smooth: 10,
          },
        },
      },
      modes: {
        bubble: {
          distance: 200,
          duration: 3,
          opacity: 0.8,
          size: 5,
        },
        push: {
          quantity: 2,
        },
        repulse: {
          distance: 50,
          duration: 0.2,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      links: {
        blink: false,
        color: '#000',
        distance: 150,
        enable: false,
        opacity: 0.4,
        width: 1,
      },
      move: {
        attract: {
          enable: false,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        warp: false,
        direction: 'none',
        enable: true,
        outModes: 'out',
        random: true,
        speed: 2,
        straight: false,
      },
      number: {
        value: 12,
        limit: {
          mode: 'delete',
          value: 20,
        },
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
      },
      opacity: {
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
        value: {
          min: 0.2,
          max: 1,
        },
      },
      rotate: {
        animation: {
          enable: true,
          speed: 5,
          sync: false,
        },
        direction: 'random',
        value: 0,
      },
      shape: {
        type: 'image',
        options: {
          image: particleImages.map(img => ({
            src: img.src,
            width: 20,
            height: 20,
          })) as RecursivePartial<IShapeValues>[],
        },
      },
      size: {
        value: {
          min: 12,
          max: 16,
        },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
    },
    background: {
      image: '',
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
    },
  };

  return (
    <main className={`${css.container} container ${className ?? ''}`}>
      {isEngineReady && <Particles id='tsparticles' options={options} />}
      <Suspense fallback={null}>
        <Hero />
      </Suspense>

      <Suspense fallback={null}>
        <About />
      </Suspense>

      <Suspense fallback={null}>
        <Projects />
      </Suspense>

      <Suspense fallback={null}>
        <Contacts />
      </Suspense>
    </main>
  );
};

export default Main;
