const GrammarRule = require('./GrammerRule');
const cy = require('cytoscape');

let idCounter = 0;

function getNextID(){
    return ++idCounter;
}

module.exports = class GrammarBlock{
    constructor(parts){
        this.parts = parts;
        this.connections = [];
        this.id = getNextID();
    }

    getNext() {

    }

    contains(parts) {
        
    }

    
}