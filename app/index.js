'use strict';
const angular = require('angular');

const sdkModule = angular.module('SDKApp', []);

require('./core')(sdkModule);
require('./filterMenu')(sdkModule);
require('./sdkList')(sdkModule);

