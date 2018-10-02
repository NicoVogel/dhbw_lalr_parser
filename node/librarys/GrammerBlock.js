const GrammarRule = require('./GrammerRule');
const cy = require('cytoscape');

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
        
    }

    contains(parts) {
<<<<<<< HEAD

=======
        parts.forEach(element => {
            this.parts.forEach(part => {
                if(part.equals(element)){
                    return false;
                }
            });
        });
        return true;
>>>>>>> save
    }

    
}