var GrammerRule = require('./librarys/GrammerRule');
var Manager = require('./librarys/Manager');

let m = new Manager();
m.addRule("S -> A B");
console.log(m.constructPDA());