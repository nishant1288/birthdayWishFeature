import express from 'express';
import Routes from './routes/router.js'

const app = express();

let PORT = 8100;

app.use('/', Routes)

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})