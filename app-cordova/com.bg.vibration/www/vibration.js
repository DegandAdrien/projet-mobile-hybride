var exec = require('cordova/exec');

exports.vibrate = function (duration, success, error) {
    exec(success, error, 'BGVibration', 'vibrate', [duration]);
};