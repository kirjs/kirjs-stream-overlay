export interface ChatMessage {
  text: string;
  displayName: string;
  profileUrl?: string;
  color?: string;
  timestamp: Date;
}
