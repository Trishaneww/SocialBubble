const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema(
    {
        username: {
            type: String,
            Unique: true,
            Required: true,
            Trimmed: true,
        },
        email: {
            type: String,
            Required: true,
            Unique: true,
            validate: [ isEmail, 'invalid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought' 
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref:'user'
            },
        ],
    }
);

const User = model('user', userSchema);

module.exports = User;

