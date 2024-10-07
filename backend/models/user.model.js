import mongoose from "mongoose";
import Ajv from "ajv";

const ajv = new Ajv();

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        pattern: "^[a-zA-Z]+$",
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    contact:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

export default mongoose.model("User", userSchema);