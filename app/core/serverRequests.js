'use strict';
const _ = require('lodash');

module.exports = function(sdkModule) {

    sdkModule.factory('serverRequests', serverRequests);

    serverRequests.$inject = [
        '$http',
        '$q'
    ];

    function serverRequests($http, $q) {
        /**
         * Retrieve SDK information from local folder
         * @return {Promise} Promise with request result
         */
        function _getSdkList() {
            return $http.get('./remote/sdks.json')
                .then(res => {
                    console.log('sdks.json retrieved successfully');
                    return $q.when(res)
                }, err => {
                    console.warn('error retrieving sdks.json', err);
                    return $q.reject(err)
                });
        }

        return {
            getSdkList: _getSdkList
        };
    }
};