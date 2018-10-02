var GrammerRule = require('./librarys/GrammerRule');
var Manager = require('./librarys/Manager');

let m = new Manager();
//m.addRule("S -> a S b");
//m.addRule("S -> a b");

m.addRule("S -> a S a");
m.addRule("S -> b S b");
m.addRule("S -> a");
m.addRule("S -> b");

m.constructPDA();
m.printBlocks();
//console.log(JSON.stringify(m, null, 2));