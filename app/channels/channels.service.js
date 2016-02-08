/**
 * Created by Shuriken on 04.02.2016.
 */

'use strict';

(function(angular) {

    angular.module('firebaseChatApp')
        .factory('Channels', function($firebaseArray, FirebaseUrl) {

            var ref = new Firebase(FirebaseUrl + 'channels');
            var channels = $firebaseArray(ref);

            return channels;

        });

})(angular);