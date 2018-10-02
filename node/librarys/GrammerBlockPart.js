var util = require('./util');

class GrammerBlockPart {
    constructor (grammerRule, lookahead) {
        this.grammerRule = grammerRule;
        this.lookahead = lookahead;
        this.dot_before = 0;
        util.assert(!util.beginsWithCaptial(lookahead), "Lookahead must be terminal")
    }
    
}