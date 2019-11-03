"use strict";

// [START gae_node_request_example]
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dialogflow = require("dialogflow");
const {Translate} = require('@google-cloud/translate').v2;
const dotenv = require('dotenv');
dotenv.config();
const projectId = process.env.PROJECT_ID

async function detectLanguage(text) {
  // Creates a client
  const translate = new Translate();
  let result = [];
  let [detections] = await translate.detect(text);
  detections = Array.isArray(detections) ? detections : [detections];
  console.log('Detections:');
  detections.forEach(detection => {
    console.log(`${detection.input} => ${detection.language}`);
    result = detection.language;
  });
  return result;
}

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg) {
  // A unique identifier for the given session
  // const sessionId = uuid.v4();
  console.log('message', msg);
  const sessionId = msg.From;
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  const langCode = await detectLanguage(msg.Body);
  
  console.log(langCode)
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg.Body,
        // The language used by the client (en-US, Id - Indonesia)
        languageCode: langCode
      }
    }
  };
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}

app.post("/", (req, res) => {
  const message = req.body;
 
  runSample(message).then(result => {
    res.status(200)
    .send(result);
    // .end();
  }).catch(e =>{
    console.log(e)
    res.sendStatus(500)
  })
  
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
// [END gae_node_request_example]

module.exports = app;
