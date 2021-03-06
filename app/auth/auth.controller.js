/**
 * Created by Shuriken on 02.02.2016.
 */

'use strict';

(function(angular) {
    angular.module('firebaseChatApp')
        .controller('AuthController', function(Auth, $state) {
            var authCtrl = this;

            authCtrl.test = 'Test message';

            authCtrl.user = {
                email: 'tarabet@yandex.ru',
                password: '123456'
            };

            authCtrl.login = function() {
                console.log('Login triggered');
                Auth.$authWithPassword(authCtrl.user).then(function(auth) {
                    console.log('Auth successfull');
                    $state.go('home');
                },
                function(error) {
                    authCtrl.error = error;
                });
            };

            authCtrl.register = function() {
                console.log('AuthRegister triggered');
                Auth.$createUser(authCtrl.user).then(function(user) {
                    authCtrl.login();
                },
                function(error) {
                    authCtrl.error = error;
                });
            };
        });
}(angular));
