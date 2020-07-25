const express = require('express');
const app = express(); //create express application
const PORT = 5000;

app.use(express.json());

let heroesArray = [
    {
        id: 1, 
        name: 'Capten America'
    },
    {
        id: 2, 
        name: 'Iron Man'
    },
    {
        id: 3, 
        name: 'Black Window'
    }
];

app.get('/', (req,res) =>{
    res.send("Avenger Assenble");
});

app.get('/api/heroes', (req,res) =>{
    //let heroes = ['Capten America', 'Iron Man', 'Black Window'];
    res.send(heroesArray);
});

app.get('/api/heroes/:heroId', (req,res) =>{
    
    let heroId = parseInt(req.params.heroId); //rquest paramiter is url
    let hero =heroesArray.find(h => h.id === heroId);
    
    if(!hero){
       return res.status(404).send("The given ID does not exist on our server")
    }
    res.send(hero);

    //convert string into int use parseInt or ==

    /*let optionalValue = req.query.showMore;  //quary paramiter is optiona thing in url
    //let hero = {id: 1, name: 'Capten America'};
    res.send("Your request for hero Id - "+heroId+ "and optional Value "+optionalValue);*/
});

app.post('/api/heroes', (req,res) =>{

    if(!req.body.heroName){
        return res.status(404).send("Not all mandatory value have been set!");
    }

    let newHeroObj = {
        id: heroesArray.length +1,
        name : req.body.heroName,
        age: req.body.heroage
    };
    heroesArray.push(newHeroObj);
    console.log(heroesArray);
    res.send(newHeroObj); 
});

app.put('/api/heroes/:heroId',(req,res)=>{
    let heroId = parseInt(req.params.heroId); //rquest paramiter is url
    let hero =heroesArray.find(h => h.id === heroId);
    
    if(!hero){
       return res.status(404).send("The given ID does not exist on our server")
    }

    if(!req.body.heroName){
    return res.status(404).send("Not all mandatory value have been set!");
    }

    hero.name = req.body.heroName;
    console.log(heroesArray);
    res.send(hero);
});

app.delete('/api/heroes/:heroId',(req,res)=>{
    let heroId = parseInt(req.params.heroId); //rquest paramiter is url
    let hero =heroesArray.find(h => h.id === heroId);
    
    if(!hero){
       return res.status(404).send("The given ID does not exist on our server")
    }

    let indexOfHero = heroesArray.indexOf(hero);
    heroesArray.splice(indexOfHero,1);
    console.log(heroesArray);
    res.send(hero);
});


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