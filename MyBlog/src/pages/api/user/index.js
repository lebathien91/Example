import connectDB from "@/utils/connectDB";

connectDB();

const User = (req, res) => {
  switch (req.method) {
    case "GET":
      res.json({ success: true });
      break;
    default:
      break;
  }
};

export default User;
