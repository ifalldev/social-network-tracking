module.exports = app =>{
    app.googlePlus = {
        env: {
            CLIENT_ID: '590625448544-igjs016tb3lpc717lccvvd7ntp397bhq.apps.googleusercontent.com',
            CLIENT_SECRET: '79BIwqVH2KrFsGpQtNQOSCw5',
            SCOPE: [
                'profile'
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
            ]
        }
    }
};