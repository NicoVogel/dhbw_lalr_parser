const GrammarRule = require('./GrammerRule');

let idCounter = 0;

function getNextID() {
    return ++idCounter;
}

module.exports = class GrammarBlock {
    constructor(parts) {
        this.parts = parts;
        this.connections = new Map();
        this.id = getNextID();
    }

    getNext() {
        let map = new Map();
        this.parts.forEach(element => {
            let nextSymbol = element.getSymbolAfterDot();
            let nextArray = map.get(nextSymbol);
            if (!nextArray) {
                nextArray = [];
                map.set(nextSymbol, nextArray);
            }
            nextArray.push(element.getNext());
        });
        return map;
    }

    contains(parts) {
        parts.forEach(element => {
            this.parts.forEach(part => {
                if (!part.equals(element)) {
                    return false;
                }
            });
        });
        return true;
    }


}