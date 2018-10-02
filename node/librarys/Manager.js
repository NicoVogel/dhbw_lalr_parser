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

    follows(blockPart) {
        if (!util.beginsWithCaptial(blockPart.getSymbolAfterDot())) {
            return blockPart.getSymbolAfterDot();
        } else {
            // nextSymbol ist non-terminal. search for follows recursivly
            // TODO fix this is only working with the first rule, but could be more
            let rule = this.rulesProducing(blockPart.getSymbolAfterDot())[0];
            let new_part = new GrammerBlockPart(rule, "shouldnomatter")
            return this.follows(new_part);
        }
    }

    expandBlock(block) {
        let hasUnexpaned = true
        block.parts.forEach((part) => {
            if (util.beginsWithCaptial(part.getSymbolAfterDot())) {
                let new_rules = this.rulesProducing(part.getSymbolAfterDot())
                let new_parts = new_rules.map((rule) => {
                    return new GrammerBlockPart(rule,this.follows(part.getNext()))
                })
                block.parts.concat(new_parts);
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

