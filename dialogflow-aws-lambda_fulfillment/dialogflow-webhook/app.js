"use strict";

const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

var express = require("express");
const app = express();
const router = express.Router();

router.use(compression());
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

function welcome(agent) {
  agent.add(`Welcome to cashaam!`);
}
function fallback(agent) {
  agent.add(`I didn't understand`);
  agent.add(`I'm sorry, can you try again?`);
}
function makeAppointment(agent) {
  let timeZone = 'America/Chicago';
  let timeZoneOffset = '-05:00';
  let dateTimeStart = new Date(Date.parse(agent.parameters.date[0].split('T')[0] + 'T' + agent.parameters.time[0].split('T')[1].split('-')[0] + timeZoneOffset));
  let dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
  let appointmentTimeString = dateTimeStart.toLocaleString(
      'en-US',
      { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
    );

  agent.add(`I got you all set for your ${agent.parameters.AppointmentType} appointment on ${appointmentTimeString}`);
}

function makeAppointmentId(agent) {
  let timeZone = 'Asia/Jakarta';
  let timeZoneOffset = '+07:00';
  let dateTimeStart = new Date(Date.parse(agent.parameters.date[0].split('T')[0] + 'T' + agent.parameters.time[0].split('T')[1].split('-')[0] + timeZoneOffset));
  let dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
  let appointmentTimeString = dateTimeStart.toLocaleString(
      'id',
      { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
    );
  agent.add(`Saya membuat Anda siap untuk janji temu ${agent.parameters.AppointmentType} Anda di ${appointmentTimeString}`);
}

function fallbackLanguage(agent) {
  agent.add(
    `I didn't understand the text, you start with 'hello' for English or Indonesian - halo yang di sana`
  );
}

// create fallback in case the language is not properly detected

router.post("/", async (request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log("Dialogflow Request headers: " + JSON.stringify(request.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(request.body));

  // make sure you set the environment variable here.
  console.log(`Request locale: ${agent.locale}`);
  if (agent.locale === "en") {
    // English Handler and Intent map - Run the proper function handler based on the matched Dialogflow intent name
    let enIntentMap = new Map();
    enIntentMap.set("ScheduleAppointment", makeAppointment);
    enIntentMap.set("Default Fallback Intent", fallback);
    agent.handleRequest(enIntentMap);
  } else if (agent.locale === "id") {
    // Indonesia - Fungsi penangan Kode Indonesia dan peta maksud
    let idIntentMap = new Map();
    idIntentMap.set("ScheduleAppointment", makeAppointmentId);
    idIntentMap.set("Default Fallback Intent", fallback);
    agent.handleRequest(idIntentMap);
  } else {
    let IntentMap = new Map();
    IntentMap.set("fallback Language", fallbackLanguage);
  }
  // });
});

app.use("/", router);

module.exports = app;
