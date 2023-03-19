export const parseString = (str: string): string[] => {
  return str
    .replace(/[\-_]/g, " ")
    .replace(/(\S)([A-Z])/g, "$1 $2")
    .split(" ");
};

export const strToCamelCase = (str: string): string => {
  return parseString(str)
    .map((eachStr, index) => {
      const lowerCase = eachStr.toLowerCase();

      if (index === 0) {
        return lowerCase;
      }

      return lowerCase[0].toUpperCase() + lowerCase.slice(1);
    })
    .join("");
};

export const strToPascalCase = (str: string): string => {
  return parseString(str)
    .map((eachStr, index) => {
      const lowerCase = eachStr.toLowerCase();
      return lowerCase[0].toUpperCase() + lowerCase.slice(1);
    })
    .join("");
};
