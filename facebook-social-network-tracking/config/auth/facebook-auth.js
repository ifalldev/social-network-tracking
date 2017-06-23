module.exports = app =>{
    app.facebook = {
        env: {
            CLIENT_ID: '264000670733766',
            CLIENT_SECRET: '64211f4398069ccb80904446e46ca4b3',
            SCOPE: [
                'publish_actions',
                'publish_pages',
                'manage_pages',
                'user_photos',
                'user_posts',
                'user_likes',
                'pages_messaging',
                'pages_messaging_subscriptions',
                'pages_show_list',
                'read_insights',
                'read_custom_friendlists',
                'read_audience_network_insights'
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