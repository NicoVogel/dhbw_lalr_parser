var util = require('./util');



module.exports = class GrammerRule {
    constructor(ruleStr) {
        console.log(ruleStr);
        let ruleElems = ruleStr.split(" ");
        this.leftSide = ruleElems[0];
        util.assert(util.beginsWithCaptial(this.leftSide), "Left side must be non terminal");
        util.assert(ruleElems[1] === "->", "GrammerRule must contain arrow");
        this.rightSide = ruleElems.slice(2);
    }

    get nonTerminals() {
        let res = this.rightSide.filter((val) => util.beginsWithCaptial(val));
        res.push(this.leftSide);
        return res;
    }

    get terminals() {
        return this.rightSide.filter((val) => !util.beginsWithCaptial(val))
    }

    equals(rule) {
        if (!rule || this.leftSide !== rule.leftSide){
            return false;
        }

        let containsAll = true; 
        this.rightSide.forEach(element => {
            if(!rule.rightSide.includes(element)){
                containsAll = false;
                return;
            }
        });
        return containsAll;
    }

};