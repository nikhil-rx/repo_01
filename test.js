const express = require("express");
const data = require("./data.js")
const app = express();
const port = 3000;
app.use(express.json());
const getdata = require("./data.js");

app.post("/signup", (req, res, next) => {
    console.log("enter");
    console.log(req.body)
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status.json({ message: "user not found", success: false});
  }
});
    
        let founduser = getdata.find((user) => user.password === req.body.password)
        if (founduser){
        return res.status.json({ message: "already exist", success: false});
};

getdata.push(req.body);
return res.status.json({ message: "welcome", success: true});

app.listen(port, () => {
    console.log(`hello ${port}`)
})