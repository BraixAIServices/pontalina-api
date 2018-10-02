require('dotenv').load();

const watson = require('watson-developer-cloud/assistant/v1');

const chatbot = new watson({

    username: '015c1b44-dbd6-4121-9fcf-8f4280d557bf',
    password: 'zDLtpR883k27',
    version: '2018-09-30',

});

const workspace_id = '91873e3d-99c4-4d24-8a89-26b38b5f0322';

var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var verify = require('./security');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({verify: verify}));
app.listen((process.env.PORT || 5000));

//Início da conversação
//chatbot.message({workspace_id}, trataResposta);

module.exports = function(app) {
    var Facebook = require('./bot-facebook');
    Facebook.controller.middleware.receive.use(middleware.receive);
    Facebook.controller.createWebhookEndpoints(app, Facebook.bot);
    console.log('Facebook bot is live');
 // Customize your Watson Middleware object's before and after callbacks.
    
    middleware.before = function(message, assistantPayload, callback) {
        callback(null, assistantPayload);
    };

    middleware.after = function(message, assistantResponse, callback) {
        callback(null, assistantResponse);
    };
};


function trataResposta(err, resposta){

    if(err){
        console.log(err);
        return;
    }

    if(resposta.output.text.length > 0){
        console.log('Retorno -> '+ resposta.output.text);
    }

}

// Server index page
app.get("/", function (req, res) {
    res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get("/webhook/facebook", function (req, res) {
    if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
      console.log("Verified webhook");
      res.status(200).send(req.query["hub.challenge"]);
    } else {
      console.error("Verification failed. The tokens do not match.");
      res.sendStatus(403);
    }
  });