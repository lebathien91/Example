class Site {
  // [GET] / Home Page
  index(req, res) {
    res.json({ success: true, message: "Home" });
  }

  // [GET] About Page
  about(req, res) {
    res.json({ success: true, message: "About" });
  }

  // [GET] Contact Page
  contact(req, res) {
    res.json({ success: true, message: "Contact" });
  }
}

module.exports = new Site();
