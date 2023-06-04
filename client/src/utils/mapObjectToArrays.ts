export const mapObjectToArrays = (object: object) => {
  const result = [];
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const nestedArrays = mapObjectToArrays(value);
      result.push(...nestedArrays);
    } else {
      result.push([key, value]);
    }
  });
  return result;
};
