const GrammerBlock = require('./GrammerBlock');
const GrammerBlockPart = require('./GrammerBlockPart');
const GrammerRule = require('./GrammerRule');
const util = require('./util');

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
        this.blocks.push(first_block);

        this.processBlock(first_block);
        
    }

    rulesProducing(target) {
        return this.rules.filter((rule) => rule.leftSide === target);
    }

    expandBlock(block) {
        let hasUnexpaned = true
        block.parts.forEach((part) => {
            if (util.beginsWithCaptial(part.getSymbolAfterDot())) {
                
            }
        })
        while (hasUnexpaned) {
            hasUnexpaned = false
            
        }
        while(block.)
    }

    processBlock(block) {
        block.getNext().forEach((target_block_part) => {
            let current_symbol = block_part.getSymbolBeforeDot();
            let target_block = this.blocks.find((block) => block.contains([block_part]));
            if (target_block) {
                this.block.connections.set(current_symbol,target_block.id)
            } else {
                let new_block = new GrammerBlock([target_block_part]);
                this.block.connections.set(current_symbol, new_block.id)
            }
        })

    }


}

