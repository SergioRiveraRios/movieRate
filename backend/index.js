//dependencies and libraries
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

//Routes 
import moviesRoutes from './routes/movies.js'
import userRouter from './routes/auth.js'

const app = express();
const PORT = process.env.PORT || 5000;


//Addiotional config
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/api/auth',userRouter)
app.use("/user",moviesRoutes)

//DB ROUTE
const CONNECTION_URL = "mongodb+srv://root:root123@cluster0.nssh8.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Running on server ${PORT}`)))
    .catch((error) => console.log(error.message));
mongoose.set('useFindAndModify', false);