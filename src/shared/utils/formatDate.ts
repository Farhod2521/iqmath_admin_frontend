import moment from "moment";

export const formatDate = (d: string) => {
  const utcString = d.replace(/\+.*$/, "") + "Z"; // "2026-05-13T17:06:16.862227Z"
  const m = moment.utc(utcString);

  return {
    day: m.format("DD"),
    month: m.format("MM"),
    year: m.format("YYYY"),
    hours: m.format("HH"),
    minutes: m.format("mm"),
  };
};
