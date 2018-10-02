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
        next.dot_before++;
        return next;
    }

    equlas(part) {
        return !!part
            && this.dot_before === part.dot_before
            && this.lookahead === part.lookahead
            && this.grammerRule.equlas(part.grammerRule);
    }

}