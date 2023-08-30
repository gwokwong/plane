export const NETWORK_CHOICES: { key: 0 | 2; label: string; icon: string }[] = [
  {
    key: 0,
    label: "私密",
    icon: "lock",
  },
  {
    key: 2,
    label: "公开",
    icon: "public",
  },
];

export const GROUP_CHOICES = {
  backlog: "Backlog",
  unstarted: "Unstarted",
  started: "Started",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const PRIORITIES = ["urgent", "high", "medium", "low", null];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const PROJECT_AUTOMATION_MONTHS = [
  { label: "1 个月", value: 1 },
  { label: "3 个月", value: 3 },
  { label: "6 个月", value: 6 },
  { label: "9 个月", value: 9 },
  { label: "12 个月", value: 12 },
];
