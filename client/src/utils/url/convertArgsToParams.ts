import { Param } from './Param';

export const convertArgsToParams = (args: any): Param[] =>
  Object.entries(args).map(arg => ({ name: arg[0], value: String(arg[1]) }));
