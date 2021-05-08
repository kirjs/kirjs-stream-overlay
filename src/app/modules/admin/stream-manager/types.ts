import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import FieldValue = firebase.firestore.FieldValue;

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
  highlights: string;
  promoText: string;
  youtubeId?: string;
  secondaryTitle: string;
  realDateTime: string;
  lastModified: FieldValue;
}

export interface UIStream extends Stream {
  key: string;
  isCurrent: boolean;
}
