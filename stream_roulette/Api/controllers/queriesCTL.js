const queriesModals = require('../modal/queries')



function postQueries(req,res){

    const query = queriesModel({
        user:req.body.user,
        genre:req.body.genre,
        title:req.body.title,
        keywords:req.body.keywords,
        rating: req.body.rating,
        releaseDate: req.body.releaseDate,
        director: req.body.director,
        starring: req.body.starring


       
    }).save().then(newQuery =>{res.status(200).send(newQuery)})
    .catch(err => {
        console.log(err);
        return res.status(500).send({ error: err })

    })


}



module.exports={postQueries}