const GrammerBlock = require('./GrammerBlock');
const GrammerBlockPart = require('./GrammerBlockPart');
const GrammerRule = require('./GrammerRule');
const Util = require('./util');

function addAll(set, elements) {
    elements.forEach(element => {
        set.add(element);
    });
}


module.exports = class Manager {

    constructor() {
        this.rules = [];
        this.blocks = [];
        this.terminals = new Set();
        this.nonTerminals = new Set();
    }

    addRule(ruleStr) {
        const rule = new GrammerRule(ruleStr);
        addAll(this.terminals, rule.nonTerminals);
        addAll(this.nonTerminals, rule.terminals);
        this.rules.push(rule);
    }

    constructPDA(){

        let s_rules = this.rules.filter((rule) => rule.leftSide === "S");
        let block_parts = s_rules.map((rule) => {
            return new GrammerBlockPart(rule,"dollar")
        });
        let first_block = new GrammerBlock(block_parts);
        return first_block;
        
    }


}

