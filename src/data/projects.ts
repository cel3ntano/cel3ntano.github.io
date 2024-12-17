import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'campers',
    title: 'Campers App',
    description:
      'An individual project built with React to search, view, and book campervans using mock data from MockAPI. Users can explore vehicles, filter by criteria like location or type, and view detailed pages for each camper, featuring descriptions, photo galleries, user reviews, and a booking form. This project demonstrates a user-friendly interface and showcases how a campervan booking service might function.',
    githubLink: 'https://github.com/cel3ntano/campers',
    liveLink: 'https://campers.zhygalko.dev/',
    technologies: ['React', 'Redux'],
  },
  {
    id: 'taskpro',
    title: 'TaskPro App',
    description: `A team project aimed to help with task organization using boards, columns, and cards, inspired by Trello. My main contribution was to develop the frontend for user authentication, ensuring smooth integration with the backend API. I used Redux for state management, which improved the app's performance and made it easier to maintain. This project helped me enhance my skills in frontend development, state management, and teamwork.`,
    githubLink: 'https://github.com/maksymPr424/TaskPro',
    liveLink: 'https://www.task-pro.app/',
    technologies: ['React', 'Redux', 'Node.js'],
  },
  {
    id: 'portfolio',
    title: `Developer's portfolio`,
    description: `A team project with a purpose to develop an elegant landing page for a fullstack developer, featuring a portfolio, biography, skillset, FAQs, user reviews, and contact options through a form or social media links. As a team lead, I managed code reviews for all sections and took charge of developing the skillset section. This project emphasizes teamwork and a commitment to delivering a smooth and professional user experience.`,
    githubLink: 'https://github.com/cel3ntano/project_myResume',
    liveLink: 'https://projects.zhygalko.dev/project_myResume/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'movie_explorer',
    title: 'Movie Explorer',
    description:
      'This is a personal project built with React, which serves as a single-page application for searching and browsing movies using the Movie Database API. The Home page presents trending movies, while the Movies page provides a search tool for users to find particular titles. Users can explore detailed movie pages that include synopses, ratings, and additional details. This project reflects my skills in React, API integration, and designing intuitive user-friendly interfaces.',
    githubLink: 'https://github.com/cel3ntano/goit-react-hw-05/',
    liveLink: 'https://moviexplorer.zhygalko.dev/',
    technologies: ['React', 'JavaScript'],
  },
  {
    id: 'project_vegetables_24',
    title: 'Green Harvest',
    description: `A team project to create a store concept for a vegetable delivery service. 
The project included features like easy navigation, product listings, user reviews, a service description, and a contact form. As the team lead, I took the responsibility of reviewing and integrating all sections to ensure a cohesive design. This early project was a great learning opportunity, significantly improving my HTML and CSS skills while also helping me develop teamwork and collaboration abilities.`,
    githubLink: 'https://github.com/cel3ntano/project-vegetables24',
    liveLink: 'https://projects.zhygalko.dev/project-vegetables24/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'web_studio',
    title: 'Web Studio',
    description: `An individual project where I developed a simple yet attractive landing page concept for a web studio. The page showcases company features, showcases the team and portfolio, and includes a contact form accessible via a modal window. This early project helped me refine my HTML and CSS skills, particularly in creating responsive, mobile-friendly designs and ensuring a seamless user experience.`,
    githubLink: 'https://github.com/cel3ntano/goit-markup-hw-06/',
    liveLink: 'https://projects.zhygalko.dev/goit-markup-hw-06/',
    technologies: ['HTML', 'CSS'],
  },
  //   {
  //     id: 'trendy_cookies',
  //     title: 'Trendy Cookies',
  //     description: 'A landing page for a bakery shop',
  //     githubLink: 'https://github.com/cel3ntano/trendy-cookies',
  //     liveLink: 'https://projects.zhygalko.dev/trendy-cookies/',
  //     technologies: ['HTML', 'CSS', 'JavaScript'],
  //   },
];