export type Personaje = {
  tipo: string;
  nombre: string;
};

export type GitHubResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Item[];
};

export type Item = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: Type;
  site_admin: boolean;
  score: number;
};

export enum Type {
  User = 'User',
}
