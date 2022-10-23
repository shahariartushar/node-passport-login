const express = require("express");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  res.render("login");
};

exports.register = (req, res) => {
  res.render("register");
};

exports.handleRegister = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check Required Fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all the fields" });
  }

  // Check Passwords Match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check Pass Length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  // Check Errors
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation Passes
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User Exits
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // Set Password to Hashed
            newUser.password = hash;

            // Save User
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};