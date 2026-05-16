import { UIMessage } from "ai";
import { JobPosition, Level, Status, Role } from "./types";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_date: Date;
  unique_id: string;
  role: Role;
  job_position: JobPosition;
  level: Level;
  journey_id: string;
};

export type File = {
  id: number;
  name: string;
  content: Uint8Array;
  folder_id?: string;
  created_date: Date;
  unique_id: string;
  type: string;
};

export type Folder = {
  id: number;
  name: string;
  color_hex: string;
  parent_id?: string;
  created_date: Date;
  unique_id: string;
  has_children: boolean;
};

export type Message = {
  id?: number;
  role: string;
  message: string;
};

export type Task = {
  unique_id: string;
  name: string;
  description: string;
  deadline: Date;
  created_date: Date;
};

export type TaskAssignment = {
  task_id: string;
  status: Status;
};

export type Journey = {
  unique_id: string;
  name: string;
  created_date: Date;
  job_position: JobPosition;
  level: Level;
  color_hex: string;
  start_date: Date;
};

export type Chat = {
  id: number;
  name: string;
  created_date: Date;
  unique_id: string;
  messages: UIMessage[];
};
