const express = require('express');
const router = express.Router ();

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

router.get('/', (req,res) =>{
    //let heroes = ['Capten America', 'Iron Man', 'Black Window'];
    res.send(heroesArray);
});

router.get('/:heroId', (req,res) =>{
    
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

router.post('/', (req,res) =>{

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

router.put('/:heroId',(req,res)=>{
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

router.delete('/:heroId',(req,res)=>{
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

module.exports = router;