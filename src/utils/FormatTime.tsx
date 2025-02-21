import moment from "moment-timezone";

export const formatTime = (isoString: string) => {
  return moment.utc(isoString).format("HH:mm");
};
