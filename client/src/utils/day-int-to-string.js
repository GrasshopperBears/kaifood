import days from "./days-array";

const dayIntToString = (arr) => {
  return arr
    .reduce((acc, el) => {
      acc.push(days.find((option) => option.value === el).label);
      return acc;
    }, [])
    .join(", ");
};

export default dayIntToString;
