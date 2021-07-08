const users = [];
//require bcryptjs
const bcrypt = require("bcryptjs");

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    // console.log(req.body);
    const { username, password } = req.body;

    for (let i = 0; i < users.length; i++) {
      let match = bcrypt.compareSync(password, users[i].password);
      if (users[i].username === username && match) {
        const loginUser = { ...users[i] };
        delete loginUser.password;
        res.status(200).send(loginUser);
        return;
      }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const passHash = bcrypt.hashSync(password, salt);
    // console.log(passHash);

    //create updated object holding
    updateUser = {
      username,
      email,
      firstName,
      lastName,
      password: passHash,
    };

    users.push(updateUser);
    //delete the password hashed from being sent to front end

    const secureUser = { ...updateUser };
    delete secureUser.password;
    // console.log(secureUser);
    res.status(200).send(secureUser);
  },
};
