class Tech {
  name: string;
  abbreviation: string;
  link?: string;
  color?: string;

  constructor({
    name,
    abbreviation,
    link,
    color,
  }: {
    name: string;
    abbreviation: string;
    link?: string;
    color?: string;
  }) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.link = link;
    this.color = color;
  }
}

export class Tag extends Tech {}

export class Language extends Tech {}

export class Framework extends Tech {}

export class Database extends Tech {}

export class Platform extends Tech {}

export const primaryTags = {
  creator: new Tag({
    name: 'Creator',
    abbreviation: 'Creator',
    color: '#61be1d',
  }),
  contributor: new Tag({
    name: 'Contributor',
    abbreviation: 'Contributor',
    color: '#ff854b',
  }),
  founder: new Tag({
    name: 'Founder',
    abbreviation: 'Founder',
    color: '#ff4b4b',
  }),
};

export const secondaryTags = {
  openSource: new Tag({
    name: 'Open Source',
    abbreviation: 'Open Source',
    color: '#ff4b4b',
  }),
  maintainer: new Tag({
    name: 'Maintainer',
    abbreviation: 'Maintainer',
    color: '#ff4b4b',
  }),
};

export const languages = {
  javascript: new Language({
    name: 'JavaScript',
    abbreviation: 'JS',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    color: '#f1e05a',
  }),
  typescript: new Language({
    name: 'TypeScript',
    abbreviation: 'TS',
    link: 'https://www.typescriptlang.org/',
    color: '#007acc',
  }),
  python: new Language({
    name: 'Python',
    abbreviation: 'PY',
    link: 'https://www.python.org/',
    color: '#3572A5',
  }),
  java: new Language({
    name: 'Java',
    abbreviation: 'Java',
    link: 'https://www.java.com/en/',
    color: '#b07219',
  }),
  html: new Language({
    name: 'HTML',
    abbreviation: 'HTML',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    color: '#e34c26',
  }),
  css: new Language({
    name: 'CSS',
    abbreviation: 'CSS',
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    color: '#563d7c',
  }),
  scss: new Language({
    name: 'SCSS',
    abbreviation: 'SCSS',
    link: 'https://sass-lang.com/',
    color: '#c6538c',
  }),
};

export const frameworks = {
  react: new Framework({
    name: 'React',
    abbreviation: 'React',
    link: 'https://reactjs.org/',
    color: '#61dafb',
  }),
  vue: new Framework({
    name: 'Vue',
    abbreviation: 'Vue',
    link: 'https://vuejs.org/',
    color: '#2c3e50',
  }),
  nextJs: new Framework({
    name: 'NextJS',
    abbreviation: 'Next',
    link: 'https://nextjs.org/',
    color: '#ffffff',
  }),
};

export const databases = {
  supabase: new Database({
    name: 'Supabase',
    abbreviation: 'Supabase',
    link: 'https://supabase.io/',
    color: '#40bf86',
  }),
  postgresql: new Database({
    name: 'PostgreSQL',
    abbreviation: 'PostgreSQL',
    link: 'https://www.postgresql.org/',
    color: '#336791',
  }),
};

export const platforms = {
  nodeJs: new Platform({
    name: 'NodeJS',
    abbreviation: 'Node',
    link: 'https://nodejs.org/en/',
    color: '#339933',
  }),
  docker: new Platform({
    name: 'Docker',
    abbreviation: 'Docker',
    link: 'https://www.docker.com/',
    color: '#2496ed',
  }),
  cloudflareWorkers: new Platform({
    name: 'Cloudflare Workers',
    abbreviation: 'CF Workers',
    link: 'https://developers.cloudflare.com/workers/',
    color: '#f38020',
  }),
  lambda: new Platform({
    name: 'AWS Lambda',
    abbreviation: 'Lambda',
    link: 'https://aws.amazon.com/lambda/',
    color: '#ff9900',
  }),
  minecraft: new Platform({
    name: 'Minecraft',
    abbreviation: 'MC',
    link: 'https://www.minecraft.net/en-us/',
    color: '#a0a0a0',
  }),
};
