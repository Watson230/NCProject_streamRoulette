const express = require('express');
const router = express.Router();



const queriesCtrl = require("../controllers/queriesCtrl")


console.log('api router')

router.get('/', );


router.post('/search/queries', queriesCtrl.postQueries )


module.exports = {router}


