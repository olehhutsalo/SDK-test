'use strict';
const _ = require('lodash');

module.exports = function(sdkModule) {

    sdkModule.factory('eventbus', eventbus);

    eventbus.$inject = ['$rootScope'];
    function eventbus($rootScope) {
        let isolatedScope = $rootScope.$new(true); //isolated scope to broadcast events over it

        /**
         * Broadcast an event with `eventName`. eventbus.subscribe() will receive this event
         * @param {string} eventName - Name of event to broadcast.
         * @param {any} data - Data to broadcast.
         */
        let broadcast = function (eventName, data) {
            isolatedScope.$emit(eventName, data);
        };

        /**
         * Adds listener to an event, broadcasted by eventbus.broadcast() with the same `eventName`
         * @param {string} eventName - Name of event to broadcast.
         * @param {function} callback - Event handler. Params - {event} event, {any} data - exact `data` from broadcast
         * @return {function} Returns a deregistration function for this listener
         */
        let subscribe = function (eventName, callback) {
            if (!!callback && !_.isFunction(callback)) {
                callback = _.noop;
            }

            return isolatedScope.$on(eventName, callback);
        };

        return {
            broadcast: broadcast,
            subscribe: subscribe,
        };
    }
};