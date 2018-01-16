'use strict';
const angular = require('angular');

module.exports = function(sdkModule) {

    sdkModule.controller('indexController', indexController);

    indexController.$inject = [
        'serverRequests'
    ];

    function indexController(serverRequests) {
        const ctrl = this;

        ctrl.init = function () {
            ctrl.data = {};
            serverRequests.getSdkList()
                .then(res => {
                    ctrl.data.sdks = res.data.results;
                    ctrl.data.tags = formTagsList(res.data.results);
                });
        };
        /**
         * Traverse through all elements of SDKs array and form a list of all present tags
         * @param {Array} sdkList - array of SDKs {title: <string>, id: <string>, tags: Array<string>}
         * @return {Array} Promise with request result
         */
        function formTagsList(sdkList) {
            let tagsList = new Set(); //Set will store only unique values
            angular.forEach(sdkList, el => {
                let tags = el.tags;
                if (angular.isArray(tags) && tags.length > 0)
                    tagsList.add(...tags);
            });
            return Array.from(tagsList);
        }
    }
};