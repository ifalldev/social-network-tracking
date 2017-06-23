module.exports = app =>{
    app.pinterest = {
        env: {
            CLIENT_ID: '4907539340535540698',
            CLIENT_SECRET: '53613ff4924ce8b298dddb2edcaa8e000a3c9d35c699093eb470453f03d1c63a',
            SCOPE: [
                'read_public',
                'read_relationships',
                'write_public',
                'write_relationships'
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