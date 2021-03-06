/*
 * Function used to workaround https://github.com/microsoft/TypeScript/issues/16069
 * es2019 alternative `const filteredArr = myArr.flatMap((x) => x ? x : []);`
 */
export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}

export const filterNaN = (input: number): number => (isNaN(input) ? 0 : input);

/*
export function isValidDate(d) {
  return d instanceof Date && !isNaN(d.getTime());
}
*/

export function isValidDate<T>(t: T | undefined | null | void): t is T {
  return t instanceof Date && !isNaN(t.getTime());
}
