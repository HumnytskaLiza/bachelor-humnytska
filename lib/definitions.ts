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

export type Chat = {
  id: number;
  name: string;
  created_date: Date;
  unique_id: string;
  messages: Message[];
};

export type ChatProps = {
  unique_id: string;
  data: Message[];
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

export type ChatHistoryProps = {
  chats: Chat[];
};

export type KnowledgePageProps = { params: Promise<{ unique_id: string }> };

export type KnowledgeDataProps = {
  params: {
    unique_id?: string;
  };
};

export type AssistantPageProps = { params: Promise<{ unique_id: string }> };

export type EmployeePageProps = { params: Promise<{ unique_id: string }> };
