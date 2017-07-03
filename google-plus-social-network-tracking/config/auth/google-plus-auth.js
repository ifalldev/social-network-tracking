module.exports = app => {
    app.googlePlus = {
        env: {
	    CLIENT_ID: '590625448544-oq3haja7g3elnjr5j8lh6hnra6die5a9.apps.googleusercontent.com', 
	    CLIENT_SECRET: '269PJkI8d08ihW7-O5scJNmj',
            SCOPE: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read',
		'https://www.googleapis.com/auth/plus.me',
		'https://www.googleapis.com/auth/plus.circles.read',
		'https://www.googleapis.com/auth/plus.circles.write',
		'https://www.googleapis.com/auth/plus.stream.read',
		'https://www.googleapis.com/auth/plus.stream.write',
		'https://www.googleapis.com/auth/plus.media.upload'

            ],
            USER_FIELDSET: 'id, name, about, email, accounts, link, is_verified, significant_other, relationship_status, website, picture, photos, feed',
            PAGE_FIELDSET: 'name, category, link, picture, is_verified',
            PROFILE_FIELDS: [
                'id',
                'about',
                'cover',
                'email',
                'first_name',
                'last_name',
                'updated_time',
                'likes',
                'live_videos',
                'permissions',
                'photos',
                'videos',
                'feed'
            ],
	    PORT: 80,
	    CALLBACK_URL: 'http://127.0.0.1/home'
        }
    }
};
