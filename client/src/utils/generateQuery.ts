export const generateQuery = (args?: object): string => {
  if (!args) return '';
  if (!Object.keys(args).length) return '';
  let query = '?';
  Object.entries(args).forEach(([key, value], index) => {
    if (index) query += '&';
    query += `${key}=${value}`;
  });
  return query;
};
