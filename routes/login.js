var express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
var router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
// Secret key for signing the JWT (keep this secret in a real application)

/* POST home page. */
router.post('/', async function (req, res, next) {

  try {

    const { user, pwd, fromDate, toDate } = req.body.data;
    // Generate a JWT token (you can customize the payload as needed)
    const token = jwt.sign({ email: user }, JWT_SECRET, { expiresIn: '30d' });

    const response = await axios.get('https://gestionale.fondazionejobsacademy.org/itsapp.aspx?CMD=calendar',
      {
        params: {
          user: user,
          pwd: pwd,
          fromDate: fromDate,
          toDate: toDate
        },
        headers: {
          Authorization: req.headers.authorization,
          'Access-Control-Allow-Origin': '*',
          'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3'
        },
        responseType: 'arraybuffer',
      });

    const decoder = new TextDecoder('ISO-8859-1');
    const decodedData = decoder.decode(response.data);
    let jsonData = JSON.parse(decodedData);

    // Filter events based on criteria
    jsonData = jsonData.filter((element) => {
      if (element.Modulo.includes("curv") && !element.Modulo.includes("CLD")) {
        return false;
      }
      return true;
    });

    // Sort events by StartTime
    const sortedData = jsonData.sort((a, b) => {
      const dateA = new Date(a.StartTime);
      const dateB = new Date(b.StartTime);
      return dateA - dateB;
    });

    // Construct the response with the JWT token and events
    const responsePayload = {
      token: token,  // Include the generated token
      events: sortedData
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
