import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    email:{
        type: String
    },
    password: {
        type: String
    },
});

// export model
export const UserModel = model('User', userSchema)