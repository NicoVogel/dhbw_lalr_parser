var GrammerRule = require('./librarys/GrammerRule');
var Manager = require('./librarys/Manager');

let m = new Manager();
//m.addRule("S -> a S b");
//m.addRule("S -> a b");

m.addRule("S -> T + S");
m.addRule("S -> T - S");
m.addRule("T -> - S");
m.addRule("T -> num");

m.constructPDA();
//console.log(JSON.stringify(m, null, 2));
console.log(m.prettyString);
//m.printBlocks();
//console.log(JSON.stringify(m, null, 2));
