import express                         from  "express";
import cookieParser                    from  "cookie-parser";
import session                         from  "express-session";
import passport                        from  "passport";
import consign                         from "consign";
import request                         from "request-promise";
import { Strategy as TwitterStrategy } from  "passport-twitter";

const PORT = 80;
const app  = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
	secret: "sessaoTwitterPostApp",
  resave: true,
  saveUninitialized: true
}));

// Organização de carregamento de módulos
consign()
	.include("./config/auth")
	.then("./config/routes")
	.into(app);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});
passport.use(new TwitterStrategy(
  {
		consumerKey: app.twitter.env.CONSUMER_KEY,
    consumerSecret: app.twitter.env.CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1/auth/twitter/callback"
	},
  (token, tokenSecret, profile, next) => {
    next(null, profile);
  }
));

app.get("/twitter/login", passport.authenticate("twitter"));

app.get("/logout", function(req, res){
  req.session.destroy();
  res.locals.user = null
  res.redirect("/");
});

app.get("/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/logout" }),
  function(req, res){
    res.json(req.user);
  });

app.listen(PORT, function(){
  console.log(" Trabalhando em localhost http://127.0.0.1");
});