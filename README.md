# Overview
The user interact with our platform from their phone WhatsApp by sending text messages to the WhatsApp number. When a user start typing a message, the language they are using is determined and used to set a language code for Dialogflow. Dialogflow integrate with Google AppEngine and Amazon AWS API Gateway - Lambda. ![Architecture](https://github.com/sommes54/cashaam/blob/master/architecture.png)

# Request - (Dialogflow, AppEngine, Twilio)
The Twilio is connected with API hosted on Google AppEngine. Request from user's WhatsApp is handled by the API using the Dialogflow backend. Response (fulfillment) from the user is obtained for the user with the help of Dialogflow integration with the Amazon AWS Lambda. ![Request - Intent](https://github.com/sommes54/cashaam/blob/master/response_appengine.png)

# Fulfillment - (Dialogflow, Amazon AWS API Gateway, Amazon AWS lambda)
Dialogflow is connected to the API Gateway which responds using AWS lambda. AWS Lambda is also used to provide Authorization in order to secure the API. Additional tasks such image recognition and analysis and so on can be performed by invoking more commands or lambdas. Dialogflow integrate with Amazon AWS API Gateway powered by AWS Lambda. The integration is based on a tutorial by [Latt](https://medium.com/faun/building-chatbot-with-google-dialogflow-with-aws-lambda-e19872e1589)
![Dialogflow works with API Gateway](https://github.com/sommes54/cashaam/blob/master/dialogflow-aws-lambda.png)

# Conversational Design
It is important to use the right techniques in designing conversations so as not to sound robotic to the user. Cooperative conversation techniques guides the user through the journey to picking the right options. Good conversations should feel natural to the user even though it places the design burden on the developer. You can learn more [here](https://designguidelines.withgoogle.com/conversation/conversation-design/welcome.html). ![Conversation Design](https://github.com/sommes54/cashaam/blob/master/conversation_design.png)

# Language Detection
The language used to typed the message is used to select the agent intent language code. This is a better method rather than translation because it will require shorter time to respond and help train the chat bot in the native language of the user (locale). Language detection using Google Cloud Translation API require a reasonable amount of text so it could be an issue for a user. [Translation Issues](https://www.quora.com/How-does-Amazon-Translate-compare-to-Google-Translate)
