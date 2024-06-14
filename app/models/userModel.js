const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true,'first name is required'],
            maxlength: 32,
        },
        lastname: {
            type: String,
            required: [true, 'last name is required'],
            maxlength: 32,
        },
        email: {
            type: String,
            required: [true, 'e-mail is required'],
            unique: true,
            match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'please enter valid e-mail'], // Regular expression for basic email validation
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minlength: [6, 'password must have at least six (6) characters']
        },
        // role: {
        //     type:Number,
        //     default:0
        // }
        role: {
            type: String,
            enum: ["jobseeker", "employer"],
            default: "jobseeker", // Default role is 'jobseeker'
        },
        userId: {
            type: String,
            required: true,
            unique: true, // Ensures userId is unique
        },  
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
