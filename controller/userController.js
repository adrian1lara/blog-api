const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../model/user");


// handle get users
exports.get_users = async (req, res, next) => {

  try {
    const users = await User.find();

    if (!users) {
      res.status(400).send("No user found")
    }

    res.status(200).send(users)

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message })
  }

}


// create user post
exports.create_user_post = async (req, res, next) => {
  try {

    // get user inputs
    const { username, email, password } = req.body;

    // validate user input
    if (!(email && password && username)) {
      res.status(400).send("all input is required")
    }

    // validate if user exist in our database
    const oldUser = await User.findOne({ email });


    if (oldUser) {
      return res.status(409).send("User Already exist. Please login")
    }

    // Encrypt user in our database
    hashedPassword = await bcrypt.hash(password, 10);

    // create user in our database
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // create a token 
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);

  } catch (error) {
    console.log(error);
  }

}


exports.login_user_post = async (req, res, next) => {
  try {
    // get user input 
    const { email, password } = req.body;

    //validate user input 
    if (!(email && password)) {
      res.status(400).send("All inputs is required");
    }
    // vaidate if user exist in our database 
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token 
      user.token = token;

      //user 
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");

  } catch (error) {
    console.log(error)
  }
}
