import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Stream {
  name: string;
  description: string;
  color: string;
  fontColor: string;
  tags: string[];
  date: Timestamp;
  streamDate: string;
}

export interface UIStream  extends Stream {
  key: string;
}
