var GrammerRule = require('./librarys/GrammerRule');
var Manager = require('./librarys/Manager');

let m = new Manager();
m.addRule("S -> A B");
m.addRule("A -> a");
m.addRule("B -> b");
console.log(m.constructPDA());