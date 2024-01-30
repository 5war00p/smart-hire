export interface Message {
  role: "system" | "user";
  content: string;
}

export type Chat = Message[];
