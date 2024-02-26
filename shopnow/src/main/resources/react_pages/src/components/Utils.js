export function queryBuild(queryParams) {
  const queryString = Object.keys(queryParams)
    .filter(
      (key) => queryParams[key] !== null && queryParams[key] !== undefined
    ) // Filter out null or undefined parameters
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join("&");

  var apiUrl = "";
  if (queryString !== "") {
    apiUrl += `?${queryString}`;
  }

  return apiUrl;
}
