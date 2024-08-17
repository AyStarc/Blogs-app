import mongoose, { Schema } from 'mongoose'
const { schema, model } = mongoose;

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String
}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema);

export default PostModel; 