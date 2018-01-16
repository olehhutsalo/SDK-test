'use strict';
const angular = require('angular');

module.exports = function(sdkModule) {
    /**
     * Component for filers list
     */
    sdkModule.component('filterMenu', {
        bindings: {
            tags: '='
        },
        controller: filterMenuCtrl,
        controllerAs: 'ctrl',
        templateUrl: 'filterMenu/filterMenu.html'
    });

    filterMenuCtrl.$inject = [
        '$scope',
        'eventbus'
    ];

    function filterMenuCtrl($scope, eventbus){
        const ctrl = this;

        ctrl.selectedFilter = 'all';
        /**
         * Subscribe to change of `ctrl.selectedFilter` and invoke handler function
         */
        $scope.$watch(_ => ctrl.selectedFilter, value => {
            if (angular.isDefined(value)){
                ctrl.updateSdkList();
            }
        });

        /**
         * Form filter object and broadcast it to sdkListComponent
         *
         * {Object} filter = {type: 'all'|'search'|'tag', searchString: <string>, selectedTag: <string>}
         * `searchString` is present if type=='search'
         * `selectedTag` is present if type=='tag'
         */
        ctrl.updateSdkList = function() {
            let filter;
            if (ctrl.selectedFilter.indexOf("tag:") == 0){
                filter = {
                    type: 'tag',
                    selectedTag: ctrl.selectedFilter.substr(4)
                }
            } else {
                filter = {
                    type: ctrl.selectedFilter
                };
                if (filter.type == 'search'){
                    filter.query = ctrl.searchString || '';
                }
            }

            let filterChangeEvent = 'event::filter::change';
            console.log(filterChangeEvent + ' sent', filter);
            eventbus.broadcast(filterChangeEvent, filter);

        };
    }
};