const express = require("express");
const app = express();
const port = 2000;
const userdata = require("./data.js");
app.use(express.json());

app.post("/login", (req, res, next) => {
  try {
    //1. to know if the user have sent us email or password or not

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "email or password is not given", success: false });
    }

    //2. if the user with given email exists or not
    let finduser = userdata.find((user) => user.email === req.body.email);
    if (!finduser) {
      return res
        .status(400)
        .json({ message: "user not found with given email", success: false });
    }

    //3. check if the password is correct or not

    if (finduser.password != req.body.password) {
      return res
        .status(400)
        .json({ message: "wrong password try again", success: false });
    }

    //4. ok

    res.status(200).json({ message: "successfully loged in", success: true });
  } catch (error) {
    console.log(error);
  }
});

// localhost/delete/a@.com
app.delete("/delete/:email", (req, res, next) => {
  try {
    console.log(req.params.email);

    //1. you have not send email
    if (!req.params.email) {
      return res
        .status(404)
        .json({ message: "you have not send the email", sucess: false });
    }

    //2. find user exist or not
    let finduser = userdata.findIndex(
      (user) => user.email === req.params.email
    );
    console.log(finduser);
    if (finduser < 0) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }

    //4. delete user
    userdata.splice(finduser, 1);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {}
});

app.use((req, res, next) => {
  return res.status(404).json("sorry cant find that route");
});

app.listen(port, () => {
  console.log(`hello ${port}`);
});
