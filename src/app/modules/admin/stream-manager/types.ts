export interface StreamConfig {
  streamId?: string;
}

export interface Stream {
  name: string;
  description: string;
  color: string;
  language: 'en' | 'ru';
  fontColor: string;
  tags: string[];
  date: Date;
  highlights: string;
  promoText: string;
  youtubeId?: string;
  lapteuhYoutubeLiveChatId?: string;
  showChat: boolean;
  realDateTime: string;
  lastModified: Date;
  talkUrl: string;
}

export interface UIStream extends Stream {
  key: string;
  isCurrent: boolean;
}

export interface UserAccount {
  id: string;
}
