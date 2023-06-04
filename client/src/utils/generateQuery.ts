import { mapObjectToArrays } from './mapObjectToArrays';

export const generateQuery = (args?: object): string => {
  if (!args) return '';
  if (!Object.keys(args).length) return '';
  let query = '?';

  const argsArray = mapObjectToArrays(args);

  argsArray.forEach(([key, value], index) => {
    if (!value) return;
    if (index) query += '&';
    query += `${key}=${value}`;
  });
  return query;
};
