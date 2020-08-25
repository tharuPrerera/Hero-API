const express = require('express');
const router = express.Router ();

//main url
router.get('/', (req,res) =>{
    res.send("Avenger Assenble");
});

module.exports = router;