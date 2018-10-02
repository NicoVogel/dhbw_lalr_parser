const GrammerBlock = require('./GrammerBlock');
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
        addAll(this.terminals, rule.nonTerminals());
        addAll(this.nonTerminals, rule.terminals());
        this.rules.push(rule);
    }

    constructPDA(){
        
    }


}

