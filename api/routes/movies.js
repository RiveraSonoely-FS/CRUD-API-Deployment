const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

//GET, POST, PATCH, DELETE

const getMovie = async (req, res, next) => {
    let movie
    try {
        movie = await Movie.findById(req.params.id)
        if( movie === null){
            return res.status(404).json({message: "Movie not found"})
        }
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
    res.movie = movie;
    next();
}

//GET ALL
router.get('/', async (req,res) => {
    try{
        const movies = await Movie.find()
        res.json(movies)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
});

//GET ONE
router.get('/:id', getMovie, async (req,res) => {
    res.json(res.movie)
});

//POST CREATE
router.post('/', async (req,res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
    })
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie)
    }catch(error){
        res.status(400).json({ message: error.message })
    }
});

//PATCH UPDATE
router.patch('/:id', getMovie, async (req,res) => {
    if(req.body.title != null){
        res.movie.title = req.body.title
    }
    if(req.body.director != null){
        res.movie.director = req.body.director
    }
    if(req.body.year != null){
        res.movie.year = req.body.year
    }
    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch(error){
        res.status(400).json({ message: error.message })
    }
});

//DELETE
router.delete('/:id', getMovie, async (req,res) => {
    try {
        await res.movie.deleteOne();
        res.json({message: "Removed Movie"})
    }catch(error) {
        res.status(500).json({ message: error.message})
    }
});

module.exports = router;