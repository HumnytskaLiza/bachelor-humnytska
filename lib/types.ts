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
