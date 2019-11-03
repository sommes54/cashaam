'use strict';

const {Translate} = require('@google-cloud/translate').v2;

// const text = 'The text for which to detect language, e.g. Hello, world!';
  // Detects the language. "text" can be a string for detecting the language of
  // a single piece of text, or an array of strings for detecting the languages
  // of multiple texts.

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

const text = 'halo halo';
detectLanguage(text).then(result => {
  console.log(result)
}).catch(e => {
  console.error(e);
});