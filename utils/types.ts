export interface Message {
  role: "assistant" | "user";
  content: string;
}

export interface UserData {
  userId: string;
  degree: string;
  major: string;
  school: string;
  startDate: string;
  endDate: string;
  grade: string;
  name: string;
  location: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  description: string;
  locationCity: string;
  locationCountry: string;
  ocrGithubUsername: string;
  preferredRole: string;
  fullTimeStatus: "yes" | "no" | "both";
  workAvailability: string;
  fullTimeSalary: string;
  partTimeSalary: string;
  fullTime: number;
  fullTimeAvailability: number | null;
  partTime: number;
  partTimeAvailability: number | null;
  skills: string[];
}

export type Chat = Message[];
