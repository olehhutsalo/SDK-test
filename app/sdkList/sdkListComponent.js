'use strict';
const angular = require('angular');
const _ = require('lodash');

module.exports = function(sdkModule) {
    sdkModule.component('sdkList', {
        bindings: {
            sdk: '='
        },
        controller: filterMenuCtrl,
        controllerAs: 'ctrl',
        templateUrl: 'sdkList/sdkList.html'
    });

    filterMenuCtrl.$inject = [
        '$scope',
        'eventbus'
    ];

    function filterMenuCtrl($scope, eventbus){
        const ctrl = this;
        let filterChangeEvent = 'event::filter::change';

        ctrl.init = function () {
            ctrl.filter = {type: 'all'};
            ctrl.idToDisplay = updateDisplayedElements(ctrl.filter);
        };

        eventbus.subscribe(filterChangeEvent, (event, newFilter) => {
            console.log(filterChangeEvent + ' received');
            ctrl.filter = newFilter;
            ctrl.idToDisplay = updateDisplayedElements(ctrl.filter);
        });

        /**
         * Form array of `id`s of elements to display
         * @param {Object} filter - Object with information what SDKs elements to display
         * @return {Array} Array of `id`s of elements to display
         *
         * {Object} filter = {type: 'all'|'search'|'tag', searchString: <string>, selectedTag: <string>}
         * `searchString` is present if type=='search'
         * `selectedTag` is present if type=='tag'
         */
        function updateDisplayedElements(filter) {
            if (angular.isUndefined(filter)){
                filter = ctrl.filter;
            }
            let selectedItems;
            switch(filter.type){
                case "all": {
                    //return all elements
                    selectedItems = ctrl.sdk;
                    break;
                }
                case "tag": {
                    //filter elements that have corresponding tag
                    selectedItems =  _.filter(ctrl.sdk, el => el.tags.includes(filter.selectedTag));
                    break;
                }
                case "search": {
                    //filter elements that have corresponding text in title
                    selectedItems =  _.filter(ctrl.sdk, el => el.title.toLowerCase().includes(filter.query.toLowerCase()));
                    break;
                }
            }
            //retun IDs of selected items
            return _.map(selectedItems, el => el.id);
        }

        $scope.$watch(() => ctrl.sdk,
            () => {
                ctrl.idToDisplay = updateDisplayedElements(ctrl.filter);
        })

    }
};