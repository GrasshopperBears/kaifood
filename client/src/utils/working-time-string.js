import moment from "moment";
import dayIntToString from "./day-int-to-string";

const workingTimeString = ({ closeDate, startTime, endTime }) => {
  return `${moment(startTime).format("HH:mm")} ~ ${moment(endTime).format("HH:mm")}${
    closeDate?.length ? ` // ${dayIntToString(closeDate)} 휴무` : ""
  }`;
};

export default workingTimeString;
