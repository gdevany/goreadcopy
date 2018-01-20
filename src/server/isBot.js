const ua = require("useragent");

module.exports = function isBot(userAgent) {
    const agent = ua.is(userAgent);
    return !agent.webkit && !agent.opera && !agent.ie &&
        !agent.chrome && !agent.safari && !agent.mobile_safari &&
        !agent.firefox && !agent.mozilla && !agent.android;
}
