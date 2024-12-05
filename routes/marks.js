var express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
var router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const years = ['PRI', 'SEC']

/* GET users listing. */
router.post('/', async function (req, res, next) {

    try {

        const { user, pwd } = req.body.data;
        const marks = [];

        // Generate a JWT token (you can customize the payload as needed)
        const token = jwt.sign({ email: user }, JWT_SECRET, { expiresIn: '7d' });


        for (const key in years) {
            const response = await axios.get('https://gestionale.fondazionejobsacademy.org/itsapp.aspx?CMD=voti&corso=' + years[key],
                {
                    params: {
                        user: user,
                        pwd: pwd
                    },
                    headers: {
                        Authorization: req.headers.authorization,
                        'Access-Control-Allow-Origin': '*',
                        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3'
                    },
                    responseType: 'arraybuffer',
                }
            )
            const decoder = new TextDecoder('ISO-8859-1');
            const decodedData = decoder.decode(response.data);
            let jsonData = JSON.parse(decodedData);

            marks.push({ [years[key]]: jsonData });

        }

        // Construct the response with the JWT token and events
        const responsePayload = {
            token: token,  // Include the generated token
            events: marks
        };

        // Send the structured response
        res.send(responsePayload);

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error });
        return;
    }

});

module.exports = router;

