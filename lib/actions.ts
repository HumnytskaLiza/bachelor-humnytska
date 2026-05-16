"use server";

import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

import { addMessage, deleteChat, createChat } from "./data/chat";
import { createStandardUser, getUserRole } from "./data/user";
import { createFolder, addFileToStorage } from "./data/knowledge";

import {
  createJourney,
  createTask,
  updateUser,
  updateTask,
  updateTaskStatus,
  removeUser,
} from "./data/journey";

import { nanoid } from "nanoid";
import { Level, JobPosition } from "./types";

type InputsDataFolder = {
  name: string;
  color_hex: string;
  parent_id: string | null;
};

type InputsDataFile = {
  content: File | null;
  name: string;
  folder_id: string | null;
};

type InputsDataUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_position: JobPosition;
  level: Level;
};

type InputsDataJourney = {
  name: string;
  start_date: Date;
  job_position: JobPosition;
  level: Level;
  color_hex: string;
};

type InputsDataMessage = {
  message: string;
  role: string;
  chatId: string;
};

type InputsDataChat = {
  name: string;
};

type InputsDataTask = {
  name: string;
  description: string;
  deadline: Date;
  journey_id: string;
};

type InputsDataAssignUser = {
  user_id: string;
  journey_id: string;
};

type InputsDataAssignTask = {
  unique_id: string;
  name: string;
  description: string;
  deadline: Date;
};

type InputsDataChangeTaskStatus = {
  task_id: string;
  status: "Not Started" | "In Progress" | "Done" | "Blocked" | "Skipped";
};

export async function createFolderAction(formData: InputsDataFolder) {
  const unique_id = nanoid(16);

  await createFolder(
    unique_id,
    formData.name,
    formData.color_hex,
    formData.parent_id,
  );
}

export async function createStandardUserAction(formData: InputsDataUser) {
  const unique_id = nanoid(16);

  await createStandardUser(
    unique_id,
    formData.first_name,
    formData.last_name,
    formData.email,
    formData.job_position,
    formData.level,
  );
}

export async function createJourneyAction(formData: InputsDataJourney) {
  const unique_id = nanoid(16);

  await createJourney(
    unique_id,
    formData.name,
    formData.job_position,
    formData.level,
    formData.color_hex,
    formData.start_date,
  );
}

export async function addMessageAction(messageData: InputsDataMessage) {
  const id = nanoid(16);

  const res = await addMessage(
    id,
    messageData.message,
    messageData.role,
    messageData.chatId,
  );

  return res;
}

export async function deleteChatAction(unique_id: string) {
  await deleteChat(unique_id);
}

export async function createChatAction(formData: InputsDataChat) {
  const unique_id = nanoid(16);

  await createChat(unique_id, formData.name);

  return unique_id;
}

export async function addFileToStorageAction(formData: InputsDataFile) {
  const unique_id = nanoid(16);

  if (formData.content === null) return;

  await addFileToStorage(
    formData.name,
    formData.content,
    unique_id,
    formData.folder_id,
  );
}

export async function createTaskAction(formData: InputsDataTask) {
  const unique_id = nanoid(16);

  await createTask(
    unique_id,
    formData.name,
    formData.description,
    formData.deadline,
    formData.journey_id,
  );
}

export async function updateUserAction(formData: InputsDataAssignUser) {
  await updateUser(formData.user_id, formData.journey_id);
}

export async function removeUserAction(user_id: string, journey_id: string) {
  await removeUser(user_id, journey_id);
}

export async function updateTaskAction(formData: InputsDataAssignTask) {
  await updateTask(
    formData.unique_id,
    formData.name,
    formData.description,
    formData.deadline,
  );
}

export async function updateTaskStatusAction(
  formData: InputsDataChangeTaskStatus,
) {
  await updateTaskStatus(formData.task_id, formData.status);
}

export async function checkAuth() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
}

export async function logOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(`Failed to log out: ${error.message}`);
  }

  redirect("/login");
}

export async function getUserRoleAction() {
  return await getUserRole();
}
