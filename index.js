const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post.routes');


require('dotenv').config()
const app = express();

app.use(express.json());



app.get('/', (req,res,next) => {
    res.send(`<h1>Hello world </h1>`)  
})

// localhost:8080/api/v1/posts/
app.use('/api/v1/posts', postRoutes)
const MONGO_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.sqskc.mongodb.net/node-server?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL).then(() => {
    console.log('MongoDB is connected!')
}).catch((err) => console.log(err))


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App is running at ${PORT}`))
