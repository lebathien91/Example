import connectDB from "@/utils/connectDB";

connectDB();

const Auth = (req, res) => {
  switch (req.method) {
    case "POST":
      res.json({ success: true });
      break;
    default:
      break;
  }
};

export default Auth;
