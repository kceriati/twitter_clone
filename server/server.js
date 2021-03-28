const express = require('express')
const cors = require('cors')
const monk = require('monk')
const app = express()

const db = monk('localhost/twipper')
const howls = db.get('howls')


app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.json({
        message: "banane"
    })
})

app.get('/howls', (req, res) => {
    howls
        .find()
        .then(howls => {
            res.json(howls)
        })
})

function isValidHowl(howl) {
    return howl.name && howl.name.toString().trim() !== '' && 
    howl.message && howl.message.toString().trim() !== ''
}

app.post('/howls', (req, res) => {
    if (isValidHowl(req.body)){
        const howl = {
            name: req.body.name.toString(),
            message: req.body.message.toString(),
            created: new Date()
        }
        howls
        .insert(howl)
        .then(createHowl => {
            console.log(createHowl)
            res.json(createHowl)
        })
    } else {
        res.status(418).json({
            "message": "You look like a tea pot ! Why you don't write in all required fields"
        })
    }
})

app.get('/howls/:id', (req, res) => {
    const id = req.url.split('/')[2];
    howls.findOne(id).then(howl => {
        res.status(200).json(howl)
    })
    console.log(id)
})

app.listen(5000, () => {
    console.log("Server is ready")
})