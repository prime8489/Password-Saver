export type Category = 'password' | 'api' | 'code' | 'note';

export interface VaultItem {
  id: string;
  title: string;
  value: string;
  category: Category;
  service: string;
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
  note?: string;
}

export interface ServiceLogo {
  name: string;
  url: string;
}

// Common services with their logos
export const serviceLogos: Record<string, string> = {
  instagram: '/logos/instagram.svg',
  facebook: '/logos/facebook.svg',
  github: '/logos/github.svg',
  vercel: '/logos/vercel.svg',
  twitter: '/logos/twitter.svg',
  linkedin: '/logos/linkedin.svg',
  google: '/logos/google.svg',
  amazon: '/logos/amazon.svg',
  netflix: '/logos/netflix.svg',
  spotify: '/logos/spotify.svg',
  apple: '/logos/apple.svg',
  microsoft: '/logos/microsoft.svg',
  discord: '/logos/discord.svg',
  slack: '/logos/slack.svg',
  dropbox: '/logos/dropbox.svg',
  notion: '/logos/notion.svg',
  figma: '/logos/figma.svg',
  gitlab: '/logos/gitlab.svg',
  bitbucket: '/logos/bitbucket.svg',
  aws: '/logos/aws.svg',
  azure: '/logos/azure.svg',
  heroku: '/logos/heroku.svg',
  digitalocean: '/logos/digitalocean.svg',
  firebase: '/logos/firebase.svg',
  mongodb: '/logos/mongodb.svg',
  postgres: '/logos/postgres.svg',
  mysql: '/logos/mysql.svg',
  // Add more services as needed
};
