module.exports = app => {
	app.get("/", (req,res) => {
		res.json({
			teste: "Funcionando importanto os arquivos externos"
		})
	});

	// app.get('/',
	// function(req, res) {
	// 	res.render('home', { user: req.user });
	// });

	// app.get('/facebook/login',
	// function(req, res){
	// 	res.render('login');
	// });

	app.get('/facebook/profile',
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res){
		res.render('profile', { user: req.user, mainInfo: app.mainInfo });
	});

	app.get('/facebook/logout', 
	function(req, res){
		req.logout();
		res.redirect('/');
	});

	//Get Page or User info based on Facebook Graph API search
	app.get('/facebook/search/:id', (req, res) => {

			// you need permission for most of these fields

			const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.9/${req.params.id}`,
			qs: {
				access_token: app.mainInfo.AccessToken,
				fields: app.facebook.env.USER_FIELDSET
			}
		};
		request(options)
		.then(fbRes => {
			res.json(fbRes);
		})
	});

	// Get Facebook Users Photos
	app.get('/facebook/list-photos/:id/:limit/:accesstoken/:type', (req, res) => {

		const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.9/${req.params.id}/photos`,
			qs: {
			access_token: req.params.accesstoken,
			type: req.params.type,
			fields: 'photos{id,link, comments}'
		}
	};

	request(options)
		.then(fbRes => {
		res.json(fbRes)
		})

	});

	// Get Facebook Tagged Users Posts
	app.get('/facebook/list-posts/:id/:limit/:accesstoken/:type', (req, res) => {

		const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.9/${req.params.id}/${req.params.type}`,
			qs: {
			access_token: req.params.accesstoken,
			type: req.params.type,
			fields: 'id'
		}
	};

	request(options)
		.then(fbRes => {
		res.json(fbRes)
		})

	});

	// Get Facebook User's Pages
	app.get('/facebook/list-pages/:id/:accesstoken/:type', (req, res) => {

		const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.9/${req.params.id}/${req.params.type}`,
			qs: {
			access_token: req.params.accesstoken
		}
	};

	request(options)
		.then(fbRes => {
		res.json(fbRes)
		})

	});

	// Post Facebook Users Feed
	app.get('/facebook/post-feed/:id/:accesstoken/:type', (req, res) => {

		const options = {
			method: 'POST',
			uri: `https://graph.facebook.com/v2.9/${req.params.id}/${req.params.type}`,
			qs: {
			access_token: req.params.accesstoken,
			message: 'Post de exemplo'
		}
	};

	return request(options)
		
	});

};