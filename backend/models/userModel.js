import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    role: {
        type: String,
        required: true,
    },
}, { timeStamps: true })

export const User = mongoose.model('User', userSchema);