console.log("1 : Before calling Db...");

function getMovieDataFromDb(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("2 : Reading movie data from our db...");
            let dbData =  {id: 30, name: 'Avenger : End Game '}
            //resolve(dbData); //object display
            //resolve(dbData.name);
            resolve("Id is: "+dbData.id +" Movie name : "+ dbData.name);
        },4000);
  }); 
}

//using async-await
async function printMovieDetails(){
    let movieDataFromDB = await getMovieDataFromDb();
    console.log("3 : Movie data :  "+ movieDataFromDB);
}
printMovieDetails();


/*
//using Resolved Promise
getMovieDataFromDb().then((result)=>{
    let movieDataFromDB = result;
    console.log("3 : Movie data :  "+ movieDataFromDB);
}).then(rr)=>{
    getActorDetailsFromDB();
}).then(rrr)=>{
    console.log("ss")
}
*/

console.log("4 : Doing some other work now...");


/*
function demoAsyncNature(){
    setTimeout(()=>{
        console.log('Exacuting after 4 seconds.... ');
    },4000);
}

demoAsyncNature();
*/