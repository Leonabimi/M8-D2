const atob = require("atob");
const userModel = require("../users/schema")

const basicAuthMiddlewere = async (req, res, next) => {
  if (!req.headers.authorization) {
    const error = new Error("auth");
    next(error);
  } else {
   const decoded = atob(req.headers.authorization.split(" ")[1]);
   console.log("decodet" ,decoded)
   const [username, password] = decoded.split(":")
   console.log(username),
   console.log(password)
   next()
  }
};

module.exports = {
    basic: basicAuthMiddlewere,
}