const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await new Promise((resolve, reject) => {
    bcrypt.genSalt(12, function (err, salt) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};


const comaparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

module.exports = {
  hashPassword,
  comaparePassword,
};















// const jwt = require("jsonwebtoken");
// const { AuthenticationError } = require("apollo-server-express");

// const secret = "mysecretssshhhhhhh";
// const expiration = "2h";
// module.exports = {
//   authMiddleware: function ({ req }) {
//     let token = req.body.token || req.query.token || req.header;
//     if (req.header.authorization) {
//       token = token.split(" ").pop().trim();
//     }
//     if (!token) {
//       return req;
//     }
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       throw new AuthenticationError("Incorrect Token");
//     }
//   },
//   signToken: function ({ firstName, email, _id }) {
//     const payload = { firstName, email, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };