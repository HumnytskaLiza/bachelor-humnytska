import { UIMessage } from "ai";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  created_date: Date;
  unique_id: string;
  role: "admin" | "standard";
  job_position: "Developer" | "Designer" | "HR" | "QA" | "Project Manager";
  level: "Trainee" | "Junior" | "Middle" | "Senior";
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

export type Journey = {
  unique_id: string;
  name: string;
  created_date: Date;
  job_position: "Developer" | "Designer" | "HR" | "QA" | "Project Manager";
  level: "Trainee" | "Junior" | "Middle" | "Senior";
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

export type ChatProps = {
  unique_id: string;
  data: UIMessage[];
};

export type InputsDataUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_position: "Developer" | "Designer" | "HR" | "QA" | "Project Manager";
  level: "Trainee" | "Junior" | "Middle" | "Senior";
};

export type InputsDataChat = {
  name: string;
};

export type CreateUserPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type CreateChatPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type DeleteChatPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  uniqueId: string;
  name: string;
};

export type EmployeesTableProps = {
  users: User[];
};

export type JourneyTableProps = {
  journeys: Journey[];
};

export type ChatHistoryProps = {
  chats: Chat[];
};

export type UniqueIdProps = { params: Promise<{ unique_id: string }> };

export type KnowledgeDataProps = {
  params: {
    unique_id?: string;
  };
};

export type UtilityBarProps = {
  unique_id?: string;
};

export type FolderResponse = {
  current: Folder | null;
  folders: Folder[];
  files: File[];
};

export type EmployeeProfileProps = {
  user: User;
};

export type CardProps = {
  header: string;
  content: string;
};

export type CreatePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  unique_id?: string;
};

export type CreateJourneyPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type FileElementProps = {
  name: string;
  createdDate: Date;
  uniqueId: string;
};

export type FolderElementProps = {
  name: string;
  createdDate: Date;
  uniqueId: string;
  color_hex: string;
  isEmpty: boolean;
};

export type ButtonProps = {
  text?: string;
  type: "main" | "secondary" | "delete";
  buttonType: "button" | "submit";
  disabled?: boolean;
  svg?: string;
  url?: string;
  onClick?: () => void;
};

export type HeaderProps = {
  name: string;
  type: "header" | "subheader";
};

export type InputProps = {
  name: string;
  required: boolean;
  placeholder?: string;
  type?: "hidden" | "email" | "file" | "date";
  style?: "round" | "square";
  options?: string[];
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onKeyDown?: (e: { key: string }) => void;
};

export type MessageProps = {
  role: string;
  content: string;
  agentRole?: string;
};

export type NoDataComponentProps = {
  firstLine: string;
  secondLine?: string;
};
