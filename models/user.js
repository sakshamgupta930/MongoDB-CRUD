import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: String,
    number: Number,
});

const user = mongoose.model("user", userSchema);

export default user;