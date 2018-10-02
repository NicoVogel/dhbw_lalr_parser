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
        addAll(this.terminals, rule.terminals);
        addAll(this.nonTerminals, rule.nonTerminals);
        this.rules.push(rule);
    }

    constructPDA() {
        let s_rules = this.rules.filter((rule) => rule.leftSide === "S");
        let block_parts = s_rules.map((rule) => {
            return new GrammerBlockPart(rule, "dollar")
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
    
            console.log("blockPart: " + blockPart.getSymbolAfterDot());
            console.log("rule: " + rule);
            console.log("new_part: " + new_part);
            
            return this.follows(new_part);
        }
    }

    expandBlock(block) {
        block.parts.forEach((part) => {
            let check = util.beginsWithCaptial(part.getSymbolAfterDot());
            if (check) {
                let new_rules = this.rulesProducing(part.getSymbolAfterDot())
                let new_parts = new_rules.map((rule) => {
                    return new GrammerBlockPart(rule, this.follows(part.getNext()))
                })
                new_parts.forEach(element => {
                    block.parts.push(element);
                });
            }
        })
    }

    processBlock(block) {
        block.getNext().forEach((parts, current_symbol) => {
            let target_block = this.blocks.find((block) => block.contains(parts));
            if (target_block) {
                console.log(1)
                block.connections.set(current_symbol, target_block.id)
            } else {
                console.log(2);
                let new_block = new GrammerBlock(parts);
                this.expandBlock(new_block);
                this.blocks.push(new_block);
                block.connections.set(current_symbol, new_block.id)
            }
        })

    }


}

