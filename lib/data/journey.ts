import "server-only";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "../utils";
import { JobPosition, Level } from "../types";

export async function fetchJourneys() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("journeys")
    .select("*")
    .order("created_date", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch journeys.", error);
  }

  return data;
}

export async function fetchJourneyById(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("journeys")
    .select("*")
    .eq("unique_id", unique_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch journey by id.");
  }

  return data;
}

export async function fetchJourneyTasks(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("journey_id", unique_id);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch journey tasks.");
  }

  return data;
}

export async function fetchJourneyUsers(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("journey_id", unique_id);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch users assigned to the journey.");
  }

  return data;
}

export async function createJourney(
  unique_id: string,
  name: string,
  job_position: JobPosition,
  level: Level,
  color_hex: string,
  start_date: Date,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("journeys")
    .insert([{ unique_id, name, job_position, level, color_hex, start_date }]);

  if (error) {
    console.error(error);
    throw new Error(`Failed to create journey: ${error.message}`);
  }
}

export async function createTask(
  unique_id: string,
  name: string,
  description: string,
  deadline: Date,
  journey_id: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .insert([{ unique_id, name, description, deadline, journey_id }]);

  if (error) {
    console.error(error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
}

export async function fetchUsersWithoutJourney() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .is("journey_id", null);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch users.");
  }

  return data;
}

export async function updateUser(user_id: string, journey_id: string) {
  const supabase = await createClient();

  const users = await supabase
    .from("users")
    .update({
      journey_id,
    })
    .eq("unique_id", user_id)
    .select()
    .single();

  const tasks = await supabase
    .from("tasks")
    .select("*")
    .eq("journey_id", journey_id);

  if (tasks.data) {
    const assignments = tasks.data.map((task) => ({
      user_id,
      task_id: task.unique_id,
      unique_id: nanoid(16),
      journey_id,
    }));

    const { error } = await supabase
      .from("task-assignments")
      .insert(assignments);

    if (error) {
      console.error(error);
      throw new Error(`Failed to create task assignments: ${error.message}`);
    }
  }

  if (users.error) {
    console.error(users.error);
    throw new Error(`Failed to update user: ${users.error.message}`);
  }

  if (tasks.error) {
    console.error(tasks.error);
    throw new Error(`Failed to fetch tasks: ${tasks.error.message}`);
  }
}

export async function fetchUserAssignments(unique_id: string) {
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("unique_id", unique_id)
    .single();

  if (userError) {
    throw new Error(`Failed to fetch user: ${userError.message}`);
  }

  if (!user?.journey_id) {
    return null;
  }

  const { data: journey, error: journeyError } = await supabase
    .from("journeys")
    .select("*")
    .eq("unique_id", user.journey_id)
    .single();

  if (journeyError) {
    throw new Error(`Failed to fetch journey: ${journeyError.message}`);
  }

  const { data: assignments, error: assignmentsError } = await supabase
    .from("task-assignments")
    .select("*")
    .eq("user_id", unique_id);

  if (assignmentsError) {
    throw new Error(
      `Failed to fetch task assignments: ${assignmentsError.message}`,
    );
  }

  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select("*")
    .eq("journey_id", user.journey_id);

  if (tasksError) {
    throw new Error(`Failed to fetch tasks: ${tasksError.message}`);
  }

  const mergedTasks = tasks.map((task) => {
    const assignment = assignments.find((a) => a.task_id === task.unique_id);

    return {
      ...task,
      status: assignment.status,
    };
  });

  const data = {
    journey,
    mergedTasks,
  };

  return data;
}

export async function updateTask(
  unique_id: string,
  name: string,
  description: string,
  deadline: Date,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({
      name,
      description,
      deadline,
    })
    .eq("unique_id", unique_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

export async function updateTaskStatus(
  task_id: string,
  status: "Not Started" | "In Progress" | "Done" | "Blocked" | "Skipped",
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("task-assignments")
    .update({ status })
    .eq("task_id", task_id);

  if (error) {
    console.error(error);
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

export async function removeUser(user_id: string, journey_id: string) {
  const supabase = await createClient();

  const { error: userError } = await supabase
    .from("users")
    .update({
      journey_id: null,
    })
    .eq("unique_id", user_id);

  if (userError) {
    console.error(userError);
    throw new Error(`Failed to update user: ${userError.message}`);
  }

  const { error: taskError } = await supabase
    .from("task-assignments")
    .delete()
    .eq("user_id", user_id)
    .eq("journey_id", journey_id);

  if (taskError) {
    console.error(taskError);
    throw new Error(`Failed to delete assignments: ${taskError.message}`);
  }
}
