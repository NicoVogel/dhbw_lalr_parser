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

    get prettyString() {
        const arrow_group = "──┬──"
        let width = Math.max(
            this.parts
                .map((part) => part.prettyString)
                .map(ps => ps.length)
                .reduce((max,val) => Math.max(max,val), 0),
            arrow_group.length * this.connections.size
        )
        let header = ("┌" + this.id).padEnd(width+1, "─") + "┐\n"        
        let body = this.parts
            .map(part => "│" + part.prettyString.padEnd(width) + "│")
            .join("\n");
        let footer = "\n└" 
            + arrow_group.repeat(this.connections.size) 
            + "─".repeat(width - arrow_group.length * this.connections.size)
            + "┘\n"
        let connArray = Array.from(this.connections);
        var labels = "   " + 
            connArray
                .map(kv => {
                    return ("│" + kv[0]).padEnd(arrow_group.length)
                })
                .join("")
            + "\n"
        let arrows = "   " +
            connArray
                .map(kv => "▼".padEnd(arrow_group.length))
                .join("")
            + "\n"
        let nums = "   " +
            connArray
                .map((kv => kv[1].toString().padEnd(arrow_group.length) ))
                .join("")
            + "\n"
        let res = header + body + footer;
        if (this.connections.size > 0) {
            res +=  labels + arrows + nums;
        }
        return res;
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