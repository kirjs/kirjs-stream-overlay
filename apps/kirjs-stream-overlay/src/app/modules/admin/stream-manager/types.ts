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
  clickbait: string;
  date: Date;
  guests: string[];
  highlights: string;
  promoText: string;
  youtubeId?: string;
  lapteuhYoutubeLiveChatId?: string;
  showChat: boolean;
  autoPostToChat: boolean;
  realDateTime: string;
  lastModified: Date;
  talkUrl: string;
  previewPrompt: string;
}

export interface UIStream extends Stream {
  key: string;
  isCurrent: boolean;
}

export interface UserAccount {
  id: string;
  isAdmin: boolean;
}
