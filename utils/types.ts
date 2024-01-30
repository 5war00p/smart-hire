export interface Message {
  role: "system" | "user";
  content: string;
  result?: Record<string, any>;
}

export type Chat = Message[];
