const GrammarRule = require('./GrammerRule');


let idCounter = 0;

function getNextID(){
    return ++idCounter;
}

module.exports = class GrammarBlock{
    constructor(parts){
        this.parts = parts;
        this.connections = new Map();
        this.id = getNextID();
    }

    getNext() {
        let map = new Map();

    }

    contains(parts) {
        parts.forEach(element => {
            this.parts.forEach(part => {
                if(!part.equals(element)){
                    return false;
                }
            });
        });
        return true;
    }

    
}