const GrammerBlock = require('./GrammerBlock');
const GrammerBlockPart = require('./GrammerBlockPart');
const GrammerRule = require('./GrammerRule');
const util = require('./util');

function addAll(set, elements) {
    elements.forEach(element => {
        set.add(element);
    });
}

function rulesProducing(mgr, target) {
    return mgr.rules.filter((rule) => rule.leftSide === target);
}

function follows(mgr, blockPart) {
    if (!util.beginsWithCaptial(blockPart.getSymbolAfterDot())) {
        return blockPart.getSymbolAfterDot();
    } else {
        // nextSymbol ist non-terminal. search for follows recursivly
        // TODO fix this is only working with the first rule, but could be more
        let rule = rulesProducing(mgr.rules, blockPart.getSymbolAfterDot())[0];
        let new_part = new GrammerBlockPart(rule, "shouldnomatter")
        return this.follows(mgr.rules, new_part);
    }
}

function expandBlock(mgr, block) {
    block.parts.forEach((part) => {
        if (!!part.getSymbolAfterDot()) {
            let check = util.beginsWithCaptial(part.getSymbolAfterDot());
            if (check && !part.dotAtEnd()) {
                let new_rules = rulesProducing(mgr, part.getSymbolAfterDot())
                let new_parts = new_rules.map((rule) => {
                    return new GrammerBlockPart(rule, follows(mgr, part.getNext()))
                });
                new_parts.forEach(element => {
                    block.parts.push(element);
                });
            }
        }
    });
}

function processBlock(mgr, block) {

    block.getNext().forEach((parts, current_symbol) => {
        let target_block = mgr.blocks.find((block) => block.contains(parts));
        if (target_block) {
            block.connections.set(current_symbol, target_block.id)
        } else {
            let new_block = new GrammerBlock(parts);
            expandBlock(mgr, new_block);
            mgr.blocks.push(new_block);
            block.connections.set(current_symbol, new_block.id)
            if (!new_block.allAreDone()) {
                processBlock(mgr, new_block);
            }
        }
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
        ruleStr = ruleStr.trim();
        const rule = new GrammerRule(ruleStr);
        addAll(this.terminals, rule.terminals);
        addAll(this.nonTerminals, rule.nonTerminals);
        this.rules.push(rule);
    }

    get prettyString() {
        return this.blocks.map(block => block.prettyString).join("")
    }

    constructPDA() {
        let s_rules = this.rules.filter((rule) => rule.leftSide === "S");
        let block_parts = s_rules.map((rule) => {
            return new GrammerBlockPart(rule, "dollar")
        });
        let first_block = new GrammerBlock(block_parts);
        this.blocks.push(first_block);
        processBlock(this, first_block);
    }

    printBlocks() {
        const space = "    ";
        console.log("Regeln");
        for (let index = 0; index < this.rules.length; index++) {
            const rule = this.rules[index];
            console.log(index + space + rule.toString());
        }
        console.log("Blöcke");
        this.blocks.forEach(block => {
            console.log(space + "Block " + block.id);
            console.log(space + space + "Regeln");
            block.parts.forEach(part => {
                console.log(space + space + space + part.toString());
            });
            if (block.connections.size > 0) {
                console.log(space + space + space + "Verbindungen");
                block.connections.forEach((value, key) => {
                    console.log(space + space + space + key + " " + value);
                });
            }
        });
    }

    printTable() {

    }

}

