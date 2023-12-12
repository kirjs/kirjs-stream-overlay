export interface ChatMessage {
  id: string;
  text: string;
  displayName: string;
  profileUrl?: string;
  color?: string;
  timestamp: Date;
  username?: string;
}
