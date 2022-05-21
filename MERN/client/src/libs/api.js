export async function fetchAPI(url, options = {}) {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU1N2MwMTBlMWI0MjViYWVjYmEwYjAiLCJpYXQiOjE2NDk3NzA0NzB9.LDyGd-89elVhNDOXcBuzbH13J9KliiHOtrDp9gkq_34",
    },
    ...options,
  };
  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}
