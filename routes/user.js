
//parsing user from google profile
exports.parseUser = function(openIdUser){
    return {
            name:openIdUser.profile.displayName,
            email:openIdUser.profile.emails[0].value,
            id:openIdUser.openId
        }
}

//google enter strategy for passport module
exports.getGoogleStrategy = function(GoogleStrategy){
    return new GoogleStrategy({
            //returnURL: 'http://localhost:8080/auth/google/return',
            //realm: 'http://localhost:8080/'
            returnURL: 'http://securespace.herokuapp.com/auth/google/return',
            realm: 'http://securespace.herokuapp.com/'
        },
        function(identifier, profile, done) {

            var user = exports.parseUser( { openId: identifier, profile: profile } );

            console.log("User logged in ", user);

            done(null, user);
        }
    )
}