module.exports = function(sdkModule) {
    require('./eventbus')(sdkModule);
    require('./serverRequests')(sdkModule);
    require('./indexController')(sdkModule);
};