import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, min: 2, unique: true },
    password: { type: String, required: true, min: 2 }
});

const UserModel = model('User',UserSchema);


export default UserModel; 