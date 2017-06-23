module.exports = app =>{
    app.instagram = {
        env: {
            CLIENT_ID: 'd12b76446f4147959ee7d786bd3ce712',
            CLIENT_SECRET: '5889bf92ddfb4f5a802481241b6e0f8d',
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