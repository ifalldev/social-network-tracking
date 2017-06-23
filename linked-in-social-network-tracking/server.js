// Importar módulos necessários
import express from "express";
import consign from "consign";
import request from "request-promise";

// Módulos PassportJS
import passport           from "passport";
import LinkedInStrategy   from "passport-linkedin";

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
passport.use(new LinkedInStrategy({
    consumerKey: app.linkedIn.env.CONSUMER_KEY,
    consumerSecret: app.linkedIn.env.CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1/home',
		profileFields: app.linkedIn.env.PROFILE_FIELDS
  },
  
  function(token, tokenSecret, profile, done) {
        
	app.mainInfo = {
		Token: token,
		Profile: profile,
		TokenSecret: tokenSecret
	}

    return done(null, token, tokenSecret, profile);

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

	app.get('/linkedin/login',
		passport.authenticate('linkedin')
	);

	app.get('/home', 
		passport.authenticate('linkedin', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		}
	);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

app.listen(PORT, () => console.log(`Teste de log utilizando a porta ${PORT}`));


// Verifica se o usuário está devidamente autenticado
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}