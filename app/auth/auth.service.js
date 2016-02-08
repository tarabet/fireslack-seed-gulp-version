/**
 * Created by Shuriken on 02.02.2016.
 */

'use strict';

angular.module('firebaseChatApp')
    .factory('Auth', function($firebaseAuth, FirebaseUrl) {
        var ref = new Firebase(FirebaseUrl);
        var auth = $firebaseAuth(ref);

        return auth;
    });