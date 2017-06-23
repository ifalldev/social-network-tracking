// Importar módulos necessários
import express from "express";
import consign from "consign";
import request from "request-promise";

// Módulos PassportJS
import passport           from "passport";
import {OAuth2Strategy as PinterestStrategy} from "passport-pinterest-oauth";

//Preparação das variáveis principais
const PORT = 80;
const app  = express();

// Configuração básica do app
app.set("json spaces", 4);

// Organização de carregamento de módulos
consign()
	.include("./config/auth")
	.then("./config/routes")
	.into(app);

//Configuração PassportJS para as redes sociais
passport.use(new PinterestStrategy({
			clientID: app.pinterest.env.CLIENT_ID,
			clientSecret: app.pinterest.env.CLIENT_SECRET,
			scope: ['read_public', 'read_relationships'],
			callbackURL: 'https://541f4ca0.ngrok.io/home'
		},
		
		function(accessToken, refreshToken, profile, done) {
					
			app.mainInfo = {
				AccessToken: accessToken,
				Profile: profile,
				RefreshToken: refreshToken
			}

			return done(null, profile, refreshToken, profile);

		}
	)
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Utilização de middleware para 
// logging, parsing, e manipulação de sessão.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Inicializa o Passport e restaura o estado de autenticacao, de qualquer sessão
app.use(passport.initialize());
app.use(passport.session());

	app.get('/pinterest/login',
		passport.authenticate('pinterest')
	);

	app.get('/home', 
		passport.authenticate('pinterest', { failureRedirect: '/pinterest/login/error' }),
		function(req, res) {
			res.json(req.user);
		}
	);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

app.listen(PORT, () => console.log(`Teste de log utilizando a porta ${PORT}`));