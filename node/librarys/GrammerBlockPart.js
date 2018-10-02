var util = require('./util');

module.exports = class GrammerBlockPart {
    constructor(grammerRule, lookahead) {
        this.grammerRule = grammerRule;
        this.lookahead = lookahead;
        this.dot_before = 0;
        util.assert(!util.beginsWithCaptial(lookahead), "Lookahead must be terminal")
    }

    getNext() {
        let next = new GrammerBlockPart(this.grammerRule, this.lookahead);
        next.dot_before = this.dot_before + 1;
        return next;
    }

    getSymbolAfterDot() {
        return this.grammerRule.rightSide[this.dot_before];

    }
    getSymbolBeforeDot() {
        return this.grammerRule.rightSide[this.dot_before - 1];
    }

    dotAtEnd() {
        return this.grammerRule.rightSide.length <= this.dot_before;
    }

    get prettyString() {
        return this.grammerRule.leftSide + " -> "
            + this.grammerRule.rightSide.slice(0, this.dot_before).join(" ")
            + "."
            + this.grammerRule.rightSide.slice(this.dot_before).join(" ")
            + ", "
            + this.lookahead
    }

    equals(part) {
        return !!part
            && this.dot_before === part.dot_before
            && this.lookahead === part.lookahead
            && this.grammerRule.equals(part.grammerRule);
        
    }

}