export const checkImage = (
  file,
  size = 5,
  types = ["image/png", "image/jpeg", "image/webp", "image/gif"]
) => {
  let errMsg;
  if (!file) return (errMsg = "File does not exits");
  if (file.size > 1024 * 1024 * size)
    return (errMsg = `The largest image size is ${size}mb`);

  if (!types.includes(file.type))
    return (errMsg = "The image type is png/jpeg/webp/gif");

  return errMsg;
};

export const imageUpload = async (image) => {
  const formData = new FormData();

  formData.append("file", image);

  formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);

  formData.append("cloud_name", process.env.CLOUD_NAME);

  const res = await fetch(process.env.CLOUD_API, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return {
    width: data.width,
    height: data.height,
    url: data.secure_url,
    size: data.bytes,
    type: data.format,
    name: data.public_id,
  };
};
