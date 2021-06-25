const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

// route

app.get('/api',(req,res)=>{
    res.json({
        message: 'welcome to the api'
    });
});



// create route for which we have to authenticate
// post request
// if we have to protect this post 
// add middleware verifyToken function
// we can't access this post without token
app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secret_key',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'post created...',
                authData
            });

        }
    });
   
});

// implement jwt
// route authentication
// login route with jwt


app.post('/api/login',(req,res)=>{
    // creating a mock user
    const user = {
        id:1,
        userName:'ujjwal',
        email:'ujjawalchoudhary2016@gmail.com'
    }
    jwt.sign({user:user},'secret_key', { expiresIn:'30s' } ,(err,token)=>{
        res.json({
            token:token
        });
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// verify Token
function verifyToken(req,res,next){
    // Get auth header value

    const bearerHeader = req.headers['authorization'];
    // check if the bearer is undefined


    if(typeof bearerHeader !== 'undefined'){
        // split with the space
        const bearer = bearerHeader.split(' ');
        // Get token from array

        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        // next middleware
        next();


    }else{
        // forbidden
        // 403 status
        res.sendStatus(403);
    }

}

app.listen(4000,()=>{
    console.log('server is listening on port 4000');
});