var util = require('./util');

function beginsWithCaptial(name) {
    return name[0] == name[0].toUpperCase();
}

module.exports = class GrammerRule {
    constructor(ruleStr) {
        let ruleElems = ruleStr.split(" ");
        this.leftSide = ruleElems[0];
        util.assert(beginsWithCaptial(this.leftSide), "Left side must be non terminal");
        util.assert(ruleElems[1] === "->", "GrammerRule must contain arrow");
        this.rightSide = ruleElems.slice(2);
    }

};