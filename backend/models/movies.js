import mongoose from 'mongoose';
const { Schema } = mongoose;

const Movie = new Schema({
  Title: String, // String is shorthand for {type: String}
  Year: Number,
  Director: String,
  Genre: String,
  Actors: String,
  Plot: String,
  Rate: Number
});

const movie = mongoose.model('Movie', Movie);
export default movie;