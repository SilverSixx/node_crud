const express = require('express')
const morgan = require('morgan')

const app = express()

// routes to controllers
const register = require('./controllers/registrationController')

app.use(morgan('tiny'))
// parse to json
app.use(express.json())
// parse the form data
app.use(express.urlencoded({ extended: false }))

// use the controller of endpoints
app.use('/api/v1', register)



app.listen(3000, () => {
    console.log('server is running on port 3000');
})