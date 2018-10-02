var util = require('./util');

module.exports = class GrammerRule {
    constructor(ruleStr) {
        let ruleElems = ruleStr.split(" ");
        this.leftSide = ruleStr.split(" ")
        util.assert(ruleStr)
    }

};