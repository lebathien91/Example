export async function fetchAPI(url) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}
