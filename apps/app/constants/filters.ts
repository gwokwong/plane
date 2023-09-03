// helper
import { renderDateFormat } from "helpers/date-time.helper";

export const DATE_FILTER_OPTIONS = [
  {
    name: "上周",
    value: [
      `${renderDateFormat(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000))};after`,
      `${renderDateFormat(new Date())};before`,
    ],
  },
  {
    name: "2周后",
    value: [
      `${renderDateFormat(new Date())};after`,
      `${renderDateFormat(new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000))};before`,
    ],
  },
  {
    name: "1个月后",
    value: [
      `${renderDateFormat(new Date())};after`,
      `${renderDateFormat(
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
      )};before`,
    ],
  },
  {
    name: "2个月后",
    value: [
      `${renderDateFormat(new Date())};after`,
      `${renderDateFormat(
        new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate())
      )};before`,
    ],
  },
];
