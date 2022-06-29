const User = (req, res) => {
  switch (req.method) {
    case "POST":
      console.log(req.method);
      res.json({ success: true });
      break;

    default:
      break;
  }
};

export default User;
