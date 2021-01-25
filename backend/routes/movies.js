import express from 'express';
import {addMovie,deleteMovie,updateMovie,getMovies} from '../controllers/movies.js'
const router=express.Router();

router.get("/:id",getMovies)
router.post("/:id",addMovie)
router.delete('/:id', deleteMovie)
router.put("/:id",updateMovie)


export default router;