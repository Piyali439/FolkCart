const Admin = require("../db/admindb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async registerAdmin(req, res) {
    try {
      const { username, password } = req.body;

      const existing = await Admin.findOne({ username });
      if (existing) return res.status(400).json({ msg: "Username already exists" });

      const hashed = await bcrypt.hash(password, 10);

      await Admin.create({ username, password: hashed });

      res.json({ msg: "Admin registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const admin = await Admin.findOne({ username });
      if (!admin) return res.status(400).json({ msg: "Invalid username or password" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid username or password" });

      const token = jwt.sign({ id: admin._id }, "SECRET123", { expiresIn: "1d" });

      res.json({ msg: "Login success", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  },
};
