import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'

import helmet from 'helmet'

import models from './models/index'
import routes from './routes/IndexRoute'

const app = express()

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());



//comment script dibawah before building for production
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.use("/api/v1/users",(req, res) => {
  res.send("Hello Users")
});

// #middleware
app.use(async (req, res, next) => {
    req.context = {models};
  next();
});

app.use('/api/users', routes.UsersRoute)
app.use('/api/movies', routes.MoviesRoute)
app.use('/api/casts', routes.CastsRoute)
app.use('/api/comments', routes.CommentsRoute)
app.use('/api/upload', routes.UploadRoute)
app.use('/api/download', routes.DownloadRoute)
app.use('/api/auth', routes.AuthRoute)


// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
})

export default app