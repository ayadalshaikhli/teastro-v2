// User Schema to be used when ready
const { Schema, model } = require("mongoose");
// const watchlist = require("./List");
// const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    }

}

);

const UserModel = model("User", userSchema);

module.exports = UserModel;


