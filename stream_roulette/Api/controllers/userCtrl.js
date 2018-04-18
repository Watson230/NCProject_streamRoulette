const usermodal = require("../modal/queries")




function postUser(req,res){

    
    const user = usermodal({
        username:req.body.name
    }).save().then(newUser =>{res.status(200).send(newUser)})
    .catch(err => {
        console.log(err);
        return res.status(500).send({ error: err })

    })



}


function addLikedFilm(req,res){

    let user = req.params.username
    let film = req.body.film

    usermodal.findOneAndUpdate({'username':user},{ $push: { likedFilms: film } }, { returnNewDocument: true })
    .then(user => res.status(200).send(user))
    .catch(err => {
        console.log(err);
        return res.status(500).send({ error: err })

    })


}

function addDislikedFilm(req,res){
    let user = req.params.username
    let film = req.body.film

    usermodal.findOneAndUpdate({'username':user},{ $push: { disLikedFilms: film } }, { returnNewDocument: true })
    .then(user => res.status(200).send(user))
    .catch(err => {
        console.log(err);
        return res.status(500).send({ error: err })

    })


}





module.exports = {postUser,addLikedFilm,addDislikedFilm}