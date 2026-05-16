export const JobPositions = [
  "Developer",
  "Designer",
  "HR",
  "QA",
  "Project Manager",
] as const;

export type JobPosition = (typeof JobPositions)[number];

export const Levels = ["Trainee", "Junior", "Middle", "Senior"] as const;

export type Level = (typeof Levels)[number];

export const Statuses = [
  "Not Started",
  "In Progress",
  "Done",
  "Blocked",
  "Skipped",
] as const;

export type Status = (typeof Statuses)[number];

export const Roles = ["admin", "standard"] as const;

export type Role = (typeof Roles)[number];
