const baseUrl = process.env.BASE_URL;

export const getData = async (path, token) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

export const postData = async (path, post, token) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const putData = async (path, post, token) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const patchData = async (path, post, token) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (path, token) => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};
