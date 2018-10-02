const watson = require('watson-developer-cloud/assistant/v1');

const chatbot = new watson({

    username: '015c1b44-dbd6-4121-9fcf-8f4280d557bf',
    password: 'zDLtpR883k27',
    version: '2018-09-30',

});

const workspace_id = '91873e3d-99c4-4d24-8a89-26b38b5f0322';

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