// Importar módulos necessários
import express from "express";
import consign from "consign";
import request from "request-promise";

// Módulos PassportJS
import passport           from "passport";
import FacebookStrategy   from "passport-facebook";

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
passport.use(new FacebookStrategy({
    clientID: app.facebook.env.CLIENT_ID,
    clientSecret: app.facebook.env.CLIENT_SECRET,
    callbackURL: 'http://localhost/login/facebook/return',
    profileFields: app.facebook.env.PROFILE_FIELDS
  },
  
  function(accessToken, refreshToken, profile, cb) {
        
	app.mainInfo = {
		AccessToken: accessToken,
		Profile: profile,
		RefreshToken: refreshToken
	}

    return cb(null, profile, refreshToken, profile);

  }));

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

	app.get('/facebook/login',
		passport.authenticate('facebook',{
		scope: app.facebook.env.SCOPE
	}));

	app.get('/login/facebook/return', 
		passport.authenticate('facebook', { failureRedirect: '/facebook/login/error' }),
		function(req, res) {
			res.json(req.user);
		}
	);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

app.listen(PORT, () => console.log(`Teste de log utilizando a porta ${PORT}`));