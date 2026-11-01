/**
 * All portfolio content lives here.
 * Edit this file to update the site — no component changes required.
 */

export type Project = {
  title: string
  category: string
  description: string
  highlights: string[]
  tags: string[]
  /** Add these when you have public repos / demos. Leave null to hide the buttons. */
  github: string | null
  live: string | null
  /** Optional screenshot in /public/img — falls back to a generated panel. */
  image?: string | null
}

export type Experience = {
  company: string
  role: string
  period: string
  location: string
  points: string[]
}

export const profile = {
  name: 'Rakesh Naraboina',
  logo: 'Rakesh',
  role: 'Senior Frontend / Full-Stack Software Engineer',
  shortRole: 'Senior Software Engineer',
  location: 'Hyderabad, Telangana, India',
  email: 'rakesh.naraboinaa@gmail.com',
  phone: '',
  linkedin: 'https://linkedin.com/in/rakesh-naraboina',
  /** No public GitHub provided yet — set a URL here to show GitHub links. */
  github: null as string | null,
  photo: '/img/profile.jpg',
  tagline: 'Learning. Building. Improving.',
  headline: {
    lead: 'Turning Ideas into',
    accent: 'Scalable, Seamless',
    tail: 'Web Experiences',
  },
  intro:
    "Hey, I'm Rakesh, a Senior Software Engineer with 5+ years of experience building scalable, responsive web applications and modern frontend architectures.",
  availability: 'Open to new opportunities',
}

export const about = {
  paragraphs: [
    "I'm a Senior Frontend / Full-Stack Software Engineer with 5+ years of experience building production-grade web applications using React, Next.js, TypeScript, JavaScript, and Node.js. I specialize in reusable component architecture, micro-frontends, frontend performance optimization, and responsive UI development.",
    'I enjoy solving complex engineering problems, exploring modern technologies, and building scalable solutions that improve user experience and developer productivity.',
  ],
  education: {
    school: 'Vaagdevi College of Engineering',
    degree: 'B.Tech',
    year: '2021',
    grade: 'CGPA 8.6',
  },
  highlights: [
    { value: '5+', label: 'Years of experience' },
    { value: '$540K', label: 'Annual cost savings delivered' },
    { value: '38%', label: 'Core Web Vitals improvement' },
  ],
}

export const experience: Experience[] = [
  {
    company: 'Gradera India',
    role: 'Senior Software Engineer',
    period: 'Jan 2026 — Present',
    location: 'Hyderabad',
    points: [
      'Architected a reusable npm package for React/TypeScript micro-frontend applications, reducing cross-team integration time by 40%.',
      'Enabled scalable multilingual support across 5+ frontend modules.',
      'Developed reusable UI components with responsive design, accessibility, and design-system patterns.',
      'Used GitHub Copilot and Cursor for development and refactoring, validating code through automated testing and reviews.',
      'Coordinated development, testing, and deployments across Agile sprint cycles.',
    ],
  },
  {
    company: 'Verizon',
    role: 'Software Engineer I',
    period: 'Apr 2022 — Dec 2025',
    location: 'Hyderabad',
    points: [
      'Led frontend architecture, technical documentation, code reviews, and developer mentoring.',
      'Engineered React/Redux platform enhancements that generated over $540,000 in annualized cost savings.',
      'Developed REST APIs using Core Java and Spring Boot and built Node.js/Express microservices.',
      'Optimized large-scale React.js/Next.js applications using code splitting and lazy loading, improving frontend performance and Core Web Vitals by 38%.',
      'Collaborated with cross-functional teams to troubleshoot production issues and deliver long-term solutions.',
    ],
  },
  {
    company: 'Astra Microwave',
    role: 'Software Engineer',
    period: 'Feb 2021 — Nov 2021',
    location: 'Hyderabad',
    points: [
      'Developed responsive and modular login systems using Vue.js, React.js, and modern CSS.',
      'Created reusable UI components and design patterns, improving developer productivity by 36%.',
      'Implemented automated testing using Jest, React Testing Library, Cypress, and Selenium.',
      'Reduced production regressions by 25% through improved QA strategies.',
      'Collaborated with UX/UI designers to deliver pixel-perfect responsive interfaces.',
    ],
  },
]

export const techStack: { group: string; items: string[] }[] = [
  {
    group: 'Frontend Development',
    items: [
      'React.js',
      'Next.js',
      'Vue.js 3',
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3 / SCSS',
      'Redux',
    ],
  },
  {
    group: 'Backend Development',
    items: ['Node.js', 'Express.js', 'Core Java', 'Spring Boot', 'REST APIs', 'GraphQL'],
  },
  {
    group: 'Architecture',
    items: [
      'Micro-Frontend Architecture',
      'Module Federation',
      'Reusable Component Libraries',
      'Design Systems',
      'Microservices',
      'BFF Architecture',
    ],
  },
  {
    group: 'Testing',
    items: ['Jest', 'React Testing Library', 'Cypress', 'Selenium', 'Playwright'],
  },
  {
    group: 'Tools & DevOps',
    items: [
      'Git',
      'GitHub',
      'Webpack',
      'Vite',
      'Babel',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Storybook',
      'Figma',
      'SonarQube',
    ],
  },
  {
    group: 'Database & Infrastructure',
    items: ['PostgreSQL', 'SQL Server', 'NoSQL', 'Kafka', 'Elasticsearch / OpenSearch'],
  },
  {
    group: 'Performance & Monitoring',
    items: [
      'Core Web Vitals',
      'Lighthouse',
      'Chrome DevTools',
      'Datadog RUM (familiarity)',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'Reusable Micro-Frontend Localization Package',
    category: 'Open Source · Developer Tooling',
    description:
      'A reusable npm package designed to provide scalable multilingual support across React/TypeScript micro-frontend applications.',
    highlights: [
      'Architected a reusable localization npm package.',
      'Enabled multilingual support across 5+ frontend modules.',
      'Reduced cross-team integration time by 40%.',
    ],
    tags: ['React', 'TypeScript', 'Micro-Frontends', 'npm', 'JavaScript'],
    github: null,
    live: null,
    image: null,
  },
  {
    title: 'Enterprise React Platform Optimization',
    category: 'Performance Engineering',
    description:
      'Improved the performance and scalability of a large-scale enterprise React/Next.js application.',
    highlights: [
      'Implemented code splitting and lazy loading.',
      'Optimized frontend rendering and application loading.',
      'Improved frontend performance and Core Web Vitals by 38%.',
    ],
    tags: ['React', 'Next.js', 'Redux', 'Webpack', 'Babel', 'JavaScript'],
    github: null,
    live: null,
    image: null,
  },
  {
    title: 'Backend Microservices & API Integration',
    category: 'Backend · Developer Tooling',
    description:
      'Developed backend services and internal tooling to support frontend applications and API integration.',
    highlights: [
      'Built Node.js/Express microservices for internal tooling.',
      'Developed mock data servers and API prototyping solutions.',
      'Automated build, deployment, and data validation workflows.',
    ],
    tags: ['Node.js', 'Express.js', 'REST APIs', 'Core Java', 'Spring Boot'],
    github: null,
    live: null,
    image: null,
  },
  {
    title: 'Responsive Authentication & Login System',
    category: 'UI Engineering · Testing',
    description:
      'Developed a modular and responsive login system with reusable UI components and cross-browser compatibility.',
    highlights: [
      'Built reusable and responsive login components.',
      'Improved developer productivity by 36%.',
      'Reduced production regressions by 25% through automated testing.',
    ],
    tags: ['Vue.js', 'React.js', 'TypeScript', 'Jest', 'Cypress', 'Selenium'],
    github: null,
    live: null,
    image: null,
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

/** Create a free form at https://formspree.io and paste its ID here (e.g. "xyzabcd"). */
export const formspreeId = import.meta.env.VITE_FORMSPREE_ID ?? 'YOUR_FORMSPREE_ID'
