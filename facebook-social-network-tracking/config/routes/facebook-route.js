import request from "request-promise";
import bodyParser from "body-parser";

module.exports = app => {

	// Use application-level middleware for common functionality, including
	// logging, parsing, and session handling.
	app.use(require('morgan')('combined'));
	app.use(require('cookie-parser')());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

	app.get("/", (req, res) => {
		if (req.user) {
			res.render("index", {
				retorno: res.json(req.user)
			});
		} else {
			res.render("index", {
				retorno: "Faça uma requisição válida"
			});
		}
	});

	app.get('/facebook/profile',
		require('connect-ensure-login').ensureLoggedIn(),
		function (req, res) {
			res.render('index', { retorno: req.user, mainInfo: app.mainInfo });
		}
	);

	// Posts
	// Listar Posts feitos pelo usuário
	app.get('/facebook/me/posts', (req, res) => {

		const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.9/${app.mainInfo.Profile.id}/posts`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Listar posts que o usuário foi marcado
	app.get('/facebook/me/tagged', (req, res) => {

		const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.9/${app.mainInfo.Profile.id}/tagged`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Listar feed de notícias do usuário
	app.get('/facebook/me/feed', (req, res) => {

		const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.9/${app.mainInfo.Profile.id}/feed`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Ver um Post Specífico
	app.get('/facebook/post/:postId', (req, res) => {
		const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.9/${req.params.postId}?fields=comments,likes{id,name}`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});
	});

	// Publicar Post na timeline do usuário
	app.post('/facebook/post/publicar/:userId', (req, res) => {

		const options = {
			method: 'POST',
			uri: `https://graph.facebook.com/v2.9/${req.params.userId}/feed`,
			qs: {
				access_token: req.body.access_token,
				message: req.body.message
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Atualizar post pelo usuário
	app.post("/facebook/post/atualizar/:postId", (req, res) => {
		const options = {
			method: "POST",
			uri: `https://graph.facebook.com/v2.9/${req.params.postId}`,
			qs: {
				access_token: req.body.access_token,
				message: req.body.message
			}
		}

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Apagar post criado pelo usuário
	app.post("/facebook/post/apagar/:postId", (req, res) => {

		const options = {
			method: "DELETE",
			uri: `https://graph.facebook.com/v2.9/${req.params.postId}`,
			qs: {
				access_token: req.body.access_token
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Photos
	// Listar todas as fotos do feed de notícias (Igual ao funcionamento dos posts)
	app.get("/facebook/photo/:userId/feed", (req, res) => {

		const options = {
			method: "GET",
			uri: `https://graph.facebook.com/v2.9/${req.params.userId}/photos/`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});
	});

	// Listar todos os uploads de fotos feitos pelo usuário
	app.get("/facebook/photo/:userId/uploaded", (req, res) => {

		const options = {
			method: "GET",
			uri: `https://graph.facebook.com/v2.9/${req.params.userId}/photos/uploaded`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Listar fotos em que o usuário foi marcado
	app.get("/facebook/photo/:userId/tagged", (req, res) => {

		const options = {
			method: "GET",
			uri: `https://graph.facebook.com/v2.9/${req.params.userId}/photos/tagged`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Mostrar uma foto em específico
	app.get("/facebook/photo/:photoId", (req, res) => {

		const options = {
			method: "GET",
			uri: `https://graph.facebook.com/v2.9/${req.params.photoId}`,
			fields: 'link,created_time,likes{name,username,id },picture{url},comments{attachment,from,user_likes,like_count,id,reactions},reactions{pic,id,name},sharedposts{id}',
			access_token: app.mainInfo.AccessToken
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Postar imagem
	app.post("/facebook/photo/publicar/:userId", (req, res) => {

		const options = {
			method: "POST",
			uri: `https://graph.facebook.com/v2.9/${req.params.userId}/photos`,
			qs: {
				url: req.body.url,
				caption: req.body.caption,
				access_token: req.body.access_token
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Atualizar imagem
	app.post("/facebook/photo/atualizar/:photoId", (req, res) => {

		const options = {
			method: "POST",
			uri: `https://graph.facebook.com/v2.9/${req.params.photoId}`,
			qs: {
				url: req.body.url,
				caption: req.body.caption,
				access_token: app.body.access_token
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Apagar imagem
	app.post("/facebook/photo/apagar/:photoId", (req, res) => {

		const options = {
			method: "DELETE",
			uri: `https://graph.facebook.com/v2.9/${req.params.photoId}`,
			qs: {
				access_token: app.body.access_token
			}
		}

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Vídeos
	// Listar videos que o usuário fez o upload
	app.get("/facebook/videos/:userId/uploaded", (req, res) => {

		const options = {
			method: "GET",
			uri: `https://graph.facebook.com/v2.9/${req.params.userId}/videos/uploaded`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			})

	});

	// Listar vídeos em que o usuário foi marcado
	app.get("/facebook/videos/:userId/tagged", (req, res) => {

		const options = {
			method: "GET",
			uri: `https://graph.facebook.com/v2.9/${req.params.userId}/videos/upload`,
			qs: {
				access_token: app.mainInfo.AccessToken
			}
		};

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Listar um vídeo que o usuário tenha postado
	app.get("/facebook/videos/:videoId", (req, res) => {

		const options = {
			method: "GET",
			uri: `https://graph.facebook.com/v2.9/${req.params.videoId}`,
			qs: {
				access_token: app.mainInfo.AccessToken,
				fields: 'comments{id,user_likes,created_time,from,message},likes{id,name,username,link},reactions{id,name,link},sharedposts{id,name,message}'
			}
		}

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});

	// Postar um vídeo
	app.post("/facebook/videos/publicar/:userId", (req, res) => {

		const options = {
			method: "POST",
			uri: `https://graph-video.facebook.com/v2.3/${req.params.userId}/videos`,
			qs: {
				access_token: req.body.access_token,
				video_file_chunk: "@" + req.body.url,
				title: req.body.access_token,
				description: req.body.access_token,
				upload_fase: req.body.upload_fase,
				file_size: req.body.file_size,
				options: {
					filename: "video teste",
					contentType: "video/mp4"
				}
			}
		}

		request(options)
			.then(fbRes => {
				res.json(fbRes);
			});

	});


	// EAADwG3IzFcYBADdeUzs5iU31Cdcrd9OGgQQFkTaZAhZBvjSEXwDxgP5qL4EY7uSKM38ZC6ZAjKI4Gvd5ZCFA1K68hzIceJorfV0tZCH3fZBs4LVwS2QFMVOZAFKcZBo7sZCsYS9pP8OEGDEZApvzd6yCR3UWSLEnvkSw4oe0Xnya9rASAZDZD
	// http://s3.amazonaws.com/sbcoaching-virginia/videos/sbcoaching-formacao-de-lideres.mp4
	// 1669351269745178
	// 1669351269745178_1710303928983245

};