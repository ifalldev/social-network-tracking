// Base para funcionamento da API
import express from "express";
import consign from "consign";
import request from "request-promise";

// API's necessárias
import googleApis from "googleapis";

// Configuração padrão
const app = express();
	  app.plus = googleApis.plus('v1');


app.set("json spaces", 4);

// Organização para carregamento de arquivos
consign()
	.include("./config/auth")
	.then("./config/routes")
	.into(app);

// Configuração para utilização OAuth2
const OAuth2 = googleApis.auth.OAuth2;

const oauth2Client = new OAuth2(
	app.googlePlus.env.CLIENT_ID,
	app.googlePlus.env.CLIENT_SECRET,
	app.googlePlus.env.CALLBACK_URL
);

const url = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: app.googlePlus.env.SCOPE,
	expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
});



// Realização de login
app.get("/google-plus/login",(req,res) => {

	res.redirect(url);

});

// Retorno 
app.get("/home", (req,res) => {
	
	let code = req.query.code;
	let perfil = null;
	

	console.log(code);

	oauth2Client.getToken(code, (err, tokens) => {
		
		if(err){
			res.send(err);
			return false;
		}

		oauth2Client.setCredentials(tokens);

		app.plus.people.get({
			userId: 'me',
			auth: oauth2Client
		},(err, response) => {

			console.log(oauth2Client);

			res.json({response, tokens});

		});


	});


});

// Configuração básica de servidor
app.listen(app.googlePlus.env.PORT);
