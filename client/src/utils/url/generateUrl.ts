import { Param } from './Param';

export const generateUrl = (baseUrl: string, params: Param[]) => {
  let query = params.length ? '?' : '';
  params.forEach((param, index) => {
    if (index) query += '&';
    query += `${param.name}=${param.value}`;
  });
  const url = baseUrl + query;
  return url;
};
