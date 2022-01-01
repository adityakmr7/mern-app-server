const Post = require("../models/post.model");

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    
    if (!title && !content) {
      res.status(400).json({
        message: "title and content is required!",
      });
    }
    const post = await Post.create({ title, content });
    res.status(201).json({
      status: "Post Created!",
      data: { post },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.getAllPost = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const post = await Post.find().sort({_id: 1}).limit(limit).skip(skipIndex).exec();
    res.status(200).json({
      length: post.length,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "post id is required!",
      });
    }
    const post = await Post.findById(id);
    if (!post) {
      res.status(400).json({
        message: "post doesn't exist",
      });
    }
    res.status(200).json({
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          message: "post id is required!",
        });
      }
      const post = await Post.findByIdAndUpdate(id, {title: req.body.title, content: req.body.content});
      if (!post) {
        res.status(400).json({
          message: "post doesn't exist",
        });
      }
  
      res.status(200).json({
        message: "post updated!",
    
      }); 
  } catch (error) {
    res.status(400).json({
        message: "Something went wrong!",
      }); 
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "post id is required!",
      });
    }
    const post = await Post.findById(id).remove();
    if (!post) {
      res.status(400).json({
        message: "post doesn't exist",
      });
    }

    res.status(200).json({
      message: "post deleted!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};
