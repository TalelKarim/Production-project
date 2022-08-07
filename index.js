const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER, REDIS_URL, REDIS_PORT, SESSION_SECRET } =  require('./config/config');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors')
let RedisSotre = require('connect-redis')(session)

let redisClient = redis.createClient({
   host: REDIS_URL,
   port: REDIS_PORT,
   legacyMode:true
})

const postRouter= require('./routes/postRoute')
const userRouter = require('./routes/userRoutes')


const app = express();


const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?
authSource=admin`;

const ConnectWithRetry = () =>{
     //Database connection 
     mongoose.connect(mongoURL)
     .then(() => console.log('successefully connected to the database') )
     .catch(() => {
         console.log('not connected')
        });

}

ConnectWithRetry();

app.use(cors({}))
app.use(session({
    store: new RedisSotre({client: redisClient}),
    secret: SESSION_SECRET,
    resave:true,
    saveUninitialized: true,
    cookie : { 
       secure: false,
       resave:true,
       httpOnly: true, 
       saveUninitialized: true,
       maxAge: 60000
    }
}));


app.use(express.json());

app.get('/',(req,res) => {
    res.send('<h2> hey there !!<h2/>')
 }
 )


app.use('/posts', postRouter) 
app.use('/users',userRouter)
const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})