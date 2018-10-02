module.exports.assert = function(condition, message) { 
    if (!condition)
        throw Error("Assert failed" + (typeof message !== "undefined" ? ": " + message : ""));
};
module.exports.beginsWithCaptial = function (name) {
    return name[0] == name[0].toUpperCase();
}