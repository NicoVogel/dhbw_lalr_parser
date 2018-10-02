var GrammerRule = require('./librarys/GrammerRule');
var Manager = require('./librarys/Manager');

let m = new Manager();
m.addRule("S -> A B");
m.addRule("A -> a");
m.addRule("B -> b");
m.constructPDA();
console.log(JSON.stringify(m, null, 2));