const GrammarRule = require('./GrammerRule');
const cy = require('cytoscape');

let idCounter = 0;

function getNextID(){
    return ++idCounter;
}

module.exports = class GrammarBlock{
    constructor(rules){
        this.rules = rules;
        this.connections[];
        this.id = getNextID();
    }


    
}