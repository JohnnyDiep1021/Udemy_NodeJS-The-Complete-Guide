const User = require("../models/user");
exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get("Cookie").split(";")[1].trim().split("=")[1] === "true";
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};
exports.postLogin = (req, res, next) => {
  // Max-AgeL how long the cookie should exist
  // res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10; HttpOnly");
  User.findById("634f81c1c0eed83a5026a313")
    .then((user) => {
      req.session.isLoggedIn = true;
      // just store the user data without the methods of mongoose model
      req.session.user = user;
      // guarantee session was created before redirect
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  // destroy the session
  req.session.destroy((err) => {
    console.log(err);
    // this func will be called when the session get destroyed
    res.redirect("/");
  });
};
