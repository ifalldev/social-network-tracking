module.exports = app =>{
    app.twitter = {
        env: {
            CONSUMER_KEY: 'atANXJu4jymDgpDxf9si9qaZo',
            CONSUMER_SECRET: '4ZMfiZr91hYYg8TIwjXbaF3N6boF7JZf3yD34e7CcVgh3ewQJj',
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