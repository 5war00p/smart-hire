export interface Message {
  role: "assistant" | "user";
  content: string;
  candidates?: string;
}

export interface Education {
  degree: string;
  startDate: string;
  endDate: string;
  grade: string;
  school: string;
  major: string;
}

export interface WorkExperience {
  company: string;
  location: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface UserData {
  userId: string;
  name: string;
  location: string;
  email: string;
  phone: string;
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
  educations: Education[];
  workExperiences: WorkExperience[];
}

export type Chat = Message[];
