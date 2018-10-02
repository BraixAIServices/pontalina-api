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

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

//Início da conversação
chatbot.message({workspace_id}, trataResposta);

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
    if (req.query["hub.verify_token"] === "chatbotpontalina2019") {
      console.log("Verified webhook");
      res.status(200).send(req.query["hub.challenge"]);
    } else {
      console.error("Verification failed. The tokens do not match.");
      res.sendStatus(403);
    }
  });