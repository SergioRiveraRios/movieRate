import axios from 'axios'
import Movie from '../models/movies.js'
import user from '../models/user.js'
import config from '../config.js'
import jwt from 'jsonwebtoken'

//Get all movies from a user
export const getMovies = async (req, res, next) => {
    
    try {
        console.log("prueba 2")
        const header = req.headers['authorization']
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;
            const currentUser =jwt.verify(req.token, config.secret)
            res.json({currentUser})
            console.log("asd")
        }
        else {
            res.sendStatus(403)
        }
        
    } catch (error) {
        res.json(error)
    }

}

//Add a movie 
export const addMovie = async (req, res) => {
    const movie = req.body
    const currentUser = req.params.id
    const result = await axios.get(`http://www.omdbapi.com/?t=${movie.Title}&apikey=c09297ba`)
    const { Title, Year, Director, Genre, Actors, Plot } = result.data
    const newMovie = new Movie({ Title: movie.Title, Year, Director, Genre, Actors, Plot, Rate: movie.Rate });

    try {
        const userFound = await user.findById(currentUser)
        userFound.Movies.push(newMovie)
        userFound.save()
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(401).json({ message: error.message })
    }

}

//delete a movie
export const deleteMovie = async (req, res) => {
    const currentUser = req.params.id
    const deleteMovie = req.body.Title
    try {
        const userFound = await user.findById(currentUser)
        for (var i = 0; i < userFound.Movies.length; i++) {
            if (deleteMovie == userFound.Movies[i].Title) {
                userFound.Movies.splice(i, 1)
                userFound.save()
                res.sendStatus(200)
            }
        }
    } catch (error) {
        res.sendStatus(400)
    }
}

//update a movie 
export const updateMovie = async (req, res) => {
    const currentUser = req.params.id
    const { Title, Rate } = req.body
    try {
        const userFound = await user.findById(currentUser)
        for (var i = 0; i < userFound.Movies.length; i++) {
            if (Title == userFound.Movies[i].Title) {
                userFound.Movies[i].Rate = Rate
                await userFound.save()
                res.sendStatus(200)
            }
        }
    } catch (error) {
        res.sendStatus(400)
    }
}
