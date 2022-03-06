export interface Storage {
  id: number;
  date: number;
  status: "cancelled" | "openned" | "done";
  tag: "green" | "yellow" | "red";
  description: string;
}

export const calendarData: Storage[] = [
  {
    id: 100001,
    date: Date.parse("2022-2-23"),
    status: "openned",
    tag: "red",
    description: "homework create API",
  },
  {
    id: 100002,
    date: Date.parse("2022-2-24"),
    status: "openned",
    tag: "green",
    description: "create tests API",
  },
  {
    id: 100003,
    date: Date.parse("2022-2-25"),
    status: "cancelled",
    tag: "yellow",
    description: "Complete API homework",
  },
];
