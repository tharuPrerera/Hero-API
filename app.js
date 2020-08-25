const express = require('express');
const heroes = require('./routes/heroes');
const home = require('./routes/homes');
const authenticator = require('./middlewares/authenticator');
const mailer = require('./middlewares/emailjob');
const app = express(); //create express application
const PORT = 5000;

app.use(express.json()); //this one also middleware 

/*
//Middleware function write in same app.js
app.use((req,res,next)=>{
    console.log('Authenticating User...');
    next();
});

app.use((req,res,next)=>{
    console.log('Sending email to User...');
    next();
});
*/
 
//Middleware function in other folder
app.use(authenticator);
app.use(mailer);

//Route use
app.use('/api/heroes', heroes);
app.use('/', home);

app.listen(PORT,function(){
    console.log("Listening on Port : "+ PORT)
});

/*
//hard code
app.get('/api/heroes/1', (req,res) =>{
    let hero = {id: 1, name: 'Capten America'};
    res.send(hero);
});

app.get('/api/heroes/2', (req,res) =>{
    let hero = {id: 2, name: 'Iron Man'};
    res.send(hero);
});

app.get('/api/heroes/3', (req,res) =>{
    let hero = {id: 3, name: 'Black Window'};
    res.send(hero);
});
*/