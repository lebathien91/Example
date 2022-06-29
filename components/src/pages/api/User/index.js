const User = (req, res) => {
  switch (req.method) {
    case "POST":
      res.json({ success: true });
      break;

    default:
      break;
  }
};

export default User;
