import { Schema , model} from 'mongoose' // importing and destructuring

// const { Schema, model } = mongoose; // Destructuring after import
// Schema class from Mongoose, which is used to define the 
// structure of the documents in a MongoDB collection.

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: String
}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema); 
// 'Post', which will correspond to a collection named posts in MongoDB (Mongoose pluralizes the model name).

export default PostModel; 