const express = require('express');
const Hero = require('../models/hero');
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

router.get('/', async (req,res) =>{
    //let heroes = ['Capten America', 'Iron Man', 'Black Window'];
    //res.send(heroesArray);

    //mongodb data showing... 
    //get all method filtering specific object and filter other things
   // let heroes = await Hero.find({deceased : true, name: ''});
  
   //skip first 10 and dispaly other 20....
        //let heroes = await Hero.find().skip(1).limit(1);

    //sort.. 
        // let heroes = await Hero.find().sort({name: 'asc'});
        // let heroes = await Hero.find().sort({name: 'desc'});

   //onle display one property in db...
        //let heroes = await Hero.find().sort({name: 'asc'}).select({name: 1, deceased:1});


    //comparisom 
   /* let heroes = await Hero.find({likeCount: {$nin: [3000,1000 ]}})
                        .sort({name: 'asc'})
                        .select({name: 1, deceased:1});

                        $eq => equles
                        $gt => greterthan
                        $gtq => grerterthan equles*/


    //logical operator
    /*let heroes = await Hero.find()
                           .or([{likeCount:3000}, {likeCount:5000}])
                           .sort({name: 'asc'})
                           .select({name: 1, deceased:1})
                           .count();

                        //   .and([{likeCount:3000}, {likeCount:5000}]) */

 
    let heroes = await Hero.find()
                        .or([{likeCount:3000}, {likeCount:5000}])
                           .sort({name: 'asc'})
                           .select({name: 1, deceased:1})
                       // .countDocuments();
    res.send(heroes);
});

router.get('/:heroId',async (req,res) =>{
    //data pass using mongoose...
    let hero = await Hero.findById(req.params.heroId);

//using same page array...
   // let heroId = parseInt(req.params.heroId); //rquest paramiter is url
    //let hero =heroesArray.find(h => h.id === heroId);
    
    if(!hero){
       return res.status(404).send("The given ID does not exist on our server")
    }
    res.send(hero);

    //convert string into int use parseInt or ==

    /*let optionalValue = req.query.showMore;  //quary paramiter is optiona thing in url
    //let hero = {id: 1, name: 'Capten America'};
    res.send("Your request for hero Id - "+heroId+ "and optional Value "+optionalValue);*/
});

router.post('/', async (req,res) =>{

    if(!req.body.heroName){
        return res.status(404).send("Not all mandatory value have been set!");
    }

    //mongodb data save 
    try{
        let heroToBeAddedToDb = new Hero({
            name : req.body.heroName,
            birthname : req.body.birthname,
            movies : req.body.movies,
            likeCount : req.body.likeCount,
            imgUrl : req.body.imgUrl,
            deceased : req.body.deceased
        });
    
        heroToBeAddedToDb = await heroToBeAddedToDb.save();
        res.send(heroToBeAddedToDb); 
    }catch(e){
        return res.status(500).send(e.message);
    }

    /*let newHeroObj = {
        id: heroesArray.length +1,
        name : req.body.heroName,
        age: req.body.heroage
    };
    heroesArray.push(newHeroObj);
    console.log(heroesArray);
    res.send(newHeroObj);*/

   
});


//one way to update data
/*
router.put('/:heroId',async(req,res)=>{
    //quarying first approache
    let hero = await Hero.findById(req.params.heroId);

    if(!hero){
        return res.status(404).send("The given ID does not exist on our server")
     }
 
     if(!req.body.heroName){
     return res.status(404).send("Not all mandatory value have been set!");
     }
 
    
    hero.set({name: req.body.heroName});
    hero = await hero.save();
    res.send(hero);


    //using same page array...
        //let heroId = parseInt(req.params.heroId); //rquest paramiter is url
        //let hero =heroesArray.find(h => h.id === heroId);

        // hero.name = req.body.heroName;
        //hero = await hero.save();
       // console.log(heroesArray);
       // res.send(hero);

   
});
*/
 
//other way to update data
router.put('/:heroId',async(req,res)=>{
   let hero = await Hero.findOneAndUpdate(
        {_id: req.params.heroId},
        {$set: {likeCount: req.body.likeCount}},
        {new: true, useFindAndModify: false}
    ); 
    res.send(hero);
});


router.delete('/:heroId',async(req,res)=>{
  
  let hero = await Hero.findOneAndDelete({_id: req.params.heroId});
  if(!hero){
    return res.status(404).send("The given ID does not exist on our server");
  }

  res.send(hero);
  
  
  /*  let heroId = parseInt(req.params.heroId); //rquest paramiter is url
    let hero =heroesArray.find(h => h.id === heroId);
    
    if(!hero){
       return res.status(404).send("The given ID does not exist on our server")
    }

    let indexOfHero = heroesArray.indexOf(hero);
    heroesArray.splice(indexOfHero,1);
    console.log(heroesArray);
    res.send(hero);*/
});

module.exports = router;