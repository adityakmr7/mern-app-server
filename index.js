const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post.routes');
const authRoutes = require('./routes/user.routes');


require('dotenv').config()
const app = express();

app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin , X-Reaquested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Accesss-Control-Allow-Methods', 'PUT , POST, PATCH, DELETE, GET' );
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());



app.get('/', (req,res,next) => {
    res.send(`<h1>Hello world </h1>`)  
})

// localhost:8080/api/v1/posts/
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/auth', authRoutes);
const MONGO_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.sqskc.mongodb.net/node-server?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL).then(() => {
    console.log('MongoDB is connected!')
}).catch((err) => console.log(err))


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App is running at ${PORT}`))
