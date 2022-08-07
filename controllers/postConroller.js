const Post = require('../models/postModel')


exports.getAllPosts = (req,res, next) => {
  const posts = Post.find()
  .then(
     (data) => res.status(200).json(data)
  )
  .catch(
      (err) => res.status(404).json({"message" :error.message})
  )

  }

  exports.getOnePost = (req,res,next) =>{
    const posts = Post.findById(req.params.id)
    .then(
       (data) => res.status(200).json(data)
    )
    .catch(
        (err) => res.status(404).json({"message" :error.message})
    )
  
  }


  exports.createPost = (req,res,next) => {
    const post = new Post ({
      ...req.body
    })
    post.save()
    .then(
       () => res.status(200).json({message:"Object created successfully"})
    )
    .catch(
        (err) => res.status(404).json({message:error.message})
    )
  
  }


  exports.updatePost = (req,res,next) =>{
    const posts = Post.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true
    })
    .then(
       (data) => res.status(200).json(data)
    )
    .catch(
        (err) => res.status(404).json({"message" :error.message})
    )
  
  }

  exports.deletePost = (req,res,next) =>{
    const posts = Post.findByIdAndDelete(req.params.id)
    .then(
       () => res.status(200).json({"message": "Objet supprimé "})
    )
    .catch(
        (err) => res.status(404).json({"message" :err.message})
    )
  
  }