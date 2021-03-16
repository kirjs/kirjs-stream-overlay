import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

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
  date: Timestamp;
  streamDate: string;
  highlights: string;
  promoText: string;
  secondaryTitle: string;
}

export interface UIStream extends Stream {
  key: string;
  isCurrent: boolean;
}
