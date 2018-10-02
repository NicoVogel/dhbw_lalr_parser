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
            if (!!nextSymbol) {
                let nextArray = map.get(nextSymbol);
                if (!nextArray) {
                    nextArray = [];
                    map.set(nextSymbol, nextArray);
                }
                nextArray.push(element.getNext());
            }
        });
        return map;
    }

    contains(parts) {

        let all = true;
        parts.forEach(element => {

            let contains = false;
            this.parts.forEach(part => {
                if (part.equals(element)) {
                    contains = true;
                }
            });
            if (!contains) {
                all = false;
            }
        });
        return all;
    }

    allAreDone() {
        let all = true;

        this.parts.forEach(element => {
            if (!element.dotAtEnd()) {
                all = false;
            }
        });

        return all;
    }

    toString() {
        const space = "    ";
        console.log(space + "Block " + this.id);
        console.log(space + space + "Regeln");
        this.parts.forEach(part => {
            console.log(space + space + space + part.toString());
        });
        if (this.connections.size > 0) {
            console.log(space + space + space + "Verbindungen");
            this.connections.forEach((value, key) => {
                console.log(space + space + space + key + " " + value);
            });
        }
    }


}