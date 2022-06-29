const baseUrl = process.evn.BASE_URL;

const getData = async (path, token) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};
