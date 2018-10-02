var GrammerRule = require('./librarys/GrammerRule');
var Manager = require('./librarys/Manager');

let m = new Manager();
m.addRule("S -> a S b");
m.addRule("S -> a b");
m.constructPDA();

console.log(JSON.stringify(m, null, 2));
console.log(m.blocks[0].connections);