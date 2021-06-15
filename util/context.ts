export function convertQueryValue(queryValue: string | string[] | undefined) {
  if (Array.isArray(queryValue)) return parseInt(queryValue[0]);
  if (typeof queryValue === 'undefined') return queryValue;
  return parseInt(queryValue);
}

export function convertQueryValueToStringLike(
  queryValue: string | string[] | undefined,
) {
  if (Array.isArray(queryValue)) return queryValue[0];
  return queryValue;
}
