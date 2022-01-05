const mongoose = require('mongoose');
const slug = require('slug');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    slug: {
        type:String,
        lowercase:true,
        unique:true
    },
    content: {
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps: true});

postSchema.pre("validate", function(next) {
    if(!this.slug) {
        this.slugify()
    }
    next();
})

postSchema.methods.slugify = function() {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36,6) | 0).toString(36);
}

const Post = mongoose.model('Post', postSchema);

module.exports = Post;