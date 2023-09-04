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

export const PRIORITIES = ["急", "高", "中", "低", null];

export const MONTHS = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

export const DAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export const PROJECT_AUTOMATION_MONTHS = [
  { label: "1 个月", value: 1 },
  { label: "3 个月", value: 3 },
  { label: "6 个月", value: 6 },
  { label: "9 个月", value: 9 },
  { label: "12 个月", value: 12 },
];
