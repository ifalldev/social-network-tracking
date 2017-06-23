module.exports = app =>{
    app.linkedIn = {
        env: {
            CONSUMER_KEY: '77t8q8l3bkhoud',
            CONSUMER_SECRET: 'kNTsjLE9eIibwh6x',
            SCOPE: [
                'r_basicprofile',
                'r_emailaddress',
                'rw_copman_admin',
                'w_share'
            ],
            USER_FIELDSET: 'id, name, about, email, accounts, link, is_verified, significant_other, relationship_status, website, picture, photos, feed',
            PAGE_FIELDSET: 'name, category, link, picture, is_verified',
            PROFILE_FIELDS: [
                'id',
                'first-name',
                'last-name',
                'email-address',
                'headline'
            ]
        }
    }
};