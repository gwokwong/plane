export const snoozeOptions = [
  {
    label: "1天",
    value: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  },
  {
    label: "3天",
    value: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    label: "5天",
    value: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    label: "1周",
    value: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    label: "2周",
    value: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    label: "自定义",
    value: null,
  },
];
