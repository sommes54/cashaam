const AWS = require("aws-sdk");
const dotenv = require('dotenv');
dotenv.config();
const text = "halo halo";

const params = {
  Text: text
};

const comprehend = new AWS.Comprehend({
    region: $REGION
  });

comprehend.detectDominantLanguage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });




