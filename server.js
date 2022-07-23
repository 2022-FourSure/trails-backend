const express = require('express');
const app = express();
const PORT = 8000;
const trailRoutes = require('./routes/trailRoutes');
const morgan = require('morgan');
const cors = require('cors');

// Middleware starts here
// Cors allows us to pass info between backend and frontend
app.use(cors());
app.use(morgan('tiny'));


app.use('/trails', trailRoutes);

app.get('/', (req, res) => {
    res.send('Take a Hike!')
})

app.listen(PORT, ()=> {
    console.log('Climbin\' on port', PORT)
});