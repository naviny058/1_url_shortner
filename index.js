const express = require('express')
const urlRoute = require('./routes/url')
const { connectToMongoDb } = require('./connection')
const URL = require('./models/url')
const app = express()
const port = 8081


connectToMongoDb('mongodb+srv://wishals687:jdJz8yyseLI1zkPa@url.gx6fuux.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('mongodb connected'))
    .catch((error) => console.log('mongodb err', err))

app.use(express.json())

app.use('/url', urlRoute)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log(`http://localhost:${port}`))