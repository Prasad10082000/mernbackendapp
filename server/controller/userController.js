const Data = require("../Schema/UserSchema");

const userSignup = async (req, res) => {
  try {
    const exist = await Data.findOne({ username: req.body.username });
    if (exist) {
      return res.status(401).json({ message: "username already exist" });
    }
    const user = req.body;
    const newUser = new Data(user);
    await newUser.save();
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.massage });
  }
};

const userLogin = async (req, resp) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    let user = await Data.findOne({ username: username, password: password });
    if (user) {
      return resp.status(200).json({ data: user });
    } else {
      return resp.status(401).json("invalid login");
    }
  } catch (error) {
    resp.status(500).json("Error", error.message);
  }
};

module.exports = {
  userLogin: userLogin,
  userSignup: userSignup,
};
