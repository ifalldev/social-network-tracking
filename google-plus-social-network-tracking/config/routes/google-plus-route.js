import request from "request-promise";

module.exports = app => {
	app.get("/", (req,res) => {
		res.json({
			resposta: "Faça uma requisição válida com nossos serviços."
		});
	});

	//Listar Posts
	app.get('/google-plus/post/listar/:userId', (req,res) => {
		const options = {
			method: 'GET',
			uri: `https://www.googleapis.com/oauth2/v1/tokeninfo`,
			qs: {
				access_token: 'ya29.Gmd8BN4vWFCQ0XErcfWgMCnJ3RMo_YZdBL_qC7MDWGLpOIQhZVMtPUdqZWz8Vo2vSZ3CVZ37FOhp9QVdrIzmb2oCZH4LYYBTDMHn55EtMwky6RToNban3QqxCMES3f_EX9iSY-N4sTPq'
			}
		}

		request(options)
			.then(gpRes => {
				res.json(gpRes);
			});
 
	});


	// Get Facebook Tagged Users Posts
/*	app.get('/facebook/list-posts/:id/:limit/:accesstoken/:type', (req, res) => {

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
*/

};
