"use server";

// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";
// import { signOut } from "@/auth";

import {
  createFolder,
  createStandardUser,
  addMessage,
  deleteChat,
  createChat,
  addFileToStorage,
  createJourney,
} from "./data";
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

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }

// export async function logOutAction() {
//   await signOut({ redirectTo: "/login" });
// }

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
    formData.password,
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
